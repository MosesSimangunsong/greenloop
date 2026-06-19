import StatusBadge from '@/Components/StatusBadge';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { TablePage } from './Users';

export default function WastePosts({ posts }) {
    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Admin Waste Posts</h2>} title="Admin Waste Posts">
            <Head title="Admin Waste Posts" />
            <TablePage
                title="Pantauan posting limbah"
                columns={['Judul', 'Kategori', 'Producer', 'Berat', 'Harga', 'Status', 'Tersedia']}
                rows={posts.map((post) => [
                    post.title,
                    post.category || '-',
                    post.producer || '-',
                    `${post.quantity_kg} kg`,
                    post.is_free ? 'Gratis' : `Rp ${post.price}`,
                    <StatusBadge status={post.status} />,
                    post.available_date || '-',
                ])}
                emptyText="Belum ada posting limbah."
            />
        </AdminLayout>
    );
}
