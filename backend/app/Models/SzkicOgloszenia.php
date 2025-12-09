<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SzkicOgloszenia extends Model
{
    protected $table = 'szkice_ogloszen';

    protected $fillable = [
        'uzytkownik_id',
        'tytul',
        'opis',
        'cena',
        'marka_id',
        'model_id',
        'rok_produkcji',
        'vin',
        'numer_rejestracyjny',
        'data_pierwszej_rej',
        'przebieg',
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
        'rodzaj_paliwa',
        'skrzynia_biegow',
        'pojemnosc_silnika',
    ];

    protected $casts = [
        'cena' => 'decimal:2',
        'pojemnosc_silnika' => 'decimal:2',
        'metalik' => 'boolean',
        'wypadkowy' => 'boolean',
        'zarejestrowany_w_polsce' => 'boolean',
        'pierwszy_wlasciciel' => 'boolean',
        'serwisowany_w_aso' => 'boolean',
        'bezwypadkowy' => 'boolean',
        'data_pierwszej_rej' => 'date',
    ];

    public function uzytkownik(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uzytkownik_id');
    }
}
