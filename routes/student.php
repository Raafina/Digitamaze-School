<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::prefix('/students')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('student.index');
        Route::get('/create', [StudentController::class, 'create'])->name('student.create');
        Route::post('/', [StudentController::class, 'store'])->name('student.store');
        Route::get('/{id}/edit', [StudentController::class, 'edit'])->name('student.edit');
        Route::put('/{id}', [StudentController::class, 'update'])->name('student.update');
        Route::delete('/{id}', [StudentController::class, 'destroy'])->name('student.destroy');
    });
});
