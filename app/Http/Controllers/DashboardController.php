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

        $stats = [
            'citizens'    => User::where('role', 'client')->count(),
            'total_sales' => (float) Order::where('status', 'paid')->sum('total'),
            'fiat_sales'  => (float) Order::where('status', 'paid')->sum('total'),
            'wt_sales'    => (int) Order::where('status', 'paid')->sum('points_used'),
            'orders'      => Order::where('status', 'paid')->count(),
            'pending'     => Order::where('status', 'pending')->count(),
        ];

        $logs = Order::with('user')
            ->latest()
            ->take(10)
            ->get()
            ->map(fn($order) => [
                'id'       => $order->id,
                'user'     => $order->user->name ?? 'Unknown',
                'amount'   => $order->total,
                'points'   => $order->points_used ?? 0,
                'currency' => ($order->points_used ?? 0) > 0 ? 'WT' : '€',
                'status'   => $order->status,
                'date'     => $order->created_at->format('d/m/Y H:i'),
            ]);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'logs'  => $logs,
        ]);
    }
}