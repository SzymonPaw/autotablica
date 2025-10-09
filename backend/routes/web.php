<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OgloszenieController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Tutaj rejestrowane są wszystkie trasy obsługiwane przez Laravel
|
*/

// Strona główna
Route::get('/', function () {
    return view('welcome');
});

// Grupa tras API obsługiwana przez Web middleware
Route::prefix('api')->group(function () {
    // Pobieranie listy ogłoszeń
    Route::get('/ogloszenia', [OgloszenieController::class, 'index']);
});
