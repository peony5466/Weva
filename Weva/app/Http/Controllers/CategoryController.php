<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Affiche la liste des catégories avec le compte des produits
     */
    public function index()
    {
        return Inertia::render('admin/categories/index', [
            'categories' => Category::withCount('products')->get()->map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'slug' => $cat->slug,
                    'count' => $cat->products_count, // Récupère le vrai nombre de produits
                ];
            })
        ]);
    }

    /**
     * Enregistre une nouvelle catégorie
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        Category::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return back()->with('message', 'Category_Deployed_Successfully');
    }


    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update([
            'name' => $validated['name'],
            'slug' => str()->slug($validated['name']),
        ]);

        return back()->with('message', 'Category_Updated');
    }

    public function destroy(Category $category)
    {
        // Sécurité : On vérifie si la catégorie est utilisée
        // Si tu as mis nullOnDelete dans ta migration, les produits resteront mais sans catégorie
        $category->delete();

        return back()->with('message', 'Category_Deleted_From_Systems');
    }
}
