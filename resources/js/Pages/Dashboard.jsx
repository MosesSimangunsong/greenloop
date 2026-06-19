import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const roles = auth.user.roles ?? [];

    return (
        <AuthenticatedLayout
            title="Dashboard"
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Selamat datang, {auth.user.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            GreenLoop MVP saat ini sudah mendukung alur producer, receiver, dan admin. Lengkapi profil
                            serta pilih role yang relevan agar jalur posting, pencarian, dan claim bisa dipakai penuh.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">Status akun</h3>
                            <dl className="mt-4 space-y-3 text-sm text-gray-700">
                                <div>
                                    <dt className="font-medium text-gray-500">Role aktif</dt>
                                    <dd className="mt-1">
                                        {roles.length > 0 ? roles.join(', ') : 'Belum ada role dipilih'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-500">Usaha/instansi</dt>
                                    <dd className="mt-1">{auth.user.business_name || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-500">WhatsApp</dt>
                                    <dd className="mt-1">{auth.user.phone || '-'}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">Aksi cepat</h3>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link
                                    href={route('profile.edit')}
                                    className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                >
                                    Lengkapi profil
                                </Link>
                                {roles.includes('producer') && (
                                    <>
                                        <Link
                                            href={route('waste-posts.create')}
                                            className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                                        >
                                            Buat posting limbah
                                        </Link>
                                        <Link
                                            href={route('my-posts.index')}
                                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Lihat posting saya
                                        </Link>
                                    </>
                                )}
                                {roles.includes('receiver') && (
                                    <Link
                                        href={route('waste-posts.index')}
                                        className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                                    >
                                        Cari limbah
                                    </Link>
                                )}
                                {roles.includes('admin') && (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
                                    >
                                        Buka admin dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
