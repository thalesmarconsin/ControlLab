<?php
// app/Http/Requests/UpdateEquipmentRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEquipmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'asset_tag' => [
                'sometimes',
                'string',
                'max:50',
                Rule::unique('equipment')->ignore($this->route('equipment'))
            ],
            'type' => 'sometimes|string|max:50',
            'brand' => 'nullable|string|max:100',
            'model' => 'nullable|string|max:100',
            'serial_number' => 'nullable|string|max:100',
            'laboratory_id' => 'sometimes|exists:laboratories,id',
            'status' => [
                'sometimes',
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
            'asset_tag.unique' => 'Este patrimônio já está cadastrado.',
            'laboratory_id.exists' => 'O laboratório informado não existe.',
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