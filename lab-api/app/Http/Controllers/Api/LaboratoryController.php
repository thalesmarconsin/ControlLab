<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LaboratoryController extends Controller
{
    public function index()
    {
        return Laboratory::withCount(['computers','equipment'])->orderBy('name')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:120'],
            'location' => ['nullable','string','max:255'],
            'capacity' => ['nullable','integer','min:0','max:500'],
            'active' => ['boolean'],
        ]);

        return response()->json(Laboratory::create($data), 201);
    }

    public function show(Laboratory $laboratory)
    {
        return $laboratory->load(['computers','equipment']);
    }

    public function update(Request $request, Laboratory $laboratory)
    {
        $data = $request->validate([
            'name' => ['sometimes','required','string','max:120'],
            'location' => ['nullable','string','max:255'],
            'capacity' => ['nullable','integer','min:0','max:500'],
            'active' => ['boolean'],
        ]);

        $laboratory->update($data);
        return $laboratory;
    }

    public function destroy(Laboratory $laboratory)
    {
        $laboratory->delete();
        return response()->noContent();
    }
}

