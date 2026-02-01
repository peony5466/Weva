<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
/*
|--------------------------------------------------------------------------
| 1. ROUTES PUBLIQUES (Accessibles à tous)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/shop', function () {
    return Inertia::render('shop/index');
})->name('shop');

// page Token publique ici
Route::get('/token', function () {
    return Inertia::render('client/token');
})->name('token.public');

Route::get('/product', [ShopController::class, 'index'])->name('shop.index');
Route::get('/product/{slug}', [ShopController::class, 'show'])->name('shop.show');



/*
|--------------------------------------------------------------------------
| 2. ROUTES PROTÉGÉES (Connexion requise)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // Redirection automatique selon le rôle
    Route::get('/dashboard', function () {
        if (Auth::user()->role === 'admin') {
            return Inertia::render('dashboard');
        }
        // Pour le client, on affiche ton dashboard personnalisé
        return Inertia::render('client/wevavip');
    })->name('dashboard');

    // --- ZONE ADMIN ---
    Route::middleware(['role:admin'])->prefix('dashboard')->group(function () {
        // Tes futures routes admin...
        Route::get('/inventory', [ProductController::class, 'index'])->name('admin.products.index');

        Route::get('/categories', function () {
            return Inertia::render('admin/categories/index');
        })->name('admin.categories.index');

        Route::get('/users', function () {
            return Inertia::render('admin/users/index');
        })->name('admin.users.index');

        Route::get('/orders', function () {
            return Inertia::render('admin/orders/index');
        })->name('admin.orders.index');

        Route::post('/admin/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/admin/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::delete('/admin/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    });

    // --- ZONE CLIENT ---
    Route::middleware(['role:client'])->group(function () {

        // L'avatar est bien "sous" le dashboard logiquement
        Route::get('/dashboard/wevavip', function () {
            return Inertia::render('client/wevavip');
        })->name('wevavip');

        //page es token
        Route::get('/dashboard/tokens', function () {
            return Inertia::render('client/mytoken');
        })->name('tokens.my-wallet');
    });

    Route::get('/dashboard/personalize', function () {
        return Inertia::render('client/customizer');
    })->name('avatar.customize');
});

/*
|--------------------------------------------------------------------------
| 3. AUTHENTIFICATION & PARAMÈTRES
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
