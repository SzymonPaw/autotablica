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
        Schema::create('ogloszenia', function (Blueprint $table) {
            $table->id();
            $table->foreignId('uzytkownik_id')->constrained('users');
            $table->string('tytul');
            $table->text('opis');
            $table->decimal('cena', 10, 2);
            $table->unsignedInteger('marka_id');
            $table->unsignedInteger('model_id');
            $table->string('vin', 100);
            $table->string('numer_rejestracyjny', 100);
            $table->date('data_pierwszej_rej');
            $table->integer('przebieg');
            $table->string('rodzaj_paliwa', 50);
            $table->string('skrzynia_biegow', 50);
            $table->decimal('pojemnosc_silnika', 5, 2);
            $table->string('status', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ogloszenia');
    }
};
