<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoriaPojazdu extends Model
{
    use HasFactory;

    public const STATUS_PENDING = 'pending';
    public const STATUS_SUCCESS = 'success';
    public const STATUS_FAILED = 'failed';
    public const STATUS_SKIPPED = 'skipped';

    protected $table = 'historia_pojazdow';

    protected $fillable = [
        'ogloszenie_id',
        'vin',
        'numer_rejestracyjny',
        'data_pierwszej_rej',
        'status',
        'payload',
        'fetched_at',
        'last_error_message',
    ];

    protected $casts = [
        'data_pierwszej_rej' => 'date',
        'payload' => 'array',
        'fetched_at' => 'datetime',
    ];

    public function ogloszenie()
    {
        return $this->belongsTo(Ogloszenie::class, 'ogloszenie_id');
    }
}
