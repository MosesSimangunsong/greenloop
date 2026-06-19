import DangerButton from '@/Components/DangerButton';
import RecommendationPanel from '@/Components/RecommendationPanel';
import StatusBadge from '@/Components/StatusBadge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Show({ canClaim, mode, post }) {
    const { data, setData, post: submitClaim, processing, errors, reset } = useForm({
        receiver_message: '',
    });

    const handleDelete = () => {
        if (confirm('Hapus posting limbah ini?')) {
            router.delete(route('my-posts.destroy', post.id));
        }
    };

    const handleClaim = (event) => {
        event.preventDefault();
        submitClaim(route('waste-claims.store', post.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            title={post.title}
            header={
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                        <p className="mt-1 text-sm text-gray-600">{post.category?.name}</p>
                    </div>
                    <StatusBadge status={post.status} />
                </div>
            }
        >
            <Head title={post.title} />

            <div className="py-8">
                <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            {post.image_url ? (
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="h-80 w-full rounded-xl object-cover"
                                />
                            ) : (
                                <div className="flex h-80 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-500">
                                    Belum ada foto
                                </div>
                            )}

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <Detail label="Berat" value={`${post.quantity_kg} kg`} />
                                <Detail label="Harga" value={post.is_free ? 'Gratis' : `Rp ${post.price}`} />
                                <Detail label="Tersedia" value={post.available_date} />
                                <Detail label="Masa layak pakai" value={post.expiry_date} />
                                <Detail label="Radius claim" value={`${post.claim_radius_km} km`} />
                                <Detail label="Koordinat" value={`${post.latitude}, ${post.longitude}`} />
                                {mode === 'receiver' && (
                                    <Detail
                                        label="Jarak dari lokasi Anda"
                                        value={post.distance_km !== null ? `${post.distance_km} km` : '-'}
                                    />
                                )}
                                {mode === 'receiver' && (
                                    <Detail label="Tingkat kecocokan" value={post.matching.match_label} />
                                )}
                            </div>

                            <div className="mt-6">
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Deskripsi
                                </h3>
                                <p className="mt-2 whitespace-pre-line text-sm text-gray-700">
                                    {post.description}
                                </p>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Lokasi
                                </h3>
                                <p className="mt-2 text-sm text-gray-700">{post.address}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl bg-white p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900">Producer</h3>
                                <dl className="mt-4 space-y-3 text-sm text-gray-700">
                                    <Detail label="Nama" value={post.producer.name} stacked />
                                    <Detail
                                        label="Usaha/instansi"
                                        value={post.producer.business_name || '-'}
                                        stacked
                                    />
                                    <Detail label="WhatsApp" value={post.producer.phone || '-'} stacked />
                                    {mode === 'receiver' && (
                                        <Detail label="Alamat producer" value={post.producer.address || '-'} stacked />
                                    )}
                                </dl>
                            </div>

                            {mode === 'producer' ? (
                                <div className="rounded-2xl bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900">Aksi posting</h3>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <Link
                                            href={route('my-posts.edit', post.id)}
                                            className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                                        >
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
                                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900">Alasan rekomendasi</h3>
                                        <div className="mt-4 flex items-center gap-3">
                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                                                Skor kecocokan {post.matching.score}/100
                                            </span>
                                            <span className="text-sm text-gray-600">{post.matching.match_label}</span>
                                        </div>
                                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                                            {post.matching.reasons.map((reason) => (
                                                <li key={reason}>• {reason}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <RecommendationPanel recommendations={post.recommendations} />
                                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900">Claim limbah</h3>
                                        {canClaim ? (
                                            <form onSubmit={handleClaim} className="mt-4 space-y-4">
                                                <p className="text-sm text-gray-600">
                                                    Tambahkan pesan singkat agar producer memahami kebutuhan Anda.
                                                </p>
                                                <textarea
                                                    className="block min-h-28 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                                                    value={data.receiver_message}
                                                    onChange={(event) =>
                                                        setData('receiver_message', event.target.value)
                                                    }
                                                    placeholder="Contoh: Kami butuh jerami untuk kompos kelompok tani."
                                                />
                                                {errors.receiver_message && (
                                                    <p className="text-sm text-red-600">{errors.receiver_message}</p>
                                                )}
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-60"
                                                >
                                                    Ajukan claim
                                                </button>
                                            </form>
                                        ) : (
                                            <p className="mt-3 text-sm text-gray-600">
                                                Claim tidak tersedia untuk posting ini. Kemungkinan Anda sudah punya
                                                claim aktif, atau posting sedang diproses.
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
            <div>
                <dt className="font-medium text-gray-500">{label}</dt>
                <dd className="mt-1">{value}</dd>
            </div>
        );
    }

    return (
        <div>
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{value}</dd>
        </div>
    );
}
