<?php

namespace App\Http\Controllers;

// app/Http/Controllers/CartController.php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;



class CartController extends Controller
{
    /**
     * Ajouter un produit au panier avec une quantité spécifique
     */
    // ... reste du code

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = session()->get('cart', []);

        $quantityToAdd = (int) $request->input('quantity', 1);
        $cartKey = $product->id . ($request->variant_name ? '-' . $request->variant_name : '');

        if (isset($cart[$cartKey])) {
            $cart[$cartKey]['quantity'] += $quantityToAdd;
        } else {
            // AJOUT DES CLÉS EXCLUSIVES ICI
            $cart[$cartKey] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'wt_price' => $product->wt_price, // Ajouté
                'is_exclusive' => (bool)$product->is_exclusive, // Ajouté (force le format boolean)
                'quantity' => $quantityToAdd,
                'image' => $product->image_path,
                'variant' => $request->variant_name ?? 'Unique',
            ];
        }

        session()->put('cart', $cart);

        return back()->with('success', 'Asset_Synced_To_Bag');
    }

// ... reste du code

    /**
     * Mettre à jour la quantité d'un article déjà présent dans le panier
     */
    public function update(Request $request, $key)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$key])) {
            $newQty = (int) $request->input('quantity');

            if ($newQty > 0) {
                $cart[$key]['quantity'] = $newQty;
            } else {
                // Si la quantité tombe à 0, on supprime l'article
                unset($cart[$key]);
            }

            session()->put('cart', $cart);
        }

        return back();
    }

    /**
     * Supprimer un article du panier
     */
    public function destroy($key)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$key])) {
            unset($cart[$key]);
            session()->put('cart', $cart);
        }

        return back()->with('info', 'Article retiré du panier.');
    }

    public function clear()
    {
        // On vide la session 'cart'
        session()->forget('cart');

        // On redirige vers la page précédente avec un petit message de succès
        return redirect()->back()->with('success', 'Cart_Cleared_Manifest');
    }
}
