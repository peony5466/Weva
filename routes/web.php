<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
/*
|--------------------------------------------------------------------------
| 1. ROUTES PUBLIQUES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Boutique
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
// ici page detail des produits
Route::get('/shop/{product:slug}', [ShopController::class, 'show'])->name('shop.show');

// Page Token publique
Route::get('/token', function () {
    return Inertia::render('client/token');
})->name('token.public');

Route::get('/checkout', function () {
    return inertia('checkout/index');
})->name('checkout');

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
// La route ci-dessous accepte le GET et résout ton erreur
Route::get('/checkout/payment/{order}', [OrderController::class, 'showPayment'])->name('checkout.payment');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::patch('/cart/{key}', [CartController::class, 'update'])->name('cart.update');



Route::get('/checkout/success/{order_number}', [OrderController::class, 'success'])->name('checkout.success');


/*
|--------------------------------------------------------------------------
| 2. ROUTES PROTÉGÉES 
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    // 1. Si pas connecté -> vers le login
    if (!Auth::check()) {
        return redirect()->route('login');
    }

    // 2. Si Admin -> vers le dashboard admin
    if (Auth::user()->role === 'admin') {
        return Inertia::render('dashboard');
    }

    // 3. Si Client -> redirection directe vers la VIP Area
    return redirect()->route('wevavip');
})->name('dashboard');


Route::middleware(['auth', 'verified'])->group(function () {

    // Dispatcher de Dashboard
    Route::middleware(['role:client'])->group(function () {
        Route::get('/dashboard/wevavip', function () {
            $user = Auth::user();

            // On récupère les 5 dernières commandes du client
            $orders = \App\Models\Order::where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get();

            return Inertia::render('client/wevavip', [
                'orders' => $orders,
                'userPoints' => $user->points
            ]);
        })->name('wevavip');
    });

    /* --- ZONE ADMIN --- */
    Route::middleware(['role:admin'])->prefix('dashboard/admin')->name('admin.')->group(function () {

        // Gestion des Produits 
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        // Gestion des Catégories 
        Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        // Gestion des Utilisateurs
        Route::get('/users', [MemberController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/ban', [MemberController::class, 'toggleBan'])->name('users.ban');
        Route::get('/users/create', [MemberController::class, 'create'])->name('users.create');
        Route::post('/users', [MemberController::class, 'store'])->name('users.store');
        Route::delete('/users/{user}', [MemberController::class, 'destroy'])->name('users.destroy');


        // Dans ton groupe de routes Admin
        Route::get('/orders', function () {
            return Inertia::render('admin/orders/index', [
                'orders' => \App\Models\Order::with('user')
                    ->latest()
                    ->get()
                    ->map(function ($order) {
                        return [
                            'id' => $order->order_number,
                            'customer' => $order->user ? $order->user->name : 'Guest',
                            'email' => $order->email,
                            'item' => 'Order Batch', // Ou une logique pour lister les items
                            'price' => $order->total . ' €',
                            'type' => $order->points_used > 0 ? 'Hybrid' : 'Fiat',
                            'status' => ucfirst($order->status),
                            'date' => $order->created_at->format('Y-m-d'),
                            'real_id' => $order->id // Pour le lien détail
                        ];
                    })
            ]);
        })->name('orders.index');
    });
});

/* --- ZONE CLIENT --- */
Route::middleware(['auth', 'verified', 'role:client'])->group(function () {

    // 1. LA SEULE ET UNIQUE ROUTE WEVAVIP (AVEC LES DONNÉES)
    Route::get('/dashboard/wevavip', function () {
        $user = Auth::user();

        $orders = \App\Models\Order::where('user_id', $user->id)
            ->where('status', 'paid') // Optionnel: ne montrer que les payées
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('client/wevavip', [
            'orders' => $orders,
            'userPoints' => $user->points
        ]);
    })->name('wevavip');

    // 2. TES AUTRES ROUTES CLIENT
    Route::get('/dashboard/tokens', function () {
        return Inertia::render('client/mytoken', [
            'userPoints' => Auth::user()->points,
            'orders' => \App\Models\Order::where('user_id', Auth::id())->latest()->take(10)->get()
        ]);
    })->name('tokens.my-wallet');

    Route::get('/dashboard/personalize', function () {
        return Inertia::render('client/customizer');
    })->name('avatar.customize');

    Route::get('/dashboard/orders', function () {
        return Inertia::render('client/orders/index', [
            'orders' => \App\Models\Order::where('user_id', Auth::id())
                ->with('items.product') // Pour voir le nom des produits
                ->latest()
                ->get()
        ]);
    })->name('client.orders');

    // Route::get('/dashboard/orders/{order}', function (\App\Models\Order $order) {
    //     // Sécurité : Vérifier que la commande appartient bien à l'utilisateur
    //     if ($order->user_id !== Auth::id()) {
    //         abort(403);
    //     }


});
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard/orders/{order}', function (\App\Models\Order $order) {
        // LOGIQUE DE SÉCURITÉ :
        // Si l'utilisateur n'est PAS admin ET que la commande ne lui appartient pas -> 403
        if (Auth::user()->role !== 'admin' && $order->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('client/orders/show', [
            'order' => $order->load(['items.product', 'user']) // 'user' pour voir qui a acheté
        ]);
    })->name('client.orders.show');
});

/*
|--------------------------------------------------------------------------
| 3. AUTHENTIFICATION
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
