<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return back()->withErrors(['error' => 'Veuillez vous connecter pour passer commande.']);
        }

        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return back()->withErrors(['error' => 'Votre panier est vide.']);
        }

        // ── ÉTAPE 1 : Calcul du sous-total + vérification stock ──────────────
        $subtotal = 0;

        foreach ($cart as $cartId => $item) {
            $productId = explode('-', $cartId)[0];
            $product = Product::with('variants')->find($productId);

            if (! $product) {
                return back()->withErrors(['error' => 'Produit introuvable.']);
            }

            $qty = $item['quantity'] ?? 1;
            $availableStock = $product->variants->sum('stock');

            if ($availableStock < $qty) {
                return back()->withErrors([
                    'error' => "Stock insuffisant pour {$product->name} (disponible : {$availableStock}).",
                ]);
            }

            $subtotal += ($item['price'] ?? 0) * $qty;
        }

        // ── ÉTAPE 2 : Cashback via TokenService ──────────────────────────────
        // Règle : 250 tokens accumulés → -15% sur la commande
        $tokenService = new TokenService;
        $pricing = $tokenService->applyDiscount($user, $subtotal);

        $discount = $pricing['discount_amount'];
        $total = $pricing['total'];

        // ── ÉTAPE 3 : Transaction DB ──────────────────────────────────────────
        try {
            // Récupérer l'adresse de livraison
            $address = null;
            if ($request->address_id) {
                $address = \App\Models\Address::find($request->address_id);
            }

            $order = DB::transaction(function () use (
                $user, $cart, $subtotal, $discount, $total, $address
            ) {
                $newOrder = Order::create([
                    'user_id' => $user->id,
                    'order_number' => 'WEVA-'.strtoupper(str()->random(8)),
                    'subtotal' => $subtotal,
                    'discount' => $discount,
                    'total' => $total,
                    'points_used' => 0,
                    'points_earned' => 0, // sera mis à jour après paiement
                    'status' => 'pending_payment',
                    'shipping_address' => $address ? "{$address->address}, {$address->postal_code} {$address->city}, {$address->country}" : '',
                    'email' => $user->email,
                ]);

                // Création des OrderItems + décrémentation stock
                foreach ($cart as $cartId => $item) {
                    $realProductId = explode('-', $cartId)[0];
                    $qty = $item['quantity'] ?? 1;
                    $product = Product::with('variants')->find($realProductId);

                    // Décrémenter stock variants
                    $remaining = $qty;
                    foreach ($product->variants()->orderBy('stock', 'desc')->get() as $variant) {
                        if ($remaining <= 0) {
                            break;
                        }
                        $deduct = min($variant->stock, $remaining);
                        $variant->decrement('stock', $deduct);
                        $remaining -= $deduct;
                    }

                    OrderItem::create([
                        'order_id' => $newOrder->id,
                        'product_id' => $realProductId,
                        'quantity' => $qty,
                        'price' => $item['price'] ?? 0,
                        'attributes' => [
                            'size' => $item['variant'] ?? 'Unique',
                        ],
                    ]);
                }

                return $newOrder;
            });

            // ── ÉTAPE 4 : Stripe Checkout ─────────────────────────────────────
            Stripe::setApiKey(config('services.stripe.secret'));

            $description = $pricing['eligible']
                ? "Cashback -15% appliqué ({$pricing['discount_amount']}€ économisés)"
                : '1€ = 1 token · Encore '.$pricing['points_needed'].' tokens avant le cashback';

            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => "Commande WEVA #{$order->order_number}",
                            'description' => $description,
                        ],
                        'unit_amount' => (int) round($total * 100),
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('checkout.success', $order->order_number).'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('checkout'),
                'customer_email' => $user->email,
                'metadata' => [
                    'order_number' => $order->order_number,
                    'user_id' => $user->id,
                ],
            ]);

            return Inertia::location($checkoutSession->url);

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur : '.$e->getMessage()]);
        }
    }

    // ── SUCCESS : Appelé après retour Stripe ─────────────────────────────────
    public function success($order_number)
    {
        $order = Order::where('order_number', $order_number)->firstOrFail();

        // Idempotent : on ne crédite les tokens qu'une seule fois
        if ($order->status === 'pending_payment') {

            $order->update(['status' => 'paid']);

            // Récompense tokens : 1€ payé = 1 token (sur le total APRÈS cashback)
            if ($order->user_id) {
                $user = User::find($order->user_id);
                $tokenService = new TokenService;
                $tokensEarned = $tokenService->rewardOrderTokens($user, $order);
            }

            session()->forget('cart');
        }

        return Inertia::render('shop/success', [
            'order' => $order->load('items.product'),
            'tokensEarned' => $order->points_earned ?? 0,
            'cashbackApplied' => $order->discount ?? 0,
        ]);
    }
}
