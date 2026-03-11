<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Models\Category;
use App\Models\Product;
/*
|--------------------------------------------------------------------------
| 1. ROUTES PUBLIQUES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'products'   => \App\Models\Product::with('category')
            ->when(
                request('category'),
                fn($q) =>
                $q->whereHas(
                    'category',
                    fn($q) =>
                    $q->where('slug', request('category'))
                )
            )
            ->latest()->get(),
        'categories' => \App\Models\Category::all(),
    ]);
})->name('welcome');

// Boutique & Détails Produits
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/{product:slug}', [ShopController::class, 'show'])->name('shop.show');

// Page Token publique
Route::get('/token', function () {
    return Inertia::render('client/token');
})->name('token.public');

// Panier (Public pour pouvoir ajouter des items sans être connecté)
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::patch('/cart/{key}', [CartController::class, 'update'])->name('cart.update');
Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

/*
|--------------------------------------------------------------------------
| 2. DISPATCHER DASHBOARD
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    if (!Auth::check()) return redirect()->route('login');

    if (Auth::user()->role === 'admin') {
        return Inertia::render('dashboard');
    }
    return redirect()->route('wevavip');
})->name('dashboard');

/*
|--------------------------------------------------------------------------
| 3. ROUTES PROTÉGÉES (AUTH REQUIS)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /* --- TUNNEL D'ACHAT (Sécurisé) --- */
    Route::get('/checkout', function () {
        return Inertia::render('checkout/index');
    })->name('checkout');

    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/checkout/success/{order_number}', [OrderController::class, 'success'])->name('checkout.success');
    Route::get('/checkout/payment/{order}', [OrderController::class, 'showPayment'])->name('checkout.payment');

    /* --- ZONE COMMUNE (Admin + Client) --- */
    Route::get('/dashboard/orders/{order}', function (\App\Models\Order $order) {
        if (Auth::user()->role !== 'admin' && $order->user_id !== Auth::id()) {
            abort(403);
        }
        return Inertia::render('client/orders/show', [
            'order' => $order->load(['items.product', 'user'])
        ]);
    })->name('client.orders.show');

    /* --- ZONE CLIENT EXCLUSIVE --- */
    Route::middleware(['role:client'])->group(function () {

        Route::get('/dashboard/wevavip', function () {
            $user = Auth::user();
            $orders = \App\Models\Order::where('user_id', $user->id)->latest()->take(5)->get();
            return Inertia::render('client/wevavip', [
                'orders' => $orders,
                'userPoints' => $user->points
            ]);
        })->name('wevavip');

        Route::get('/dashboard/tokens', function () {
            return Inertia::render('client/mytoken', [
                'userPoints' => Auth::user()->points,
                'orders' => \App\Models\Order::where('user_id', Auth::id())->latest()->take(10)->get()
            ]);
        })->name('tokens.my-wallet');

        Route::get('/dashboard/personalize', function () {
            return Inertia::render('client/customizer');
        })->name('avatar.customize');

        Route::get('/dashboard/orders-list', function () {
            return Inertia::render('client/orders/index', [
                'orders' => \App\Models\Order::where('user_id', Auth::id())->with('items.product')->latest()->get()
            ]);
        })->name('client.orders');
    });

    /* --- ZONE ADMIN EXCLUSIVE --- */
    Route::middleware(['role:admin'])->prefix('dashboard/admin')->name('admin.')->group(function () {

        // Produits
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        // Catégories
        Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        // Utilisateurs
        Route::get('/users', [MemberController::class, 'index'])->name('users.index');
        Route::get('/users/create', [MemberController::class, 'create'])->name('users.create');
        Route::post('/users', [MemberController::class, 'store'])->name('users.store');
        Route::patch('/users/{user}/ban', [MemberController::class, 'toggleBan'])->name('users.ban');
        Route::delete('/users/{user}', [MemberController::class, 'destroy'])->name('users.destroy');

        // Commandes Admin
        Route::get('/orders', function () {
            return Inertia::render('admin/orders/index', [
                'orders' => \App\Models\Order::with('user')->latest()->get()->map(fn($o) => [
                    'id' => $o->order_number,
                    'customer' => $o->user ? $o->user->name : 'Guest',
                    'email' => $o->email,
                    'price' => $o->total . ' €',
                    'type' => $o->points_used > 0 ? 'Hybrid' : 'Fiat',
                    'status' => ucfirst($o->status),
                    'date' => $o->created_at->format('Y-m-d'),
                    'real_id' => $o->id
                ])
            ]);
        })->name('orders.index');
    });
});

/* --- AUTHENTIFICATION --- */
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
