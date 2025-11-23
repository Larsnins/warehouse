<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Eloquent model for items table
class Item extends Model
{
    protected $fillable = ['name', 'stock'];
}
