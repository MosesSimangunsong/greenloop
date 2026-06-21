import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LiveMap from '@/Components/LiveMap';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { LocateFixed, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UpdateProfileInformation({
    availableRoles,
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [gpsStatus, setGpsStatus] = useState('idle');
    const [gpsError, setGpsError] = useState('');

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone ?? '',
        business_name: user.business_name ?? '',
        address: user.address ?? '',
        latitude: user.latitude ?? '',
        longitude: user.longitude ?? '',
        roles: user.roles ?? [],
    });

    const grabLocation = () => {
        if (!navigator.geolocation) {
            setGpsError('Browser tidak mendukung GPS.');
            return;
        }
        setGpsStatus('loading');
        setGpsError('');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setData((prev) => ({
                    ...prev,
                    latitude: pos.coords.latitude.toFixed(6),
                    longitude: pos.coords.longitude.toFixed(6),
                }));
                setGpsStatus('success');
            },
            (err) => {
                setGpsStatus('error');
                setGpsError('Gagal ambil lokasi: ' + err.message);
            },
            { enableHighAccuracy: true, timeout: 10000 },
        );
    };

    // Auto-ambil GPS kalau lokasi belum diset atau masih 0,0
    useEffect(() => {
        const lat = parseFloat(data.latitude);
        const lon = parseFloat(data.longitude);
        const isEmpty = !data.latitude || !data.longitude || (lat === 0 && lon === 0);
        if (isEmpty) grabLocation();
    }, []);

    const hasLocation = data.latitude && data.longitude &&
        !(parseFloat(data.latitude) === 0 && parseFloat(data.longitude) === 0);

    const mapMarkers = hasLocation
        ? [{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude),
              label: data.name || 'Lokasi saya', color: 'green' }]
        : [];

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-[#1A1A1A]">Informasi Profil</h2>
                <p className="mt-1 text-sm text-[#1A1A1A]/50">
                    Perbarui informasi profil dan alamat email akun Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                {/* Nama */}
                <div>
                    <InputLabel htmlFor="name" value="Nama" />
                    <TextInput id="name" className="mt-1 block w-full"
                        value={data.name} onChange={(e) => setData('name', e.target.value)}
                        required isFocused autoComplete="name" />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" className="mt-1 block w-full"
                        value={data.email} onChange={(e) => setData('email', e.target.value)}
                        required autoComplete="username" />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* WhatsApp */}
                <div>
                    <InputLabel htmlFor="phone" value="Nomor WhatsApp" />
                    <TextInput id="phone" className="mt-1 block w-full"
                        value={data.phone} onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel" />
                    <InputError className="mt-2" message={errors.phone} />
                </div>

                {/* Usaha */}
                <div>
                    <InputLabel htmlFor="business_name" value="Usaha/Instansi" />
                    <TextInput id="business_name" className="mt-1 block w-full"
                        value={data.business_name} onChange={(e) => setData('business_name', e.target.value)} />
                    <InputError className="mt-2" message={errors.business_name} />
                </div>

                {/* Alamat */}
                <div>
                    <InputLabel htmlFor="address" value="Alamat" />
                    <textarea id="address"
                        className="mt-1 block min-h-24 w-full rounded-xl border border-[#1A1A1A]/12 px-3 py-2.5 text-sm focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        value={data.address} onChange={(e) => setData('address', e.target.value)} />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                {/* LOKASI GPS */}
                <div className="rounded-2xl border border-[#1A1A1A]/8 bg-[#F6F4ED] p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#0F3D2E]" />
                            <span className="text-sm font-bold text-[#1A1A1A]">Lokasi saya</span>
                        </div>
                        <button type="button" onClick={grabLocation}
                            disabled={gpsStatus === 'loading'}
                            className="flex items-center gap-2 rounded-xl border border-[#0F3D2E]/20 bg-white px-3 py-2 text-sm font-semibold text-[#0F3D2E] hover:bg-[#0F3D2E]/5 disabled:opacity-60">
                            <LocateFixed className="h-4 w-4" />
                            {gpsStatus === 'loading' ? 'Mengambil...' : 'Perbarui lokasi'}
                        </button>
                    </div>

                    {/* Status GPS */}
                    {gpsStatus === 'loading' && (
                        <div className="mt-3 rounded-xl bg-[#C6F135]/15 px-3 py-2 text-sm text-[#0F3D2E]">
                            Sedang mengambil lokasi GPS...
                        </div>
                    )}
                    {gpsStatus === 'success' && (
                        <div className="mt-3 rounded-xl bg-[#C6F135]/15 px-3 py-2 text-sm text-[#0F3D2E]">
                            ✓ Lokasi berhasil diambil — klik Save untuk menyimpan.
                        </div>
                    )}
                    {gpsStatus === 'error' && (
                        <div className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                            {gpsError} — izinkan akses lokasi di browser lalu klik "Perbarui lokasi".
                        </div>
                    )}

                    {/* Koordinat readonly */}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                        <div>
                            <InputLabel htmlFor="latitude" value="Latitude" />
                            <TextInput id="latitude" type="number" step="0.000001"
                                className="mt-1 block w-full bg-white text-[#1A1A1A]/50"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                readOnly />
                            <InputError className="mt-1" message={errors.latitude} />
                        </div>
                        <div>
                            <InputLabel htmlFor="longitude" value="Longitude" />
                            <TextInput id="longitude" type="number" step="0.000001"
                                className="mt-1 block w-full bg-white text-[#1A1A1A]/50"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                readOnly />
                            <InputError className="mt-1" message={errors.longitude} />
                        </div>
                    </div>

                    {/* Preview map */}
                    {hasLocation && (
                        <div className="mt-3">
                            <LiveMap markers={mapMarkers} height="180px" zoom={15} />
                        </div>
                    )}

                    {!hasLocation && gpsStatus === 'idle' && (
                        <p className="mt-3 text-xs text-[#1A1A1A]/40">
                            Lokasi belum diset. Klik "Perbarui lokasi" untuk mengambil GPS otomatis.
                        </p>
                    )}
                </div>

                {/* Role */}
                <div>
                    <InputLabel value="Peran akun" />
                    <div className="mt-3 flex flex-wrap gap-4">
                        {availableRoles.map((role) => (
                            <label key={role} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                                <input type="checkbox"
                                    checked={data.roles.includes(role)}
                                    onChange={(e) => setData('roles',
                                        e.target.checked
                                            ? [...data.roles, role]
                                            : data.roles.filter((r) => r !== role)
                                    )}
                                    className="rounded border-gray-300 text-[#0F3D2E] focus:ring-[#0F3D2E]"
                                />
                                <span className="capitalize">{role}</span>
                            </label>
                        ))}
                    </div>
                    <InputError className="mt-2" message={errors.roles} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Email belum diverifikasi.
                            <Link href={route('verification.send')} method="post" as="button"
                                className="ml-1 rounded-md text-sm text-[#0F3D2E] underline hover:text-[#1A1A1A]">
                                Kirim ulang email verifikasi.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-[#0F3D2E]">
                                Link verifikasi baru telah dikirim ke email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out"
                        enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm text-[#0F3D2E] font-medium">Tersimpan!</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
