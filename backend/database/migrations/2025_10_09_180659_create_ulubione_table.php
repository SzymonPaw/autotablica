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
        Schema::create('ulubione', function (Blueprint $table) {
            $table->id();
            $table->foreignId('uzytkownik_id')->constrained('users');
            $table->foreignId('ogloszenie_id')->constrained('ogloszenia');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ulubione');
    }
};
