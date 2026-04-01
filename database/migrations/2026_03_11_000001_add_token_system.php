<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Ajouter total_spent à users (points existe déjà ✅)
        Schema::table('users', function (Blueprint $table) {
            $table->decimal('total_spent', 10, 2)->default(0)->after('points');
        });

        // Historique des mouvements de tokens
        Schema::create('token_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('order_id')->nullable()->constrained('orders')->onDelete('set null');
            $table->integer('amount');        // + gain / - dépense
            $table->string('type');           // 'order_reward' | 'cashback_used'
            $table->string('description');
            $table->decimal('order_amount', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('token_transactions');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('total_spent');
        });
    }
};