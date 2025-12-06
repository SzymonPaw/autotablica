<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ulubione extends Model
{
    use HasFactory;

    protected $table = 'ulubione';

    protected $fillable = [
        'uzytkownik_id',
        'ogloszenie_id',
    ];

    public function uzytkownik()
    {
        return $this->belongsTo(User::class, 'uzytkownik_id');
    }

    public function ogloszenie()
    {
        return $this->belongsTo(Ogloszenie::class, 'ogloszenie_id');
    }
}