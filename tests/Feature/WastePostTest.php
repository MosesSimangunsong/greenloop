<?php

namespace Tests\Feature;

use App\Enums\WastePostStatus;
use App\Models\Role;
use App\Models\User;
use App\Models\WasteCategory;
use App\Models\WasteClaim;
use App\Models\WastePost;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class WastePostTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_producer_cannot_open_create_waste_post_page(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('waste-posts.create'))
            ->assertForbidden();
    }

    public function test_producer_can_create_waste_post(): void
    {
        Storage::fake('public');

        $producer = User::factory()->create();
        $role = Role::query()->create(['name' => 'producer']);
        $producer->roles()->attach($role);
        $category = WasteCategory::query()->create([
            'name' => 'Jerami',
            'slug' => 'jerami',
            'is_active' => true,
        ]);

        $response = $this->actingAs($producer)->post(route('waste-posts.store'), [
            'title' => 'Jerami padi kering',
            'waste_category_id' => $category->id,
            'description' => 'Siap diambil dari gudang.',
            'quantity_kg' => 150,
            'price' => 0,
            'is_free' => true,
            'address' => 'Balige, Kabupaten Toba',
            'latitude' => -2.333333,
            'longitude' => 99.066667,
            'available_date' => '2026-06-20',
            'expiry_date' => '2026-06-27',
            'claim_radius_km' => 25,
            'image' => UploadedFile::fake()->image('waste.jpg'),
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('waste_posts', [
            'title' => 'Jerami padi kering',
            'user_id' => $producer->id,
            'status' => WastePostStatus::Available->value,
        ]);
    }

    public function test_producer_can_delete_waste_post_without_claims(): void
    {
        Storage::fake('public');

        $producer = User::factory()->create();
        $role = Role::query()->create(['name' => 'producer']);
        $producer->roles()->attach($role);
        $category = WasteCategory::query()->create([
            'name' => 'Jerami',
            'slug' => 'jerami',
            'is_active' => true,
        ]);

        $wastePost = WastePost::query()->create([
            'user_id' => $producer->id,
            'waste_category_id' => $category->id,
            'title' => 'Sisa makanan hotel',
            'description' => 'Masih segar untuk pakan.',
            'quantity_kg' => 50,
            'price' => 10000,
            'is_free' => false,
            'address' => 'Laguboti, Kabupaten Toba',
            'latitude' => -2.100000,
            'longitude' => 99.050000,
            'available_date' => '2026-06-20',
            'expiry_date' => '2026-06-21',
            'status' => WastePostStatus::Available,
            'claim_radius_km' => 20,
        ]);

        $this->actingAs($producer)
            ->delete(route('my-posts.destroy', $wastePost))
            ->assertRedirect(route('my-posts.index'));

        $this->assertDatabaseMissing('waste_posts', [
            'id' => $wastePost->id,
        ]);
    }

    public function test_non_owner_producer_cannot_delete_another_users_waste_post(): void
    {
        $role = Role::query()->create(['name' => 'producer']);
        $owner = User::factory()->create();
        $owner->roles()->attach($role);
        $otherProducer = User::factory()->create();
        $otherProducer->roles()->attach($role);

        $category = WasteCategory::query()->create([
            'name' => 'Jerami',
            'slug' => 'jerami',
            'is_active' => true,
        ]);

        $wastePost = WastePost::query()->create([
            'user_id' => $owner->id,
            'waste_category_id' => $category->id,
            'title' => 'Posting milik owner',
            'description' => 'Tidak boleh dihapus user lain.',
            'quantity_kg' => 30,
            'price' => 0,
            'is_free' => true,
            'address' => 'Balige',
            'latitude' => -2.333000,
            'longitude' => 99.066000,
            'available_date' => '2026-06-20',
            'expiry_date' => '2026-06-21',
            'status' => WastePostStatus::Available,
            'claim_radius_km' => 20,
        ]);

        $this->actingAs($otherProducer)
            ->delete(route('my-posts.destroy', $wastePost))
            ->assertForbidden();
    }

    public function test_producer_cannot_update_claimed_waste_post(): void
    {
        $producerRole = Role::query()->firstOrCreate(['name' => 'producer']);
        $receiverRole = Role::query()->firstOrCreate(['name' => 'receiver']);

        $producer = User::factory()->create();
        $producer->roles()->attach($producerRole);

        $receiver = User::factory()->create();
        $receiver->roles()->attach($receiverRole);

        $category = WasteCategory::query()->create([
            'name' => 'Jerami',
            'slug' => 'jerami',
            'is_active' => true,
        ]);

        $wastePost = WastePost::query()->create([
            'user_id' => $producer->id,
            'waste_category_id' => $category->id,
            'title' => 'Posting sudah di-claim',
            'description' => 'Tidak boleh diedit.',
            'quantity_kg' => 30,
            'price' => 0,
            'is_free' => true,
            'address' => 'Balige',
            'latitude' => -2.333000,
            'longitude' => 99.066000,
            'available_date' => '2026-06-20',
            'expiry_date' => '2026-06-21',
            'status' => WastePostStatus::Pending,
            'claim_radius_km' => 20,
        ]);

        WasteClaim::query()->create([
            'waste_post_id' => $wastePost->id,
            'producer_id' => $producer->id,
            'receiver_id' => $receiver->id,
            'status' => 'pending',
        ]);

        $this->actingAs($producer)
            ->patch(route('my-posts.update', $wastePost), [
                'title' => 'Judul baru',
                'waste_category_id' => $category->id,
                'description' => 'Percobaan edit.',
                'quantity_kg' => 25,
                'price' => 0,
                'is_free' => true,
                'address' => 'Balige',
                'latitude' => -2.333000,
                'longitude' => 99.066000,
                'available_date' => '2026-06-20',
                'expiry_date' => '2026-06-21',
                'claim_radius_km' => 20,
            ])
            ->assertForbidden();
    }
}
