<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TokenTransaction extends Model
{
    protected $fillable = [
        'user_id',
        'order_id',
        'amount',
        'type',
        'description',
        'order_amount',
    ];

    protected $casts = [
        'amount'       => 'integer',
        'order_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}