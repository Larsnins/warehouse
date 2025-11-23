<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Eloquent model for orders table
class Order extends Model
{
    protected $fillable = [
        'reference',
        'data'
    ];

    protected $casts = [
        'data' => 'array'
    ];
}
