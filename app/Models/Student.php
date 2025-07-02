<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [
        'id'
    ];

    protected $fillable = [
        'nis',
        'name',
        'sex',
        'date_of_birth',
        'address',
        'student_class_id',
        'parent_id'
    ];

    public function class()
    {
        return $this->belongsTo(StudentClass::class, 'student_class_id');
    }

    public function parents()
    {
        return $this->belongsTo(StudentParent::class, 'parent_id');
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->where('name', 'like', '%' . $search . '%')
        );

        $query->when(
            $filters['student_class_id'] ?? false,
            fn($query, $student_class_id) =>
            $query->where('student_class_id', $student_class_id)
        );
    }
}
