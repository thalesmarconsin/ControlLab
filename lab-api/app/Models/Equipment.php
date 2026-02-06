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
        'status',
        'notes',
    ];

    public function laboratory() { return $this->belongsTo(Laboratory::class); }
}
