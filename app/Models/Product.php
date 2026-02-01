<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'price', 'image_path'];

    // Relation : Un produit a plusieurs variantes
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }
}
