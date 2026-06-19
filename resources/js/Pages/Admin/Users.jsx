import AdminLayout from '@/Layouts/AdminLayout';
import EmptyState from '@/Components/EmptyState';
import { Head } from '@inertiajs/react';

export default function Users({ users }) {
    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Admin Users</h2>} title="Admin Users">
            <Head title="Admin Users" />
            <TablePage
                title="Daftar user"
                columns={['Nama', 'Email', 'Role', 'WhatsApp', 'Usaha/instansi', 'Status']}
                rows={users.map((user) => [
                    user.name,
                    user.email,
                    user.roles.join(', ') || '-',
                    user.phone || '-',
                    user.business_name || '-',
                    user.is_active ? 'Aktif' : 'Nonaktif',
                ])}
                emptyText="Belum ada user."
            />
        </AdminLayout>
    );
}

export function TablePage({ title, columns, rows, emptyText, children }) {
    return (
        <div className="py-8">
            <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                {children}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    {rows.length === 0 ? (
                        <div className="mt-4">
                            <EmptyState title="Belum ada data" description={emptyText} />
                        </div>
                    ) : (
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead>
                                    <tr>
                                        {columns.map((column) => (
                                            <th
                                                key={column}
                                                className="px-3 py-3 text-left font-medium text-gray-500"
                                            >
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {rows.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, cellIndex) => (
                                                <td key={cellIndex} className="px-3 py-3 text-gray-700">
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
