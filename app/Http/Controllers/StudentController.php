<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Student;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $classId = $request->input('class_id');
        $students = Student::with('class')
            ->when($classId, fn($q) => $q->where('class_id', $classId))
            ->get();

        $classes = StudentClass::select('id', 'name')->get();
        return Inertia::render('student/index', [
            'students' => $students,
            'classes' => $classes,
            'selectedClass' => $classId,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $classes = StudentClass::all();
        return Inertia::render('student/create', [
            'classes' => $classes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'class_id' => ['required'],
            'nis' => ['required', 'max:50', Rule::unique('students')->whereNull('deleted_at')],
            'sex' => ['required', Rule::in(['male', 'female'])],
            'date_of_birth' => ['required', 'date'],
            'address' => ['required', 'max:255'],

        ]);

        Student::create($validated);
        return redirect()->route('student.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $classes = StudentClass::all();
        $student = Student::findOrFail($id);
        return Inertia::render('student/edit', [
            'student' => $student,
            'classes' => $classes
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'class_id' => ['required'],
            'nis' => ['required', 'max:50', Rule::unique('students')->ignore($id)->whereNull('deleted_at')],
            'sex' => ['required', Rule::in(['male', 'female'])],
            'date_of_birth' => ['required', 'date'],
            'address' => ['required', 'max:255'],

        ]);

        $student_class = Student::findOrFail($id);
        $student_class->update($validated);

        return redirect()->route('student.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $student_class = Student::findOrFail($id);
        $student_class->delete();

        return redirect()->route('student.index');
    }
}
