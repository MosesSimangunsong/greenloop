<?php

namespace App\Policies;

use App\Enums\WasteClaimStatus;
use App\Models\User;
use App\Models\WasteClaim;
use App\Models\WastePost;

class WasteClaimPolicy
{
    public function viewReceiverIndex(User $user): bool
    {
        return $user->hasRole('receiver');
    }

    public function viewProducerIndex(User $user): bool
    {
        return $user->hasRole('producer');
    }

    public function create(User $user, WastePost $wastePost): bool
    {
        return (new WastePostPolicy())->claim($user, $wastePost);
    }

    public function approve(User $user, WasteClaim $wasteClaim): bool
    {
        return $user->hasRole('producer') && $user->id === $wasteClaim->producer_id;
    }

    public function reject(User $user, WasteClaim $wasteClaim): bool
    {
        return $this->approve($user, $wasteClaim);
    }

    public function complete(User $user, WasteClaim $wasteClaim): bool
    {
        return $this->approve($user, $wasteClaim);
    }

    public function cancel(User $user, WasteClaim $wasteClaim): bool
    {
        $status = $wasteClaim->status instanceof WasteClaimStatus
            ? $wasteClaim->status->value
            : (string) $wasteClaim->status;

        return $user->hasRole('receiver')
            && $user->id === $wasteClaim->receiver_id
            && $status === WasteClaimStatus::Pending->value;
    }
}
