<?php

namespace App\Http\Requests;

use App\Models\WasteCategory;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateWasteCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var WasteCategory|null $wasteCategory */
        $wasteCategory = $this->route('wasteCategory');

        return $wasteCategory !== null && ($this->user()?->can('access-admin') ?? false);
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
