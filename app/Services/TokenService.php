<?php

namespace App\Services;

use App\Models\User;
use App\Models\Order;
use App\Models\TokenTransaction;
use Illuminate\Support\Facades\DB;

/**
 * TokenService — Fidélité Weva
 *
 *  Règle : 1€ dépensé = 1 token
 *  Seuil : 250 tokens → 15% de cashback sur les commandes suivantes
 */
class TokenService
{
    public const TOKENS_PER_EURO    = 1;    // 1€ = 1 token
    public const CASHBACK_THRESHOLD = 250;  // tokens requis
    public const CASHBACK_PERCENT   = 15;   // % de réduction

    // ── Le user a-t-il droit au cashback ? ───────────────────────────────────
    public function hasCashback(User $user): bool
    {
        return (int) $user->points >= self::CASHBACK_THRESHOLD;
    }

    // ── Calcule le pricing avec/sans cashback ─────────────────────────────────
    // Appelé dans OrderController AVANT de créer la commande
    public function applyDiscount(User $user, float $subtotal): array
    {
        $eligible       = $this->hasCashback($user);
        $pct            = $eligible ? self::CASHBACK_PERCENT : 0;
        $discountAmount = $eligible ? round($subtotal * $pct / 100, 2) : 0.0;
        $total          = round($subtotal - $discountAmount, 2);

        return [
            'eligible'         => $eligible,
            'discount_percent' => $pct,
            'discount_amount'  => $discountAmount,
            'subtotal'         => $subtotal,
            'total'            => $total,
            'points'           => (int) $user->points,
            'points_needed'    => max(0, self::CASHBACK_THRESHOLD - (int) $user->points),
        ];
    }

    // ── Récompense les tokens après une commande ──────────────────────────────
    // Appelé dans OrderController APRÈS création de la commande
    public function rewardOrderTokens(User $user, Order $order): int
    {
        $amount       = (float) $order->total;
        $tokensEarned = (int) floor($amount * self::TOKENS_PER_EURO);

        if ($tokensEarned <= 0) return 0;

        DB::transaction(function () use ($user, $order, $tokensEarned, $amount) {
            $user->increment('points', $tokensEarned);
            $user->increment('total_spent', $amount);

            // Met à jour points_earned sur la commande (colonne déjà existante ✅)
            $order->update(['points_earned' => $tokensEarned]);

            TokenTransaction::create([
                'user_id'      => $user->id,
                'order_id'     => $order->id,
                'amount'       => $tokensEarned,
                'type'         => 'order_reward',
                'description'  => "Commande #{$order->order_number} — +{$tokensEarned} tokens",
                'order_amount' => $amount,
            ]);
        });

        return $tokensEarned;
    }

    // ── Données de progression pour le front ─────────────────────────────────
    public function getProgress(User $user): array
    {
        $points   = (int) $user->points;
        $eligible = $points >= self::CASHBACK_THRESHOLD;
        $progress = min(100, (int) round($points / self::CASHBACK_THRESHOLD * 100));

        return [
            'points'           => $points,
            'threshold'        => self::CASHBACK_THRESHOLD,
            'eligible'         => $eligible,
            'cashback_percent' => self::CASHBACK_PERCENT,
            'points_needed'    => max(0, self::CASHBACK_THRESHOLD - $points),
            'progress_percent' => $progress,
            'total_spent'      => (float) ($user->total_spent ?? 0),
        ];
    }
}