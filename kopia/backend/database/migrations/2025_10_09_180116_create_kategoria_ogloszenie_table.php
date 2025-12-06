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
        Schema::create('kategoria_ogloszenie', function (Blueprint $table) {
            $table->unsignedBigInteger('kategoria_id');
            $table->unsignedBigInteger('ogloszenie_id');

            $table->foreign('kategoria_id')
                ->references('id')->on('kategorie')
                ->onDelete('cascade');

            $table->foreign('ogloszenie_id')
                ->references('id')->on('ogloszenia')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategoria_ogloszenie');
    }
};
