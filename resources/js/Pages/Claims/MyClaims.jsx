import EmptyState from '@/Components/EmptyState';
import LiveMap from '@/Components/LiveMap';
import StatusBadge from '@/Components/StatusBadge';
import useShareLocation from '@/hooks/useShareLocation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MyClaims({ claims }) {
    const hasApprovedClaim = claims.some((c) => c.status === 'approved');
    useShareLocation(hasApprovedClaim);

    const cancelClaim = (claimId) => router.patch(route('claims.cancel', claimId));

    return (
        <AuthenticatedLayout title="Claim Saya">
            <Head title="Claim Saya" />
            <div className="py-6 sm:py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {claims.length === 0 ? (
                        <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-8">
                            <EmptyState title="Belum ada claim"
                                description="Claim limbah yang Anda ajukan akan tampil di sini." />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {claims.map((claim) => (
                                <ClaimCard key={claim.id} claim={claim}
                                    onCancel={() => cancelClaim(claim.id)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function ClaimCard({ claim, onCancel }) {
    const isApproved = claim.status === 'approved';
    const [producerLocation, setProducerLocation] = useState(null);
    const [loadingMap, setLoadingMap] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchLocation = (silent = false) => {
        if (!silent) setLoadingMap(true);
        axios.get(route('location.show', claim.counterparty.id))
            .then((res) => {
                setProducerLocation(res.data);
                setLastUpdated(new Date());
                setShowMap(true);
            })
            .catch(() => {
                if (!silent) alert('Lokasi producer belum tersedia.');
            })
            .finally(() => { if (!silent) setLoadingMap(false); });
    };

    // Auto-polling tiap 15 detik setelah map ditampilkan
    useEffect(() => {
        if (!showMap) return;
        const interval = setInterval(() => fetchLocation(true), 15000);
        return () => clearInterval(interval);
    }, [showMap]);

    const markers = producerLocation
        ? [{ latitude: Number(producerLocation.latitude), longitude: Number(producerLocation.longitude),
              label: producerLocation.name, color: 'green' }]
        : [];

    return (
        <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h3 className="text-base font-bold text-[#1A1A1A]">{claim.waste_post.title}</h3>
                    <p className="mt-0.5 text-sm text-[#1A1A1A]/50">
                        {claim.waste_post.category} • {claim.waste_post.quantity_kg} kg
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <StatusBadge status={claim.waste_post.status} />
                    <StatusBadge status={claim.status} />
                </div>
            </div>

            <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                <div>
                    <dt className="text-xs font-semibold text-[#1A1A1A]/40">Pihak terkait</dt>
                    <dd className="mt-1 text-[#1A1A1A]">{claim.counterparty.business_name || claim.counterparty.name}</dd>
                </div>
                <div>
                    <dt className="text-xs font-semibold text-[#1A1A1A]/40">WhatsApp</dt>
                    <dd className="mt-1 text-[#1A1A1A]">{claim.counterparty.phone || '-'}</dd>
                </div>
                <div>
                    <dt className="text-xs font-semibold text-[#1A1A1A]/40">Diajukan pada</dt>
                    <dd className="mt-1 text-[#1A1A1A]">{claim.created_at}</dd>
                </div>
                <div>
                    <dt className="text-xs font-semibold text-[#1A1A1A]/40">Pesan</dt>
                    <dd className="mt-1 whitespace-pre-line text-[#1A1A1A]">{claim.receiver_message || '-'}</dd>
                </div>
            </dl>

            {isApproved && (
                <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-2 rounded-xl bg-[#C6F135]/15 px-3 py-2">
                        <Navigation className="h-3.5 w-3.5 text-[#0F3D2E]" />
                        <p className="text-xs font-medium text-[#0F3D2E]">
                            Lokasi Anda sedang dibagikan ke producer secara otomatis.
                        </p>
                    </div>

                    {showMap && markers.length > 0 ? (
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#0F3D2E]" />
                                    <p className="text-sm font-semibold text-[#1A1A1A]">Lokasi producer</p>
                                    {lastUpdated && (
                                        <span className="text-xs text-[#1A1A1A]/35">
                                            • diperbarui {lastUpdated.toLocaleTimeString('id-ID')}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fetchLocation(false)}
                                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#0F3D2E] hover:bg-[#0F3D2E]/5"
                                >
                                    <RefreshCw className="h-3 w-3" />
                                    Refresh
                                </button>
                            </div>
                            <LiveMap markers={markers} height="200px" />
                        </div>
                    ) : (
                        <button type="button" onClick={() => fetchLocation(false)} disabled={loadingMap}
                            className="flex items-center gap-2 rounded-xl border border-[#0F3D2E]/20 bg-[#0F3D2E]/5 px-4 py-2.5 text-sm font-semibold text-[#0F3D2E] hover:bg-[#0F3D2E]/10 disabled:opacity-60">
                            <MapPin className="h-4 w-4" />
                            {loadingMap ? 'Memuat lokasi...' : 'Lihat lokasi producer'}
                        </button>
                    )}
                </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
                <a href={route('waste-posts.show', claim.waste_post.id)}
                    className="rounded-xl bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-[#C6F135] hover:bg-[#1A1A1A]">
                    Lihat limbah
                </a>
                {claim.status === 'pending' && (
                    <button type="button" onClick={onCancel}
                        className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                        Batalkan claim
                    </button>
                )}
            </div>
        </div>
    );
}
