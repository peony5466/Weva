<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'category_id',
        'is_limited',
        'is_active',
        'image_path',
    ];

    protected $casts = [
        'is_limited' => 'boolean',
        'is_active'  => 'boolean',
        'price'      => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function getTotalStockAttribute(): int
    {
        return (int) $this->variants()->sum('stock');
    }
}