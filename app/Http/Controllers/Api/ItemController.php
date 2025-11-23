<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Item;

// Simple API controller for items
class ItemController extends Controller
{
    public function index()
    {
        // Return a list of items
        return Item::all();
    }

    public function show($id)
    {
        // Return single item by id
        return Item::findOrFail($id);
    }

    public function store(Request $request)
    {
        // Create a new item record
        $item = Item::create($request->only(['name','stock']));
        return $item;
    }

    public function update(Request $request, $id)
    {
        // Update an existing item record
        $item = Item::findOrFail($id);
        $item->update($request->only(['name','stock']));
        return $item;
    }

    public function destroy($id)
    {
        // Delete the item by id
        Item::destroy($id);
        return response()->json(['message' => 'Item deleted']);
    }
}
