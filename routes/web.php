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
    return inertia('Checkout/Index'); // On créera cette page plus tard
})->name('checkout');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::patch('/cart/{key}', [CartController::class, 'update'])->name('cart.update');

/*
|--------------------------------------------------------------------------
| 2. ROUTES PROTÉGÉES 
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // Dispatcher de Dashboard
    Route::get('/dashboard', function () {
        if (Auth::user()->role === 'admin') {
            return Inertia::render('dashboard');
        }
        return redirect()->route('wevavip');
    })->name('dashboard');

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

// Customizer (Commun ou spécifique)
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
