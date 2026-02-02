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
                ->with(['category']) // On garde uniquement la catégorie
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                })
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|max:2048', // Validation image
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'image_path' => $imagePath, // On stocke le chemin
            'slug' => Str::slug($request->name),
            'is_limited' => $request->boolean('is_limited'),
        ]);

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
        // 1. On valide
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        // 2. On prépare les données manuellement pour éviter le "Undefined array key"
        $data = [
            'name'        => $request->input('name'),
            'price'       => $request->input('price'),
            'description' => $request->input('description'),
            'category_id' => $request->input('category_id'), // Laravel gère le null ici
            'is_limited'  => $request->boolean('is_limited'),
        ];

        // 3. Gestion de l'image
        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }

        // 4. Update direct
        $product->update($data);

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'ASSET_DELETED');
    }
}
