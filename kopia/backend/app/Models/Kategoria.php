<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategoria extends Model
{
    use HasFactory;

    protected $table = 'kategorie';

    protected $fillable = ['nazwa'];

    public function ogloszenia()
    {
        return $this->belongsToMany(
            Ogloszenie::class,
            'kategoria_ogloszenie',
            'kategoria_id',
            'ogloszenie_id'
        );
    }
}