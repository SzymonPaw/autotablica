<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OgloszenieController;
use App\Http\Controllers\Api\ZdjecieController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::get('ogloszenia', [OgloszenieController::class, 'index']);
Route::get('ogloszenia/{ogloszenie}', [OgloszenieController::class, 'show']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('ogloszenia', [OgloszenieController::class, 'store']);
    Route::patch('ogloszenia/{ogloszenie}', [OgloszenieController::class, 'update']);
    Route::delete('ogloszenia/{ogloszenie}', [OgloszenieController::class, 'destroy']);

    Route::post('ogloszenia/{ogloszenie}/zdjecia', [ZdjecieController::class, 'store']);
    Route::delete('zdjecia/{zdjecie}', [ZdjecieController::class, 'destroy']);
});
