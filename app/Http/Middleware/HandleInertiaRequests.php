<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $cart      = session()->get('cart', []);
        $cartTotal = collect($cart)->reduce(
            fn($total, $item) => $total + ($item['price'] * $item['quantity']),
            0
        );

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id'     => $request->user()->id,
                    'name'   => $request->user()->name,
                    'email'  => $request->user()->email,
                    'role'   => $request->user()->role,
                    'points' => $request->user()->points,
                ] : null,
            ],
            'cart'      => $cart,
            'cartCount' => count($cart),
            'cartTotal' => $cartTotal,
            'flash'     => [
                'success' => session('success'),
                'error'   => session('error'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->fullUrl(),
            ],
        ]);
    }
}