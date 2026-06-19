import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { TablePage } from './Users';

export default function Recommendations({ categories, recommendations }) {
    const createForm = useForm({
        waste_category_id: categories[0]?.id ?? '',
        title: '',
        description: '',
        usage_type: '',
        reference_notes: '',
        is_active: true,
    });

    const toggleRecommendation = (recommendation) => {
        router.patch(route('admin.recommendations.update', recommendation.id), {
            waste_category_id: recommendation.waste_category_id,
            title: recommendation.title,
            description: recommendation.description,
            usage_type: recommendation.usage_type,
            reference_notes: recommendation.reference_notes ?? '',
            is_active: !recommendation.is_active,
        });
    };

    return (
        <AdminLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Admin Recommendations</h2>}
            title="Admin Recommendations"
        >
            <Head title="Admin Recommendations" />

            <TablePage
                title="Rekomendasi pemanfaatan"
                columns={['Kategori', 'Judul', 'Jenis', 'Status', 'Aksi']}
                rows={recommendations.map((recommendation) => [
                    recommendation.category || '-',
                    recommendation.title,
                    recommendation.usage_type,
                    recommendation.is_active ? 'Aktif' : 'Nonaktif',
                    <button
                        type="button"
                        onClick={() => toggleRecommendation(recommendation)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        {recommendation.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>,
                ])}
                emptyText="Belum ada rekomendasi."
            >
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">Tambah rekomendasi</h3>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            createForm.post(route('admin.recommendations.store'));
                        }}
                        className="mt-4 grid gap-4 md:grid-cols-2"
                    >
                        <select
                            className="rounded-md border-gray-300"
                            value={createForm.data.waste_category_id}
                            onChange={(event) => createForm.setData('waste_category_id', event.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            className="rounded-md border-gray-300"
                            placeholder="Judul rekomendasi"
                            value={createForm.data.title}
                            onChange={(event) => createForm.setData('title', event.target.value)}
                        />
                        <input
                            className="rounded-md border-gray-300"
                            placeholder="Jenis pemanfaatan"
                            value={createForm.data.usage_type}
                            onChange={(event) => createForm.setData('usage_type', event.target.value)}
                        />
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={createForm.data.is_active}
                                onChange={(event) => createForm.setData('is_active', event.target.checked)}
                            />
                            Aktif
                        </label>
                        <textarea
                            className="md:col-span-2 rounded-md border-gray-300"
                            placeholder="Deskripsi"
                            value={createForm.data.description}
                            onChange={(event) => createForm.setData('description', event.target.value)}
                        />
                        <textarea
                            className="md:col-span-2 rounded-md border-gray-300"
                            placeholder="Catatan referensi"
                            value={createForm.data.reference_notes}
                            onChange={(event) => createForm.setData('reference_notes', event.target.value)}
                        />
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                            >
                                Simpan rekomendasi
                            </button>
                        </div>
                    </form>
                </div>
            </TablePage>
        </AdminLayout>
    );
}
