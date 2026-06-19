import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { TablePage } from './Users';

export default function Categories({ categories }) {
    const createForm = useForm({
        name: '',
        description: '',
        is_active: true,
    });

    const updateCategory = (category) => {
        router.patch(route('admin.categories.update', category.id), {
            name: category.name,
            description: category.description ?? '',
            is_active: !category.is_active,
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Admin Categories</h2>} title="Admin Categories">
            <Head title="Admin Categories" />

            <TablePage
                title="Kategori limbah"
                columns={['Nama', 'Slug', 'Posting', 'Rekomendasi', 'Status', 'Aksi']}
                rows={categories.map((category) => [
                    category.name,
                    category.slug,
                    category.waste_posts_count,
                    category.recommendations_count,
                    category.is_active ? 'Aktif' : 'Nonaktif',
                    <button
                        type="button"
                        onClick={() => updateCategory(category)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        {category.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>,
                ])}
                emptyText="Belum ada kategori."
            >
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">Tambah kategori</h3>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            createForm.post(route('admin.categories.store'));
                        }}
                        className="mt-4 grid gap-4 md:grid-cols-2"
                    >
                        <input
                            className="rounded-md border-gray-300"
                            placeholder="Nama kategori"
                            value={createForm.data.name}
                            onChange={(event) => createForm.setData('name', event.target.value)}
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
                            placeholder="Deskripsi kategori"
                            value={createForm.data.description}
                            onChange={(event) => createForm.setData('description', event.target.value)}
                        />
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                            >
                                Simpan kategori
                            </button>
                        </div>
                    </form>
                </div>
            </TablePage>
        </AdminLayout>
    );
}
