import AdminLayout from '@/Layouts/AdminLayout';
import EmptyState from '@/Components/EmptyState';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ demoAccounts, recentLogs, stats, topCategories, wasteTrend }) {
    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>} title="Admin Dashboard">
            <Head title="Admin Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard label="Total user" value={stats.users} />
                        <StatCard label="Total limbah" value={stats.waste_posts} />
                        <StatCard label="Transaksi sukses" value={stats.successful_transactions} />
                        <StatCard label="Kategori aktif" value={stats.active_categories} />
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                        <Panel title="Kategori paling sering muncul">
                            <SimpleList
                                items={topCategories}
                                emptyText="Belum ada posting limbah untuk dianalisis."
                                renderItem={(item) => (
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-sm text-gray-700">{item.name}</span>
                                        <span className="text-sm font-semibold text-gray-900">{item.total}</span>
                                    </div>
                                )}
                            />
                        </Panel>

                        <Panel title="Tren limbah">
                            <SimpleList
                                items={wasteTrend}
                                emptyText="Belum ada data tren."
                                renderItem={(item) => (
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-sm text-gray-700">{item.month}</span>
                                        <span className="text-sm font-semibold text-gray-900">{item.total}</span>
                                    </div>
                                )}
                            />
                        </Panel>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                        <Panel title="Akses cepat">
                            <div className="flex flex-wrap gap-3">
                                <QuickLink href={route('admin.users.index')} label="Kelola user" />
                                <QuickLink href={route('admin.waste-posts.index')} label="Pantau limbah" />
                                <QuickLink href={route('admin.claims.index')} label="Pantau claim" />
                                <QuickLink href={route('admin.categories.index')} label="Kelola kategori" />
                                <QuickLink
                                    href={route('admin.recommendations.index')}
                                    label="Kelola rekomendasi"
                                />
                                <QuickLink href={route('admin.analytics.index')} label="Buka analytics" />
                            </div>
                        </Panel>

                        <Panel title="Aktivitas terbaru">
                            <SimpleList
                                items={recentLogs}
                                emptyText="Belum ada aktivitas tercatat."
                                renderItem={(item) => (
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            {item.action} • {item.post_title || '-'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.actor || 'System'} • {item.created_at}
                                        </p>
                                    </div>
                                )}
                            />
                        </Panel>
                    </div>

                    <Panel title="Akun demo">
                        <div className="grid gap-3 md:grid-cols-3">
                            {demoAccounts.map((account) => (
                                <div key={account.email} className="rounded-lg border border-gray-200 p-4">
                                    <p className="text-sm font-semibold text-gray-900">{account.role}</p>
                                    <p className="mt-2 text-sm text-gray-600">{account.email}</p>
                                    <p className="text-sm text-gray-600">Password: {account.password}</p>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>
            </div>
        </AdminLayout>
    );
}

function Panel({ children, title }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="mt-4">{children}</div>
        </div>
    );
}

function QuickLink({ href, label }) {
    return (
        <Link
            href={href}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
            {label}
        </Link>
    );
}

function SimpleList({ items, emptyText, renderItem }) {
    if (items.length === 0) {
        return <EmptyState title="Belum ada data" description={emptyText} />;
    }

    return <div className="space-y-3">{items.map((item, index) => <div key={index}>{renderItem(item)}</div>)}</div>;
}

function StatCard({ label, value }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
    );
}
