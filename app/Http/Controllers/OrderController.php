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
        $cart = session()->get('cart', []);

        if (empty($cart)) return back()->withErrors(['error' => 'Panier vide']);

        // 1. CALCULS DES POINTS ET MONTANTS
        $subtotal = collect($cart)->sum(fn($item) => $item['price'] * $item['quantity']);

        // On vérifie si l'utilisateur veut utiliser ses points
        $pointsUsed = ($user && $request->boolean('use_points')) ? $user->points : 0;
        $discount = $pointsUsed / 100; // 100 points = 1€

        $total = max(0, $subtotal - $discount);

        // On gagne 1 point par euro dépensé (sur le total final)
        $pointsToEarn = floor($total);

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $order = DB::transaction(function () use ($request, $user, $cart, $subtotal, $total, $discount, $pointsUsed, $pointsToEarn) {

                // 2. CRÉATION DE LA COMMANDE
                $newOrder = Order::create([
                    'user_id'          => $user?->id,
                    'order_number'     => 'CMD-' . strtoupper(str()->random(8)),
                    'subtotal'         => $subtotal,
                    'discount'         => $discount,
                    'total'            => $total,
                    'points_used'      => $pointsUsed,   // Enregistrement des points consommés
                    'points_earned'    => $pointsToEarn, // Enregistrement des points à gagner
                    'status'           => 'pending_payment',
                    'shipping_address' => $request->address,
                    'email'            => $user ? $user->email : $request->email,
                ]);

                // 3. DÉBIT DES POINTS (On les retire du compte User immédiatement)
                if ($user && $pointsUsed > 0) {
                    $user->decrement('points', $pointsUsed);
                }

                foreach ($cart as $cartId => $item) {
                    $realProductId = explode('-', $cartId)[0];
                    OrderItem::create([
                        'order_id'   => $newOrder->id,
                        'product_id' => $realProductId,
                        'quantity'   => $item['quantity'],
                        'price'      => $item['price'],
                        'attributes' => ['size' => $item['size'] ?? 'Unique'],
                    ]);
                }

                return $newOrder;
            });

            // 4. SESSION STRIPE
            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => ['name' => "Commande #" . $order->order_number],
                        'unit_amount' => (int) round($total * 100),
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('checkout.success', $order->order_number),
                'cancel_url' => route('checkout'),
                'customer_email' => $user ? $user->email : $request->email,
            ]);

            $order->update(['stripe_payment_intent_id' => $checkoutSession->id]);

            return Inertia::location($checkoutSession->url);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function success($order_number)
    {
        $order = Order::where('order_number', $order_number)->firstOrFail();

        // 5. CRÉDIT DES POINTS AU RETOUR DE STRIPE
        if ($order->status === 'pending_payment') {

            // On valide le paiement
            $order->update(['status' => 'paid']);

            // On ajoute les points gagnés au compte de l'utilisateur
            if ($order->user_id && $order->points_earned > 0) {
                $user = User::find($order->user_id);
                $user->increment('points', $order->points_earned);
            }

            session()->forget('cart');
        }

        return Inertia::render('Shop/success', [
            'order' => $order->load('items.product')
        ]);
    }
}
