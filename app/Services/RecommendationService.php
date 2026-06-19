<?php

namespace App\Services;

use App\Models\WasteCategory;

class RecommendationService
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function forCategory(WasteCategory $category): array
    {
        return $category->recommendations
            ->where('is_active', true)
            ->values()
            ->map(fn ($recommendation) => [
                'id' => $recommendation->id,
                'title' => $recommendation->title,
                'description' => $recommendation->description,
                'usage_type' => $recommendation->usage_type,
                'summary_label' => $this->summaryLabel($recommendation->usage_type),
            ])
            ->all();
    }

    private function summaryLabel(string $usageType): string
    {
        return match (strtolower($usageType)) {
            'kompos' => 'Cocok untuk kompos',
            'pakan' => 'Bisa dimanfaatkan sebagai pakan',
            default => 'Peluang pemanfaatan tersedia',
        };
    }
}
