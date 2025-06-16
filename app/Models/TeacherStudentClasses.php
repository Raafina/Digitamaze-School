<?php

namespace App\Models;

use App\Models\Teacher;
use App\Models\StudentClass;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TeacherStudentClasses extends Model
{
    use HasFactory;
    protected $guarded = [
        'id'
    ];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function studentClass()
    {
        return $this->belongsTo(StudentClass::class);
    }
}
