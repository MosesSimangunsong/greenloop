<?php

namespace App\Services;

use App\Enums\WastePostStatus;
use App\Models\TransactionLog;
use App\Models\User;
use App\Models\WastePost;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class WastePostService
{
    /**
     * @param array<string, mixed> $data
     */
    public function create(User $user, array $data): WastePost
    {
        return DB::transaction(function () use ($user, $data) {
            $wastePost = new WastePost();
            $wastePost->fill($this->normalizePayload($data));
            $wastePost->user()->associate($user);
            $wastePost->status = WastePostStatus::Available;
            $wastePost->save();

            $this->log($wastePost, $user, 'created_post');

            return $wastePost->fresh(['wasteCategory', 'user']);
        });
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(WastePost $wastePost, array $data): WastePost
    {
        return DB::transaction(function () use ($wastePost, $data) {
            $wastePost->fill($this->normalizePayload($data, $wastePost));
            $wastePost->save();

            $this->log($wastePost, $wastePost->user, 'updated_post');

            return $wastePost->fresh(['wasteCategory', 'user']);
        });
    }

    public function delete(WastePost $wastePost): void
    {
        DB::transaction(function () use ($wastePost) {
            $this->deleteStoredImage($wastePost->image_path);
            $this->log($wastePost, $wastePost->user, 'deleted_post');
            $wastePost->delete();
        });
    }

    /**
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    private function normalizePayload(array $data, ?WastePost $wastePost = null): array
    {
        $isFree = filter_var($data['is_free'], FILTER_VALIDATE_BOOLEAN);
        $payload = [
            'waste_category_id' => $data['waste_category_id'],
            'title' => $data['title'],
            'description' => $data['description'],
            'quantity_kg' => $data['quantity_kg'],
            'price' => $isFree ? 0 : ($data['price'] ?? 0),
            'is_free' => $isFree,
            'address' => $data['address'],
            'latitude' => $data['latitude'],
            'longitude' => $data['longitude'],
            'available_date' => $data['available_date'],
            'expiry_date' => $data['expiry_date'],
            'claim_radius_km' => $data['claim_radius_km'] ?? 25,
        ];

        if (($data['image'] ?? null) instanceof UploadedFile) {
            $payload['image_path'] = $data['image']->store('waste-posts', 'public');

            if ($wastePost?->image_path) {
                $this->deleteStoredImage($wastePost->image_path);
            }
        }

        return $payload;
    }

    private function deleteStoredImage(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }

    private function log(WastePost $wastePost, User $actor, string $action): void
    {
        TransactionLog::query()->create([
            'waste_post_id' => $wastePost->id,
            'actor_user_id' => $actor->id,
            'action' => $action,
        ]);
    }
}
