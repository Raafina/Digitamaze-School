<?php

use App\Http\Controllers\RecapController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::prefix('/recap')->group(function () {
        Route::get('students', [RecapController::class, 'recap_student'])->name('recap.student');
        Route::get('teachers', [RecapController::class, 'recap_teacher'])->name('recap.teacher');
        Route::get('all', [RecapController::class, 'recap_all'])->name('recap.all');
    });
});
