<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

// Ta page Token reste publique ici
Route::get('/token', function () {
    return Inertia::render('client/token');
})->name('token.public');



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
        Route::get('/inventory', function () {
            return Inertia::render('admin/products/index');
        })->name('admin.products.index');

        Route::get('/categories', function () {
            return Inertia::render('admin/categories/index');
        })->name('admin.categories.index');

        Route::get('/users', function () {
            return Inertia::render('admin/users/index');
        })->name('admin.users.index');

        Route::get('/orders', function () {
            return Inertia::render('admin/orders/index');
        })->name('admin.orders.index');
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
