<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Futura 02(BRG)', 'price' => 272.00, 'description' => 'Monture minimaliste en métal.'],
            ['name' => 'Musubi 02', 'price' => 242.00, 'description' => 'Design ovale classique.'],
            ['name' => 'Lolang T1(GR)', 'price' => 258.00, 'description' => 'Monture acétate épaisse.'],
            ['name' => 'Vanilla 01', 'price' => 242.00, 'description' => 'Style rétro contemporain.'],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => $product['description'],
                'price' => $product['price'],
                'image_path' => 'resources/js/assets/images/veste1.png',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
