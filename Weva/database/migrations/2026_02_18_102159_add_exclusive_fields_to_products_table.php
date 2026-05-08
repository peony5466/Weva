<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Le prix en points (ex: 5000 WT)
            $table->integer('wt_price')->nullable()->after('price');
            // Un switch pour savoir si le produit est uniquement achetable en WT
            $table->boolean('is_exclusive')->default(false)->after('wt_price');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['wt_price', 'is_exclusive']);
        });
    }
};
