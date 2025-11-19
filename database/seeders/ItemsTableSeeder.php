<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;

class ItemsTableSeeder extends Seeder
{
    public function run(): void
    {
        Item::truncate();

        Item::create(['name' => 'Widget A', 'stock' => 120]);
        Item::create(['name' => 'Widget B', 'stock' => 45]);
        Item::create(['name' => 'Gadget X', 'stock' => 8]);
    }
}
