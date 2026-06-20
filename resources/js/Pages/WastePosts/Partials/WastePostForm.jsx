import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LiveMap from '@/Components/LiveMap';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { LocateFixed, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WastePostForm({
    data,
    setData,
    errors,
    processing,
    categories,
    submitLabel,
}) {
    const [gpsStatus, setGpsStatus] = useState('idle');
    const [gpsError, setGpsError] = useState('');

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
    useEffect(() => {
        if (!data.latitude && !data.longitude) {
            grabLocation();
        }
    }, []);

    const hasLocation = data.latitude && data.longitude;
    const mapMarkers = hasLocation
        ? [{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude), label: 'Lokasi limbah', color: 'green' }]
        : [];

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Nama limbah */}
                <div className="md:col-span-2">
                    <InputLabel htmlFor="title" value="Nama limbah" />
                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.title} />
                </div>
                <div>
                    <InputLabel htmlFor="waste_category_id" value="Kategori" />
                    <select
                        id="waste_category_id"
                        className="mt-1 block w-full rounded-xl border border-[#1A1A1A]/12 px-3 py-2.5 text-sm focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        value={data.waste_category_id}
                        onChange={(e) => setData('waste_category_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.waste_category_id} />
                </div>
                <div>
                    <InputLabel htmlFor="quantity_kg" value="Berat (kg)" />
                    <TextInput
                        id="quantity_kg"
                        type="number" min="0" step="0.01"
                        className="mt-1 block w-full"
                        value={data.quantity_kg}
                        onChange={(e) => setData('quantity_kg', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.quantity_kg} />
                </div>
                <div className="md:col-span-2">
                    <InputLabel htmlFor="description" value="Deskripsi" />
                    <textarea
                        id="description"
                        className="mt-1 block min-h-28 w-full rounded-xl border border-[#1A1A1A]/12 px-3 py-2.5 text-sm focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.description} />
                </div>
                <div>
                    <label className="flex items-center gap-3 pt-7">
                        <input
                            type="checkbox"
                            checked={data.is_free}
                            onChange={(e) => setData('is_free', e.target.checked)}
                            className="rounded border-gray-300 text-[#0F3D2E] focus:ring-[#0F3D2E]"
                        />
                        <span className="text-sm text-[#1A1A1A]">Limbah ini gratis</span>
                    </label>
                </div>
                <div>
                    <InputLabel htmlFor="price" value="Harga" />
                    <TextInput
                        id="price"
                        type="number" min="0" step="0.01"
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        disabled={data.is_free}
                    />
                    <InputError className="mt-2" message={errors.price} />
                </div>
                <div className="md:col-span-2">
                    <InputLabel htmlFor="address" value="Alamat" />
                    <textarea
                        id="address"
                        className="mt-1 block min-h-24 w-full rounded-xl border border-[#1A1A1A]/12 px-3 py-2.5 text-sm focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>
                <div className="md:col-span-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#0F3D2E]" />
                            <span className="text-sm font-semibold text-[#1A1A1A]">Lokasi limbah</span>
                        </div>
                        <button
                            type="button"
                            onClick={grabLocation}
                            disabled={gpsStatus === 'loading'}
                            className="flex items-center gap-2 rounded-xl border border-[#0F3D2E]/20 bg-[#0F3D2E]/5 px-3 py-2 text-sm font-semibold text-[#0F3D2E] hover:bg-[#0F3D2E]/10 disabled:opacity-60"
                        >
                            <LocateFixed className="h-4 w-4" />
                            {gpsStatus === 'loading' ? 'Mengambil lokasi...' : 'Perbarui lokasi'}
                        </button>
                    </div>
                    {gpsStatus === 'loading' && (
                        <div className="mt-2 rounded-xl bg-[#C6F135]/15 px-3 py-2 text-sm text-[#0F3D2E]">
                            Sedang mengambil lokasi GPS...
                        </div>
                    )}
                    {gpsStatus === 'success' && (
                        <div className="mt-2 rounded-xl bg-[#C6F135]/15 px-3 py-2 text-sm text-[#0F3D2E]">
                            ✓ Lokasi berhasil diambil
                        </div>
                    )}
                    {gpsStatus === 'error' && (
                        <div className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                            {gpsError} — izinkan akses lokasi di browser lalu klik "Perbarui lokasi".
                        </div>
                    )}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                        <div>
                            <InputLabel htmlFor="latitude" value="Latitude" />
                            <TextInput
                                id="latitude"
                                type="number" step="0.000001"
                                className="mt-1 block w-full bg-[#F6F4ED] text-[#1A1A1A]/50"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                readOnly
                            />
                            <InputError className="mt-1" message={errors.latitude} />
                        </div>
                        <div>
                            <InputLabel htmlFor="longitude" value="Longitude" />
                            <TextInput
                                id="longitude"
                                type="number" step="0.000001"
                                className="mt-1 block w-full bg-[#F6F4ED] text-[#1A1A1A]/50"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                readOnly
                            />
                            <InputError className="mt-1" message={errors.longitude} />
                        </div>
                    </div>
                    {hasLocation && (
                        <div className="mt-3">
                            <LiveMap markers={mapMarkers} height="180px" zoom={15} />
                        </div>
                    )}
                </div>
                <div>
                    <InputLabel htmlFor="available_date" value="Tanggal tersedia" />
                    <TextInput
                        id="available_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.available_date}
                        onChange={(e) => setData('available_date', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.available_date} />
                </div>

                <div>
                    <InputLabel htmlFor="expiry_date" value="Masa layak pakai" />
                    <TextInput
                        id="expiry_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.expiry_date}
                        onChange={(e) => setData('expiry_date', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.expiry_date} />
                </div>
                <div>
                    <InputLabel htmlFor="claim_radius_km" value="Radius claim (km)" />
                    <TextInput
                        id="claim_radius_km"
                        type="number" min="1" max="200"
                        className="mt-1 block w-full"
                        value={data.claim_radius_km}
                        onChange={(e) => setData('claim_radius_km', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.claim_radius_km} />
                </div>
                <div>
                    <InputLabel htmlFor="image" value="Foto limbah" />
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-[#1A1A1A]/70 file:mr-4 file:rounded-xl file:border-0 file:bg-[#0F3D2E] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#C6F135] hover:file:bg-[#1A1A1A]"
                        onChange={(e) => setData('image', e.target.files[0])}
                    />
                    <InputError className="mt-2" message={errors.image} />
                </div>
            </div>

            <div className="flex items-center justify-end">
                <PrimaryButton disabled={processing}>{submitLabel}</PrimaryButton>
            </div>
        </div>
    );
}
