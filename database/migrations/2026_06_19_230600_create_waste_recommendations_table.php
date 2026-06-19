<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('waste_recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('waste_category_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('usage_type');
            $table->text('reference_notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('waste_category_id');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('waste_recommendations');
    }
};
