<?php

namespace Database\Seeders;

use App\Models\WasteCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class WasteCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Jerami',
            'Sekam padi',
            'Kulit kopi',
            'Sisa makanan',
            'Kotoran ternak',
        ];

        foreach ($categories as $name) {
            WasteCategory::query()->updateOrCreate(
                ['slug' => Str::slug($name)],
                [
                    'name' => $name,
                    'description' => null,
                    'is_active' => true,
                ],
            );
        }
    }
}
