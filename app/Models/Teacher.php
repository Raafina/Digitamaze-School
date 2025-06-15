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
        'subject',
    ];

    public function studentClasses()
    {
        return $this->belongsToMany(
            StudentClass::class,
            'teacher_student_classes',
            'teacher_id',
            'student_class_id'
        )->withTimestamps();
    }
}
