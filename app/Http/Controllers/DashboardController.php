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
            'citizens'    => User::count(),
            'total_sales' => Order::where('status', 'paid')->sum('total'),
            'fiat_sales'  => Order::where('status', 'paid')->sum('total'), // Vérifie si c'est ce que tu voulais
            'wt_sales'    => Order::where('status', 'paid')->sum('points_used'),
            // 'orders'      => Order::where('status', 'paid')->count(), // AJOUTE CETTE LIGNE
        ];
        dd($stats);
        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'logs' => Order::with('user')
                ->latest()
                ->take(5)
                ->get()
                ->map(fn($order) => [
                    'id'     => $order->id,
                    'user'   => $order->user->name ?? 'Unknown',
                    'amount' => $order->total,
                    'points' => $order->points_used,
                    'currency' => $order->points_used > 0 ? 'WT' : '€',
                    'status' => $order->status,
                    'date'   => $order->created_at->format('Y-m-d H:i'),
                ]),
        ]);
    }
}
