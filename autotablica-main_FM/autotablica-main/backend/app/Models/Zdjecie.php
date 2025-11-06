<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zdjecie extends Model
{
    use HasFactory;

    protected $table = 'zdjecia';

    protected $fillable = [
        'ogloszenie_id',
        'sciezka',
        'nazwa_pliku',
    ];

    public function ogloszenie()
    {
        return $this->belongsTo(Ogloszenie::class, 'ogloszenie_id');
    }
}