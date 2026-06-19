<?php

namespace App\Http\Requests;

use App\Models\WasteRecommendation;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWasteRecommendationRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var WasteRecommendation|null $wasteRecommendation */
        $wasteRecommendation = $this->route('wasteRecommendation');

        return $wasteRecommendation !== null && ($this->user()?->can('access-admin') ?? false);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'waste_category_id' => ['required', 'integer', Rule::exists('waste_categories', 'id')],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'usage_type' => ['required', 'string', 'max:255'],
            'reference_notes' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
