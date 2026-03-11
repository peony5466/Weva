<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::query()
                ->with(['category', 'variants'])
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/CreateProduct', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validation étendue
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'nullable|numeric',
            'wt_price' => 'nullable|integer',
            'is_exclusive' => 'boolean',
            'is_limited' => 'boolean',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'variants' => 'required|array',
            'variants.*.size' => 'required|string',
            'variants.*.stock' => 'required|integer',
        ]);

        // 2. Logique métier : Exclusif WT vs Standard Fiat
        $isExclusive = $request->is_exclusive;

        $productData = [
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'is_limited' => $request->is_limited ? 1 : 0,
            'is_exclusive' => $isExclusive ? 1 : 0,
            // Si exclusif, prix cash = 0. Sinon, prix WT = 0.
            'price' => $isExclusive ? 0 : ($validated['price'] ?? 0),
            'wt_price' => $isExclusive ? ($validated['wt_price'] ?? 0) : 0,
            'image_path' => $request->file('image') ? $request->file('image')->store('products', 'public') : null,
        ];

        $product = Product::create($productData);

        // 3. Variantes
        foreach ($validated['variants'] as $variant) {
            $product->variants()->create([
                'size' => $variant['size'],
                'stock' => $variant['stock'],
                'sku' => strtoupper(Str::slug($product->name)) . '-' . $variant['size'] . '-' . Str::random(4),
            ]);
        }

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => $product->load('variants'),
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $allData = $request->all();

        // Fix pour les variants envoyés en JSON string via FormData
        if (isset($allData['variants']) && is_string($allData['variants'])) {
            $allData['variants'] = json_decode($allData['variants'], true);
        }

        $validated = Validator::make($allData, [
            'name' => 'required|string|max:255',
            'price' => 'nullable|numeric',
            'wt_price' => 'nullable|integer',
            'is_exclusive' => 'boolean',
            'category_id' => 'required',
            'variants' => 'required|array|min:1',
            'variants.*.size' => 'required|string',
            'variants.*.stock' => 'required|integer|min:0',
        ])->validate();

        $isExclusive = $request->is_exclusive == true || $request->is_exclusive == 1;

        $product->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $request->description,
            'category_id' => $validated['category_id'],
            'is_limited' => ($request->is_limited == true || $request->is_limited == 1) ? 1 : 0,
            'is_exclusive' => $isExclusive ? 1 : 0,
            'price' => $isExclusive ? 0 : ($validated['price'] ?? 0),
            'wt_price' => $isExclusive ? ($validated['wt_price'] ?? 0) : 0,
        ]);

        if ($request->hasFile('image')) {
            if ($product->image_path) Storage::disk('public')->delete($product->image_path);
            $product->update(['image_path' => $request->file('image')->store('products', 'public')]);
        }

        // Sync variants
        $product->variants()->delete();
        foreach ($validated['variants'] as $v) {
            $product->variants()->create([
                'size'  => $v['size'],
                'stock' => $v['stock'],
                'sku'   => strtoupper(Str::slug($product->name)) . '-' . strtoupper($v['size']) . '-' . Str::random(4),
            ]);
        }

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        \DB::statement('PRAGMA foreign_keys = OFF');

        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        $product->delete();

        \DB::statement('PRAGMA foreign_keys = ON');

        return redirect()->route('admin.products.index');
    }
}
