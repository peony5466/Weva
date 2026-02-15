<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // 1. On récupère le panier en premier pour pouvoir calculer le total
        $cart = session()->get('cart', []);

        // 2. On calcule le total
        $cartTotal = collect($cart)->reduce(function ($total, $item) {
            return $total + ($item['price'] * $item['quantity']);
        }, 0);

        // 3. On retourne tout en une seule fois
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'points' => $request->user()->points,
                ] : null,
            ],
            'cart' => $cart,
            'cartCount' => count($cart),
            'cartTotal' => $cartTotal,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ]);
    }
}
