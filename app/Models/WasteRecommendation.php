<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Casts;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'waste_category_id',
    'title',
    'description',
    'usage_type',
    'reference_notes',
    'is_active',
])]
#[Casts(['is_active' => 'boolean'])]
class WasteRecommendation extends Model
{
    public function wasteCategory(): BelongsTo
    {
        return $this->belongsTo(WasteCategory::class);
    }
}
