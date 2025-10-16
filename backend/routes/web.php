<?php

use Illuminate\Support\Facades\Route;

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


