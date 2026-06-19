<?php

namespace App\Services;

use App\Models\User;
use App\Models\WastePost;

class MatchingService
{
    public function __construct(private readonly DistanceService $distanceService)
    {
    }

    /**
     * @return array{score:int,reasons:array<int,string>,match_label:string}
     */
    public function evaluate(WastePost $wastePost, ?User $viewer = null): array
    {
        $score = 40;
        $reasons = ['Kategori limbah sudah terstruktur untuk pencarian receiver.'];

        if ($viewer?->latitude !== null && $viewer?->longitude !== null) {
            $distance = $this->distanceService->between(
                (float) $viewer->latitude,
                (float) $viewer->longitude,
                (float) $wastePost->latitude,
                (float) $wastePost->longitude,
            );

            if ($distance <= min(10, $wastePost->claim_radius_km)) {
                $score += 35;
                $reasons[] = 'Lokasi receiver sangat dekat dengan titik limbah.';
            } elseif ($distance <= $wastePost->claim_radius_km) {
                $score += 20;
                $reasons[] = 'Masih berada dalam radius claim producer.';
            }
        } else {
            $reasons[] = 'Lengkapi lokasi profil untuk hasil pencarian yang lebih presisi.';
        }

        if ($wastePost->is_free) {
            $score += 10;
            $reasons[] = 'Posting gratis, cocok untuk serapan cepat.';
        }

        $reasons[] = 'Status limbah tersedia untuk diproses.';
        $score += 15;

        return [
            'score' => min($score, 100),
            'reasons' => $reasons,
            'match_label' => $this->matchLabel($score),
        ];
    }

    private function matchLabel(int $score): string
    {
        return match (true) {
            $score >= 80 => 'Sangat relevan',
            $score >= 60 => 'Relevan',
            default => 'Cukup relevan',
        };
    }
}
