<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ulubione', function (Blueprint $table): void {
            $table->unique(['uzytkownik_id', 'ogloszenie_id']);
        });
    }

    public function down(): void
    {
        Schema::table('ulubione', function (Blueprint $table): void {
            $table->dropUnique('ulubione_uzytkownik_id_ogloszenie_id_unique');
        });
    }
};
