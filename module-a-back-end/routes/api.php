<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('/v1')->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::post('signin', [UserController::class, 'signin']);
        Route::post('signup', [UserController::class, 'signup']);
        
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('signout', [UserController::class, 'signout']);
        });
    });

//     Route::get('games', [GameController::class, 'index']);

//     Route::post('games', [GameController::class, 'create']);
//     Route::pug('games/{slug}', [GameController::class, 'show']);
//     Route::pug('games/{slug}', [GameController::class, 'change']);
//     Route::pug('games/{slug}', [GameController::class, 'delete']);
});