<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWastePostRequest;
use App\Http\Requests\UpdateWastePostRequest;
use App\Models\WasteCategory;
use App\Models\WastePost;
use App\Services\WasteListingService;
use App\Services\WastePostService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class WastePostController extends Controller
{
    public function __construct(
        private readonly WastePostService $wastePostService,
        private readonly WasteListingService $wasteListingService,
    ) {}

    public function myPosts(Request $request): Response
    {
        $this->authorize('viewProducerIndex', WastePost::class);

        return Inertia::render('WastePosts/Index', [
            'posts' => WastePost::query()
                ->with(['wasteCategory'])
                ->whereBelongsTo($request->user())
                ->latest()
                ->get()
                ->map(fn (WastePost $wastePost) => $this->transformWastePost($wastePost)),
        ]);
    }

    public function receiverIndex(Request $request): Response
    {
        $this->authorize('viewReceiverIndex', WastePost::class);

        return Inertia::render('WastePosts/Browse', [
            'posts' => $this->wasteListingService->receiverListing($request->user(), $request->only([
                'category_id',
                'radius_km',
            ])),
            'filters' => [
                'category_id' => $request->string('category_id')->toString(),
                'radius_km' => $request->string('radius_km')->toString(),
            ],
            'categories' => $this->categories(),
            'receiverLocationReady' => $request->user()?->latitude !== null && $request->user()?->longitude !== null,
        ]);
    }

    public function create(Request $request): Response
    {
        $this->authorize('create', WastePost::class);

        return Inertia::render('WastePosts/Create', [
            'categories' => $this->categories(),
            'defaultStatus' => 'available',
        ]);
    }

    public function store(StoreWastePostRequest $request): RedirectResponse
    {
        $wastePost = $this->wastePostService->create($request->user(), $request->validated());

        return Redirect::route('waste-posts.show', $wastePost)
            ->with('status', 'waste-post-created');
    }

    public function show(Request $request, WastePost $wastePost): Response
    {
        $this->authorize('view', $wastePost);

        $isOwner = $request->user()?->id === $wastePost->user_id;

        return Inertia::render('WastePosts/Show', [
            'post' => $isOwner
                ? $this->transformWastePost($wastePost->load(['user', 'wasteCategory']), true)
                : $this->wasteListingService->detail($wastePost, $request->user()),
            'mode' => $isOwner ? 'producer' : 'receiver',
            'canClaim' => ! $isOwner && $request->user()?->can('claim', $wastePost),
        ]);
    }

    public function edit(Request $request, WastePost $wastePost): Response
    {
        $this->authorize('update', $wastePost);

        return Inertia::render('WastePosts/Edit', [
            'categories' => $this->categories(),
            'post' => $this->transformWastePost($wastePost->load('wasteCategory'), true),
        ]);
    }

    public function update(UpdateWastePostRequest $request, WastePost $wastePost): RedirectResponse
    {
        $this->authorize('update', $wastePost);

        $this->wastePostService->update($wastePost, $request->validated());

        return Redirect::route('waste-posts.show', $wastePost)
            ->with('status', 'waste-post-updated');
    }

    public function destroy(Request $request, WastePost $wastePost): RedirectResponse
    {
        $this->authorize('delete', $wastePost);

        $this->wastePostService->delete($wastePost);

        return Redirect::route('my-posts.index')
            ->with('status', 'waste-post-deleted');
    }

    /**
     * @return array<int, array{id:int,name:string}>
     */
    private function categories(): array
    {
        return WasteCategory::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn (WasteCategory $category) => [
                'id' => $category->id,
                'name' => $category->name,
            ])
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function transformWastePost(WastePost $wastePost, bool $includeMeta = false): array
    {
        $data = [
            'id' => $wastePost->id,
            'title' => $wastePost->title,
            'description' => $wastePost->description,
            'quantity_kg' => (float) $wastePost->quantity_kg,
            'price' => (float) $wastePost->price,
            'is_free' => $wastePost->is_free,
            'address' => $wastePost->address,
            'latitude' => (float) $wastePost->latitude,
            'longitude' => (float) $wastePost->longitude,
            'available_date' => optional($wastePost->available_date)->format('Y-m-d'),
            'expiry_date' => optional($wastePost->expiry_date)->format('Y-m-d'),
            'image_path' => $wastePost->image_path,
            'image_url' => $wastePost->image_path ? Storage::disk('public')->url($wastePost->image_path) : null,
            'status' => $wastePost->status->value,
            'claim_radius_km' => $wastePost->claim_radius_km,
            'category' => $wastePost->wasteCategory ? [
                'id' => $wastePost->wasteCategory->id,
                'name' => $wastePost->wasteCategory->name,
            ] : null,
            'created_at' => optional($wastePost->created_at)->format('Y-m-d H:i'),
        ];

        if ($includeMeta) {
            $data['producer'] = [
                'name' => $wastePost->user->name,
                'business_name' => $wastePost->user->business_name,
                'phone' => $wastePost->user->phone,
            ];
            $data['has_claims'] = $wastePost->claims()->exists();
        }

        return $data;
    }
}
