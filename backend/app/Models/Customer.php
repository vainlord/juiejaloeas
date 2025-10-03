<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'total_visits',
        'total_spent',
    ];

    protected $casts = [
        'total_visits' => 'integer',
        'total_spent' => 'decimal:2',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
