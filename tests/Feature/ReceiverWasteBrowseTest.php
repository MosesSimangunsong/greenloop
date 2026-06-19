<?php

namespace Tests\Feature;

use App\Enums\WastePostStatus;
use App\Models\Role;
use App\Models\User;
use App\Models\WasteCategory;
use App\Models\WastePost;
use App\Models\WasteRecommendation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReceiverWasteBrowseTest extends TestCase
{
    use RefreshDatabase;

    public function test_receiver_can_browse_available_waste_posts(): void
    {
        [$receiver] = $this->receiverContext();
        [$producer, $category] = $this->producerContext();

        WastePost::query()->create([
            'user_id' => $producer->id,
            'waste_category_id' => $category->id,
            'title' => 'Jerami tersedia',
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

        WastePost::query()->create([
            'user_id' => $producer->id,
            'waste_category_id' => $category->id,
            'title' => 'Jerami selesai',
            'description' => 'Tidak tampil di browse.',
            'quantity_kg' => 120,
            'price' => 5000,
            'is_free' => false,
            'address' => 'Balige',
            'latitude' => -2.333000,
            'longitude' => 99.066000,
            'available_date' => '2026-06-20',
            'expiry_date' => '2026-06-25',
            'status' => WastePostStatus::Completed,
            'claim_radius_km' => 25,
        ]);

        $response = $this->actingAs($receiver)->get(route('waste-posts.index'));

        $response->assertOk();
        $response->assertSee('Jerami tersedia');
        $response->assertDontSee('Jerami selesai');
    }

    public function test_receiver_can_filter_waste_posts_by_category(): void
    {
        [$receiver] = $this->receiverContext();
        [$producer] = $this->producerContext();

        $jerami = WasteCategory::query()->firstOrCreate([
            'slug' => 'jerami',
        ], [
            'name' => 'Jerami',
            'is_active' => true,
        ]);
        $kopi = WasteCategory::query()->create([
            'name' => 'Kulit kopi',
            'slug' => 'kulit-kopi',
            'is_active' => true,
        ]);

        WastePost::query()->create([
            'user_id' => $producer->id,
            'waste_category_id' => $jerami->id,
            'title' => 'Jerami Toba',
            'description' => 'Posting jerami.',
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

        WastePost::query()->create([
            'user_id' => $producer->id,
            'waste_category_id' => $kopi->id,
            'title' => 'Kulit kopi Toba',
            'description' => 'Posting kopi.',
            'quantity_kg' => 50,
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

        $response = $this->actingAs($receiver)->get(route('waste-posts.index', [
            'category_id' => $kopi->id,
        ]));

        $response->assertOk();
        $response->assertSee('Kulit kopi Toba');
        $response->assertDontSee('Jerami Toba');
    }

    public function test_receiver_can_view_waste_detail_with_recommendations(): void
    {
        [$receiver] = $this->receiverContext();
        [$producer, $category] = $this->producerContext();

        $post = WastePost::query()->create([
            'user_id' => $producer->id,
            'waste_category_id' => $category->id,
            'title' => 'Jerami untuk kompos',
            'description' => 'Cocok untuk pertanian.',
            'quantity_kg' => 70,
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

        WasteRecommendation::query()->create([
            'waste_category_id' => $category->id,
            'title' => 'Bisa dijadikan kompos',
            'description' => 'Jerami cocok sebagai bahan kompos organik.',
            'usage_type' => 'kompos',
            'is_active' => true,
        ]);

        $response = $this->actingAs($receiver)->get(route('waste-posts.show', $post));

        $response->assertOk();
        $response->assertSee('Jerami untuk kompos');
        $response->assertSee('Bisa dijadikan kompos');
        $response->assertSee('Cocok untuk kompos');
        $response->assertSee('Lokasi receiver sangat dekat dengan titik limbah.');
    }

    /**
     * @return array{0: User}
     */
    private function receiverContext(): array
    {
        $receiver = User::factory()->create([
            'latitude' => -2.334000,
            'longitude' => 99.067000,
        ]);
        $receiverRole = Role::query()->create(['name' => 'receiver']);
        $receiver->roles()->attach($receiverRole);

        return [$receiver];
    }

    /**
     * @return array{0: User, 1: WasteCategory}
     */
    private function producerContext(): array
    {
        $producer = User::factory()->create();
        $producerRole = Role::query()->firstOrCreate(['name' => 'producer']);
        $producer->roles()->attach($producerRole);

        $category = WasteCategory::query()->firstOrCreate([
            'slug' => 'jerami',
        ], [
            'name' => 'Jerami',
            'is_active' => true,
        ]);

        return [$producer, $category];
    }
}
