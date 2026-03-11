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
use App\Models\Product;

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

        // ----------------------------------------------------------------
        // ÉTAPE 1 : CALCUL DES TOTAUX + VÉRIFICATION STOCK
        // ----------------------------------------------------------------
        $fiatTotal     = 0;
        $creditsNeeded = 0;

        foreach ($cart as $cartId => $item) {
            $productId = explode('-', $cartId)[0];
            $product   = Product::find($productId);

            if (!$product) {
                return back()->withErrors(['error' => "SYNC_ERROR: Produit introuvable."]);
            }

            $qty = $item['quantity'] ?? 1;

            if ($product->stock < $qty) {
                return back()->withErrors([
                    'error' => "STOCK_FAILURE: Stock insuffisant pour {$product->name} (Restant: {$product->stock})."
                ]);
            }

            $isExclusive = $item['is_exclusive'] ?? false;

            if ($isExclusive) {
                $creditsNeeded += ($item['wt_price'] ?? 0) * $qty;
            } else {
                $fiatTotal += ($item['price'] ?? 0) * $qty;
            }
        }

        // ----------------------------------------------------------------
        // ÉTAPE 2 : VÉRIFICATION WT SUFFISANTS
        // ----------------------------------------------------------------
        if ($creditsNeeded > $user->points) {
            $missing = $creditsNeeded - $user->points;
            return back()->withErrors([
                'error' => "INSUFFICIENT_FUNDS: Il vous manque {$missing} WT pour cet achat exclusif."
            ]);
        }

        // ----------------------------------------------------------------
        // ÉTAPE 3 : CALCUL CASHBACK ← CORRECTION ICI
        // Règle : commande fiat ≥ 250€ → floor(total × 15%) WT gagnés
        // ----------------------------------------------------------------
        $pointsToEarn = ($fiatTotal >= 250) ? (int) floor($fiatTotal * 0.15) : 0;

        // ----------------------------------------------------------------
        // ÉTAPE 4 : TRANSACTION DB
        // ----------------------------------------------------------------
        try {
            $order = DB::transaction(function () use (
                $request,
                $user,
                $cart,
                $fiatTotal,
                $creditsNeeded,
                $pointsToEarn
            ) {
                // Débit WT si achat exclusif
                if ($creditsNeeded > 0) {
                    $user->decrement('points', $creditsNeeded);
                }

                // Création commande
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

                // Création des items + décrémentation stock
                foreach ($cart as $cartId => $item) {
                    $realProductId = explode('-', $cartId)[0];
                    $isExclusive   = $item['is_exclusive'] ?? false;
                    $qty           = $item['quantity'] ?? 1;

                    $product = Product::find($realProductId);
                    $product->decrement('stock', $qty);

                    OrderItem::create([
                        'order_id'   => $newOrder->id,
                        'product_id' => $realProductId,
                        'quantity'   => $qty,
                        'price'      => $isExclusive ? 0 : ($item['price'] ?? 0),
                        'attributes' => [
                            'size'         => $item['variant'] ?? 'Unique',
                            'type'         => $isExclusive ? 'VAULT_ITEM' : 'STANDARD_ITEM',
                            'wt_cost'      => $isExclusive ? ($item['wt_price'] ?? 0) : 0,
                            'cashback_pct' => (!$isExclusive && $fiatTotal >= 250) ? 15 : 0,
                        ],
                    ]);
                }

                return $newOrder;
            });

            // ----------------------------------------------------------------
            // ÉTAPE 5A : COMMANDE 100% WT → Succès direct + crédit cashback
            // ----------------------------------------------------------------
            if ($fiatTotal <= 0) {
                // Pas de cashback sur les achats exclusifs WT
                session()->forget('cart');
                return redirect()->route('checkout.success', $order->order_number);
            }

            // ----------------------------------------------------------------
            // ÉTAPE 5B : COMMANDE FIAT → Redirection Stripe
            // ----------------------------------------------------------------
            Stripe::setApiKey(config('services.stripe.secret'));

            $lineItems = [];

            // Description enrichie avec info cashback
            $cashbackInfo = $pointsToEarn > 0
                ? " | +{$pointsToEarn} WT Cashback"
                : " | Commande < 250€ - Pas de cashback";

            $lineItems[] = [
                'price_data' => [
                    'currency'     => 'eur',
                    'product_data' => [
                        'name'        => "Commande #" . $order->order_number,
                        'description' => "Paiement standard Weva{$cashbackInfo}",
                    ],
                    'unit_amount'  => (int) round($fiatTotal * 100),
                ],
                'quantity' => 1,
            ];

            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'line_items'           => $lineItems,
                'mode'                 => 'payment',
                'success_url'          => route('checkout.success', $order->order_number),
                'cancel_url'           => route('checkout'),
                'customer_email'       => $user->email,
                'metadata'             => [
                    'order_number' => $order->order_number,
                    'points_to_earn' => $pointsToEarn,
                ],
            ]);

            return Inertia::location($checkoutSession->url);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'CRITICAL_FAILURE: ' . $e->getMessage()]);
        }
    }

    // ----------------------------------------------------------------
    // SUCCESS : Appelé après retour Stripe
    // ----------------------------------------------------------------
    public function success($order_number)
    {
        $order = Order::where('order_number', $order_number)->firstOrFail();

        // Idempotent : on ne crédite qu'UNE seule fois
        if ($order->status === 'pending_payment') {

            $order->update(['status' => 'paid']);

            // Crédit Weva Tokens cashback (seulement si commande fiat ≥ 250€)
            if ($order->user_id && $order->points_earned > 0) {
                User::find($order->user_id)->increment('points', $order->points_earned);
            }

            session()->forget('cart');
        }

        return Inertia::render('Shop/success', [
            'order'         => $order->load('items.product'),
            'tokensEarned'  => $order->points_earned,  // Pour afficher "Tu as gagné X WT !"
            'tokensUsed'    => $order->points_used,
        ]);
    }
}
