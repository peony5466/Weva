<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@weva.com'],
            [
                'name'     => 'Admin Weva',
                'email'    => 'admin@weva.com',
                'password' => Hash::make('weva@admin2026'),
                'role'     => 'admin',
                'points'   => 0,
            ]
        );
    }
}
