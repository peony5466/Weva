<?php

namespace App\Services;

use App\Models\Order;
use App\Models\TokenTransaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * TokenService — Fidélité Weva
 *
 *  Règle : 1€ dépensé = 1 token
 *  Seuil : 250 tokens → 15% de cashback sur les commandes suivantes
 */
class TokenService
{
    public const TOKENS_PER_EURO = 1;    // 1€ = 1 token

    public function applyDiscount(User $user, float $subtotal): array
    {
        return [
            'eligible'         => false,
            'discount_percent' => 0,
            'discount_amount'  => 0.0,
            'subtotal'         => $subtotal,
            'total'            => $subtotal,
            'points'           => (int) $user->points,
            'points_needed'    => 0,
        ];
    }

    // ── Récompense les tokens après une commande ──────────────────────────────
    // Appelé dans OrderController APRÈS création de la commande
    public function rewardOrderTokens(User $user, Order $order): int
    {
        $amount = (float) $order->total;
        $tokensEarned = (int) floor($amount * self::TOKENS_PER_EURO);

        if ($tokensEarned <= 0) {
            return 0;
        }

        DB::transaction(function () use ($user, $order, $tokensEarned, $amount) {
            $user->increment('points', $tokensEarned);
            $user->increment('total_spent', $amount);

            // Met à jour points_earned sur la commande (colonne déjà existante ✅)
            $order->update(['points_earned' => $tokensEarned]);

            TokenTransaction::create([
                'user_id' => $user->id,
                'order_id' => $order->id,
                'amount' => $tokensEarned,
                'type' => 'order_reward',
                'description' => "Commande #{$order->order_number} — +{$tokensEarned} tokens",
                'order_amount' => $amount,
            ]);
        });

        return $tokensEarned;
    }

    // ── Données de progression pour le front ─────────────────────────────────
    public function getProgress(User $user): array
    {
        $points = (int) $user->points;

        return [
            'points'           => $points,
            'eligible'         => false,
            'cashback_percent' => 0,
            'points_needed'    => 0,
            'progress_percent' => 0,
            'total_spent'      => (float) ($user->total_spent ?? 0),
        ];
    }

    // ── Déduit les tokens du compte (paiement WT) ─────────────────────────────
    public function spendTokens(User $user, int $amount): bool
    {
        if ((int) $user->points < $amount) {
            return false;
        }

        $user->decrement('points', $amount);

        return true;
    }
}
