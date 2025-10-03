<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;

    protected $fillable = [
        'table_number',
        'floor',
        'capacity',
        'status',
        'is_active',
    ];

    protected $casts = [
        'capacity' => 'integer',
        'is_active' => 'boolean',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
