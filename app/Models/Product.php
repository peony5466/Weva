<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // Import nécessaire
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    // Assure-toi que category_id est bien dans ton fillable
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'category_id', // <--- IMPORTANT
        'is_limited',
        'image_path'
    ];

    /**
     * Un produit appartient à une catégorie
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variants(): HasMany
    {
        // On précise bien le nom de la classe ProductVariant
        return $this->hasMany(ProductVariant::class);
    }

    /**
     * Tes variantes existantes
     */
    // public function variants(): HasMany
    // {
    //     return $this->hasMany(Variant::class);
    // }
}
