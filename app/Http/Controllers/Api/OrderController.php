<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::orderBy('id', 'desc')->get();
    }

    public function show($id)
    {
        return Order::findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate(['reference' => 'nullable|string', 'data' => 'nullable|array']);
        $order = Order::create($data);
        return response()->json($order, 201);
    }
}
