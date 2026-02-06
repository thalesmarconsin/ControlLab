<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Models\Equipment;

class EquipmentController extends Controller
{
    public function index()
    {
        return Equipment::with('laboratory')
            ->orderBy('type')
            ->orderBy('asset_tag')
            ->get();
    }

    public function store(StoreEquipmentRequest $request)
    {
        $equipment = Equipment::create($request->validated());

        return response()->json($equipment, 201);
    }

    public function show(Equipment $equipment)
    {
        return $equipment->load('laboratory');
    }

    public function update(UpdateEquipmentRequest $request, Equipment $equipment)
    {
        $equipment->update($request->validated());

        return $equipment->fresh()->load('laboratory');
    }

    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return response()->noContent();
    }
}
