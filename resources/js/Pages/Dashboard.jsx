import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const roles = auth.user.roles ?? [];

    return (
        <AuthenticatedLayout
            title="Dashboard"
            header={
                <h2 className="text-xl font-black tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 sm:py-8">
                <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:px-8">
                    {/* WELCOME CARD */}
                    <div className="rounded-2xl bg-[#0F3D2E] p-6 text-[#FAF6EC] sm:p-7">
                        <span
                            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C6F135]/80"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            Selamat datang
                        </span>
                        <h3
                            className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            {auth.user.name}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#FAF6EC]/65">
                            GreenLoop MVP saat ini sudah mendukung alur producer, receiver, dan
                            admin. Lengkapi profil serta pilih role yang relevan agar jalur
                            posting, pencarian, dan claim bisa dipakai penuh.
                        </p>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2">
                        {/* STATUS AKUN */}
                        <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
                            <h3 className="text-base font-bold text-[#1A1A1A]">Status akun</h3>
                            <dl className="mt-4 divide-y divide-[#1A1A1A]/8">
                                <div className="flex items-center justify-between py-3">
                                    <dt className="text-sm text-[#1A1A1A]/50">Role aktif</dt>
                                    <dd className="text-sm font-semibold capitalize text-[#1A1A1A]">
                                        {roles.length > 0 ? roles.join(', ') : 'Belum dipilih'}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <dt className="text-sm text-[#1A1A1A]/50">Usaha/instansi</dt>
                                    <dd className="text-sm font-semibold text-[#1A1A1A]">
                                        {auth.user.business_name || '-'}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <dt className="text-sm text-[#1A1A1A]/50">WhatsApp</dt>
                                    <dd className="text-sm font-semibold text-[#1A1A1A]">
                                        {auth.user.phone || '-'}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* AKSI CEPAT */}
                        <div className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6">
                            <h3 className="text-base font-bold text-[#1A1A1A]">Aksi cepat</h3>
                            <div className="mt-4 flex flex-col gap-2.5">
                                <QuickAction href={route('profile.edit')} label="Lengkapi profil" variant="ghost" />

                                {roles.includes('producer') && (
                                    <>
                                        <QuickAction
                                            href={route('waste-posts.create')}
                                            label="Buat posting limbah"
                                            variant="primary"
                                        />
                                        <QuickAction
                                            href={route('my-posts.index')}
                                            label="Lihat posting saya"
                                            variant="ghost"
                                        />
                                    </>
                                )}

                                {roles.includes('receiver') && (
                                    <QuickAction
                                        href={route('waste-posts.index')}
                                        label="Cari limbah"
                                        variant="primary"
                                    />
                                )}

                                {roles.includes('admin') && (
                                    <QuickAction
                                        href={route('admin.dashboard')}
                                        label="Buka admin dashboard"
                                        variant="primary"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function QuickAction({ href, label, variant = 'ghost' }) {
    const isPrimary = variant === 'primary';

    return (
        <Link
            href={href}
            className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 sm:py-3 ${
                isPrimary
                    ? 'bg-[#0F3D2E] text-[#C6F135] hover:bg-[#1A1A1A]'
                    : 'border border-[#1A1A1A]/12 text-[#1A1A1A] hover:bg-[#F6F4ED]'
            }`}
        >
            {label}
            <ArrowUpRight className="h-4 w-4 opacity-60" />
        </Link>
    );
}
