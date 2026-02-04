<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComputerRequest;
use App\Http\Requests\UpdateComputerRequest;
use App\Models\Computer;

class ComputerController extends Controller
{
    public function index()
    {
        return Computer::with('laboratory')
            ->orderBy('asset_tag')
            ->get();
    }

    public function store(StoreComputerRequest $request)
    {
        $computer = Computer::create($request->validated());

        return response()->json($computer, 201);
    }

    public function show(Computer $computer)
    {
        return $computer->load('laboratory');
    }

    public function update(UpdateComputerRequest $request, Computer $computer)
    {
        $computer->update($request->validated());

        return $computer->fresh()->load('laboratory');
    }

    public function destroy(Computer $computer)
    {
        $computer->delete();

        return response()->noContent();
    }
}
