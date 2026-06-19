<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use App\Models\WasteCategory;
use App\Models\WasteRecommendation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_cannot_access_admin_dashboard(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertForbidden();
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = $this->adminUser();

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk();
    }

    public function test_admin_can_access_analytics_page(): void
    {
        $admin = $this->adminUser();

        $this->actingAs($admin)
            ->get(route('admin.analytics.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Analytics'));
    }

    public function test_admin_can_create_and_update_category(): void
    {
        $admin = $this->adminUser();

        $this->actingAs($admin)
            ->post(route('admin.categories.store'), [
                'name' => 'Ampas tahu',
                'description' => 'Limbah organik dari produksi tahu.',
                'is_active' => true,
            ])
            ->assertRedirect(route('admin.categories.index'));

        $category = WasteCategory::query()->where('slug', 'ampas-tahu')->firstOrFail();

        $this->actingAs($admin)
            ->patch(route('admin.categories.update', $category), [
                'name' => 'Ampas tahu basah',
                'description' => 'Sudah diperbarui.',
                'is_active' => false,
            ])
            ->assertRedirect(route('admin.categories.index'));

        $category->refresh();

        $this->assertSame('ampas-tahu-basah', $category->slug);
        $this->assertFalse((bool) $category->is_active);
    }

    public function test_admin_can_create_and_update_recommendation(): void
    {
        $admin = $this->adminUser();
        $category = WasteCategory::query()->create([
            'name' => 'Jerami',
            'slug' => 'jerami',
            'is_active' => true,
        ]);

        $this->actingAs($admin)
            ->post(route('admin.recommendations.store'), [
                'waste_category_id' => $category->id,
                'title' => 'Bisa dijadikan pakan',
                'description' => 'Jerami cocok untuk campuran pakan ternak.',
                'usage_type' => 'pakan',
                'reference_notes' => 'Catatan awal',
                'is_active' => true,
            ])
            ->assertRedirect(route('admin.recommendations.index'));

        $recommendation = WasteRecommendation::query()->firstOrFail();

        $this->actingAs($admin)
            ->patch(route('admin.recommendations.update', $recommendation), [
                'waste_category_id' => $category->id,
                'title' => 'Bisa dijadikan kompos',
                'description' => 'Jerami cocok untuk kompos.',
                'usage_type' => 'kompos',
                'reference_notes' => 'Catatan revisi',
                'is_active' => false,
            ])
            ->assertRedirect(route('admin.recommendations.index'));

        $recommendation->refresh();

        $this->assertSame('Bisa dijadikan kompos', $recommendation->title);
        $this->assertFalse((bool) $recommendation->is_active);
    }

    private function adminUser(): User
    {
        $admin = User::factory()->create();
        $role = Role::query()->firstOrCreate(['name' => 'admin']);
        $admin->roles()->attach($role);

        return $admin;
    }
}
