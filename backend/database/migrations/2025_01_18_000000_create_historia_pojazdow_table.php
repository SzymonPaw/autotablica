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
        Schema::create('historia_pojazdow', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('ogloszenie_id')->constrained('ogloszenia')->cascadeOnDelete();
            $table->string('vin', 100);
            $table->string('numer_rejestracyjny', 100);
            $table->date('data_pierwszej_rej');
            $table->string('status', 32)->default('pending');
            $table->json('payload')->nullable();
            $table->timestamp('fetched_at')->nullable();
            $table->text('last_error_message')->nullable();
            $table->timestamps();

            $table->unique('ogloszenie_id');
            $table->index(['vin', 'numer_rejestracyjny']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historia_pojazdow');
    }
};
