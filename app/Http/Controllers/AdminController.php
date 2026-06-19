<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWasteCategoryRequest;
use App\Http\Requests\StoreWasteRecommendationRequest;
use App\Http\Requests\UpdateWasteCategoryRequest;
use App\Http\Requests\UpdateWasteRecommendationRequest;
use App\Models\TransactionLog;
use App\Models\User;
use App\Models\WasteCategory;
use App\Models\WasteClaim;
use App\Models\WastePost;
use App\Models\WasteRecommendation;
use App\Enums\WasteClaimStatus;
use App\Enums\WastePostStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(Request $request): Response
    {
        $this->ensureAdmin();

        return Inertia::render('Admin/Dashboard', [
            ...$this->analyticsPayload(),
            'recentLogs' => TransactionLog::query()
                ->with(['actor:id,name', 'wastePost:id,title'])
                ->latest('created_at')
                ->limit(8)
                ->get()
                ->map(fn (TransactionLog $log) => [
                    'id' => $log->id,
                    'action' => $log->action,
                    'actor' => $log->actor?->name,
                    'post_title' => $log->wastePost?->title,
                    'created_at' => optional($log->created_at)->format('Y-m-d H:i'),
                ])
                ->values(),
            'demoAccounts' => $this->demoAccounts(),
        ]);
    }

    public function analytics(Request $request): Response
    {
        $this->ensureAdmin();

        return Inertia::render('Admin/Analytics', $this->analyticsPayload());
    }

    public function users(Request $request): Response
    {
        $this->ensureAdmin();

        return Inertia::render('Admin/Users', [
            'users' => User::query()
                ->with('roles:id,name')
                ->latest()
                ->get()
                ->map(fn (User $user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'business_name' => $user->business_name,
                    'is_active' => (bool) $user->is_active,
                    'roles' => $user->roles->pluck('name')->values(),
                    'created_at' => optional($user->created_at)->format('Y-m-d H:i'),
                ])
                ->values(),
        ]);
    }

    public function wastePosts(Request $request): Response
    {
        $this->ensureAdmin();

        return Inertia::render('Admin/WastePosts', [
            'posts' => WastePost::query()
                ->with(['user:id,name,business_name', 'wasteCategory:id,name'])
                ->latest()
                ->get()
                ->map(fn (WastePost $post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'status' => (string) $post->status,
                    'quantity_kg' => (float) $post->quantity_kg,
                    'is_free' => $post->is_free,
                    'price' => (float) $post->price,
                    'available_date' => optional($post->available_date)->format('Y-m-d'),
                    'category' => $post->wasteCategory?->name,
                    'producer' => $post->user?->business_name ?: $post->user?->name,
                ])
                ->values(),
        ]);
    }

    public function claims(Request $request): Response
    {
        $this->ensureAdmin();

        return Inertia::render('Admin/Claims', [
            'claims' => WasteClaim::query()
                ->with(['wastePost:id,title,status', 'producer:id,name,business_name', 'receiver:id,name,business_name'])
                ->latest()
                ->get()
                ->map(fn (WasteClaim $claim) => [
                    'id' => $claim->id,
                    'status' => (string) $claim->status,
                    'waste_post' => $claim->wastePost?->title,
                    'waste_post_status' => $claim->wastePost?->status ? (string) $claim->wastePost->status : null,
                    'producer' => $claim->producer?->business_name ?: $claim->producer?->name,
                    'receiver' => $claim->receiver?->business_name ?: $claim->receiver?->name,
                    'created_at' => optional($claim->created_at)->format('Y-m-d H:i'),
                    'approved_at' => optional($claim->approved_at)->format('Y-m-d H:i'),
                    'completed_at' => optional($claim->completed_at)->format('Y-m-d H:i'),
                ])
                ->values(),
        ]);
    }

    public function categories(Request $request): Response
    {
        $this->ensureAdmin();

        return Inertia::render('Admin/Categories', [
            'categories' => WasteCategory::query()
                ->withCount(['wastePosts', 'recommendations'])
                ->orderBy('name')
                ->get()
                ->map(fn (WasteCategory $category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'is_active' => $category->is_active,
                    'waste_posts_count' => $category->waste_posts_count,
                    'recommendations_count' => $category->recommendations_count,
                ])
                ->values(),
        ]);
    }

    public function storeCategory(StoreWasteCategoryRequest $request): RedirectResponse
    {
        WasteCategory::query()->create([
            'name' => $request->validated('name'),
            'slug' => Str::slug($request->validated('name')),
            'description' => $request->validated('description'),
            'is_active' => $request->boolean('is_active'),
        ]);

        return Redirect::route('admin.categories.index')->with('status', 'category-created');
    }

    public function updateCategory(UpdateWasteCategoryRequest $request, WasteCategory $wasteCategory): RedirectResponse
    {
        $wasteCategory->update([
            'name' => $request->validated('name'),
            'slug' => Str::slug($request->validated('name')),
            'description' => $request->validated('description'),
            'is_active' => $request->boolean('is_active'),
        ]);

        return Redirect::route('admin.categories.index')->with('status', 'category-updated');
    }

    public function recommendations(Request $request): Response
    {
        $this->ensureAdmin();

        return Inertia::render('Admin/Recommendations', [
            'recommendations' => WasteRecommendation::query()
                ->with('wasteCategory:id,name')
                ->latest()
                ->get()
                ->map(fn (WasteRecommendation $recommendation) => [
                    'id' => $recommendation->id,
                    'waste_category_id' => $recommendation->waste_category_id,
                    'category' => $recommendation->wasteCategory?->name,
                    'title' => $recommendation->title,
                    'description' => $recommendation->description,
                    'usage_type' => $recommendation->usage_type,
                    'reference_notes' => $recommendation->reference_notes,
                    'is_active' => $recommendation->is_active,
                ])
                ->values(),
            'categories' => WasteCategory::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (WasteCategory $category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                ])
                ->values(),
        ]);
    }

    public function storeRecommendation(StoreWasteRecommendationRequest $request): RedirectResponse
    {
        WasteRecommendation::query()->create($request->validated());

        return Redirect::route('admin.recommendations.index')->with('status', 'recommendation-created');
    }

    public function updateRecommendation(
        UpdateWasteRecommendationRequest $request,
        WasteRecommendation $wasteRecommendation,
    ): RedirectResponse {
        $wasteRecommendation->update($request->validated());

        return Redirect::route('admin.recommendations.index')->with('status', 'recommendation-updated');
    }

    private function ensureAdmin(): void
    {
        Gate::authorize('access-admin');
    }

    /**
     * @return array<string, mixed>
     */
    private function analyticsPayload(): array
    {
        return [
            'stats' => [
                'users' => User::query()->count(),
                'waste_posts' => WastePost::query()->count(),
                'successful_transactions' => WasteClaim::query()
                    ->where('status', WasteClaimStatus::Completed->value)
                    ->count(),
                'active_categories' => WasteCategory::query()->where('is_active', true)->count(),
            ],
            'topCategories' => WastePost::query()
                ->select('waste_category_id', DB::raw('count(*) as total'))
                ->with('wasteCategory:id,name')
                ->groupBy('waste_category_id')
                ->orderByDesc('total')
                ->limit(5)
                ->get()
                ->map(fn ($item) => [
                    'name' => $item->wasteCategory?->name ?? 'Tanpa kategori',
                    'total' => (int) $item->total,
                ])
                ->values(),
            'wasteTrend' => $this->wasteTrend(),
            'wasteStatusBreakdown' => collect(WastePostStatus::cases())
                ->map(fn (WastePostStatus $status) => [
                    'status' => $status->value,
                    'label' => str_replace('_', ' ', ucfirst($status->value)),
                    'total' => WastePost::query()->where('status', $status->value)->count(),
                ])
                ->values(),
            'claimStatusBreakdown' => collect(WasteClaimStatus::cases())
                ->map(fn (WasteClaimStatus $status) => [
                    'status' => $status->value,
                    'label' => str_replace('_', ' ', ucfirst($status->value)),
                    'total' => WasteClaim::query()->where('status', $status->value)->count(),
                ])
                ->values(),
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function demoAccounts(): array
    {
        return [
            [
                'role' => 'Admin',
                'email' => 'admin@greenloop.test',
                'password' => 'password',
            ],
            [
                'role' => 'Producer',
                'email' => 'producer@greenloop.test',
                'password' => 'password',
            ],
            [
                'role' => 'Receiver',
                'email' => 'receiver@greenloop.test',
                'password' => 'password',
            ],
        ];
    }

    private function wasteTrend()
    {
        $driver = DB::connection()->getDriverName();

        if ($driver === 'sqlite') {
            return WastePost::query()
                ->get()
                ->groupBy(fn (WastePost $post) => optional($post->created_at)->format('Y-m'))
                ->map(fn ($items, $month) => [
                    'month' => $month,
                    'total' => $items->count(),
                ])
                ->values()
                ->take(6);
        }

        return WastePost::query()
            ->selectRaw("to_char(date_trunc('month', created_at), 'YYYY-MM') as month, count(*) as total")
            ->groupByRaw("date_trunc('month', created_at)")
            ->orderByRaw("date_trunc('month', created_at)")
            ->limit(6)
            ->get()
            ->map(fn ($item) => [
                'month' => $item->month,
                'total' => (int) $item->total,
            ])
            ->values();
    }
}
