<?php

use App\Http\Controllers\ProfileController;
use App\Models\Project;
use App\Models\Tool;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman Beranda (Landing Page)
Route::get('/', function () {
    $projects = Project::with(['category', 'tools'])->latest()->get()->map(function ($project) {
        return [
            'id' => $project->id,
            'title' => $project->title,
            'slug' => $project->slug,
            'client' => $project->client,
            'project_date' => $project->project_date,
            'description' => $project->description,
            'video_url' => $project->video_url,
            'category' => $project->category,
            'tools' => $project->tools,
            'hero_url' => $project->getFirstMediaUrl('hero_media') ?: ($project['image_path'] ?? '/images/template.svg'),
        ];
    });

    $tools = Tool::all();

    return Inertia::render('Welcome', [
        'projects' => $projects,
        'tools' => $tools,
    ]);
});

// Halaman Detail Proyek
Route::get('/project/{slug}', function ($slug) {
    $project = Project::with(['category', 'tools'])->where('slug', $slug)->firstOrFail();
    
    $projectData = [
        'id' => $project->id,
        'title' => $project->title,
        'slug' => $project->slug,
        'client' => $project->client,
        'project_date' => $project->project_date,
        'description' => $project->description,
        'process_breakdown' => $project->process_breakdown,
        'video_url' => $project->video_url,
        'category' => $project->category,
        'tools' => $project->tools,
        'hero_url' => $project->getFirstMediaUrl('hero_media') ?: ($project['image_path'] ?? '/images/template.svg'),
        'gallery_urls' => $project->getMedia('gallery')->map(function ($media) {
            return $media->getUrl();
        })->toArray(),
    ];

    // Mengambil satu proyek berikutnya untuk navigasi footer
    $nextProject = Project::where('id', '>', $project->id)->first() ?? Project::first();
    $nextProjectData = $nextProject && $nextProject->id !== $project->id ? [
        'title' => $nextProject->title,
        'slug' => $nextProject->slug,
    ] : null;

    return Inertia::render('ProjectDetail', [
        'project' => $projectData,
        'nextProject' => $nextProjectData,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
