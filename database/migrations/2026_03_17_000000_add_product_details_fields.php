<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('marque')->nullable()->after('description');
            $table->text('composition')->nullable()->after('marque');
            $table->text('entretien')->nullable()->after('composition');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['marque', 'composition', 'entretien']);
        });
    }
};
