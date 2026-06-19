import StatusBadge from '@/Components/StatusBadge';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { TablePage } from './Users';

export default function Claims({ claims }) {
    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Admin Claims</h2>} title="Admin Claims">
            <Head title="Admin Claims" />
            <TablePage
                title="Pantauan claim"
                columns={['Limbah', 'Producer', 'Receiver', 'Status Claim', 'Status Post', 'Dibuat', 'Selesai']}
                rows={claims.map((claim) => [
                    claim.waste_post || '-',
                    claim.producer || '-',
                    claim.receiver || '-',
                    <StatusBadge status={claim.status} />,
                    claim.waste_post_status ? <StatusBadge status={claim.waste_post_status} /> : '-',
                    claim.created_at || '-',
                    claim.completed_at || '-',
                ])}
                emptyText="Belum ada claim."
            />
        </AdminLayout>
    );
}
