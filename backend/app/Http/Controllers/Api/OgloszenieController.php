<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ogloszenie;

class OgloszenieController extends Controller
{
    public function index()
    {
        // Pobierz 10 najnowszych ogłoszeń
        $ogloszenia = Ogloszenie::with(['marka', 'modelPojazdu', 'zdjecia'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return response()
            ->json($ogloszenia)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}
