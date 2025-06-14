<?php

use App\Http\Controllers\StudentClassController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::prefix('/student-classes')->group(function () {
        Route::get('/', [StudentClassController::class, 'index'])->name('student-class.index');
        Route::get('/create', [StudentClassController::class, 'create'])->name('student-class.create');
        Route::post('/', [StudentClassController::class, 'store'])->name('student-class.store');
        Route::get('/{id}/edit', [StudentClassController::class, 'edit'])->name('student-class.edit');
        Route::put('/{id}', [StudentClassController::class, 'update'])->name('student-class.update');
        Route::delete('/{id}', [StudentClassController::class, 'destroy'])->name('student-class.destroy');
    });
});
