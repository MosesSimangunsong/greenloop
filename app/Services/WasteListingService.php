<?php

namespace App\Services;

use App\Enums\WastePostStatus;
use App\Models\User;
use App\Models\WastePost;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class WasteListingService
{
    public function __construct(
        private readonly DistanceService $distanceService,
        private readonly MatchingService $matchingService,
        private readonly RecommendationService $recommendationService,
    ) {
    }

    /**
     * @param array<string, mixed> $filters
     * @return array<int, array<string, mixed>>
     */
    public function receiverListing(User $user, array $filters = []): array
    {
        $radiusKm = $this->resolveRadius($filters['radius_km'] ?? null);
        $categoryId = $filters['category_id'] ?? null;
        $userLatitude = $user->latitude !== null ? (float) $user->latitude : null;
        $userLongitude = $user->longitude !== null ? (float) $user->longitude : null;

        if (DB::connection()->getDriverName() === 'sqlite' && $userLatitude !== null && $userLongitude !== null) {
            return $this->sqliteReceiverListing($user, $filters);
        }

        $query = WastePost::query()
            ->with(['wasteCategory', 'user'])
            ->where('status', WastePostStatus::Available->value)
            ->when($categoryId, fn (Builder $builder) => $builder->where('waste_category_id', $categoryId))
            ->latest();

        if ($userLatitude !== null && $userLongitude !== null) {
            $query->selectRaw(
                'waste_posts.*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) as distance_km',
                [$userLatitude, $userLongitude, $userLatitude],
            );

            $query->whereRaw(
                '(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) <= claim_radius_km',
                [$userLatitude, $userLongitude, $userLatitude],
            );

            if ($radiusKm !== null) {
                $query->whereRaw(
                    '(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) <= ?',
                    [$userLatitude, $userLongitude, $userLatitude, $radiusKm],
                );
            }

            $query->orderBy('distance_km');
        }

        return $query
            ->get()
            ->map(fn (WastePost $wastePost) => $this->transformCard($wastePost, $user))
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    public function detail(WastePost $wastePost, ?User $viewer = null): array
    {
        $wastePost->loadMissing(['user.roles', 'wasteCategory.recommendations']);

        $distanceKm = null;
        if ($viewer?->latitude !== null && $viewer?->longitude !== null) {
            $distanceKm = $this->distanceKm(
                (float) $viewer->latitude,
                (float) $viewer->longitude,
                (float) $wastePost->latitude,
                (float) $wastePost->longitude,
            );
        }

        return [
            'id' => $wastePost->id,
            'title' => $wastePost->title,
            'description' => $wastePost->description,
            'quantity_kg' => (float) $wastePost->quantity_kg,
            'price' => (float) $wastePost->price,
            'is_free' => $wastePost->is_free,
            'address' => $wastePost->address,
            'latitude' => (float) $wastePost->latitude,
            'longitude' => (float) $wastePost->longitude,
            'available_date' => optional($wastePost->available_date)->format('Y-m-d'),
            'expiry_date' => optional($wastePost->expiry_date)->format('Y-m-d'),
            'image_url' => $wastePost->image_path ? Storage::disk('public')->url($wastePost->image_path) : null,
            'status' => $this->statusValue($wastePost->status),
            'claim_radius_km' => $wastePost->claim_radius_km,
            'distance_km' => $distanceKm,
            'matching' => $this->matchingService->evaluate($wastePost, $viewer),
            'category' => [
                'id' => $wastePost->wasteCategory->id,
                'name' => $wastePost->wasteCategory->name,
            ],
            'producer' => [
                'name' => $wastePost->user->name,
                'business_name' => $wastePost->user->business_name,
                'phone' => $wastePost->user->phone,
                'address' => $wastePost->user->address,
            ],
            'recommendations' => $this->recommendationService->forCategory($wastePost->wasteCategory),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function transformCard(WastePost $wastePost, ?User $viewer = null): array
    {
        return [
            'id' => $wastePost->id,
            'title' => $wastePost->title,
            'quantity_kg' => (float) $wastePost->quantity_kg,
            'price' => (float) $wastePost->price,
            'is_free' => $wastePost->is_free,
            'address' => $wastePost->address,
            'available_date' => optional($wastePost->available_date)->format('Y-m-d'),
            'status' => $this->statusValue($wastePost->status),
            'claim_radius_km' => $wastePost->claim_radius_km,
            'image_url' => $wastePost->image_path ? Storage::disk('public')->url($wastePost->image_path) : null,
            'category' => $wastePost->wasteCategory ? [
                'id' => $wastePost->wasteCategory->id,
                'name' => $wastePost->wasteCategory->name,
            ] : null,
            'producer' => [
                'name' => $wastePost->user->name,
                'business_name' => $wastePost->user->business_name,
            ],
            'distance_km' => isset($wastePost->distance_km) ? round((float) $wastePost->distance_km, 1) : null,
            'matching' => $this->matchingService->evaluate($wastePost, $viewer),
        ];
    }

    private function resolveRadius(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        $radius = (int) $value;

        return $radius > 0 ? $radius : null;
    }

    private function distanceKm(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        return $this->distanceService->between($lat1, $lng1, $lat2, $lng2);
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return array<int, array<string, mixed>>
     */
    private function sqliteReceiverListing(User $user, array $filters): array
    {
        $radiusKm = $this->resolveRadius($filters['radius_km'] ?? null);
        $categoryId = $filters['category_id'] ?? null;
        $userLatitude = (float) $user->latitude;
        $userLongitude = (float) $user->longitude;

        return WastePost::query()
            ->with(['wasteCategory', 'user'])
            ->where('status', WastePostStatus::Available->value)
            ->when($categoryId, fn (Builder $builder) => $builder->where('waste_category_id', $categoryId))
            ->latest()
            ->get()
            ->map(function (WastePost $wastePost) use ($radiusKm, $userLatitude, $userLongitude, $user) {
                $distance = $this->distanceKm(
                    $userLatitude,
                    $userLongitude,
                    (float) $wastePost->latitude,
                    (float) $wastePost->longitude,
                );

                if ($distance > $wastePost->claim_radius_km) {
                    return null;
                }

                if ($radiusKm !== null && $distance > $radiusKm) {
                    return null;
                }

                $card = $this->transformCard($wastePost, $user);
                $card['distance_km'] = $distance;

                return $card;
            })
            ->filter()
            ->sortBy('distance_km')
            ->values()
            ->all();
    }

    private function statusValue(mixed $status): string
    {
        return $status instanceof WastePostStatus ? $status->value : (string) $status;
    }
}
