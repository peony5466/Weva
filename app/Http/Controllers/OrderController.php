<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Services\CryptoPaymentService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return back()->withErrors(['error' => 'Veuillez vous connecter pour passer commande.']);
        }

        $paymentMethod = $request->input('payment_method', 'stripe');

        if (! in_array($paymentMethod, ['stripe', 'crypto', 'points'])) {
            return back()->withErrors(['error' => 'Méthode de paiement invalide.']);
        }

        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return back()->withErrors(['error' => 'Votre panier est vide.']);
        }

        // ── ÉTAPE 1 : Calcul du sous-total + vérification stock ──────────────
        $subtotal = 0;

        foreach ($cart as $cartId => $item) {
            $productId = explode('-', $cartId)[0];
            $product = Product::with('variants')->find($productId);

            if (! $product) {
                return back()->withErrors(['error' => 'Produit introuvable.']);
            }

            $qty = $item['quantity'] ?? 1;
            $availableStock = $product->variants->sum('stock');

            if ($availableStock < $qty) {
                return back()->withErrors([
                    'error' => "Stock insuffisant pour {$product->name} (disponible : {$availableStock}).",
                ]);
            }

            $subtotal += ($item['price'] ?? 0) * $qty;
        }

        // ── ÉTAPE 2 : Cashback via TokenService ──────────────────────────────
        // Règle : 250 tokens accumulés → -15% sur la commande
        $tokenService = new TokenService;
        $pricing = $tokenService->applyDiscount($user, $subtotal);

        $discount = $pricing['discount_amount'];
        $total = $pricing['total'];

        // ── ÉTAPE 2b : Détecter paiement WT ─────────────────────────────────────
        $hasWTItems = false;
        $wtTotal = 0;
        foreach ($cart as $cartId => $item) {
            $productId = explode('-', $cartId)[0];
            $product = Product::find($productId);
            if ($product && $product->is_exclusive && $product->wt_price) {
                $hasWTItems = true;
                $wtTotal += $product->wt_price * ($item['quantity'] ?? 1);
            }
        }

        // ── PAIEMENT : Stripe Checkout ───────────────────────────────────────────
        try {
            // Construire l'adresse de livraison depuis les champs du formulaire
            $firstName = $request->input('first_name', '');
            $lastName  = $request->input('last_name', '');
            $street    = $request->input('address', '');
            $city      = $request->input('city', '');
            $postal    = $request->input('postal_code', '');
            $country   = $request->input('country', 'France');

            $shippingAddress = trim("{$firstName} {$lastName}, {$street}, {$postal} {$city}, {$country}");

            $order = DB::transaction(function () use (
                $user, $cart, $subtotal, $discount, $total, $shippingAddress, $paymentMethod
            ) {
                $newOrder = Order::create([
                    'user_id'          => $user->id,
                    'order_number'     => 'WEVA-'.strtoupper(str()->random(8)),
                    'subtotal'         => $subtotal,
                    'discount'         => $discount,
                    'total'            => $total,
                    'points_used'      => 0,
                    'points_earned'    => 0,
                    'status'           => 'pending_payment',
                    'payment_method'   => $paymentMethod,
                    'shipping_address' => $shippingAddress,
                    'email'            => $user->email,
                ]);

                // Création des OrderItems + décrémentation stock
                foreach ($cart as $cartId => $item) {
                    $realProductId = explode('-', $cartId)[0];
                    $qty = $item['quantity'] ?? 1;
                    $product = Product::with('variants')->find($realProductId);

                    // Décrémenter stock variants
                    $remaining = $qty;
                    foreach ($product->variants()->orderBy('stock', 'desc')->get() as $variant) {
                        if ($remaining <= 0) {
                            break;
                        }
                        $deduct = min($variant->stock, $remaining);
                        $variant->decrement('stock', $deduct);
                        $remaining -= $deduct;
                    }

                    OrderItem::create([
                        'order_id' => $newOrder->id,
                        'product_id' => $realProductId,
                        'quantity' => $qty,
                        'price' => $item['price'] ?? 0,
                        'attributes' => [
                            'size' => $item['variant'] ?? 'Unique',
                        ],
                    ]);
                }

                return $newOrder;
            });

            // ── ÉTAPE 4 : Routage selon méthode de paiement ───────────────────

            // ── Paiement par Points WT uniquement ────────────────────────────
            if ($paymentMethod === 'points') {
                // Le paiement WT est validé directement (sans passerelle externe).
                // Les tokens seront déduits dans success().
                return redirect()->route('checkout.success', $order->order_number);
            }

            // ── Paiement Crypto (MetaMask / ETH) ─────────────────────────────
            if ($paymentMethod === 'crypto') {
                $ethAmount = $request->input('eth_amount');
                $order->update(['eth_amount' => $ethAmount]);
                return redirect()->route('checkout.pending', $order->order_number);
            }

            // ── Paiement Stripe (carte bancaire) — flux existant ─────────────
            Stripe::setApiKey(config('services.stripe.secret'));

            $description = 'Commande WEVA — 1€ = 1 token';

            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => "Commande WEVA #{$order->order_number}",
                            'description' => $description,
                        ],
                        'unit_amount' => (int) round($total * 100),
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('checkout.success', $order->order_number).'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('checkout'),
                'customer_email' => $user->email,
                'metadata' => [
                    'order_number' => $order->order_number,
                    'user_id' => $user->id,
                ],
            ]);

            return Inertia::location($checkoutSession->url);

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Erreur : '.$e->getMessage()]);
        }
    }

    // ── CHECK PAYMENT : Polling Etherscan pour auto-confirmation ─────────────
    public function checkPayment($order_number)
    {
        $order = Order::where('order_number', $order_number)->firstOrFail();

        if ($order->status === 'paid') {
            return response()->json(['status' => 'confirmed']);
        }

        if ($order->payment_method !== 'crypto' || !$order->eth_amount) {
            return response()->json(['status' => 'pending']);
        }

        $merchantAddress = env('MERCHANT_ETH_ADDRESS');
        $apiKey          = env('ETHERSCAN_API_KEY', '');
        $expectedWei     = bcmul((string) $order->eth_amount, '1000000000000000000', 0);

        $url = 'https://api.etherscan.io/api?' . http_build_query([
            'module'  => 'account',
            'action'  => 'txlist',
            'address' => $merchantAddress,
            'sort'    => 'desc',
            'page'    => 1,
            'offset'  => 20,
            'apikey'  => $apiKey,
        ]);

        $response = Http::timeout(8)->get($url);

        if (!$response->successful()) {
            return response()->json(['status' => 'pending']);
        }

        $txs = $response->json('result') ?? [];

        // Fenêtre : transactions des 20 dernières minutes
        $since = now()->subMinutes(20)->timestamp;

        foreach ($txs as $tx) {
            if ((int) $tx['timeStamp'] < $since) continue;
            if (strtolower($tx['to']) !== strtolower($merchantAddress)) continue;
            if ($tx['isError'] !== '0') continue;

            // Tolérance ±3% sur le montant
            $received = (float) bcdiv($tx['value'], '1000000000000000000', 10);
            $tolerance = (float) $order->eth_amount * 0.03;
            if (abs($received - (float) $order->eth_amount) <= $tolerance) {
                // Confirmer la commande
                $order->update([
                    'status'            => 'paid',
                    'crypto_payment_id' => $tx['hash'],
                ]);

                if ($order->user_id) {
                    $user         = User::find($order->user_id);
                    $tokenService = new TokenService;

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

                return response()->json([
                    'status'       => 'confirmed',
                    'tx_hash'      => $tx['hash'],
                    'redirect'     => route('checkout.success', $order->order_number),
                ]);
            }
        }

        return response()->json(['status' => 'pending']);
    }

    // ── PENDING : Page d'attente après paiement crypto ───────────────────────
    public function pending($order_number)
    {
        $order           = Order::where('order_number', $order_number)->firstOrFail();
        $merchantAddress = env('MERCHANT_ETH_ADDRESS');
        session()->forget('cart');

        $qrUri = null;
        if ($order->eth_amount && $merchantAddress) {
            $wei   = bcmul((string) $order->eth_amount, '1000000000000000000', 0);
            $qrUri = "ethereum:{$merchantAddress}?value={$wei}";
        }

        return Inertia::render('shop/pending', [
            'order'           => $order,
            'merchantAddress' => $merchantAddress,
            'qrUri'           => $qrUri,
        ]);
    }

    // ── CONFIRM CRYPTO : Admin confirme manuellement ─────────────────────────
    public function confirmCrypto($order_number)
    {
        $order = Order::where('order_number', $order_number)
            ->where('payment_method', 'crypto')
            ->firstOrFail();

        if ($order->status !== 'pending_payment') {
            return back()->with('error', 'Cette commande est déjà traitée.');
        }

        $order->update(['status' => 'paid']);

        $order->load('items.product');

        if ($order->user_id) {
            $user         = User::find($order->user_id);
            $tokenService = new TokenService;

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

        return back()->with('success', 'Paiement crypto confirmé.');
    }

    // ── SUCCESS : Appelé après retour Stripe ─────────────────────────────────
    public function success($order_number)
    {
        $order = Order::where('order_number', $order_number)->firstOrFail();

        // Idempotent : on ne crédite les tokens qu'une seule fois
        if ($order->status === 'pending_payment') {

            $order->update(['status' => 'paid']);

            // Déduire les tokens WT pour les produits exclusifs
            $order->load('items.product');
            $wtTotal = $order->items->sum(function ($item) {
                $product = $item->product;
                if ($product && $product->is_exclusive && $product->wt_price) {
                    return $product->wt_price * $item->quantity;
                }

                return 0;
            });

            if ($wtTotal > 0 && $order->user_id) {
                $user = User::find($order->user_id);
                $tokenService = new TokenService;
                $tokenService->spendTokens($user, $wtTotal);
            }

            // Récompense tokens : 1€ payé = 1 token (sur le total APRÈS cashback)
            if ($order->user_id) {
                $user = User::find($order->user_id);
                $tokenService = new TokenService;
                $tokensEarned = $tokenService->rewardOrderTokens($user, $order);
            }

            session()->forget('cart');
        }

        return Inertia::render('shop/success', [
            'order' => $order->load('items.product'),
            'tokensEarned' => $order->points_earned ?? 0,
            'cashbackApplied' => $order->discount ?? 0,
        ]);
    }
}
