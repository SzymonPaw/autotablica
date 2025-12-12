<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OgloszenieController;
use App\Http\Controllers\Api\SlownikController;
use App\Http\Controllers\Api\SzkicOgloszeniaController;
use App\Http\Controllers\Api\UlubioneController;
use App\Http\Controllers\Api\ZdjecieController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:auth-login');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
        Route::patch('me', [AuthController::class, 'update']);
        Route::delete('me', [AuthController::class, 'destroy']);
        Route::post('password', [AuthController::class, 'changePassword']);
    });
});

Route::get('ogloszenia', [OgloszenieController::class, 'index']);
Route::get('ogloszenia/{ogloszenie}', [OgloszenieController::class, 'show'])
    ->whereNumber('ogloszenie');

Route::prefix('slowniki')->group(function (): void {
    Route::get('marki', [SlownikController::class, 'marki']);
    Route::get('modele', [SlownikController::class, 'modele']);
});

// Tymczasowo: zezwól na dodawanie ogłoszeń bez logowania
Route::post('ogloszenia', [OgloszenieController::class, 'store']);
Route::post('ogloszenia/{ogloszenie}/zdjecia', [ZdjecieController::class, 'store'])->middleware('throttle:upload-images');

// Szkice ogłoszeń - tymczasowo publiczne
Route::get('szkice-ogloszen', [SzkicOgloszeniaController::class, 'index']);
Route::post('szkice-ogloszen', [SzkicOgloszeniaController::class, 'store']);
Route::get('szkice-ogloszen/{szkicOgloszenia}', [SzkicOgloszeniaController::class, 'show']);
Route::patch('szkice-ogloszen/{szkicOgloszenia}', [SzkicOgloszeniaController::class, 'update']);
Route::delete('szkice-ogloszen/{szkicOgloszenia}', [SzkicOgloszeniaController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('ogloszenia/moje', [OgloszenieController::class, 'my']);
    Route::patch('ogloszenia/{ogloszenie}', [OgloszenieController::class, 'update']);
    Route::delete('ogloszenia/{ogloszenie}', [OgloszenieController::class, 'destroy']);

    // Upload zdjęć wymagał logowania — tymczasowo dostępny publicznie (patrz wyżej)
    Route::delete('zdjecia/{zdjecie}', [ZdjecieController::class, 'destroy']);

    Route::get('ulubione', [UlubioneController::class, 'index']);
    Route::post('ogloszenia/{ogloszenie}/ulubione', [UlubioneController::class, 'store']);
    Route::delete('ogloszenia/{ogloszenie}/ulubione', [UlubioneController::class, 'destroy']);
});
