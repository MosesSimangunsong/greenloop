<?php

namespace App\Http\Requests;

use App\Models\WastePost;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWastePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var WastePost|null $wastePost */
        $wastePost = $this->route('wastePost');

        return $wastePost !== null
            && ($this->user()?->can('update', $wastePost) ?? false);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'waste_category_id' => [
                'required',
                'integer',
                Rule::exists('waste_categories', 'id')->where('is_active', true),
            ],
            'description' => ['required', 'string'],
            'quantity_kg' => ['required', 'numeric', 'gt:0'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'is_free' => ['required', 'boolean'],
            'address' => ['required', 'string'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'available_date' => ['required', 'date'],
            'expiry_date' => ['required', 'date', 'after_or_equal:available_date'],
            'image' => ['nullable', 'image', 'max:5120'],
            'claim_radius_km' => ['nullable', 'integer', 'min:1', 'max:200'],
        ];
    }
}
