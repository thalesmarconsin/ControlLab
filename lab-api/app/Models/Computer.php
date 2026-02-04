<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Computer extends Model
{
    protected $fillable = [
        'laboratory_id',
        'asset_tag',
        'hostname',
        'cpu',
        'ram_gb',
        'storage_gb',
        'os',
        'status',
        'notes',
    ];


    public function laboratory() { return $this->belongsTo(Laboratory::class); }
}