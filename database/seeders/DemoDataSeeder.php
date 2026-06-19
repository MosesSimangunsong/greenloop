<?php

namespace Database\Seeders;

use App\Enums\WasteClaimStatus;
use App\Enums\WastePostStatus;
use App\Models\Role;
use App\Models\TransactionLog;
use App\Models\User;
use App\Models\WasteCategory;
use App\Models\WasteClaim;
use App\Models\WastePost;
use App\Models\WasteRecommendation;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $admin = $this->user(
            'admin@greenloop.test',
            'GreenLoop Admin',
            ['admin'],
            '081200000001',
            'GreenLoop HQ',
            -2.333300,
            99.066400,
        );
        $producer = $this->user(
            'producer@greenloop.test',
            'Produsen Jerami Toba',
            ['producer'],
            '081200000002',
            'Balige, Toba',
            -2.333000,
            99.066000,
            'UMKM Jerami Toba',
        );
        $receiver = $this->user(
            'receiver@greenloop.test',
            'Penerima Kompos Toba',
            ['receiver'],
            '081200000003',
            'Laguboti, Toba',
            -2.339500,
            99.102000,
            'Koperasi Kompos Toba',
        );

        $jerami = WasteCategory::query()->firstOrCreate(
            ['slug' => 'jerami'],
            [
                'name' => 'Jerami',
                'description' => 'Sisa panen padi untuk kompos, pakan, dan mulsa.',
                'is_active' => true,
            ],
        );
        $kulitKopi = WasteCategory::query()->firstOrCreate(
            ['slug' => 'kulit-kopi'],
            [
                'name' => 'Kulit kopi',
                'description' => 'Limbah pascapanen kopi untuk kompos dan campuran media tanam.',
                'is_active' => true,
            ],
        );
        $sayur = WasteCategory::query()->firstOrCreate(
            ['slug' => 'sisa-sayur'],
            [
                'name' => 'Sisa sayur',
                'description' => 'Limbah organik pasar yang cocok untuk kompos cepat.',
                'is_active' => true,
            ],
        );

        $this->recommendation(
            $jerami,
            'Bahan kompos organik',
            'Jerami kering dapat dicacah untuk mempercepat proses kompos.',
            'kompos',
        );
        $this->recommendation(
            $kulitKopi,
            'Campuran media tanam',
            'Kulit kopi bisa dipakai sebagai campuran media tanam setelah pengeringan.',
            'kompos',
        );
        $this->recommendation(
            $sayur,
            'Pakan alternatif terbatas',
            'Sisa sayur yang masih segar dapat dipilah untuk pakan tertentu.',
            'pakan',
        );

        $availablePost = $this->post(
            $producer,
            $jerami,
            'Jerami kering siap angkut',
            WastePostStatus::Available,
            120,
            0,
            true,
            'Balige, Toba',
            -2.333000,
            99.066000,
            now()->subMonths(2),
        );
        $pendingPost = $this->post(
            $producer,
            $kulitKopi,
            'Kulit kopi grade campur',
            WastePostStatus::Pending,
            80,
            25000,
            false,
            'Balige, Toba',
            -2.334200,
            99.068500,
            now()->subMonths(1),
        );
        $reservedPost = $this->post(
            $producer,
            $sayur,
            'Sisa sayur pasar pagi',
            WastePostStatus::Reserved,
            60,
            0,
            true,
            'Porsea, Toba',
            -2.126800,
            99.176500,
            now()->subDays(20),
        );
        $completedPost = $this->post(
            $producer,
            $jerami,
            'Jerami batch Maret',
            WastePostStatus::Completed,
            95,
            15000,
            false,
            'Laguboti, Toba',
            -2.308500,
            99.117000,
            now()->subDays(8),
        );
        $inProcessPost = $this->post(
            $producer,
            $kulitKopi,
            'Kulit kopi proses pengeringan',
            WastePostStatus::InProcess,
            40,
            10000,
            false,
            'Ajibata, Toba',
            -2.650400,
            98.934200,
            now()->subDays(3),
        );

        $pendingClaim = WasteClaim::query()->firstOrCreate(
            ['waste_post_id' => $pendingPost->id, 'receiver_id' => $receiver->id],
            [
                'producer_id' => $producer->id,
                'status' => WasteClaimStatus::Pending,
                'receiver_message' => 'Siap pickup besok pagi.',
                'created_at' => now()->subDays(25),
                'updated_at' => now()->subDays(25),
            ],
        );

        $approvedClaim = WasteClaim::query()->firstOrCreate(
            ['waste_post_id' => $reservedPost->id, 'receiver_id' => $receiver->id],
            [
                'producer_id' => $producer->id,
                'status' => WasteClaimStatus::Approved,
                'receiver_message' => 'Kami butuh untuk kompos komunitas.',
                'approved_at' => now()->subDays(18),
                'created_at' => now()->subDays(19),
                'updated_at' => now()->subDays(18),
            ],
        );

        $completedClaim = WasteClaim::query()->firstOrCreate(
            ['waste_post_id' => $completedPost->id, 'receiver_id' => $receiver->id],
            [
                'producer_id' => $producer->id,
                'status' => WasteClaimStatus::Completed,
                'receiver_message' => 'Sudah dijadwalkan untuk diolah.',
                'approved_at' => now()->subDays(7),
                'completed_at' => now()->subDays(6),
                'created_at' => now()->subDays(8),
                'updated_at' => now()->subDays(6),
            ],
        );

        $this->transaction($availablePost, $producer, 'created_post', now()->subMonths(2));
        $this->transaction($pendingPost, $receiver, 'claimed', now()->subDays(25));
        $this->transaction($reservedPost, $producer, 'approved_claim', now()->subDays(18));
        $this->transaction($completedPost, $producer, 'completed_transaction', now()->subDays(6));
        $this->transaction($inProcessPost, $admin, 'monitoring_demo_flow', now()->subDays(2));

    }

    private function user(
        string $email,
        string $name,
        array $roles,
        string $phone,
        string $address,
        float $latitude,
        float $longitude,
        ?string $businessName = null,
    ): User {
        $user = User::query()->firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => 'password',
                'phone' => $phone,
                'business_name' => $businessName,
                'address' => $address,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'is_active' => true,
                'email_verified_at' => now(),
            ],
        );

        $roleIds = Role::query()->whereIn('name', $roles)->pluck('id')->all();
        $user->roles()->syncWithoutDetaching($roleIds);

        return $user;
    }

    private function recommendation(
        WasteCategory $category,
        string $title,
        string $description,
        string $usageType,
    ): void {
        WasteRecommendation::query()->firstOrCreate(
            [
                'waste_category_id' => $category->id,
                'title' => $title,
            ],
            [
                'description' => $description,
                'usage_type' => $usageType,
                'reference_notes' => 'Demo data GreenLoop',
                'is_active' => true,
            ],
        );
    }

    private function post(
        User $producer,
        WasteCategory $category,
        string $title,
        WastePostStatus $status,
        int $quantityKg,
        int $price,
        bool $isFree,
        string $address,
        float $latitude,
        float $longitude,
        $createdAt,
    ): WastePost {
        $post = WastePost::query()->firstOrCreate(
            ['title' => $title],
            [
                'user_id' => $producer->id,
                'waste_category_id' => $category->id,
                'description' => 'Data demo untuk kebutuhan presentasi GreenLoop.',
                'quantity_kg' => $quantityKg,
                'price' => $price,
                'is_free' => $isFree,
                'address' => $address,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'available_date' => now()->toDateString(),
                'expiry_date' => now()->addDays(10)->toDateString(),
                'status' => $status,
                'claim_radius_km' => 30,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ],
        );

        $post->forceFill([
            'status' => $status,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ])->save();

        return $post;
    }

    private function transaction(WastePost $post, User $actor, string $action, $createdAt): void
    {
        $log = TransactionLog::query()->firstOrCreate(
            [
                'waste_post_id' => $post->id,
                'actor_user_id' => $actor->id,
                'action' => $action,
            ],
            [
                'notes' => 'Demo activity log',
                'created_at' => $createdAt,
            ],
        );

        $log->forceFill(['created_at' => $createdAt])->save();
    }
}
