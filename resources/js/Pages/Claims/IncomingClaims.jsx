import StatusBadge from '@/Components/StatusBadge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { ClaimList } from './MyClaims';

export default function IncomingClaims({ claims }) {
    const updateClaim = (action, claimId) => {
        router.patch(route(`claims.${action}`, claimId));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Claim Masuk</h2>} title="Claim Masuk">
            <Head title="Claim Masuk" />

            <div className="py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <ClaimList
                        claims={claims}
                        actions={(claim) => (
                            <div className="flex flex-wrap gap-3">
                                {claim.status === 'pending' && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => updateClaim('approve', claim.id)}
                                            className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => updateClaim('reject', claim.id)}
                                            className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {claim.status === 'approved' && (
                                    <button
                                        type="button"
                                        onClick={() => updateClaim('complete', claim.id)}
                                        className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                                    >
                                        Tandai selesai
                                    </button>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
