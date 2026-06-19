<?php

use App\Enums\WastePostStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('waste_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('waste_category_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->decimal('quantity_kg', 10, 2);
            $table->decimal('price', 12, 2)->default(0);
            $table->boolean('is_free')->default(false);
            $table->text('address');
            $table->decimal('latitude', 10, 6);
            $table->decimal('longitude', 10, 6);
            $table->date('available_date');
            $table->date('expiry_date');
            $table->string('image_path')->nullable();
            $table->string('status')->default(WastePostStatus::Available->value);
            $table->unsignedInteger('claim_radius_km')->default(25);
            $table->timestamps();

            $table->index('user_id');
            $table->index('waste_category_id');
            $table->index('status');
            $table->index('available_date');
            $table->index('latitude');
            $table->index('longitude');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('waste_posts');
    }
};
