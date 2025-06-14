<?php

namespace App\Models;

use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudentClass extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [
        'id'
    ];

    protected $fillable = [
        'code',
        'name',
        'period'
    ];

    protected static function booted()
    {
        static::deleting(function ($kelas) {
            if ($kelas->isForceDeleting()) {
                $kelas->students()->forceDelete();
            } else {
                $kelas->students()->delete();
            }
        });

        static::restoring(function ($kelas) {
            $kelas->students()->withTrashed()->restore();
        });
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'class_teacher');
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
