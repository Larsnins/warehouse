<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        return Item::all(); // Returns all items from MySQL
    }

    public function show($id)
    {
        return Item::findOrFail($id);
    }

    public function store(Request $request)
    {
        $item = Item::create($request->only(['name','stock']));
        return $item;
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $item->update($request->only(['name','stock']));
        return $item;
    }

    public function destroy($id)
    {
        Item::destroy($id);
        return response()->json(['message' => 'Item deleted']);
    }
}
