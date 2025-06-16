<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class RecapController extends Controller
{

    public function recap_student()
    {
        $studentRecaps = StudentClass::with(['students:id,name,student_class_id'])
            ->paginate(10)
            ->through(function ($class) {
                return [
                    'id' => $class->id,
                    'class_name' => $class->name,
                    'student_count' => count($class->students),
                    'students' => $class->students
                        ->map(fn($student) => [
                            'id' => $student->id,
                            'name' => $student->name,
                        ])
                        ->toArray(),
                ];
            });

        return Inertia::render('recap/student', ['studentRecaps' => $studentRecaps]);
    }

    public function recap_teacher()
    {
        $teacherRecaps = StudentClass::with(['teacherStudentClasses.teacher:id,name'])
            ->paginate(10)
            ->through(function ($class) {
                return [
                    'id' => $class->id,
                    'class_name' => $class->name,
                    'teachers' => $class->teacherStudentClasses
                        ->map(fn($rel) => $rel->teacher)
                        ->filter()
                        ->map(fn($teacher) => [
                            'id' => $teacher->id,
                            'name' => $teacher->name,
                        ])
                        ->toArray(),
                ];
            });

        return Inertia::render('recap/teacher', ['teacherRecaps' => $teacherRecaps]);
    }

    public function recap_all()
    {
        $allRecaps = StudentClass::with(['students:id,name,student_class_id', 'teacherStudentClasses.teacher:id,name'])
            ->paginate(10)
            ->through(function ($class) {
                $teachers = $class->teacherStudentClasses
                    ->map(fn($rel) => $rel->teacher)
                    ->filter()
                    ->map(fn($teacher) => [
                        'id' => $teacher->id,
                        'name' => $teacher->name,
                    ])
                    ->toArray();

                $students = $class->students
                    ->map(fn($student) => [
                        'id' => $student->id,
                        'name' => $student->name,
                    ])
                    ->toArray();

                return [
                    'id' => $class->id,
                    'class_name' => $class->name,
                    'teachers' => $teachers,
                    'student_count' => count($students),
                    'students' => $students,
                ];
            });

        return Inertia::render('recap/all', [
            'allRecaps' => $allRecaps,
        ]);
    }
}
