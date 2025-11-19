<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        return Item::orderBy('id', 'desc')->get();
    }

    public function show($id)
    {
        return Item::findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|string', 'stock' => 'nullable|integer']);
        $item = Item::create($data);
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate(['name' => 'required|string', 'stock' => 'nullable|integer']);
        $item = Item::findOrFail($id);
        $item->update($data);
        return $item;
    }

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}
