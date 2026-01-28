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
})->name('token');


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
        return Inertia::render('client/index');
    })->name('dashboard');

    // --- ZONE ADMIN ---
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        // Tes futures routes admin...
    });

    // --- ZONE CLIENT ---
    Route::middleware(['role:client'])->group(function () {

        // L'avatar est bien "sous" le dashboard logiquement
        Route::get('/dashboard/avatar', function () {
            return Inertia::render('client/avatar');
        })->name('avatar');
    });

    Route::get('/tokens', function () {
        return Inertia::render('client/mytoken');
    })->name('token');
});

/*
|--------------------------------------------------------------------------
| 3. AUTHENTIFICATION & PARAMÈTRES
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
