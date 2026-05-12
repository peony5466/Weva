<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $vestesCategory = Category::where('slug', 'vestes')->first();

        $products = [
            [
                'name'         => 'Veste Pivoine Noire',
                'description'  => 'Veste col Mao en laine noire ornée de broderies de pivoines en relief sur les épaules et les manches. Boutons médaillon argentés. Coupe structurée et épurée.',
                'price'        => 480.00,
                'wt_price'     => null,
                'is_exclusive' => false,
                'is_limited'   => true,
                'image'        => 'images/products/veste-pivoine-noire.png',
                'sizes'        => ['XS', 'S', 'M', 'L', 'XL'],
                'stock'        => 10,
            ],
            [
                'name'         => 'Kimono Dragon Ivoire',
                'description'  => 'Kimono structuré en brocart ivoire à motifs floraux tissés. Larges manches évasées avec empiècements plissés noirs. Ceinture satinée. Broderies de dragons en fil doré et argenté sur le bas.',
                'price'        => 720.00,
                'wt_price'     => null,
                'is_exclusive' => false,
                'is_limited'   => true,
                'image'        => 'images/products/kimono-dragon-ivoire.png',
                'sizes'        => ['XS', 'S', 'M', 'L'],
                'stock'        => 6,
            ],
            [
                'name'         => 'Kimono Dragon Noir',
                'description'  => 'Kimono asymétrique en brocart noir. Broderie de dragon or pleine longueur. Ceinture noire plissée, ourlet effiloché et lacets de finition. Pièce exclusive uniquement disponible en Weva Tokens.',
                'price'        => null,
                'wt_price'     => 8600,
                'is_exclusive' => true,
                'is_limited'   => true,
                'image'        => 'images/products/kimono-dragon-noir.png',
                'sizes'        => ['XS', 'S', 'M', 'L'],
                'stock'        => 5,
            ],
            [
                'name'         => 'Veste Botanique Ivoire',
                'description'  => 'Veste col officier ivoire en brocart avec broderies botaniques multicolores (or, argent, roux). Empiècements plissés sur les côtés et les manches. Ceinture assortie.',
                'price'        => 650.00,
                'wt_price'     => null,
                'is_exclusive' => false,
                'is_limited'   => true,
                'image'        => 'images/products/veste-botanique-ivoire.png',
                'sizes'        => ['XS', 'S', 'M', 'L', 'XL'],
                'stock'        => 8,
            ],
            [
                'name'         => 'Bomber Dragon Noir',
                'description'  => 'Bomber oversize en brocart noir à motifs floraux. Broderies de dragons affrontés en fil doré et argenté sur les épaules. Bas et poignets côtelés. Ourlet plissé asymétrique avec breloque. Ceinture noire.',
                'price'        => 590.00,
                'wt_price'     => null,
                'is_exclusive' => false,
                'is_limited'   => false,
                'image'        => 'images/products/bomber-dragon-noir.png',
                'sizes'        => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'stock'        => 12,
            ],
        ];

        foreach ($products as $data) {
            $product = Product::create([
                'name'         => $data['name'],
                'slug'         => Str::slug($data['name']),
                'description'  => $data['description'],
                'price'        => $data['price'],
                'wt_price'     => $data['wt_price'],
                'is_exclusive' => $data['is_exclusive'],
                'is_limited'   => $data['is_limited'],
                'is_active'    => true,
                'image_path'   => $data['image'],
                'category_id'  => $vestesCategory?->id,
            ]);

            foreach ($data['sizes'] as $size) {
                ProductVariant::create([
                    'product_id' => $product->id,
                    'size'       => $size,
                    'sku'        => strtoupper(Str::slug($data['name'])) . '-' . $size,
                    'stock'      => $data['stock'],
                ]);
            }
        }
    }
}
