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
            'variant_id' => 'nullable|exists:product_variants,id',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = session()->get('cart', []);

        $quantityToAdd = (int) $request->input('quantity', 1);

        if ($request->variant_id) {
            $variant = \App\Models\ProductVariant::find($request->variant_id);
            $cartKey = $product->id.'-v'.$request->variant_id;
            $variantName = $variant?->size ?? 'Unique';
            $variantStock = $variant?->stock ?? 0;
        } else {
            $cartKey = $product->id;
            $variantName = 'Unique';
            $variantStock = $product->variants()->sum('stock');
        }

        if (isset($cart[$cartKey])) {
            $cart[$cartKey]['quantity'] += $quantityToAdd;
        } else {
            $cart[$cartKey] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'wt_price' => $product->wt_price,
                'is_exclusive' => (bool) $product->is_exclusive,
                'quantity' => $quantityToAdd,
                'image' => $product->image_path,
                'variant_id' => $request->variant_id ?? null,
                'variant' => $variantName,
                'stock' => $variantStock,
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
