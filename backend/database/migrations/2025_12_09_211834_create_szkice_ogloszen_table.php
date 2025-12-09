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
        Schema::create('szkice_ogloszen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('uzytkownik_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('tytul')->nullable();
            $table->text('opis')->nullable();
            $table->decimal('cena', 10, 2)->nullable();
            $table->unsignedInteger('marka_id')->nullable();
            $table->unsignedInteger('model_id')->nullable();
            $table->year('rok_produkcji')->nullable();
            $table->string('vin', 100)->nullable();
            $table->string('numer_rejestracyjny', 100)->nullable();
            $table->date('data_pierwszej_rej')->nullable();
            $table->integer('przebieg')->nullable();
            $table->integer('moc_silnika')->nullable();
            $table->string('naped', 50)->nullable();
            $table->integer('liczba_drzwi')->nullable();
            $table->integer('liczba_miejsc')->nullable();
            $table->string('kolor', 100)->nullable();
            $table->boolean('metalik')->nullable();
            $table->string('stan', 50)->nullable();
            $table->boolean('wypadkowy')->nullable();
            $table->boolean('zarejestrowany_w_polsce')->nullable();
            $table->boolean('pierwszy_wlasciciel')->nullable();
            $table->boolean('serwisowany_w_aso')->nullable();
            $table->boolean('bezwypadkowy')->nullable();
            $table->string('rodzaj_paliwa', 50)->nullable();
            $table->string('skrzynia_biegow', 50)->nullable();
            $table->decimal('pojemnosc_silnika', 5, 2)->nullable();
            $table->timestamps();
            
            // Indeksy
            $table->index('uzytkownik_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('szkice_ogloszen');
    }
};
