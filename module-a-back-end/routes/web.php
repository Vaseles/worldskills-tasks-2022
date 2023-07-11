<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::prefix('/XX-module-a/admin')->group(function () {
    // login
    Route::get('/login', [AdminController::class, 'login']);
    Route::post('/login', [AdminController::class, 'auth']);

    // home page
    Route::get('/', [AdminController::class, 'home']);
});