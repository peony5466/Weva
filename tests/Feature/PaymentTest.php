<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use App\Services\CryptoPaymentService;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Mockery;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    use DatabaseMigrations;

    private User $user;
    private Product $product;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create(['role' => 'client']);

        $category = Category::create(['name' => 'Test', 'slug' => 'test']);

        $this->product = Product::create([
            'name'        => 'Produit Test',
            'slug'        => 'produit-test',
            'price'       => 50.00,
            'category_id' => $category->id,
            'status'      => 'active',
        ]);

        ProductVariant::create([
            'product_id' => $this->product->id,
            'size'       => 'M',
            'stock'      => 10,
        ]);

        session()->put('cart', [
            $this->product->id.'-M' => [
                'quantity' => 1,
                'price'    => 50.00,
                'variant'  => 'M',
            ],
        ]);
    }

    public function test_order_requires_authentication(): void
    {
        $this->post('/orders', ['payment_method' => 'stripe'])->assertRedirect('/login');
    }

    public function test_invalid_payment_method_is_rejected(): void
    {
        $this->actingAs($this->user)
            ->post('/orders', ['payment_method' => 'paypal'])
            ->assertSessionHasErrors('error');
    }

    public function test_empty_cart_is_rejected(): void
    {
        session()->forget('cart');

        $this->actingAs($this->user)
            ->post('/orders', ['payment_method' => 'stripe'])
            ->assertSessionHasErrors('error');
    }

    public function test_crypto_payment_redirects_to_nowpayments(): void
    {
        $mock = Mockery::mock(CryptoPaymentService::class);
        $mock->shouldReceive('createInvoice')->once()->andReturn([
            'invoice_url' => 'https://nowpayments.io/payment/test-invoice',
            'payment_id'  => 'test-payment-id-123',
        ]);
        $this->app->instance(CryptoPaymentService::class, $mock);

        $response = $this->actingAs($this->user)
            ->post('/orders', ['payment_method' => 'crypto']);

        $response->assertRedirect('https://nowpayments.io/payment/test-invoice');
    }

    public function test_points_payment_redirects_to_success(): void
    {
        $response = $this->actingAs($this->user)
            ->post('/orders', ['payment_method' => 'points']);

        $response->assertRedirect();
        $this->assertStringContainsString('/checkout/success', $response->headers->get('Location'));
    }

    public function test_cashback_discount_is_applied_at_250_tokens(): void
    {
        $this->user->update(['points' => 250]);

        $mock = Mockery::mock(CryptoPaymentService::class);
        $mock->shouldReceive('createInvoice')->andReturn([
            'invoice_url' => 'https://nowpayments.io/payment/test',
            'payment_id'  => 'test-id',
        ]);
        $this->app->instance(CryptoPaymentService::class, $mock);

        $this->actingAs($this->user)
            ->post('/orders', ['payment_method' => 'crypto']);

        $order = Order::where('user_id', $this->user->id)->first();
        $this->assertNotNull($order);
        $this->assertGreaterThan(0, $order->discount);
    }

    public function test_crypto_webhook_marks_order_as_paid(): void
    {
        $order = Order::create([
            'user_id'          => $this->user->id,
            'order_number'     => 'WEVA-CRYPTOTEST',
            'subtotal'         => 50,
            'discount'         => 0,
            'total'            => 50,
            'status'           => 'pending_payment',
            'payment_method'   => 'crypto',
            'crypto_payment_id'=> 'payment-id-999',
            'email'            => $this->user->email,
        ]);

        $payload = json_encode([
            'payment_id'     => 'payment-id-999',
            'payment_status' => 'finished',
            'order_id'       => 'WEVA-CRYPTOTEST',
        ]);

        $secret = config('services.nowpayments.ipn_secret', 'test-secret');
        $signature = hash_hmac('sha512', $payload, $secret);

        $this->postJson('/webhook/nowpayments', json_decode($payload, true), [
            'x-nowpayments-sig' => $signature,
        ])->assertOk();

        $this->assertEquals('paid', $order->fresh()->status);
    }

    public function test_crypto_webhook_ignores_non_final_status(): void
    {
        $order = Order::create([
            'user_id'          => $this->user->id,
            'order_number'     => 'WEVA-PENDING',
            'subtotal'         => 50,
            'discount'         => 0,
            'total'            => 50,
            'status'           => 'pending_payment',
            'payment_method'   => 'crypto',
            'crypto_payment_id'=> 'payment-id-777',
            'email'            => $this->user->email,
        ]);

        $payload = json_encode([
            'payment_id'     => 'payment-id-777',
            'payment_status' => 'waiting',
            'order_id'       => 'WEVA-PENDING',
        ]);

        $secret = config('services.nowpayments.ipn_secret', 'test-secret');
        $signature = hash_hmac('sha512', $payload, $secret);

        $this->postJson('/webhook/nowpayments', json_decode($payload, true), [
            'x-nowpayments-sig' => $signature,
        ])->assertOk();

        $this->assertEquals('pending_payment', $order->fresh()->status);
    }
}
