<?php

use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::prefix('/teachers')->group(function () {
        Route::get('/', [TeacherController::class, 'index'])->name('teachers.index');
        Route::get('/create', [TeacherController::class, 'create'])->name('teachers.create');
        Route::post('/', [TeacherController::class, 'store'])->name('teachers.store');
        Route::get('/{id}/edit', [TeacherController::class, 'edit'])->name('teachers.edit');
        Route::put('/{id}', [TeacherController::class, 'update'])->name('teachers.update');
        Route::delete('/{id}', [TeacherController::class, 'destroy'])->name('teachers.destroy');
    });
});
