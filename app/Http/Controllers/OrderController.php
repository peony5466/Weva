<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return back()->withErrors(['error' => 'IDENTITY_REQUIRED: Veuillez vous connecter.']);
        }

        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return back()->withErrors(['error' => 'MANIFEST_EMPTY: Votre panier est vide.']);
        }

        // --- CALCUL DES DEUX FLUX DE PAIEMENT SÉCURISÉ ---
        $fiatTotal = 0;
        $creditsNeeded = 0;

        foreach ($cart as $item) {
            // Utilisation de ?? false pour éviter l'erreur "Undefined array key"
            $isExclusive = $item['is_exclusive'] ?? false;

            if ($isExclusive) {
                // Produit Exclusive Vault
                $creditsNeeded += (($item['wt_price'] ?? 0) * ($item['quantity'] ?? 1));
            } else {
                // Produit Standard
                $fiatTotal += (($item['price'] ?? 0) * ($item['quantity'] ?? 1));
            }
        }

        // SÉCURITÉ : Vérification du solde WT avant toute action
        if ($creditsNeeded > $user->points) {
            return back()->withErrors([
                'error' => "INSUFFICIENT_FUNDS: Il vous manque " . ($creditsNeeded - $user->points) . " WT Credits."
            ]);
        }

        // Gain de points : 1€ dépensé = 1 WT gagné
        $pointsToEarn = floor($fiatTotal);

        try {
            $order = DB::transaction(function () use ($request, $user, $cart, $fiatTotal, $creditsNeeded, $pointsToEarn) {

                // 1. Déduction immédiate des points
                if ($creditsNeeded > 0) {
                    $user->decrement('points', $creditsNeeded);
                }

                // 2. Création de la commande
                $newOrder = Order::create([
                    'user_id'          => $user->id,
                    'order_number'     => 'WEVA-' . strtoupper(str()->random(8)),
                    'subtotal'         => $fiatTotal,
                    'discount'         => 0,
                    'total'            => $fiatTotal,
                    'points_used'      => $creditsNeeded,
                    'points_earned'    => $pointsToEarn,
                    'status'           => ($fiatTotal <= 0) ? 'paid' : 'pending_payment',
                    'shipping_address' => $request->address ?? 'Digital Delivery',
                    'email'            => $user->email,
                ]);

                // 3. Création des items liés (avec protections)
                foreach ($cart as $cartId => $item) {
                    $realProductId = explode('-', $cartId)[0];
                    $itemIsExclusive = $item['is_exclusive'] ?? false;

                    OrderItem::create([
                        'order_id'   => $newOrder->id,
                        'product_id' => $realProductId,
                        'quantity'   => $item['quantity'] ?? 1,
                        'price'      => $itemIsExclusive ? 0 : ($item['price'] ?? 0),
                        'attributes' => [
                            'size'    => $item['variant'] ?? 'Unique',
                            'type'    => $itemIsExclusive ? 'VAULT_ITEM' : 'STANDARD_ITEM',
                            'wt_cost' => $itemIsExclusive ? ($item['wt_price'] ?? 0) : 0
                        ],
                    ]);
                }
                return $newOrder;
            });

            // --- LOGIQUE DE PAIEMENT ---

            // CAS A : La commande est 100% payée en points
            if ($fiatTotal <= 0) {
                session()->forget('cart');
                return redirect()->route('checkout.success', $order->order_number);
            }

            // CAS B : Redirection Stripe
            Stripe::setApiKey(config('services.stripe.secret'));
            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => "Order #" . $order->order_number,
                            'description' => "Standard Assets Payment"
                        ],
                        'unit_amount' => (int) round($fiatTotal * 100),
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('checkout.success', $order->order_number),
                'cancel_url' => route('checkout'),
                'customer_email' => $user->email,
            ]);

            return Inertia::location($checkoutSession->url);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'CRITICAL_FAILURE: ' . $e->getMessage()]);
        }
    }

    public function success($order_number)
    {
        $order = Order::where('order_number', $order_number)->firstOrFail();

        if ($order->status === 'pending_payment') {
            $order->update(['status' => 'paid']);

            if ($order->user_id && $order->points_earned > 0) {
                User::find($order->user_id)->increment('points', $order->points_earned);
            }
            session()->forget('cart');
        }

        return Inertia::render('Shop/success', [
            'order' => $order->load('items.product')
        ]);
    }
}
