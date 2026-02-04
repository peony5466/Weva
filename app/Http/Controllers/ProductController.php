<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::query()
                ->with(['category', 'variants']) // On garde uniquement la catégorie
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->paginate(5)
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
        // 1. Validation
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'variants' => 'required|array',
            'variants.*.size' => 'required|string',
            'variants.*.stock' => 'required|integer',
        ]);

        // 2. Création du produit
        $product = Product::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category_id' => $validated['category_id'],
            'is_limited' => $request->is_limited ? 1 : 0,
            'image_path' => $request->file('image') ? $request->file('image')->store('products', 'public') : null,
        ]);

        // 3. Création des variantes avec génération de SKU
        foreach ($validated['variants'] as $variant) {
            $product->variants()->create([
                'size' => $variant['size'],
                'stock' => $variant['stock'],
                // Génère un SKU unique (ex: PRODUCTNAME-SIZE-RANDOM)
                'sku' => strtoupper(Str::slug($product->name)) . '-' . $variant['size'] . '-' . Str::random(4),
            ]);
        }

        return redirect()->route('admin.products.index');
    }
    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => $product, // Plus de .load('variants')
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        // 1. Décodage du JSON venant de React
        $allData = $request->all();
        if (isset($allData['variants']) && is_string($allData['variants'])) {
            $allData['variants'] = json_decode($allData['variants'], true);
        }

        // 2. Validation (On ne demande pas le SKU ici car on va le générer)
        $validator = \Illuminate\Support\Facades\Validator::make($allData, [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required',
            'variants' => 'required|array|min:1',
            'variants.*.size' => 'required|string',
            'variants.*.stock' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors())->withInput();
        }

        $validated = $validator->validated();

        // 3. Update du produit principal
        $product->update([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $request->description ?? '',
            'category_id' => $validated['category_id'],
            'is_limited' => ($request->is_limited === 'true' || $request->is_limited == 1) ? 1 : 0,
            'slug' => \Illuminate\Support\Str::slug($validated['name']),
        ]);

        // Image
        if ($request->hasFile('image')) {
            $product->update([
                'image_path' => $request->file('image')->store('products', 'public')
            ]);
        }

        // 4. SYNC DES VARIANTS (On vide et on recrée pour remplir le SKU obligatoire)
        $product->variants()->delete();

        foreach ($validated['variants'] as $v) {
            $product->variants()->create([
                'size'  => $v['size'],
                'stock' => $v['stock'],
                // ON GÉNÈRE LE SKU ICI POUR ÉVITER L'ERREUR SQL NOT NULL
                'sku'   => strtoupper(\Illuminate\Support\Str::slug($product->name)) . '-' . strtoupper($v['size']) . '-' . \Illuminate\Support\Str::random(4),
            ]);
        }

        return redirect()->route('admin.products.index');
    }
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'ASSET_DELETED');
    }
}
