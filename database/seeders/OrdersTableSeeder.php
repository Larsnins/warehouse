<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;

class OrdersTableSeeder extends Seeder
{
    public function run(): void
    {
        Order::truncate();

        Order::create(['reference' => 'ORD-1001', 'data' => ['total' => 199.99]]);
        Order::create(['reference' => 'ORD-1002', 'data' => ['total' => 49.5]]);
    }
}
