<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{
    protected $fillable = ['name','location','capacity','active'];

    public function computers() { return $this->hasMany(Computer::class); }
    public function equipment() { return $this->hasMany(Equipment::class); }
}
