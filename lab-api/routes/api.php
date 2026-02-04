<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LaboratoryController;
use App\Http\Controllers\Api\ComputerController;
use App\Http\Controllers\Api\EquipmentController;


Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        
        Route::apiResource('laboratories', LaboratoryController::class);
        Route::apiResource('computers', ComputerController::class);
        Route::apiResource('equipment', EquipmentController::class);
    });
});
