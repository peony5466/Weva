<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CryptoPaymentService
{
    private string $apiKey;
    private string $baseUrl;

    public function __construct()
    {
        $sandbox = config('services.nowpayments.sandbox', false);
        $this->apiKey  = $sandbox
            ? config('services.nowpayments.sandbox_api_key', '')
            : config('services.nowpayments.api_key', '');
        $this->baseUrl = $sandbox
            ? 'https://api-sandbox.nowpayments.io/v1'
            : 'https://api.nowpayments.io/v1';
    }

    /**
     * Crée une facture de paiement crypto via NOWPayments.
     * Retourne ['invoice_url' => '...', 'payment_id' => '...'] ou lance une exception.
     */
    public function createInvoice(array $params): array
    {
        $response = Http::withHeaders([
            'x-api-key' => $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post("{$this->baseUrl}/invoice", [
            'price_amount'       => $params['amount'],
            'price_currency'     => 'eur',
            'order_id'           => $params['order_number'],
            'order_description'  => "Commande WEVA #{$params['order_number']}",
            'ipn_callback_url'   => route('crypto.webhook'),
            'success_url'        => route('checkout.success', $params['order_number']),
            'cancel_url'         => route('checkout'),
        ]);

        if (! $response->successful()) {
            Log::error('NOWPayments invoice error', ['body' => $response->body()]);
            throw new \RuntimeException('Impossible de créer la facture crypto : '.$response->body());
        }

        $data = $response->json();

        return [
            'invoice_url' => $data['invoice_url'],
            'payment_id'  => (string) $data['id'],
        ];
    }

    /**
     * Vérifie la signature IPN d'un webhook NOWPayments.
     */
    public function verifyWebhookSignature(string $payload, string $signature): bool
    {
        $secret = config('services.nowpayments.ipn_secret', '');
        if (empty($secret)) {
            return true; // Pas de secret configuré → on accepte (dev only)
        }
        $expected = hash_hmac('sha512', $payload, $secret);

        return hash_equals($expected, strtolower($signature));
    }
}
