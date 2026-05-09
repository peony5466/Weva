<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Services\CryptoPaymentService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CryptoPaymentController extends Controller
{
    public function __construct(private CryptoPaymentService $cryptoService) {}

    /**
     * Webhook IPN NOWPayments — confirme le paiement crypto.
     */
    public function webhook(Request $request)
    {
        $payload   = $request->getContent();
        $signature = $request->header('x-nowpayments-sig', '');

        if (! $this->cryptoService->verifyWebhookSignature($payload, $signature)) {
            Log::warning('CryptoWebhook: signature invalide');
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        $data = $request->json()->all();
        Log::info('CryptoWebhook received', $data);

        $paymentStatus = $data['payment_status'] ?? '';
        $orderId       = $data['order_id'] ?? '';

        if (! in_array($paymentStatus, ['finished', 'confirmed'])) {
            return response()->json(['status' => 'ignored']);
        }

        $order = Order::where('order_number', $orderId)->first();
        if (! $order || $order->status !== 'pending_payment') {
            return response()->json(['status' => 'already processed or not found']);
        }

        // Marquer la commande comme payée (même logique que Stripe success)
        $order->update(['status' => 'paid']);

        if ($order->user_id) {
            $user         = User::find($order->user_id);
            $tokenService = new TokenService;

            // Déduire les tokens WT si produits exclusifs
            $order->load('items.product');
            $wtTotal = $order->items->sum(function ($item) {
                $product = $item->product;
                if ($product && $product->is_exclusive && $product->wt_price) {
                    return $product->wt_price * $item->quantity;
                }
                return 0;
            });

            if ($wtTotal > 0) {
                $tokenService->spendTokens($user, $wtTotal);
            }

            $tokenService->rewardOrderTokens($user, $order);
        }

        return response()->json(['status' => 'ok']);
    }
}
