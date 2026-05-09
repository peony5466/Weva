<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CryptoPaymentService
{
    private string $apiKey;
    private string $baseUrl = 'https://api.commerce.coinbase.com';

    public function __construct()
    {
        $this->apiKey = config('services.coinbase.api_key', '');
    }

    public function createInvoice(array $params): array
    {
        $response = Http::withHeaders([
            'X-CC-Api-Key'      => $this->apiKey,
            'X-CC-Version'      => '2018-03-22',
            'Content-Type'      => 'application/json',
        ])->post("{$this->baseUrl}/charges", [
            'name'        => "Commande WEVA #{$params['order_number']}",
            'description' => "Paiement commande #{$params['order_number']}",
            'pricing_type' => 'fixed_price',
            'local_price' => [
                'amount'   => number_format((float) $params['amount'], 2, '.', ''),
                'currency' => 'EUR',
            ],
            'metadata' => [
                'order_number' => $params['order_number'],
            ],
            'redirect_url' => route('checkout.success', $params['order_number']),
            'cancel_url'   => route('checkout'),
        ]);

        if (! $response->successful()) {
            Log::error('Coinbase Commerce charge error', ['body' => $response->body()]);
            throw new \RuntimeException('Impossible de créer la facture crypto : ' . $response->body());
        }

        $data = $response->json('data');

        return [
            'invoice_url' => $data['hosted_url'],
            'payment_id'  => $data['code'],
        ];
    }

    public function verifyWebhookSignature(string $payload, string $signature): bool
    {
        $secret = config('services.coinbase.webhook_secret', '');
        if (empty($secret)) {
            return true;
        }
        $expected = hash_hmac('sha256', $payload, $secret);

        return hash_equals($expected, $signature);
    }
}
