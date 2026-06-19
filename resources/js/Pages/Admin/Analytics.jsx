import EmptyState from '@/Components/EmptyState';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Analytics({
    claimStatusBreakdown,
    stats,
    topCategories,
    wasteStatusBreakdown,
    wasteTrend,
}) {
    return (
        <AdminLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Analytics GreenLoop</h2>}
            title="Analytics GreenLoop"
        >
            <Head title="Analytics GreenLoop" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard label="Total user" value={stats.users} />
                        <StatCard label="Total limbah" value={stats.waste_posts} />
                        <StatCard label="Transaksi sukses" value={stats.successful_transactions} />
                        <StatCard label="Kategori aktif" value={stats.active_categories} />
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                        <Panel title="Tren posting limbah">
                            <BarList
                                items={wasteTrend}
                                emptyTitle="Belum ada tren"
                                emptyDescription="Seeder demo akan membantu dashboard analytics tetap terisi saat presentasi."
                                valueKey="total"
                                labelKey="month"
                            />
                        </Panel>

                        <Panel title="Kategori paling sering muncul">
                            <BarList
                                items={topCategories}
                                emptyTitle="Belum ada kategori dominan"
                                emptyDescription="Posting limbah yang masuk akan langsung membentuk distribusi kategori."
                                valueKey="total"
                                labelKey="name"
                            />
                        </Panel>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                        <Panel title="Distribusi status waste post">
                            <BarList
                                items={wasteStatusBreakdown}
                                emptyTitle="Belum ada status waste post"
                                emptyDescription="Belum ada posting limbah yang bisa diringkas."
                                valueKey="total"
                                labelKey="label"
                            />
                        </Panel>

                        <Panel title="Distribusi status claim">
                            <BarList
                                items={claimStatusBreakdown}
                                emptyTitle="Belum ada status claim"
                                emptyDescription="Belum ada claim yang tercatat di sistem."
                                valueKey="total"
                                labelKey="label"
                            />
                        </Panel>
                    </div>
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

function BarList({ items, emptyTitle, emptyDescription, valueKey, labelKey }) {
    if (items.length === 0 || items.every((item) => Number(item[valueKey]) === 0)) {
        return <EmptyState title={emptyTitle} description={emptyDescription} />;
    }

    const maxValue = Math.max(...items.map((item) => Number(item[valueKey])), 1);

    return (
        <div className="space-y-4">
            {items.map((item) => {
                const value = Number(item[valueKey]);
                const width = `${Math.max((value / maxValue) * 100, value > 0 ? 10 : 0)}%`;

                return (
                    <div key={`${item[labelKey]}-${value}`} className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm text-gray-700">{item[labelKey]}</span>
                            <span className="text-sm font-semibold text-gray-900">{value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100">
                            <div className="h-2 rounded-full bg-emerald-500" style={{ width }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
    );
}
