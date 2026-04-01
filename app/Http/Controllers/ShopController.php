<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->with(['category', 'variants']) // ✅ variants pour le stock
            ->when($request->input('category'), function ($query, $slug) {
                $query->whereHas('category', function ($q) use ($slug) {
                    $q->where('slug', $slug);
                });
            })
            ->latest()
            ->get()
            ->map(fn($product) => [
                'id'           => $product->id,
                'name'         => $product->name,
                'slug'         => $product->slug,
                'price'        => $product->price,
                'wt_price'     => $product->wt_price,       // ✅ explicitement inclus
                'is_exclusive' => (bool) $product->is_exclusive, // ✅ cast bool pour JS
                'is_limited'   => (bool) $product->is_limited,
                'image_path'   => $product->image_path,
                'stock'        => $product->variants->sum('stock'), // ✅ stock réel
                'category'     => $product->category,
            ]);

        return Inertia::render('shop/index', [
            'products'        => $products,
            'categories'      => Category::select('id', 'name', 'slug')->get(),
            'currentCategory' => $request->input('category'),
            'filters'         => $request->only(['category']),
        ]);
    }

    public function show($slug)
    {
        $product = Product::with(['variants', 'category'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('shop/show', [
            'product' => array_merge($product->toArray(), [
                'is_exclusive' => (bool) $product->is_exclusive, // ✅ bool aussi sur show
                'wt_price'     => $product->wt_price,
                'stock'        => $product->variants->sum('stock'),
            ])
        ]);
    }
}
