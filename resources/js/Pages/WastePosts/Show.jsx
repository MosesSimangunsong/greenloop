import DangerButton from '@/Components/DangerButton';
import LiveMap from '@/Components/LiveMap';
import RecommendationPanel from '@/Components/RecommendationPanel';
import StatusBadge from '@/Components/StatusBadge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

export default function Show({ canClaim, mode, post }) {
    const { data, setData, post: submitClaim, processing, errors, reset } = useForm({
        receiver_message: '',
    });

    const handleDelete = () => {
        if (confirm('Hapus posting limbah ini?')) {
            router.delete(route('my-posts.destroy', post.id));
        }
    };

    const handleClaim = (e) => {
        e.preventDefault();
        submitClaim(route('waste-claims.store', post.id), { onSuccess: () => reset() });
    };

    const producerMarkers =
        post.latitude && post.longitude
            ? [{ latitude: post.latitude, longitude: post.longitude, label: post.producer.name, color: 'green' }]
            : [];

    return (
        <AuthenticatedLayout
            title={post.title}
            header={
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-[#1A1A1A]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {post.title}
                        </h2>
                        <p className="mt-1 text-sm text-[#1A1A1A]/50">{post.category?.name}</p>
                    </div>
                    <StatusBadge status={post.status} />
                </div>
            }
        >
            <Head title={post.title} />

            <div className="py-6 sm:py-8">
                <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">

                        {/* KIRI */}
                        <div className="space-y-5">
                            <div className="overflow-hidden rounded-2xl border border-[#1A1A1A]/8 bg-white">
                                {post.image_url ? (
                                    <img src={post.image_url} alt={post.title} className="h-72 w-full object-cover sm:h-80" />
                                ) : (
                                    <div className="flex h-72 items-center justify-center bg-[#F6F4ED] text-sm text-[#1A1A1A]/35 sm:h-80">
                                        Belum ada foto
                                    </div>
                                )}
                            </div>

                            <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Detail label="Berat" value={`${post.quantity_kg} kg`} />
                                    <Detail label="Harga" value={post.is_free ? 'Gratis' : `Rp ${post.price}`} />
                                    <Detail label="Tersedia" value={post.available_date} />
                                    <Detail label="Masa layak" value={post.expiry_date} />
                                    <Detail label="Radius claim" value={`${post.claim_radius_km} km`} />
                                    {mode === 'receiver' && (
                                        <Detail label="Jarak dari Anda"
                                            value={post.distance_km !== null ? `${post.distance_km} km` : '-'} />
                                    )}
                                    {mode === 'receiver' && (
                                        <Detail label="Kecocokan" value={post.matching.match_label} />
                                    )}
                                </div>
                                <div className="mt-5">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]/35">Deskripsi</p>
                                    <p className="mt-2 whitespace-pre-line text-sm text-[#1A1A1A]/70">{post.description}</p>
                                </div>
                            </div>

                            {/* MAP LOKASI PRODUCER */}
                            <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#0F3D2E]" />
                                    <p className="text-sm font-bold text-[#1A1A1A]">Lokasi limbah</p>
                                </div>
                                <p className="mb-3 text-sm text-[#1A1A1A]/50">{post.address}</p>
                                {producerMarkers.length > 0 ? (
                                    <LiveMap markers={producerMarkers} height="220px" />
                                ) : (
                                    <div className="flex h-[220px] items-center justify-center rounded-xl bg-[#F6F4ED] text-sm text-[#1A1A1A]/35">
                                        Koordinat lokasi belum tersedia
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* KANAN */}
                        <div className="space-y-5">
                            <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]/35">Producer</p>
                                <dl className="mt-4 divide-y divide-[#1A1A1A]/8 text-sm">
                                    <Detail label="Nama" value={post.producer.name} stacked />
                                    <Detail label="Usaha/instansi" value={post.producer.business_name || '-'} stacked />
                                    <Detail label="WhatsApp" value={post.producer.phone || '-'} stacked />
                                    {mode === 'receiver' && (
                                        <Detail label="Alamat" value={post.producer.address || '-'} stacked />
                                    )}
                                </dl>
                            </div>

                            {mode === 'producer' ? (
                                <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]/35">Aksi posting</p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <Link href={route('my-posts.edit', post.id)}
                                            className="rounded-xl bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-[#C6F135] hover:bg-[#1A1A1A]">
                                            Edit posting
                                        </Link>
                                        {!post.has_claims && (
                                            <DangerButton onClick={handleDelete}>Hapus posting</DangerButton>
                                        )}
                                    </div>
                                    {post.has_claims && (
                                        <p className="mt-3 text-sm text-amber-700">
                                            Posting ini sudah memiliki claim dan tidak bisa diubah atau dihapus.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]/35">Alasan rekomendasi</p>
                                        <div className="mt-3 flex items-center gap-3">
                                            <span className="rounded-full bg-[#C6F135]/25 px-3 py-1 text-sm font-semibold text-[#0F3D2E]">
                                                Skor {post.matching.score}/100
                                            </span>
                                            <span className="text-sm text-[#1A1A1A]/60">{post.matching.match_label}</span>
                                        </div>
                                        <ul className="mt-4 space-y-1.5 text-sm text-[#1A1A1A]/70">
                                            {post.matching.reasons.map((reason) => (
                                                <li key={reason}>• {reason}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <RecommendationPanel recommendations={post.recommendations} />

                                    <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]/35">Claim limbah</p>
                                        {canClaim ? (
                                            <form onSubmit={handleClaim} className="mt-4 space-y-4">
                                                <p className="text-sm text-[#1A1A1A]/50">
                                                    Tambahkan pesan singkat agar producer memahami kebutuhan Anda.
                                                </p>
                                                <textarea
                                                    className="block min-h-28 w-full rounded-xl border border-[#1A1A1A]/12 px-4 py-3 text-sm focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                                                    value={data.receiver_message}
                                                    onChange={(e) => setData('receiver_message', e.target.value)}
                                                    placeholder="Contoh: Kami butuh jerami untuk kompos kelompok tani."
                                                />
                                                {errors.receiver_message && (
                                                    <p className="text-sm text-red-600">{errors.receiver_message}</p>
                                                )}
                                                <button type="submit" disabled={processing}
                                                    className="w-full rounded-xl bg-[#0F3D2E] px-4 py-3 text-sm font-semibold text-[#C6F135] hover:bg-[#1A1A1A] disabled:opacity-60">
                                                    Ajukan claim
                                                </button>
                                            </form>
                                        ) : (
                                            <p className="mt-3 text-sm text-[#1A1A1A]/50">
                                                Claim tidak tersedia untuk posting ini.
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function Detail({ label, value, stacked = false }) {
    if (stacked) {
        return (
            <div className="py-3">
                <dt className="text-xs font-semibold text-[#1A1A1A]/40">{label}</dt>
                <dd className="mt-1 text-sm text-[#1A1A1A]">{value}</dd>
            </div>
        );
    }
    return (
        <div>
            <dt className="text-xs font-semibold text-[#1A1A1A]/40">{label}</dt>
            <dd className="mt-1 text-sm font-semibold text-[#1A1A1A]">{value}</dd>
        </div>
    );
}
