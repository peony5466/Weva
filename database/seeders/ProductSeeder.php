<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = DB::table('categories')->pluck('id', 'slug');

        $products = [
            [
                'name' => 'Pantalon 1',
                'price' => 259.00,
                'wt_price' => null,
                'is_exclusive' => false,
                'category_id' => $categories['pantalons'],
                'description' => 'Pantalon classique en coton de haute qualité.',
                'composition' => '98% Coton, 2% Élasthanne',
                'entretien' => 'Lavage à 30°C. Séchage à l_air libre. Repassage faible température.',
                'image_path' => 'resources/js/assets/images/produit1.png',
            ],
            [
                'name' => 'Pantalon 2',
                'price' => 0,
                'wt_price' => 280,
                'is_exclusive' => true,
                'category_id' => $categories['pantalons'],
                'description' => 'Pantalon exclusif en tissu premium.',
                'composition' => '95% Polyester, 5% Élasthanne',
                'entretien' => 'Lavage à 30°C. Pas de séchage machine. Nettoyage à sec possible.',
                'image_path' => 'resources/js/assets/images/produit2.png',
            ],
            [
                'name' => 'Veste 1',
                'price' => 299.00,
                'wt_price' => null,
                'is_exclusive' => false,
                'category_id' => $categories['vestes'],
                'description' => 'Blazer classique élégant et intemporel.',
                'composition' => '100% Laine',
                'entretien' => 'Nettoyage à sec recommandé. Repassage à vapeur.',
                'image_path' => 'resources/js/assets/images/produit1.png',
            ],
            [
                'name' => 'Veste 2',
                'price' => 0,
                'wt_price' => 350,
                'is_exclusive' => true,
                'category_id' => $categories['vestes'],
                'description' => 'Veste exclusive 设计 raffiné.',
                'composition' => '80% Laine, 20% Cachemire',
                'entretien' => 'Nettoyage à sec uniquement. Rangement sur cintre.',
                'image_path' => 'resources/js/assets/images/produit2.png',
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => $product['description'],
                'price' => $product['price'],
                'wt_price' => $product['wt_price'],
                'is_exclusive' => $product['is_exclusive'],
                'category_id' => $product['category_id'],
                'marque' => null,
                'composition' => $product['composition'],
                'entretien' => $product['entretien'],
                'image_path' => $product['image_path'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
