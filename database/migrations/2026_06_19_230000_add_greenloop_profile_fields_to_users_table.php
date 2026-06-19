<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('password');
            $table->string('business_name')->nullable()->after('phone');
            $table->text('address')->nullable()->after('business_name');
            $table->decimal('latitude', 10, 6)->nullable()->after('address');
            $table->decimal('longitude', 10, 6)->nullable()->after('latitude');
            $table->boolean('is_active')->default(true)->after('longitude');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'business_name',
                'address',
                'latitude',
                'longitude',
                'is_active',
            ]);
        });
    }
};
