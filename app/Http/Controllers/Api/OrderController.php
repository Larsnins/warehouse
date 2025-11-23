<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

// Simple API controller for orders
class OrderController extends Controller
{
    public function index()
    {
        // Return a list of orders
        return Order::orderBy('id', 'desc')->get();
    }

    public function show($id)
    {
        // Return single order by id
        return Order::findOrFail($id);
    }

    public function store(Request $request)
    {
        // Create a new order record
        $data = $request->validate(['reference' => 'nullable|string', 'data' => 'nullable|array']);
        $order = Order::create($data);
        return response()->json($order, 201);
    }
}
