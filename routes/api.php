<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\OrderController;

// List all items
Route::get('/items', [ItemController::class, 'index']);

// Get single item
Route::get('/items/{id}', [ItemController::class, 'show']);

// Create item
Route::post('/items', [ItemController::class, 'store']);

// Update item
Route::put('/items/{id}', [ItemController::class, 'update']);

// Delete item
Route::delete('/items/{id}', [ItemController::class, 'destroy']);

// Orders API
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::post('/orders', [OrderController::class, 'store']);
