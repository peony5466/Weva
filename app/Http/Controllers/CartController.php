<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product       = Product::findOrFail($request->product_id);
        $cart          = session()->get('cart', []);
        $quantityToAdd = (int) $request->input('quantity', 1);
        $cartKey       = $product->id . ($request->variant_id ? '-' . $request->variant_id : '');

        if (isset($cart[$cartKey])) {
            $cart[$cartKey]['quantity'] += $quantityToAdd;
        } else {
            $cart[$cartKey] = [
                'id'       => $product->id,
                'name'     => $product->name,
                'price'    => $product->price,
                'quantity' => $quantityToAdd,
                'image'    => $product->image_path,
                'variant'  => $request->variant_name,
                'size'     => $request->variant_name,
                'stock'    => 99,
            ];
        }

        session()->put('cart', $cart);
        return back()->with('success', $quantityToAdd . ' article(s) ajouté(s).');
    }

    public function update(Request $request, $key)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$key])) {
            $newQty = (int) $request->input('quantity');
            if ($newQty > 0) {
                $cart[$key]['quantity'] = $newQty;
            } else {
                unset($cart[$key]);
            }
            session()->put('cart', $cart);
        }

        return back();
    }

    public function destroy($key)
    {
        $cart = session()->get('cart', []);
        if (isset($cart[$key])) {
            unset($cart[$key]);
            session()->put('cart', $cart);
        }
        return back()->with('info', 'Article retiré.');
    }

    public function clear()
    {
        session()->forget('cart');
        return back()->with('success', 'Panier vidé.');
    }
}
