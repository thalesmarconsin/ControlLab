<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreComputerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'laboratory_id' => ['required', 'integer', 'exists:laboratories,id'],

            'asset_tag' => ['required', 'string', 'max:50', 'unique:computers,asset_tag'],
            'hostname' => ['nullable', 'string', 'max:120'],

            'cpu' => ['nullable', 'string', 'max:120'],
            'ram_gb' => ['nullable', 'integer', 'min:1', 'max:512'],
            'storage_gb' => ['nullable', 'integer', 'min:1', 'max:8192'],
            'os' => ['nullable', 'string', 'max:80'],

            'status' => ['required', 'in:active,maintenance,retired'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
