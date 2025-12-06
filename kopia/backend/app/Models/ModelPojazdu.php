<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelPojazdu extends Model
{
    use HasFactory;

    protected $table = 'modele';

    protected $fillable = [
        'marka_id',
        'nazwa',
    ];

    public function marka()
    {
        return $this->belongsTo(Marka::class, 'marka_id');
    }

    public function ogloszenia()
    {
        return $this->hasMany(Ogloszenie::class, 'model_id');
    }
}