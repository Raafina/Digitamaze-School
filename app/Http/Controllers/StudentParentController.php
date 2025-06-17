<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\StudentClass;
use Illuminate\Http\Request;
use App\Models\StudentParent;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parents = StudentParent::with('student')->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('parent/index', [
            'parents' => $parents
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('parent/create');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'jobs' => ['required', 'max:50'],
        ]);

        StudentParent::create($validated);

        return redirect()->route('parents.index')
            ->with('success', 'Data orang tua murid berhasil ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $parent = StudentParent::findOrFail($id);
        return Inertia::render('parent/edit', [
            'parent' => $parent
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'jobs' => ['required', 'max:50'],
        ]);

        $parent = StudentParent::findOrFail($id);
        $parent->update($validated);

        return redirect()->route('parents.index')
            ->with('success', 'Data orang tua murid berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $parent = StudentParent::findOrFail($id);
        $parent->delete();

        return redirect()->route('parents.index')->with('success', 'Data Orang Tua Murid berhasil dihapus!');
    }
}
