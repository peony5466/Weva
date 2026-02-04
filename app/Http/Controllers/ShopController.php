<?

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Shop/index', [
            // 1. On récupère les produits avec leur catégorie
            'products' => Product::query()
                ->with(['category'])
                // Filtrage par le slug de la catégorie si présent
                ->when($request->input('category'), function ($query, $slug) {
                    $query->whereHas('category', function ($q) use ($slug) {
                        $q->where('slug', $slug);
                    });
                })
                ->latest()
                ->get(),

            // 2. ON AJOUTE LES CATÉGORIES ICI (Indispensable pour le .map)
            'categories' => Category::select('id', 'name', 'slug')->get(),

            // 3. On passe la catégorie actuelle pour l'état "actif" des pills
            'currentCategory' => $request->input('category'),

            'filters' => $request->only(['category']),
        ]);
    }

    public function show($slug)
    {
        $product = Product::with('variants') // Appel de la méthode définie dans Product.php
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Shop/show', [
            'product' => $product
        ]);
    }
}
