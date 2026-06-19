<?php

namespace App\Services;

use App\Enums\WasteClaimStatus;
use App\Enums\WastePostStatus;
use App\Models\TransactionLog;
use App\Models\User;
use App\Models\WasteClaim;
use App\Models\WastePost;
use Illuminate\Support\Facades\DB;

class WasteClaimService
{
    /**
     * @param array<string, mixed> $data
     */
    public function create(WastePost $wastePost, User $receiver, array $data): WasteClaim
    {
        return DB::transaction(function () use ($wastePost, $receiver, $data) {
            abort_unless($this->postStatus($wastePost) === WastePostStatus::Available->value, 422, 'Posting limbah tidak tersedia.');
            abort_if($wastePost->claims()->whereIn('status', [
                WasteClaimStatus::Pending->value,
                WasteClaimStatus::Approved->value,
            ])->exists(), 422, 'Posting limbah ini sedang diproses.');

            $claim = WasteClaim::query()->create([
                'waste_post_id' => $wastePost->id,
                'producer_id' => $wastePost->user_id,
                'receiver_id' => $receiver->id,
                'status' => WasteClaimStatus::Pending,
                'receiver_message' => $data['receiver_message'] ?? null,
            ]);

            $wastePost->update(['status' => WastePostStatus::Pending]);
            $this->log($wastePost->id, $receiver->id, 'claimed');

            return $claim->fresh(['wastePost.wasteCategory', 'producer', 'receiver']);
        });
    }

    public function approve(WasteClaim $claim, User $producer): WasteClaim
    {
        return DB::transaction(function () use ($claim, $producer) {
            abort_unless($this->claimStatus($claim) === WasteClaimStatus::Pending->value, 422, 'Claim tidak bisa disetujui.');

            $claim->update([
                'status' => WasteClaimStatus::Approved,
                'approved_at' => now(),
            ]);

            $claim->wastePost()->update(['status' => WastePostStatus::Reserved]);
            $this->log($claim->waste_post_id, $producer->id, 'approved_claim');

            return $claim->fresh(['wastePost.wasteCategory', 'producer', 'receiver']);
        });
    }

    public function reject(WasteClaim $claim, User $producer): WasteClaim
    {
        return DB::transaction(function () use ($claim, $producer) {
            abort_unless($this->claimStatus($claim) === WasteClaimStatus::Pending->value, 422, 'Claim tidak bisa ditolak.');

            $claim->update([
                'status' => WasteClaimStatus::Rejected,
                'rejected_at' => now(),
            ]);

            $claim->wastePost()->update(['status' => WastePostStatus::Available]);
            $this->log($claim->waste_post_id, $producer->id, 'rejected_claim');

            return $claim->fresh(['wastePost.wasteCategory', 'producer', 'receiver']);
        });
    }

    public function complete(WasteClaim $claim, User $producer): WasteClaim
    {
        return DB::transaction(function () use ($claim, $producer) {
            abort_unless($this->claimStatus($claim) === WasteClaimStatus::Approved->value, 422, 'Claim belum siap diselesaikan.');

            $claim->update([
                'status' => WasteClaimStatus::Completed,
                'completed_at' => now(),
            ]);

            $claim->wastePost()->update(['status' => WastePostStatus::Completed]);
            $this->log($claim->waste_post_id, $producer->id, 'completed_transaction');

            return $claim->fresh(['wastePost.wasteCategory', 'producer', 'receiver']);
        });
    }

    public function cancel(WasteClaim $claim, User $receiver): WasteClaim
    {
        return DB::transaction(function () use ($claim, $receiver) {
            abort_unless($this->claimStatus($claim) === WasteClaimStatus::Pending->value, 422, 'Claim tidak bisa dibatalkan.');

            $claim->update([
                'status' => WasteClaimStatus::Cancelled,
            ]);

            $claim->wastePost()->update(['status' => WastePostStatus::Available]);
            $this->log($claim->waste_post_id, $receiver->id, 'cancelled_transaction');

            return $claim->fresh(['wastePost.wasteCategory', 'producer', 'receiver']);
        });
    }

    private function log(int $wastePostId, int $actorUserId, string $action): void
    {
        TransactionLog::query()->create([
            'waste_post_id' => $wastePostId,
            'actor_user_id' => $actorUserId,
            'action' => $action,
        ]);
    }

    private function claimStatus(WasteClaim $claim): string
    {
        return $claim->status instanceof WasteClaimStatus ? $claim->status->value : (string) $claim->status;
    }

    private function postStatus(WastePost $wastePost): string
    {
        return $wastePost->status instanceof WastePostStatus ? $wastePost->status->value : (string) $wastePost->status;
    }
}
