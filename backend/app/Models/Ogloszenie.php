<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ogloszenie extends Model
{
    use HasFactory;

    protected $table = 'ogloszenia';

    // Pozwalaj na masowe przypisanie tych pól
    protected $fillable = [
        'uzytkownik_id',
        'tytul',
        'opis',
        'cena',
        'marka_id',
        'model_id',
        'vin',
        'numer_rejestracyjny',
        'data_pierwszej_rej',
        'przebieg',
        'rodzaj_paliwa',
        'skrzynia_biegow',
        'pojemnosc_silnika',
        'status',
    ];

    public function uzytkownik()
    {
        return $this->belongsTo(User::class, 'uzytkownik_id');
    }

    public function zdjecia()
    {
        return $this->hasMany(Zdjecie::class, 'ogloszenie_id');
    }

    public function marka()
    {
        return $this->belongsTo(Marka::class, 'marka_id');
    }

    public function modelPojazdu()
    {
        return $this->belongsTo(ModelPojazdu::class, 'model_id');
    }

    public function kategorie()
    {
        return $this->belongsToMany(Kategoria::class, 'kategoria_ogloszenie', 'ogloszenie_id', 'kategoria_id');
    }

    public function ulubione()
    {
        return $this->hasMany(Ulubione::class, 'ogloszenie_id');
    }
}