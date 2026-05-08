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
        'marque',
        'composition',
        'entretien',
        'price',
        'wt_price',
        'is_exclusive',
        'category_id',
        'is_limited',
        'image_path',
    ];

    // ✅ Ajouter 'stock' dans les appends pour qu'il soit inclus dans toJson/toArray
    protected $appends = ['stock'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    // ✅ Accessor correct dans le Model (Laravel 9+)
    public function getStockAttribute(): int
    {
        // Si les variants sont déjà chargés, on évite une requête SQL
        if ($this->relationLoaded('variants')) {
            return (int) $this->variants->sum('stock');
        }

        return (int) $this->variants()->sum('stock');
    }
}
