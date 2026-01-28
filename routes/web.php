<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| 1. ROUTES PUBLIQUES (Accessibles par tous)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/shop', function () {
    return Inertia::render('shop/index');
})->name('shop');

Route::get('/client/token', function () {
    return Inertia::render('client/token');
})->name('token');


/*
|--------------------------------------------------------------------------
| 2. ROUTES PROTÉGÉES (Utilisateurs connectés uniquement)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // --- ZONE ADMIN ---
    // Seuls les utilisateurs avec role === 'admin' entrent ici
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        // Ajoute ici tes autres routes d'administration (ex: gestion users, etc.)
    });

    // --- ZONE CLIENT ---
    // Seuls les utilisateurs avec role === 'client' entrent ici
    Route::middleware(['role:client'])->group(function () {
        Route::get('/avatar', function () {
            return Inertia::render('client/avatar');
        })->name('avatar');

        // Ajoute ici tes autres routes client (ex: historique tokens, etc.)
    });
});

/*
|--------------------------------------------------------------------------
| 3. AUTHENTIFICATION & PARAMÈTRES (Généré par Laravel)
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
