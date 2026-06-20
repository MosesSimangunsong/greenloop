<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocationController extends Controller
{
    /**
     * Update lokasi user yang sedang login.
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'latitude'  => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
        ]);

        $user = Auth::user();
        $user->update([
            'latitude'             => $validated['latitude'],
            'longitude'            => $validated['longitude'],
            'location_updated_at'  => now(),
        ]);

        return response()->json(['message' => 'Lokasi berhasil diperbarui.']);
    }

    /**
     * Ambil lokasi user tertentu.
     * Hanya bisa diakses kalau ada relasi claim yang valid.
     */
    public function show(int $userId): JsonResponse
    {
        $currentUser = Auth::user();
        $target      = User::findOrFail($userId);

        // Authorization: boleh lihat lokasi kalau ada claim aktif antara keduanya
        $hasActiveClaim = $currentUser->hasActiveClaimWith($userId);

        // Producer juga boleh lihat lokasi dirinya sendiri (untuk posting)
        $isSelf = $currentUser->id === $userId;

        if (!$hasActiveClaim && !$isSelf) {
            return response()->json(['message' => 'Tidak diizinkan.'], 403);
        }

        if (is_null($target->latitude) || is_null($target->longitude)) {
            return response()->json(['message' => 'Lokasi belum tersedia.'], 404);
        }

        $locationUpdatedAt = $target->location_updated_at;

        if (is_string($locationUpdatedAt)) {
            $locationUpdatedAt = Carbon::parse($locationUpdatedAt);
        }

        return response()->json([
            'latitude' => (float) $target->latitude,
            'longitude' => (float) $target->longitude,
            'location_updated_at' => $locationUpdatedAt?->toIso8601String(),
            'name'               => $target->name,
        ]);
    }
}
