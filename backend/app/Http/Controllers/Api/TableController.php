<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Table;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index(Request $request)
    {
        $query = Table::query();

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by floor
        if ($request->has('floor')) {
            $query->where('floor', $request->floor);
        }

        // Only active tables
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        $tables = $query->orderBy('floor')->orderBy('table_number')->get();

        return response()->json($tables);
    }

    public function show($id)
    {
        $table = Table::with(['orders' => function ($query) {
            $query->where('status', '!=', 'completed')->latest();
        }])->findOrFail($id);

        return response()->json($table);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_number' => 'required|string|unique:tables,table_number',
            'floor' => 'nullable|string',
            'capacity' => 'required|integer|min:1',
            'status' => 'nullable|in:available,occupied,reserved',
            'is_active' => 'boolean',
        ]);

        $validated['status'] = $validated['status'] ?? 'available';
        $validated['is_active'] = $validated['is_active'] ?? true;

        $table = Table::create($validated);

        return response()->json($table, 201);
    }

    public function update(Request $request, $id)
    {
        $table = Table::findOrFail($id);

        $validated = $request->validate([
            'table_number' => 'sometimes|string|unique:tables,table_number,'.$id,
            'floor' => 'nullable|string',
            'capacity' => 'sometimes|integer|min:1',
            'status' => 'sometimes|in:available,occupied,reserved',
            'is_active' => 'boolean',
        ]);

        $table->update($validated);

        return response()->json($table);
    }

    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();

        return response()->json([
            'message' => 'Table deleted successfully',
        ]);
    }
}
