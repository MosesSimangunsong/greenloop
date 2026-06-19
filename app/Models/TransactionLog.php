<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['waste_post_id', 'actor_user_id', 'action', 'notes'])]
class TransactionLog extends Model
{
    public $timestamps = false;

    protected $table = 'transaction_logs';

    public function wastePost(): BelongsTo
    {
        return $this->belongsTo(WastePost::class);
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }
}
