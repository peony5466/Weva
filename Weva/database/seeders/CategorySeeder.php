<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Pantalons', 'slug' => 'pantalons'],
            ['name' => 'Vestes', 'slug' => 'vestes'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
