<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // On récupère l'utilisateur s'il est connecté, sinon null
        // dd([
        //     'user_id_auth' => auth()->id(),
        //     'all_request_data' => $request->all()
        // ]);

        $user = $request->user();
        $cart = session()->get('cart', []);

        if (empty($cart)) return back()->with('error', 'Panier vide');

        $subtotal = collect($cart)->sum(fn($item) => $item['price'] * $item['quantity']);

        // Cashback : Seulement si l'utilisateur est connecté ET veut utiliser ses points
        $pointsUsed = ($user && $request->boolean('use_points')) ? $user->points : 0;
        $discount = $pointsUsed / 100;
        $total = max(0, $subtotal - $discount);

        return DB::transaction(function () use ($request, $user, $cart, $subtotal, $discount, $total, $pointsUsed) {

            // ... à l'intérieur de ton DB::transaction(function () use (...) {

            $order = Order::create([
                'user_id' => $user ? $user->id : null,
                'order_number' => 'CMD-' . strtoupper(str()->random(8)),
                'subtotal' => $subtotal,
                'discount' => $discount,
                'total' => $total,
                'points_used' => $pointsUsed,
                'points_earned' => $user ? floor($total) : 0,
                'status' => 'pending',
                'shipping_address' => $request->address,
                'email' => $user ? $user->email : $request->email,
            ]);

            // --- ÉTAPE 2 : INSERTION DES ARTICLES ---
            foreach ($cart as $cartId => $item) {
                // Si $cartId est "3-2", on récupère juste le "3"
                $realProductId = explode('-', $cartId)[0];

                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $realProductId, // On envoie uniquement l'ID numérique
                    'quantity'   => $item['quantity'],
                    'price'      => $item['price'],
                    'attributes' => [
                        'size' => $item['size'] ?? 'Unique',
                        // On peut aussi stocker l'ID de la variante ici si besoin
                    ],
                ]);

                // Mise à jour du stock
                if (isset($item['size'])) {
                    \App\Models\ProductVariant::where('product_id', $realProductId)
                        ->where('size', $item['size'])
                        ->decrement('stock', $item['quantity']);
                }
            }

            // --- ÉTAPE 3 : NETTOYAGE ET REDIRECTION ---
            session()->forget('cart');

            // On redirige vers une route de succès que nous allons créer
            return redirect()->route('checkout.success', $order->order_number);
            // });
            // ... suite de la logique (Stripe + OrderItems)
        });
    }

    public function success($order_number)
    {
        $order = Order::where('order_number', $order_number)
            ->with('items.product') // On charge les produits pour avoir les images et noms
            ->firstOrFail();

        return \Inertia\Inertia::render('Shop/success', [
            'order' => $order
        ]);
    }
}
