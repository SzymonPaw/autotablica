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
        Schema::table('ogloszenia', function (Blueprint $table) {
            $table->unsignedSmallInteger('rok_produkcji')->nullable()->after('model_id');
            $table->unsignedSmallInteger('moc_silnika')->nullable()->after('przebieg'); // w KM
            $table->string('naped', 20)->nullable()->after('moc_silnika');
            $table->unsignedTinyInteger('liczba_drzwi')->nullable()->after('naped');
            $table->unsignedTinyInteger('liczba_miejsc')->nullable()->after('liczba_drzwi');
            $table->string('kolor', 50)->nullable()->after('liczba_miejsc');
            $table->boolean('metalik')->nullable()->after('kolor');
            $table->string('stan', 20)->nullable()->after('metalik');
            $table->boolean('wypadkowy')->nullable()->after('stan');
            $table->boolean('zarejestrowany_w_polsce')->nullable()->after('wypadkowy');
            $table->boolean('pierwszy_wlasciciel')->nullable()->after('zarejestrowany_w_polsce');
            $table->boolean('serwisowany_w_aso')->nullable()->after('pierwszy_wlasciciel');
            $table->boolean('bezwypadkowy')->nullable()->after('serwisowany_w_aso');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ogloszenia', function (Blueprint $table) {
            $table->dropColumn([
                'rok_produkcji',
                'moc_silnika',
                'naped',
                'liczba_drzwi',
                'liczba_miejsc',
                'kolor',
                'metalik',
                'stan',
                'wypadkowy',
                'zarejestrowany_w_polsce',
                'pierwszy_wlasciciel',
                'serwisowany_w_aso',
                'bezwypadkowy',
            ]);
        });
    }
};
