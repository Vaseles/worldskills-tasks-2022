<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::prefix('/XX-module-a/admin')->group(function () {
    // login
    Route::get('/login', [AdminController::class, 'login'])->name('login');
    Route::post('/login', [AdminController::class, 'auth']);

    // home page
    // Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [AdminController::class, 'home']);
        Route::get('/games/{slug}/delete', [AdminController::class, 'game_delete']);
    // });
});