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
    public function store(Request $request)
    {
        // Validation basique pour s'assurer que la quantité est au moins de 1
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = session()->get('cart', []);

        // On récupère la quantité envoyée par le formulaire (par défaut 1 si absent)
        $quantityToAdd = (int) $request->input('quantity', 1);

        // Clé unique par produit + variante pour ne pas mélanger les tailles/couleurs
        $cartKey = $product->id . ($request->variant_id ? '-' . $request->variant_id : '');

        if (isset($cart[$cartKey])) {
            // On ajoute la nouvelle quantité à l'existante
            $cart[$cartKey]['quantity'] += $quantityToAdd;
        } else {
            // On crée une nouvelle entrée
            $cart[$cartKey] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $quantityToAdd,
                'image' => $product->image_path,
                'variant' => $request->variant_name,
            ];
        }

        session()->put('cart', $cart);

        return back()->with('success', $quantityToAdd . ' article(s) ajouté(s) au panier.');
    }

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
}
