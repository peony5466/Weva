<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\TokenTransaction;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TokenController extends Controller
{
    public function __construct(private TokenService $tokenService) {}

    /**
     * GET /dashboard/tokens  →  route 'tokens.my-wallet'
     */
    public function wallet(Request $request)
    {
        $user   = $request->user();
        $orders = Order::where('user_id', $user->id)
                    ->latest()
                    ->get(['order_number', 'total', 'points_earned', 'created_at']);

        return Inertia::render('client/mytoken', [
            'userPoints' => (int) $user->points,
            'orders'     => $orders,
        ]);
    }
}