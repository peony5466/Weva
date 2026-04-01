<?php

namespace App\Http\Controllers;

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
        $user     = $request->user();
        $progress = $this->tokenService->getProgress($user);
        $history  = TokenTransaction::where('user_id', $user->id)
                        ->with('order:id,order_number')
                        ->latest()
                        ->take(15)
                        ->get();

        return Inertia::render('client/mytoken', [
            'progress' => $progress,
            'history'  => $history,
        ]);
    }
}