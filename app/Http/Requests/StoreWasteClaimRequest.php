<?php

namespace App\Http\Requests;

use App\Models\WastePost;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreWasteClaimRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var WastePost|null $wastePost */
        $wastePost = $this->route('wastePost');

        return $wastePost !== null
            && ($this->user()?->can('create', [\App\Models\WasteClaim::class, $wastePost]) ?? false);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'receiver_message' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
