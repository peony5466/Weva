<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'subtotal',
        'discount',
        'total',
        'points_used',
        'points_earned',
        'status',
        'stripe_payment_intent_id',
        'shipping_address',
        'email',
        'payment_method',
        'crypto_payment_id',
    ];

    // Relation : Une commande appartient à un utilisateur
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relation : Une commande contient plusieurs articles
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
