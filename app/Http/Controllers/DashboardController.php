<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        if (Auth::user()->role !== 'admin') {
            return redirect()->route('wevavip');
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'citizens'   => User::count(),
                'fiat_sales' => Order::where('currency', 'fiat')->sum('total_price') ?? 0,
                'wt_sales'   => Order::where('currency', 'wt')->sum('total_price') ?? 0,
            ],
            'logs' => Order::with('user')
                ->latest()
                ->take(5)
                ->get()
                ->map(fn($order) => [
                    'id'       => $order->id,
                    'user'     => $order->user->name ?? 'Unknown',
                    'amount'   => $order->total_price,
                    'currency' => $order->currency,
                    'status'   => $order->status ?? 'completed',
                    'date'     => $order->created_at->format('Y-m-d H:i'),
                ]),
        ]);
    }
}
