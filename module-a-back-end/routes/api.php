<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GameVersionController;
use App\Http\Controllers\ScoreController;
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

    Route::get('games', [GameController::class, 'index']);
    Route::get('games/{slug}', [GameController::class, 'show']);

    Route::get('games/{slug}/scores', [ScoreController::class, 'index']);

    Route::get('users/{slug}', [UserController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('games', [GameController::class, 'create']);
        Route::put('games/{slug}', [GameController::class, 'change']);
        Route::delete('games/{slug}', [GameController::class, 'delete']);

        Route::post('games/{slug}/upload', [GameVersionController ::class, 'upload']);
        Route::get('games/{slug}/{version}', [GameVersionController ::class, 'show']);

        Route::post('games/{slug}/scores', [ScoreController::class, 'create']);
    });
});