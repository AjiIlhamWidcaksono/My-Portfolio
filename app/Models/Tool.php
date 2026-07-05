<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tool extends Model
{
    protected $fillable = ['name', 'logo_svg'];

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}
