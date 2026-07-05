<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Project extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'client',
        'project_date',
        'description',
        'process_breakdown',
        'video_url',
        'image_path',
        'featured'
    ];

    protected $casts = [
        'project_date' => 'date',
        'featured' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tools(): BelongsToMany
    {
        return $this->belongsToMany(Tool::class);
    }
}
