<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // app.blade.php -> your Vue SPA root
})->where('any', '.*');
