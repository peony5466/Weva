<?

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Shop/index', [
            'products' => Product::query()
                ->when($request->input('category'), function ($query, $category) {
                    $query->where('category', $category);
                })
                ->latest()
                ->get(),
            'filters' => $request->only(['category']),
        ]);
    }

    public function show($slug)
    {
        $product = Product::with('variants')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Shop/ProductShow', [
            'product' => $product
        ]);
    }
}
