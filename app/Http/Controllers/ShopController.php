<?

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        return Inertia::render('Shop/Index', [
            'products' => Product::with('variants')->where('is_active', true)->get()
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
