import PrimaryButton from '@/Components/PrimaryButton';
import StatusBadge from '@/Components/StatusBadge';
import EmptyState from '@/Components/EmptyState';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ posts }) {
    return (
        <AuthenticatedLayout
            title="Posting Saya"
            header={
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">Posting Saya</h2>
                    <Link href={route('waste-posts.create')}>
                        <PrimaryButton>Buat posting</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Posting Saya" />

            <div className="py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {posts.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <EmptyState
                                title="Belum ada posting limbah"
                                description="Mulai dengan membuat posting limbah organik pertama Anda."
                            />
                        </div>
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-2">
                            {posts.map((post) => (
                                <div key={post.id} className="rounded-2xl bg-white p-6 shadow-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                                            <p className="mt-1 text-sm text-gray-600">{post.category?.name}</p>
                                        </div>
                                        <StatusBadge status={post.status} />
                                    </div>

                                    <dl className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div>
                                            <dt className="font-medium text-gray-900">Berat</dt>
                                            <dd>{post.quantity_kg} kg</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-900">Harga</dt>
                                            <dd>{post.is_free ? 'Gratis' : `Rp ${post.price}`}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-900">Tersedia</dt>
                                            <dd>{post.available_date}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-900">Radius claim</dt>
                                            <dd>{post.claim_radius_km} km</dd>
                                        </div>
                                    </dl>

                                    <p className="mt-4 line-clamp-2 text-sm text-gray-600">{post.address}</p>

                                    <div className="mt-6 flex items-center gap-3">
                                        <Link
                                            href={route('waste-posts.show', post.id)}
                                            className="text-sm font-medium text-green-700 hover:text-green-800"
                                        >
                                            Lihat detail
                                        </Link>
                                        <Link
                                            href={route('my-posts.edit', post.id)}
                                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
