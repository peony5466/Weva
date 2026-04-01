<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\TokenController;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| 1. ROUTES PUBLIQUES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $featuredProducts = Product::with(['variants', 'category'])
        ->where('is_active', true)
        ->latest()
        ->take(8)
        ->get();

    return Inertia::render('welcome', [
        'featuredProducts' => $featuredProducts,
    ]);
})->name('home');

Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/{product:slug}', [ShopController::class, 'show'])->name('shop.show');

// Détail produit
Route::get('/product/{id}', function ($id) {
    return Inertia::render('ProductDetail', [
        'id' => $id,
    ]);
})->name('product.detail');

Route::get('/client/token', function () {
    return Inertia::render('client/token');
})->name('token.public');

Route::get('/checkout', function () {
    $cart = session()->get('cart', []);
    $total = collect($cart)->sum(fn ($item) => $item['price'] * $item['quantity']);

    $addresses = auth()->check()
        ? auth()->user()->addresses()->orderBy('is_default', 'desc')->get()->toArray()
        : [];

    return Inertia::render('checkout/index', [
        'cartTotal' => $total,
        'addresses' => $addresses,
    ]);
})->name('checkout');

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/checkout/success/{order_number}', [OrderController::class, 'success'])->name('checkout.success');

Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::patch('/cart/{key}', [CartController::class, 'update'])->name('cart.update');
Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

// Pages légales
Route::get('/cgv', fn () => Inertia::render('legal/cgv'))->name('cgv');
Route::get('/confidentialite', fn () => Inertia::render('legal/confidentialite'))->name('confidentialite');
Route::get('/legal', fn () => Inertia::render('legal/mentions-legales'))->name('legal');

/*
|--------------------------------------------------------------------------
| 2. ROUTES PROTÉGÉES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('wevavip');
        }

        // Stats
        $citizens = User::count();

        // Ventes en euros (commandes payées dont les produits ne sont pas WT exclusifs)
        $totalSalesEuros = Order::whereIn('status', ['paid', 'completed'])
            ->with('items.product')
            ->get()
            ->sum(function ($order) {
                return $order->items->sum(function ($item) {
                    $product = $item->product;
                    if ($product && $product->is_exclusive && $product->wt_price) {
                        return 0; // produit payé en WT, pas en euros
                    }

                    return $item->price * $item->quantity;
                });
            });

        // Ventes en WT (commandes payées avec produits exclusifs)
        $totalSalesWT = Order::whereIn('status', ['paid', 'completed'])
            ->with('items.product')
            ->get()
            ->sum(function ($order) {
                return $order->items->sum(function ($item) {
                    $product = $item->product;
                    if ($product && $product->is_exclusive && $product->wt_price) {
                        return $product->wt_price * $item->quantity;
                    }

                    return 0;
                });
            });

        $orders = Order::count();
        $pending = Order::where('status', 'pending')->count();

        // Logs (dernières commandes)
        $logs = Order::with('user')
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($order) {
                $isWT = $order->items->contains(function ($item) {
                    return $item->product && $item->product->is_exclusive && $item->product->wt_price;
                });

                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'user' => $order->user?->name ?? 'Inconnu',
                    'amount' => $isWT ? 0 : $order->total,
                    'wt_amount' => $isWT ? $order->items->sum(function ($item) {
                        $product = $item->product;

                        return ($product && $product->is_exclusive && $product->wt_price)
                            ? $product->wt_price * $item->quantity
                            : 0;
                    }) : 0,
                    'points' => $order->points_earned ?? 0,
                    'status' => $order->status,
                    'date' => $order->created_at->format('d/m/Y'),
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => [
                'citizens' => $citizens,
                'total_sales' => $totalSalesEuros,
                'wt_sales' => $totalSalesWT,
                'orders' => $orders,
                'pending' => $pending,
            ],
            'logs' => $logs,
        ]);
    })->name('dashboard');

    Route::post('/addresses', [AddressController::class, 'store'])->name('addresses.store');
    Route::put('/addresses/{address}', [AddressController::class, 'update'])->name('addresses.update');
    Route::delete('/addresses/{address}', [AddressController::class, 'destroy'])->name('addresses.destroy');
    Route::post('/addresses/{address}/default', [AddressController::class, 'setDefault'])->name('addresses.setDefault');

    /* --- ZONE ADMIN --- */
    Route::middleware(['role:admin'])->prefix('dashboard/admin')->name('admin.')->group(function () {

        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        Route::get('/users', [MemberController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/ban', [MemberController::class, 'toggleBan'])->name('users.ban');
        Route::get('/users/create', [MemberController::class, 'create'])->name('users.create');
        Route::post('/users', [MemberController::class, 'store'])->name('users.store');
        Route::delete('/users/{user}', [MemberController::class, 'destroy'])->name('users.destroy');

        Route::get('/orders', function () {
            $orders = Order::with('user')
                ->latest()
                ->get()
                ->map(function ($order) {
                    $isWT = $order->items && $order->items->contains(function ($item) {
                        return $item->product && $item->product->is_exclusive && $item->product->wt_price;
                    });

                    return [
                        'id' => $order->id,
                        'order_number' => $order->order_number,
                        'user' => $order->user?->name ?? 'Inconnu',
                        'user_email' => $order->email,
                        'total' => $isWT ? 0 : $order->total,
                        'wt_total' => $isWT ? $order->items->sum(function ($item) {
                            $product = $item->product;

                            return ($product && $product->is_exclusive && $product->wt_price)
                                ? $product->wt_price * $item->quantity
                                : 0;
                        }) : 0,
                        'status' => $order->status,
                        'created_at' => $order->created_at->format('d/m/Y H:i'),
                    ];
                });

            return Inertia::render('admin/orders/index', [
                'orders' => $orders,
            ]);
        })->name('orders.index');

        Route::get('/orders/{order_number}', function ($order_number) {
            $order = Order::where('order_number', $order_number)
                ->with(['user', 'items.product'])
                ->firstOrFail();

            return Inertia::render('admin/orders/show', [
                'order' => $order,
            ]);
        })->name('orders.show');
    });

    /* --- ZONE CLIENT --- */
    Route::middleware(['role:client'])->group(function () {

        Route::get('/dashboard/addresses', function () {
            $addresses = auth()->user()->addresses()->orderBy('is_default', 'desc')->get();

            return Inertia::render('client/addresses', [
                'addresses' => $addresses,
            ]);
        })->name('client.addresses');

        Route::get('/dashboard/wevavip', function () {
            $user = auth()->user();
            $tokenService = new \App\Services\TokenService;
            $progress = $tokenService->getProgress($user);
            $recentOrders = Order::where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get();

            return Inertia::render('client/wevavip', [
                'progress' => $progress,
                'recentOrders' => $recentOrders,
            ]);
        })->name('wevavip');

        Route::get('/dashboard/tokens', [TokenController::class, 'wallet'])->name('tokens.my-wallet');

        Route::get('/dashboard/orders', function () {
            $orders = Order::where('user_id', auth()->id())
                ->with('items.product')
                ->latest()
                ->get();

            return Inertia::render('client/orders/index', [
                'orders' => $orders,
            ]);
        })->name('client.orders');

        Route::get('/dashboard/orders/{order_number}', function ($order_number) {
            $order = Order::where('order_number', $order_number)
                ->where('user_id', auth()->id())
                ->with('items.product')
                ->firstOrFail();

            return Inertia::render('client/orders/show', [
                'order' => $order,
            ]);
        })->name('client.orders.show');
    });
});

Route::get('/dashboard/personalize', fn () => Inertia::render('client/customizer'))->name('avatar.customize');

/*
|--------------------------------------------------------------------------
| 3. AUTHENTIFICATION
|--------------------------------------------------------------------------
*/
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
