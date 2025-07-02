<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Make query from teachers table
        $query = DB::table('teachers')
            // join to pivot depends on teachers
            ->leftJoin('teacher_student_classes', 'teachers.id', '=', 'teacher_student_classes.teacher_id')
            // join to student_classes table depends on teacher_student_classes
            ->leftJoin('student_classes', 'teacher_student_classes.student_class_id', '=', 'student_classes.id')
            // dont get deleted data
            ->whereNull('teachers.deleted_at')
            ->whereNull('student_classes.deleted_at')
            // naming columns
            ->select([
                'teachers.id as teacher_id',
                'teachers.NIP as teacher_nip',
                'teachers.name as teacher_name',
                'teachers.sex as teacher_sex',
                'teachers.email as teacher_email',
                'teachers.phone as teacher_phone',
                'teachers.subject as teacher_subject',
                'student_classes.id as class_id',
                'student_classes.name as class_name',
                'student_classes.code as class_code',
                'student_classes.period as class_period'
            ]);

        // Filter by search (teacher name, NIP, email, or subject)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('teachers.name', 'like', '%' . $search . '%')
                    ->orWhere('teachers.NIP', 'like', '%' . $search . '%')
                    ->orWhere('teachers.email', 'like', '%' . $search . '%')
                    ->orWhere('teachers.subject', 'like', '%' . $search . '%');
            });
        }

        // Filter by class
        if ($request->filled('student_class_id') && $request->student_class_id !== 'all') {
            $query->where('student_classes.id', $request->student_class_id);
        }

        $teacherClasses = $query->orderBy('teachers.created_at', 'desc')
            ->orderBy('student_classes.name')
            ->paginate(10)
            ->withQueryString();

        $studentClasses = StudentClass::select('id', 'name')->get();

        return Inertia::render('teacher/index', [
            'teacherClasses' => $teacherClasses,
            'studentClasses' => $studentClasses,
            'selectedClassId' => $request->student_class_id ? (int) $request->student_class_id : null,
            'search' => $request->search,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $studentClasses = StudentClass::select('id', 'name', 'code', 'period')
            ->orderBy('name')
            ->get();

        return Inertia::render('teacher/create', [
            'studentClasses' => $studentClasses,
        ]);
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
            'subject' => ['required', 'max:50'],
            'student_class_ids' => ['array'],
            'student_class_ids.*' => ['integer', 'exists:student_classes,id'],
        ]);

        DB::transaction(function () use ($validated) {
            $teacher = Teacher::create([
                'NIP' => $validated['NIP'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'sex' => $validated['sex'],
                'phone' => $validated['phone'],
                'subject' => $validated['subject'],
            ]);

            // attach student classes
            if (!empty($validated['student_class_ids'])) {
                $teacher->studentClasses()->attach($validated['student_class_ids']);
            }
        });

        return redirect()->route('teachers.index')
            ->with('success', 'Data guru berhasil ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $teacher = Teacher::findOrFail($id);

        $teacher->load('studentClasses');

        $studentClasses = StudentClass::select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('teacher/edit', [
            'teacher' => [
                'id' => $teacher->id,
                'NIP' => $teacher->NIP,
                'name' => $teacher->name,
                'subject' => $teacher->subject,
                'email' => $teacher->email,
                'sex' => $teacher->sex,
                'phone' => $teacher->phone,
                'student_class_ids' => $teacher->studentClasses->pluck('id')->toArray(),
            ],
            'studentClasses' => $studentClasses,
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
            'subject' => ['required', 'max:50'],
            'email' => ['required', 'email', 'max:50'],
            'sex' => ['required', Rule::in(['male', 'female'])],
            'phone' => ['required', 'max:15'],
            'student_class_ids' => ['nullable', 'array'],
            'student_class_ids.*' => ['integer', 'exists:student_classes,id'],
        ]);

        $teacher = Teacher::findOrFail($id);

        DB::transaction(function () use ($teacher, $validated) {
            $teacher->update([
                'NIP' => $validated['NIP'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'sex' => $validated['sex'],
                'phone' => $validated['phone'],
                'subject' => $validated['subject'],
            ]);

            $teacher->studentClasses()->sync($validated['student_class_ids'] ?? []);
        });

        return redirect()->route('teachers.index')
            ->with('success', 'Data guru berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        return redirect()->route('teachers.index')->with('success', 'Data Guru berhasil dihapus!');
    }
}
