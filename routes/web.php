<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Auth;

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
Route::get('/shop/{product:slug}', [ShopController::class, 'show'])->name('shop.show');

// Détail produit
Route::get('/product/{id}', function ($id) {
    return Inertia::render('ProductDetail', [
        'id' => $id,
    ]);
})->name('product.detail');

// Page Token publique
Route::get('/client/token', function () {
    return Inertia::render('client/token');
})->name('token.public');

// Checkout
Route::get('/checkout', function () {
    return Inertia::render('checkout/index');
})->name('checkout');
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

// Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::patch('/cart/{key}', [CartController::class, 'update'])->name('cart.update');

// Checkout success
Route::get('/checkout/success/{order_number}', [OrderController::class, 'success'])->name('checkout.success');


/*
|--------------------------------------------------------------------------
| 2. ROUTES PROTÉGÉES (Connexion requise)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard dispatcher
    Route::get('/dashboard', function () {
        if (Auth::user()->role === 'admin') {
            return Inertia::render('dashboard');
        }
        return redirect()->route('wevavip');
    })->name('dashboard');

    /* --- ZONE ADMIN --- */
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
        Route::patch('/users/{user}/ban', [MemberController::class, 'toggleBan'])->name('users.ban');
        Route::get('/users/create', [MemberController::class, 'create'])->name('users.create');
        Route::post('/users', [MemberController::class, 'store'])->name('users.store');
        Route::delete('/users/{user}', [MemberController::class, 'destroy'])->name('users.destroy');

        // Commandes admin
        Route::get('/orders', function () {
            return Inertia::render('admin/orders/index');
        })->name('orders.index');
    });
});

/* --- ZONE CLIENT --- */
Route::middleware(['role:client'])->group(function () {

    Route::get('/dashboard/wevavip', function () {
        return Inertia::render('client/wevavip');
    })->name('wevavip');

    Route::get('/dashboard/tokens', function () {
        return Inertia::render('client/mytoken');
    })->name('tokens.my-wallet');
});

// Customizer
Route::get('/dashboard/personalize', function () {
    return Inertia::render('client/customizer');
})->name('avatar.customize');

/*
|--------------------------------------------------------------------------
| 3. AUTHENTIFICATION
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
