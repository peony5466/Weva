<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\TokenController;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Product;

/*
|--------------------------------------------------------------------------
| 1. ROUTES PUBLIQUES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $featuredProducts = Product::with(['variants', 'category'])
        ->where('is_active', true)
        ->latest()
        ->take(8)
        ->get();

    return Inertia::render('welcome', [
        'featuredProducts' => $featuredProducts,
    ]);
})->name('home');

Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/{product:slug}', [ShopController::class, 'show'])->name('shop.show');

Route::get('/client/token', function () {
    return Inertia::render('client/token');
})->name('token.public');

Route::get('/checkout', function () {
    $cart  = session()->get('cart', []);
    $total = collect($cart)->sum(fn($item) => $item['price'] * $item['quantity']);
    return Inertia::render('checkout/index', [
        'cartTotal' => $total,
    ]);
})->name('checkout');

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/checkout/success/{order_number}', [OrderController::class, 'success'])->name('checkout.success');

Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::patch('/cart/{key}', [CartController::class, 'update'])->name('cart.update');
Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

// Pages légales
Route::get('/cgv', fn() => Inertia::render('legal/cgv'))->name('cgv');
Route::get('/confidentialite', fn() => Inertia::render('legal/confidentialite'))->name('confidentialite');
Route::get('/legal', fn() => Inertia::render('legal/mentions-legales'))->name('legal');

/*
|--------------------------------------------------------------------------
| 2. ROUTES PROTÉGÉES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        if (Auth::user()->role === 'admin') {
            return Inertia::render('dashboard');
        }
        return redirect()->route('wevavip');
    })->name('dashboard');

    /* --- ZONE ADMIN --- */
    Route::middleware(['role:admin'])->prefix('dashboard/admin')->name('admin.')->group(function () {

        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        Route::get('/users', [MemberController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/ban', [MemberController::class, 'toggleBan'])->name('users.ban');
        Route::get('/users/create', [MemberController::class, 'create'])->name('users.create');
        Route::post('/users', [MemberController::class, 'store'])->name('users.store');
        Route::delete('/users/{user}', [MemberController::class, 'destroy'])->name('users.destroy');

        Route::get('/orders', fn() => Inertia::render('admin/orders/index'))->name('orders.index');
    });

    /* --- ZONE CLIENT --- */
    Route::middleware(['role:client'])->group(function () {

        Route::get('/dashboard/wevavip', function () {
            $user         = auth()->user();
            $tokenService = new \App\Services\TokenService();
            $progress     = $tokenService->getProgress($user);
            $recentOrders = Order::where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get();
            return Inertia::render('client/wevavip', [
                'progress'     => $progress,
                'recentOrders' => $recentOrders,
            ]);
        })->name('wevavip');

        Route::get('/dashboard/tokens', [TokenController::class, 'wallet'])->name('tokens.my-wallet');

        Route::get('/dashboard/orders', function () {
            $orders = Order::where('user_id', auth()->id())
                ->latest()
                ->get();
            return Inertia::render('client/orders/index', [
                'orders' => $orders,
            ]);
        })->name('client.orders');
    });
});

Route::get('/dashboard/personalize', fn() => Inertia::render('client/customizer'))->name('avatar.customize');

/*
|--------------------------------------------------------------------------
| 3. AUTHENTIFICATION
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';