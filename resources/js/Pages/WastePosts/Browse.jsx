import PrimaryButton from '@/Components/PrimaryButton';
import WasteCard from '@/Components/WasteCard';
import EmptyState from '@/Components/EmptyState';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Browse({ posts, filters, categories, receiverLocationReady }) {
    const [form, setForm] = useState({
        category_id: filters.category_id ?? '',
        radius_km: filters.radius_km ?? '',
    });

    const applyFilters = (event) => {
        event.preventDefault();
        router.get(route('waste-posts.index'), form, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            title="Daftar Limbah"
            header={<h2 className="text-xl font-semibold text-gray-800">Daftar Limbah</h2>}
        >
            <Head title="Daftar Limbah" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Pencarian rule-based</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Hasil diurutkan berdasarkan status tersedia, radius claim, dan kedekatan lokasi.
                                </p>
                            </div>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                Matching transparan
                            </span>
                        </div>
                        <form onSubmit={applyFilters} className="grid gap-4 md:grid-cols-[1.3fr_1fr_auto]">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Kategori</label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                                    value={form.category_id}
                                    onChange={(event) =>
                                        setForm((current) => ({ ...current, category_id: event.target.value }))
                                    }
                                >
                                    <option value="">Semua kategori</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Radius (km)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="200"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                                    value={form.radius_km}
                                    onChange={(event) =>
                                        setForm((current) => ({ ...current, radius_km: event.target.value }))
                                    }
                                    placeholder="Contoh 25"
                                />
                            </div>

                            <div className="flex items-end">
                                <PrimaryButton>Terapkan filter</PrimaryButton>
                            </div>
                        </form>

                        {!receiverLocationReady && (
                            <p className="mt-4 text-sm text-amber-700">
                                Lokasi profil Anda belum lengkap. Filter radius dan urutan terdekat belum bisa
                                dimaksimalkan sampai latitude dan longitude di profil diisi.
                            </p>
                        )}
                    </div>

                    {posts.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <EmptyState
                                title="Belum ada limbah yang cocok"
                                description="Coba ubah kategori atau radius pencarian untuk melihat hasil lain."
                            />
                        </div>
                    ) : (
                        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                            {posts.map((post) => (
                                <WasteCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
