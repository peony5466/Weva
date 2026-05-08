<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'marque' => 'nullable|string|max:255',
            'composition' => 'nullable|string',
            'entretien' => 'nullable|string',
            'price' => 'nullable|numeric',
            'wt_price' => 'nullable|numeric',
            'is_exclusive' => 'nullable',
            'is_limited' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'variants' => 'required|array|min:1',
            'variants.*.size' => 'required|string',
            'variants.*.stock' => 'required|integer|min:0',
        ]);

        $isExclusive = filter_var($request->input('is_exclusive', false), FILTER_VALIDATE_BOOLEAN);
        $isLimited = filter_var($request->input('is_limited', false), FILTER_VALIDATE_BOOLEAN);

        $product = Product::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
            'marque' => $validated['marque'] ?? null,
            'composition' => $validated['composition'] ?? null,
            'entretien' => $validated['entretien'] ?? null,
            'category_id' => $validated['category_id'],
            'is_exclusive' => $isExclusive,
            'is_limited' => $isLimited,
            'price' => $isExclusive ? 0 : (float) ($validated['price'] ?? 0),
            'wt_price' => $isExclusive ? (float) ($validated['wt_price'] ?? 0) : 0,
            'image_path' => $request->file('image')
                ? $request->file('image')->store('products', 'public')
                : null,
        ]);

        foreach ($validated['variants'] as $variant) {
            $product->variants()->create([
                'size' => $variant['size'],
                'stock' => (int) $variant['stock'],
                'sku' => $this->generateSku($product->name, $variant['size']),
            ]);
        }

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => $product->load('variants'),
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $allData = $request->all();

        if (isset($allData['variants']) && is_string($allData['variants'])) {
            $allData['variants'] = json_decode($allData['variants'], true);
        }

        $validated = Validator::make($allData, [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'marque' => 'nullable|string|max:255',
            'composition' => 'nullable|string',
            'entretien' => 'nullable|string',
            'price' => 'nullable|numeric',
            'wt_price' => 'nullable|numeric',
            'is_exclusive' => 'nullable',
            'is_limited' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'variants' => 'required|array|min:1',
            'variants.*.size' => 'required|string',
            'variants.*.stock' => 'required|integer|min:0',
        ])->validate();

        $isExclusive = filter_var($request->input('is_exclusive', false), FILTER_VALIDATE_BOOLEAN);
        $isLimited = filter_var($request->input('is_limited', false), FILTER_VALIDATE_BOOLEAN);

        $product->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? $product->description,
            'marque' => $validated['marque'] ?? $product->marque,
            'composition' => $validated['composition'] ?? $product->composition,
            'entretien' => $validated['entretien'] ?? $product->entretien,
            'category_id' => $validated['category_id'],
            'is_exclusive' => $isExclusive,
            'is_limited' => $isLimited,
            'price' => $isExclusive ? 0 : (float) ($validated['price'] ?? 0),
            'wt_price' => $isExclusive ? (float) ($validated['wt_price'] ?? 0) : 0,
        ]);

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $product->update([
                'image_path' => $request->file('image')->store('products', 'public'),
            ]);
        }

        $product->variants()->delete();

        foreach ($validated['variants'] as $v) {
            $product->variants()->create([
                'size' => $v['size'],
                'stock' => (int) $v['stock'],
                'sku' => $this->generateSku($product->name, $v['size']),
            ]);
        }

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        $product->variants()->delete();

        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        $product->delete();

        return redirect()->route('admin.products.index');
    }

    private function generateSku(string $productName, string $size): string
    {
        return strtoupper(Str::slug($productName))
            .'-'.strtoupper($size)
            .'-'.Str::random(4);
    }
}
