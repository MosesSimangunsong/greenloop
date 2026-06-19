<?php

use App\Enums\WasteClaimStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('waste_claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('waste_post_id')->constrained()->cascadeOnDelete();
            $table->foreignId('producer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('receiver_id')->constrained('users')->cascadeOnDelete();
            $table->string('status')->default(WasteClaimStatus::Pending->value);
            $table->text('receiver_message')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index('waste_post_id');
            $table->index('producer_id');
            $table->index('receiver_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('waste_claims');
    }
};
