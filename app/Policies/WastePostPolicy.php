<?php

namespace App\Policies;

use App\Enums\WasteClaimStatus;
use App\Enums\WastePostStatus;
use App\Models\User;
use App\Models\WastePost;

class WastePostPolicy
{
    public function viewProducerIndex(User $user): bool
    {
        return $user->hasRole('producer');
    }

    public function viewReceiverIndex(User $user): bool
    {
        return $user->hasRole('receiver');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('producer');
    }

    public function view(User $user, WastePost $wastePost): bool
    {
        return $user->id === $wastePost->user_id || $user->hasRole('receiver');
    }

    public function update(User $user, WastePost $wastePost): bool
    {
        return $user->hasRole('producer')
            && $user->id === $wastePost->user_id
            && ! $wastePost->claims()->exists();
    }

    public function delete(User $user, WastePost $wastePost): bool
    {
        return $user->hasRole('producer')
            && $user->id === $wastePost->user_id
            && ! $wastePost->claims()->exists();
    }

    public function claim(User $user, WastePost $wastePost): bool
    {
        if (! $user->hasRole('receiver') || $user->id === $wastePost->user_id) {
            return false;
        }

        $status = $wastePost->status instanceof WastePostStatus
            ? $wastePost->status->value
            : (string) $wastePost->status;

        if ($status !== WastePostStatus::Available->value) {
            return false;
        }

        return ! $wastePost->claims()
            ->where('receiver_id', $user->id)
            ->whereIn('status', [
                WasteClaimStatus::Pending->value,
                WasteClaimStatus::Approved->value,
            ])->exists();
    }
}
