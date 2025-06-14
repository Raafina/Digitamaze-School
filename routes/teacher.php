<?php

use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('admin')->group(function () {
    // Route::redirect('settings', 'settings/profile');
    Route::prefix('/teachers')->group(function () {
        Route::get('/', [TeacherController::class, 'index'])->name('teachers.index');
        Route::get('/create', [TeacherController::class, 'create'])->name('teachers.create');
        Route::post('/', [TeacherController::class, 'store'])->name('teachers.store');
        Route::get('/{teacher}/edit', [TeacherController::class, 'edit'])->name('teachers.edit');
        Route::put('/{teacher}', [TeacherController::class, 'update'])->name('teachers.update');
        Route::delete('/{teacher}', [TeacherController::class, 'destroy'])->name('teachers.destroy');
    });
});
