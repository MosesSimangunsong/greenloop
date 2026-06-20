<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWasteClaimRequest;
use App\Models\WasteClaim;
use App\Models\WastePost;
use App\Services\WasteClaimService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class WasteClaimController extends Controller
{
    public function __construct(private readonly WasteClaimService $wasteClaimService)
    {
    }

    public function store(StoreWasteClaimRequest $request, WastePost $wastePost): RedirectResponse
    {
        $this->wasteClaimService->create($wastePost, $request->user(), $request->validated());

        return Redirect::route('my-claims.index')->with('status', 'claim-created');
    }

    public function myClaims(Request $request): Response
    {
        $this->authorize('viewReceiverIndex', WasteClaim::class);

        return Inertia::render('Claims/MyClaims', [
            'claims' => WasteClaim::query()
                ->with(['wastePost.wasteCategory', 'producer'])
                ->where('receiver_id', $request->user()->id)
                ->latest()
                ->get()
                ->map(fn (WasteClaim $claim) => $this->transformClaim($claim, 'receiver')),
        ]);
    }

    public function incomingClaims(Request $request): Response
    {
        $this->authorize('viewProducerIndex', WasteClaim::class);

        return Inertia::render('Claims/IncomingClaims', [
            'claims' => WasteClaim::query()
                ->with(['wastePost.wasteCategory', 'receiver'])
                ->where('producer_id', $request->user()->id)
                ->latest()
                ->get()
                ->map(fn (WasteClaim $claim) => $this->transformClaim($claim, 'producer')),
        ]);
    }

    public function approve(Request $request, WasteClaim $wasteClaim): RedirectResponse
    {
        $this->authorize('approve', $wasteClaim);
        $this->wasteClaimService->approve($wasteClaim, $request->user());

        return Redirect::route('incoming-claims.index')->with('status', 'claim-approved');
    }

    public function reject(Request $request, WasteClaim $wasteClaim): RedirectResponse
    {
        $this->authorize('reject', $wasteClaim);
        $this->wasteClaimService->reject($wasteClaim, $request->user());

        return Redirect::route('incoming-claims.index')->with('status', 'claim-rejected');
    }

    public function complete(Request $request, WasteClaim $wasteClaim): RedirectResponse
    {
        $this->authorize('complete', $wasteClaim);
        $this->wasteClaimService->complete($wasteClaim, $request->user());

        return Redirect::route('incoming-claims.index')->with('status', 'claim-completed');
    }

    public function cancel(Request $request, WasteClaim $wasteClaim): RedirectResponse
    {
        $this->authorize('cancel', $wasteClaim);

        $this->wasteClaimService->cancel($wasteClaim, $request->user());

        return Redirect::route('my-claims.index')->with('status', 'claim-cancelled');
    }

    /**
     * @return array<string, mixed>
     */
    private function transformClaim(WasteClaim $claim, string $mode): array
    {
        return [
            'id' => $claim->id,
            'status' => $claim->status instanceof WasteClaimStatus
                ? $claim->status->value
                : $claim->status,
            'receiver_message' => $claim->receiver_message,
            'approved_at' => optional($claim->approved_at)->format('Y-m-d H:i'),
            'rejected_at' => optional($claim->rejected_at)->format('Y-m-d H:i'),
            'completed_at' => optional($claim->completed_at)->format('Y-m-d H:i'),
            'created_at' => optional($claim->created_at)->format('Y-m-d H:i'),
            'waste_post' => [
                'id' => $claim->wastePost->id,
                'title' => $claim->wastePost->title,
                'status' => $claim->status instanceof WasteClaimStatus
                ? $claim->status->value
                : $claim->status,
                'category' => $claim->wastePost->wasteCategory?->name,
                'quantity_kg' => (float) $claim->wastePost->quantity_kg,
            ],
            'counterparty' => $mode === 'producer'
                ? [
                    'id' => $claim->receiver->id,
                    'name' => $claim->receiver->name,
                    'business_name' => $claim->receiver->business_name,
                    'phone' => $claim->receiver->phone,
                ]
                : [
                    'id' => $claim->producer->id,
                    'name' => $claim->producer->name,
                    'business_name' => $claim->producer->business_name,
                    'phone' => $claim->producer->phone,
                ],
        ];
    }

}
