<?php

use App\Http\Controllers\StudentParentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::prefix('/parents')->group(function () {
        Route::get('/', [StudentParentController::class, 'index'])->name('parents.index');
        Route::get('/create', [StudentParentController::class, 'create'])->name('parents.create');
        Route::post('/', [StudentParentController::class, 'store'])->name('parents.store');
        Route::get('/{id}/edit', [StudentParentController::class, 'edit'])->name('parents.edit');
        Route::put('/{id}', [StudentParentController::class, 'update'])->name('parents.update');
        Route::delete('/{id}', [StudentParentController::class, 'destroy'])->name('parents.destroy');
    });
});
