<?php

namespace App\Http\Controllers;

use App\Models\User;
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

        if (!$target->latitude || !$target->longitude) {
            return response()->json(['message' => 'Lokasi belum tersedia.'], 404);
        }

        return response()->json([
            'latitude'           => $target->latitude,
            'longitude'          => $target->longitude,
            'location_updated_at' => $target->location_updated_at?->toISOString(),
            'name'               => $target->name,
        ]);
    }
}
