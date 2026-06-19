<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            WasteCategorySeeder::class,
            DemoDataSeeder::class,
        ]);

        $user = User::query()->firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Test User',
            'password' => 'password',
        ]);

        $user->roles()->syncWithoutDetaching(
            Role::query()
                ->whereIn('name', ['admin', 'producer', 'receiver'])
                ->pluck('id')
                ->all(),
        );
    }
}
