<?php

namespace Tests\Feature;

use App\Enums\WasteClaimStatus;
use App\Enums\WastePostStatus;
use App\Models\Role;
use App\Models\User;
use App\Models\WasteCategory;
use App\Models\WasteClaim;
use App\Models\WastePost;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WasteClaimFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_receiver_can_create_claim_and_post_becomes_pending(): void
    {
        [$producer, $receiver, $wastePost] = $this->claimContext();

        $this->actingAs($receiver)
            ->post(route('waste-claims.store', $wastePost), [
                'receiver_message' => 'Kami butuh untuk kompos kelompok tani.',
            ])
            ->assertRedirect(route('my-claims.index'));

        $claim = WasteClaim::query()->firstOrFail();

        $this->assertSame(WasteClaimStatus::Pending->value, (string) $claim->fresh()->status);
        $this->assertSame(WastePostStatus::Pending->value, (string) $wastePost->fresh()->status);
        $this->assertSame($producer->id, $claim->producer_id);
        $this->assertSame($receiver->id, $claim->receiver_id);
    }

    public function test_producer_can_approve_claim_and_post_becomes_reserved(): void
    {
        [$producer, $receiver, $wastePost] = $this->claimContext();
        $claim = $this->createPendingClaim($wastePost, $producer, $receiver);

        $this->actingAs($producer)
            ->patch(route('claims.approve', $claim))
            ->assertRedirect(route('incoming-claims.index'));

        $this->assertSame(WasteClaimStatus::Approved->value, (string) $claim->fresh()->status);
        $this->assertSame(WastePostStatus::Reserved->value, (string) $wastePost->fresh()->status);
    }

    public function test_producer_can_reject_claim_and_post_returns_available(): void
    {
        [$producer, $receiver, $wastePost] = $this->claimContext();
        $claim = $this->createPendingClaim($wastePost, $producer, $receiver);

        $this->actingAs($producer)
            ->patch(route('claims.reject', $claim))
            ->assertRedirect(route('incoming-claims.index'));

        $this->assertSame(WasteClaimStatus::Rejected->value, (string) $claim->fresh()->status);
        $this->assertSame(WastePostStatus::Available->value, (string) $wastePost->fresh()->status);
    }

    public function test_producer_can_complete_approved_claim_and_post_becomes_completed(): void
    {
        [$producer, $receiver, $wastePost] = $this->claimContext();
        $claim = $this->createPendingClaim($wastePost, $producer, $receiver);
        $claim->update(['status' => WasteClaimStatus::Approved, 'approved_at' => now()]);
        $wastePost->update(['status' => WastePostStatus::Reserved]);

        $this->actingAs($producer)
            ->patch(route('claims.complete', $claim))
            ->assertRedirect(route('incoming-claims.index'));

        $this->assertSame(WasteClaimStatus::Completed->value, (string) $claim->fresh()->status);
        $this->assertSame(WastePostStatus::Completed->value, (string) $wastePost->fresh()->status);
    }

    public function test_receiver_can_cancel_pending_claim_and_post_returns_available(): void
    {
        [$producer, $receiver, $wastePost] = $this->claimContext();
        $claim = $this->createPendingClaim($wastePost, $producer, $receiver);

        $this->actingAs($receiver)
            ->patch(route('claims.cancel', $claim))
            ->assertRedirect(route('my-claims.index'));

        $this->assertSame(WasteClaimStatus::Cancelled->value, (string) $claim->fresh()->status);
        $this->assertSame(WastePostStatus::Available->value, (string) $wastePost->fresh()->status);
    }

    public function test_receiver_cannot_approve_claim(): void
    {
        [$producer, $receiver, $wastePost] = $this->claimContext();
        $claim = $this->createPendingClaim($wastePost, $producer, $receiver);

        $this->actingAs($receiver)
            ->patch(route('claims.approve', $claim))
            ->assertForbidden();
    }

    public function test_producer_cannot_cancel_receivers_claim(): void
    {
        [$producer, $receiver, $wastePost] = $this->claimContext();
        $claim = $this->createPendingClaim($wastePost, $producer, $receiver);

        $this->actingAs($producer)
            ->patch(route('claims.cancel', $claim))
            ->assertForbidden();
    }

    /**
     * @return array{0: User, 1: User, 2: WastePost}
     */
    private function claimContext(): array
    {
        $producerRole = Role::query()->firstOrCreate(['name' => 'producer']);
        $receiverRole = Role::query()->firstOrCreate(['name' => 'receiver']);

        $producer = User::factory()->create();
        $producer->roles()->attach($producerRole);

        $receiver = User::factory()->create([
            'latitude' => -2.334000,
            'longitude' => 99.067000,
        ]);
        $receiver->roles()->attach($receiverRole);

        $category = WasteCategory::query()->firstOrCreate([
            'slug' => 'jerami',
        ], [
            'name' => 'Jerami',
            'is_active' => true,
        ]);

        $wastePost = WastePost::query()->create([
            'user_id' => $producer->id,
            'waste_category_id' => $category->id,
            'title' => 'Jerami claimable',
            'description' => 'Siap diambil.',
            'quantity_kg' => 100,
            'price' => 0,
            'is_free' => true,
            'address' => 'Balige',
            'latitude' => -2.333000,
            'longitude' => 99.066000,
            'available_date' => '2026-06-20',
            'expiry_date' => '2026-06-25',
            'status' => WastePostStatus::Available,
            'claim_radius_km' => 25,
        ]);

        return [$producer, $receiver, $wastePost];
    }

    private function createPendingClaim(WastePost $wastePost, User $producer, User $receiver): WasteClaim
    {
        $wastePost->update(['status' => WastePostStatus::Pending]);

        return WasteClaim::query()->create([
            'waste_post_id' => $wastePost->id,
            'producer_id' => $producer->id,
            'receiver_id' => $receiver->id,
            'status' => WasteClaimStatus::Pending,
            'receiver_message' => 'Tolong simpan untuk kami.',
        ]);
    }
}
