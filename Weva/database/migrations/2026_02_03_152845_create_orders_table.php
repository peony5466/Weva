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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique(); // Ex: CMD-2026-0001

            // Montants
            $table->decimal('subtotal', 10, 2);    // Prix total articles
            $table->decimal('discount', 10, 2)->default(0); // Réduction (ex: via points)
            $table->decimal('total', 10, 2);       // Montant réellement payé sur Stripe

            // Points Cashback
            $table->integer('points_used')->default(0);      // Points dépensés pour CETTE commande
            $table->integer('points_earned')->default(0);    // Points gagnés grâce à CETTE commande

            // Statuts et Stripe
            $table->string('status')->default('pending');    // pending, processing, completed, failed
            $table->string('stripe_payment_intent_id')->nullable()->unique();

            // Infos livraison simplifiées pour le moment
            $table->string('shipping_address')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
