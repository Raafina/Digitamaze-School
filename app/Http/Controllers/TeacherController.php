<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $selectedClassId = $request->get('class_id');

        $teachers = Teacher::with('studentClasses')
            ->when($selectedClassId, function ($query, $classId) {
                $query->whereHas('studentClasses', function ($q) use ($classId) {
                    $q->where('student_classes.id', $classId);
                });
            })
            ->get();

        return Inertia::render('teacher/index', [
            'teachers' => $teachers,
            'studentClasses' => StudentClass::select('id', 'name')->get(),
            'selectedClassId' => $selectedClassId,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('teacher/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'NIP' => [
                'required',
                'max:255',
                Rule::unique('teachers')->whereNull('deleted_at'),
            ],
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:50'],
            'sex' => ['required', Rule::in(['male', 'female'])],
            'phone' => ['required', 'max:15'],
        ]);

        Teacher::create($validated);
        return redirect()->route('teachers.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $teacher = Teacher::findOrFail($id);
        return Inertia::render('teacher/edit', [
            'teacher' => $teacher
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'NIP' => [
                'required',
                'max:255',
                Rule::unique('teachers')
                    ->ignore($id)
                    ->whereNull('deleted_at'),
            ],
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:50'],
            'sex' => ['required', Rule::in(['male', 'female'])],
            'phone' => ['required', 'max:15'],
        ]);

        $teacher = Teacher::findOrFail($id);
        $teacher->update($validated);

        return redirect()->route('teachers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        return redirect()->route('teachers.index');
    }
}
