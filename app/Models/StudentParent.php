<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentParent extends Model
{
    protected $fillable = [
        'name',
        'jobs',
        'student_id',
    ];

    public function student()
    {
        return $this->hasMany(Student::class, 'parent_id');
    }
}
