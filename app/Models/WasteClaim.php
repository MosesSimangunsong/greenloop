<?php

namespace App\Models;

use App\Enums\WasteClaimStatus;
use Illuminate\Database\Eloquent\Attributes\Casts;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'waste_post_id',
    'producer_id',
    'receiver_id',
    'status',
    'receiver_message',
    'approved_at',
    'rejected_at',
    'completed_at',
])]
class WasteClaim extends Model
{
    protected function casts(): array
    {
        return [
            'status' => WasteClaimStatus::class,
            'approved_at' => 'datetime',
            'rejected_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }
    public function wastePost(): BelongsTo
    {
        return $this->belongsTo(WastePost::class);
    }

    public function producer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'producer_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
