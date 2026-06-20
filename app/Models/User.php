<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Casts;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    'name',
    'email',
    'password',
    'phone',
    'business_name',
    'address',
    'latitude',
    'longitude',
    'location_updated_at',
    'is_active',
])]
#[Hidden(['password', 'remember_token'])]
#[Casts([
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
    'latitude' => 'float',
    'longitude' => 'float',
    'location_updated_at' => 'datetime',
    'is_active' => 'boolean',
])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    public function wastePosts(): HasMany
    {
        return $this->hasMany(WastePost::class);
    }

    public function producedClaims(): HasMany
    {
        return $this->hasMany(WasteClaim::class, 'producer_id');
    }

    public function receivedClaims(): HasMany
    {
        return $this->hasMany(WasteClaim::class, 'receiver_id');
    }

    public function transactionLogs(): HasMany
    {
        return $this->hasMany(TransactionLog::class, 'actor_user_id');
    }

    public function hasRole(string $role): bool
    {
        return $this->roles->contains('name', $role);
    }
    public function hasActiveClaimWith(int $otherUserId): bool
    {
        $asReceiver = $this->receivedClaims()
            ->where('status', 'approved')
            ->where('producer_id', $otherUserId)
            ->exists();

        $asProducer = $this->producedClaims()
            ->where('status', 'approved')
            ->where('receiver_id', $otherUserId)
            ->exists();

        return $asReceiver || $asProducer;
    }
}
