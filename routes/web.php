<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WasteClaimController;
use App\Http\Controllers\WastePostController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/my-posts', [WastePostController::class, 'myPosts'])->name('my-posts.index');
    Route::get('/my-claims', [WasteClaimController::class, 'myClaims'])->name('my-claims.index');
    Route::get('/incoming-claims', [WasteClaimController::class, 'incomingClaims'])->name('incoming-claims.index');
    Route::get('/waste-posts', [WastePostController::class, 'receiverIndex'])->name('waste-posts.index');
    Route::get('/waste-posts/create', [WastePostController::class, 'create'])->name('waste-posts.create');
    Route::post('/waste-posts', [WastePostController::class, 'store'])->name('waste-posts.store');
    Route::get('/waste-posts/{wastePost}', [WastePostController::class, 'show'])->name('waste-posts.show');
    Route::post('/waste-posts/{wastePost}/claims', [WasteClaimController::class, 'store'])->name('waste-claims.store');
    Route::get('/my-posts/{wastePost}/edit', [WastePostController::class, 'edit'])->name('my-posts.edit');
    Route::patch('/my-posts/{wastePost}', [WastePostController::class, 'update'])->name('my-posts.update');
    Route::delete('/my-posts/{wastePost}', [WastePostController::class, 'destroy'])->name('my-posts.destroy');
    Route::patch('/claims/{wasteClaim}/approve', [WasteClaimController::class, 'approve'])->name('claims.approve');
    Route::patch('/claims/{wasteClaim}/reject', [WasteClaimController::class, 'reject'])->name('claims.reject');
    Route::patch('/claims/{wasteClaim}/complete', [WasteClaimController::class, 'complete'])->name('claims.complete');
    Route::patch('/claims/{wasteClaim}/cancel', [WasteClaimController::class, 'cancel'])->name('claims.cancel');
});

Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users.index');
    Route::get('/waste-posts', [AdminController::class, 'wastePosts'])->name('admin.waste-posts.index');
    Route::get('/claims', [AdminController::class, 'claims'])->name('admin.claims.index');
    Route::get('/categories', [AdminController::class, 'categories'])->name('admin.categories.index');
    Route::post('/categories', [AdminController::class, 'storeCategory'])->name('admin.categories.store');
    Route::patch('/categories/{wasteCategory}', [AdminController::class, 'updateCategory'])->name('admin.categories.update');
    Route::get('/recommendations', [AdminController::class, 'recommendations'])->name('admin.recommendations.index');
    Route::post('/recommendations', [AdminController::class, 'storeRecommendation'])->name('admin.recommendations.store');
    Route::patch('/recommendations/{wasteRecommendation}', [AdminController::class, 'updateRecommendation'])->name('admin.recommendations.update');
    Route::get('/analytics', [AdminController::class, 'analytics'])->name('admin.analytics.index');
});

require __DIR__.'/auth.php';
