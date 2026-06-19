import StatusBadge from '@/Components/StatusBadge';
import { Link } from '@inertiajs/react';

export default function WasteCard({ post }) {
    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {post.image_url ? (
                <img src={post.image_url} alt={post.title} className="h-44 w-full object-cover" />
            ) : (
                <div className="flex h-44 items-center justify-center bg-gray-100 text-sm text-gray-500">
                    Belum ada foto
                </div>
            )}

            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{post.category?.name}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={post.status} />
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            {post.matching.match_label}
                        </span>
                    </div>
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
                        <dt className="font-medium text-gray-900">Jarak</dt>
                        <dd>{post.distance_km !== null ? `${post.distance_km} km` : '-'}</dd>
                    </div>
                </dl>

                <p className="mt-4 line-clamp-2 text-sm text-gray-600">{post.address}</p>
                <p className="mt-2 text-sm text-gray-500">
                    Producer: {post.producer.business_name || post.producer.name}
                </p>
                <ul className="mt-4 space-y-1 text-xs text-gray-600">
                    {post.matching.reasons.slice(0, 2).map((reason) => (
                        <li key={reason}>• {reason}</li>
                    ))}
                </ul>

                <div className="mt-5">
                    <Link
                        href={route('waste-posts.show', post.id)}
                        className="inline-flex rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                    >
                        Lihat detail
                    </Link>
                </div>
            </div>
        </div>
    );
}
