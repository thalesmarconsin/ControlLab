<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $fillable = [
        'laboratory_id',
        'asset_tag',
        'type',
        'brand',
        'model',
        'serial number',
        'status',
        'purchase_date',
        'purchase_value',
        'notes',
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'purchase_value' => 'decimal:2',
    ];

    public function laboratory() { return $this->belongsTo(Laboratory::class); }
}
