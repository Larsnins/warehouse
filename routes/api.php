<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\OrderController;

// -----------------------------
// AUTH ROUTES
// -----------------------------
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/me', [AuthController::class, 'me']); // fetch current user

// -----------------------------
// ITEM ROUTES
// -----------------------------
Route::get('/items', [ItemController::class, 'index']);        // get all items
Route::get('/items/{id}', [ItemController::class, 'show']);    // get single item
Route::post('/items', [ItemController::class, 'store']);       // create item
Route::put('/items/{id}', [ItemController::class, 'update']);  // update item
Route::delete('/items/{id}', [ItemController::class, 'destroy']); // delete item

// -----------------------------
// ORDER ROUTES
// -----------------------------
Route::get('/orders', [OrderController::class, 'index']);        // get all orders
Route::get('/orders/{id}', [OrderController::class, 'show']);    // get single order
Route::post('/orders', [OrderController::class, 'store']);       // create order
Route::put('/orders/{id}', [OrderController::class, 'update']);  // update order
Route::delete('/orders/{id}', [OrderController::class, 'destroy']); // delete order
