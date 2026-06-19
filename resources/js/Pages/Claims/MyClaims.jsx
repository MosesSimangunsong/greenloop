import StatusBadge from '@/Components/StatusBadge';
import EmptyState from '@/Components/EmptyState';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function MyClaims({ claims }) {
    const cancelClaim = (claimId) => {
        router.patch(route('claims.cancel', claimId));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Claim Saya</h2>} title="Claim Saya">
            <Head title="Claim Saya" />

            <div className="py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <ClaimList
                        claims={claims}
                        actions={(claim) =>
                            claim.status === 'pending' ? (
                                <button
                                    type="button"
                                    onClick={() => cancelClaim(claim.id)}
                                    className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                                >
                                    Batalkan claim
                                </button>
                            ) : null
                        }
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export function ClaimList({ claims, actions }) {
    if (claims.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-8 shadow-sm">
                <EmptyState
                    title="Belum ada claim"
                    description="Claim limbah yang Anda ajukan akan tampil di sini."
                />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {claims.map((claim) => (
                <div key={claim.id} className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{claim.waste_post.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                {claim.waste_post.category} • {claim.waste_post.quantity_kg} kg
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <StatusBadge status={claim.waste_post.status} />
                            <StatusBadge status={claim.status} />
                        </div>
                    </div>

                    <dl className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-gray-700">
                        <div>
                            <dt className="font-medium text-gray-500">Pihak terkait</dt>
                            <dd className="mt-1">{claim.counterparty.business_name || claim.counterparty.name}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-500">WhatsApp</dt>
                            <dd className="mt-1">{claim.counterparty.phone || '-'}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-500">Diajukan pada</dt>
                            <dd className="mt-1">{claim.created_at}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-500">Pesan</dt>
                            <dd className="mt-1 whitespace-pre-line">{claim.receiver_message || '-'}</dd>
                        </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <a
                            href={route('waste-posts.show', claim.waste_post.id)}
                            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            Lihat limbah
                        </a>
                        {actions?.(claim)}
                    </div>
                </div>
            ))}
        </div>
    );
}
