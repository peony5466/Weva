<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::with('variants')->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validation des données
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'variants' => 'required|array|min:1',
            'variants.*.size' => 'required|string',
            'variants.*.stock' => 'required|integer|min:0',
        ]);

        // 2. Création du produit
        $product = Product::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
            'price' => $validated['price'],
        ]);


        foreach ($validated['variants'] as $variant) {
            $product->variants()->create([
                'size' => $variant['size'],
                'stock' => $variant['stock'],
                'sku' => strtoupper(Str::random(8)),
            ]);
        }

        return redirect()->route('admin.products.index');
    }

    public function create()
    {
        return Inertia::render('admin/CreateProduct');
    }

    public function destroy(Product $product)
    {

        $product->delete();


        return redirect()->route('admin.products.index')->with('success', 'ASSET_DELETED');
    }
}
