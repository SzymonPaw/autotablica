<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marka extends Model
{
    use HasFactory;

    protected $table = 'marki';

    protected $fillable = ['nazwa'];

    public function modele()
    {
        return $this->hasMany(ModelPojazdu::class, 'marka_id');
    }

    public function ogloszenia()
    {
        return $this->hasMany(Ogloszenie::class, 'marka_id');
    }
}