<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant; // Important pour le stock
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Enregistre une nouvelle commande.
     */
    public function store(Request $request)
    {
        // 1. Validation des données entrantes
        $request->validate([
            'items' => 'required|array|min:1',
            'address' => 'required|string|max:255',
            'use_points' => 'boolean',
        ]);

        $user = $request->user();

        // Logique de calcul (à sécuriser côté serveur)
        // ... (le code que je t'ai donné précédemment) ...

        return DB::transaction(function () use ($request, $user) {
            // Création de la commande, des items, gestion des points...
            // C'est ici que tu mets toute la logique métier.

            return redirect()->route('orders.index')
                ->with('message', 'Commande validée avec succès !');
        });
    }
}
