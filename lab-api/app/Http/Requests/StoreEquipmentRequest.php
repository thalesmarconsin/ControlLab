<?php
// app/Http/Requests/StoreEquipmentRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEquipmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'asset_tag' => [
                'required',
                'string',
                'max:50',
                Rule::unique('equipment')
            ],
            'type' => 'required|string|max:50',
            'brand' => 'nullable|string|max:100',
            'model' => 'nullable|string|max:100',
            'serial_number' => 'nullable|string|max:100',
            'laboratory_id' => 'required|exists:laboratories,id',
            'status' => [
                'required',
                Rule::in(['active', 'maintenance', 'retired'])
            ],
            'purchase_date' => 'nullable|date',
            'purchase_value' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'asset_tag.required' => 'O patrimônio é obrigatório.',
            'asset_tag.unique' => 'Este patrimônio já está cadastrado.',
            'type.required' => 'O tipo de equipamento é obrigatório.',
            'laboratory_id.required' => 'O laboratório é obrigatório.',
            'laboratory_id.exists' => 'O laboratório informado não existe.',
            'status.required' => 'O status é obrigatório.',
            'status.in' => 'Status inválido. Use: active, maintenance ou retired.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'brand' => $this->brand ?: null,
            'model' => $this->model ?: null,
            'serial_number' => $this->serial_number ?: null,
            'purchase_date' => $this->purchase_date ?: null,
            'purchase_value' => $this->purchase_value ?: null,
            'notes' => $this->notes ?: null,
        ]);
    }
}