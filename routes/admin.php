<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\RecapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::prefix('/settings')->group(function () {
        Route::redirect('settings', 'settings/profile');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('/password', [PasswordController::class, 'edit'])->name('password.edit');
        Route::put('/password', [PasswordController::class, 'update'])->name('password.update');

        Route::get('/appearance', function () {
            return Inertia::render('settings/appearance');
        })->name('appearance');
    });
    Route::prefix('/teachers')->group(function () {
        Route::get('/', [TeacherController::class, 'index'])->name('teachers.index');
        Route::get('/create', [TeacherController::class, 'create'])->name('teachers.create');
        Route::get('/{id}', [TeacherController::class, 'show'])->name('teachers.show');
        Route::post('/', [TeacherController::class, 'store'])->name('teachers.store');
        Route::get('/{id}/edit', [TeacherController::class, 'edit'])->name('teachers.edit');
        Route::put('/{id}', [TeacherController::class, 'update'])->name('teachers.update');
        Route::delete('/{id}', [TeacherController::class, 'destroy'])->name('teachers.destroy');
    });
    Route::prefix('/students')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('student.index');
        Route::get('/create', [StudentController::class, 'create'])->name('student.create');
        Route::post('/', [StudentController::class, 'store'])->name('student.store');
        Route::get('/{id}/edit', [StudentController::class, 'edit'])->name('student.edit');
        Route::put('/{id}', [StudentController::class, 'update'])->name('student.update');
        Route::delete('/{id}', [StudentController::class, 'destroy'])->name('student.destroy');
    });
    Route::prefix('/student-classes')->group(function () {
        Route::get('/', [StudentClassController::class, 'index'])->name('student-class.index');
        Route::get('/create', [StudentClassController::class, 'create'])->name('student-class.create');
        Route::post('/', [StudentClassController::class, 'store'])->name('student-class.store');
        Route::get('/{id}/edit', [StudentClassController::class, 'edit'])->name('student-class.edit');
        Route::put('/{id}', [StudentClassController::class, 'update'])->name('student-class.update');
        Route::delete('/{id}', [StudentClassController::class, 'destroy'])->name('student-class.destroy');
    });
    Route::prefix('/parents')->group(function () {
        Route::get('/', [StudentParentController::class, 'index'])->name('parents.index');
        Route::get('/create', [StudentParentController::class, 'create'])->name('parents.create');
        Route::post('/', [StudentParentController::class, 'store'])->name('parents.store');
        Route::get('/{id}/edit', [StudentParentController::class, 'edit'])->name('parents.edit');
        Route::put('/{id}', [StudentParentController::class, 'update'])->name('parents.update');
        Route::delete('/{id}', [StudentParentController::class, 'destroy'])->name('parents.destroy');
    });
    Route::prefix('/recap')->group(function () {
        Route::get('students', [RecapController::class, 'recap_student'])->name('recap.student');
        Route::get('teachers', [RecapController::class, 'recap_teacher'])->name('recap.teacher');
        Route::get('all', [RecapController::class, 'recap_all'])->name('recap.all');
    });
});
