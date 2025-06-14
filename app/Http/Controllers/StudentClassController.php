<?php

namespace App\Http\Controllers;

use App\Models\StudentClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;


class StudentClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $student_classes = StudentClass::all();
        return Inertia::render('student-class/index', [
            'student_classes' => $student_classes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('student-class/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => [
                'required',
                'max:255',
                Rule::unique('student_classes')->whereNull('deleted_at'),
            ],
            'name' => ['required', 'max:255'],
            'period' => ['required', 'max:50'],
        ]);

        StudentClass::create($validated);
        return redirect()->route('student-class.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $student_class = StudentClass::findOrFail($id);
        return Inertia::render('student-class/edit', [
            'student_class' => $student_class
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'code' => [
                'required',
                'max:255',
                Rule::unique('student_classes')->ignore($id)->whereNull('deleted_at'),

            ],
            'name' => ['required', 'max:255'],
            'period' => ['required', 'max:50'],
        ]);

        $student_class = StudentClass::findOrFail($id);
        $student_class->update($validated);

        return redirect()->route('student-class.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $student_class = StudentClass::findOrFail($id);
        $student_class->delete();

        return redirect()->route('student-class.index');
    }
}
