<?php

namespace App\Services;

class DistanceService
{
    public function between(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $theta = deg2rad($lng1 - $lng2);
        $distance = sin(deg2rad($lat1)) * sin(deg2rad($lat2))
            + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos($theta);

        return round(6371 * acos(max(min($distance, 1), -1)), 1);
    }
}
