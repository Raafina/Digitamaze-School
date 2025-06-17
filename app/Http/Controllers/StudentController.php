<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Student;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use App\Models\StudentParent;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $classId = $request->input('student_class_id');

        $students = Student::with(['class', 'parents'])
            ->when($classId, fn($q) => $q->where('student_class_id', $classId))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $classes = StudentClass::select('id', 'name')->orderBy('name')->get();

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
        $parents = StudentParent::all();
        return Inertia::render('student/create', [
            'classes' => $classes,
            'parents' => $parents,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'student_class_id' => ['required'],
            'nis' => ['required', 'max:50', Rule::unique('students')->whereNull('deleted_at')],
            'sex' => ['required', Rule::in(['male', 'female'])],
            'date_of_birth' => ['required', 'date'],
            'address' => ['required', 'max:255'],
            'parent_id' => ['nullable', 'exists:student_parents,id'],

        ]);

        Student::create($validated);
        return redirect()->route('student.index')->with('success', 'Data Siswa berhasil ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $classes = StudentClass::all();
        $parents = StudentParent::all();
        $student = Student::findOrFail($id);
        return Inertia::render('student/edit', [
            'student' => $student,
            'classes' => $classes,
            'parents' => $parents
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'student_class_id' => ['required'],
            'nis' => ['required', 'max:50', Rule::unique('students')->ignore($id)->whereNull('deleted_at')],
            'sex' => ['required', Rule::in(['male', 'female'])],
            'date_of_birth' => ['required', 'date'],
            'address' => ['required', 'max:255'],
            'parent_id' => ['nullable', 'exists:student_parents,id'],

        ]);

        $student_class = Student::findOrFail($id);
        $student_class->update($validated);

        return redirect()->route('student.index')->with('success', 'Data Siswa berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $student_class = Student::findOrFail($id);
        $student_class->delete();

        return redirect()->route('student.index')->with('success', 'Data Siswa berhasil dihapus!');
    }
}
