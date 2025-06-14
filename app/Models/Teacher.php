<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Teacher extends Model
{
    use HasFactory, SoftDeletes;

    protected $protected = [
        'id',
    ];

    protected $fillable = [
        'NIP',
        'name',
        'sex',
        'phone',
        'email',
    ];
}
