<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaction_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('waste_post_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('action');
            $table->text('notes')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index('waste_post_id');
            $table->index('actor_user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaction_logs');
    }
};
