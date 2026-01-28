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
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // Correspond à product.name [1]
        $table->string('price'); // Correspond à product.price [1]
        $table->string('color'); // Correspond à product.color [1]
        $table->string('imageSrc'); // Correspond à product.imageSrc [1]
        $table->string('imageAlt')->nullable(); // Correspond à product.imageAlt [1]
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
