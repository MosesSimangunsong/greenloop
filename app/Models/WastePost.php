<?php

namespace App\Models;

use App\Enums\WastePostStatus;
use Illuminate\Database\Eloquent\Attributes\Casts;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'user_id',
    'waste_category_id',
    'title',
    'description',
    'quantity_kg',
    'price',
    'is_free',
    'address',
    'latitude',
    'longitude',
    'available_date',
    'expiry_date',
    'image_path',
    'status',
    'claim_radius_km',
])]
#[Casts([
    'quantity_kg' => 'decimal:2',
    'price' => 'decimal:2',
    'is_free' => 'boolean',
    'latitude' => 'decimal:6',
    'longitude' => 'decimal:6',
    'available_date' => 'date',
    'expiry_date' => 'date',
    'status' => WastePostStatus::class,
])]
class WastePost extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function wasteCategory(): BelongsTo
    {
        return $this->belongsTo(WasteCategory::class);
    }

    public function claims(): HasMany
    {
        return $this->hasMany(WasteClaim::class);
    }

    public function transactionLogs(): HasMany
    {
        return $this->hasMany(TransactionLog::class);
    }
}
