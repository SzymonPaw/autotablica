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
        Schema::create('zdjecia', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ogloszenie_id')->constrained('ogloszenia');
            $table->string('sciezka', 255);
            $table->string('nazwa_pliku', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zdjecia');
    }
};
