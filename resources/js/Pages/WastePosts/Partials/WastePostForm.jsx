import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function WastePostForm({
    data,
    setData,
    errors,
    processing,
    categories,
    submitLabel,
}) {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                    <InputLabel htmlFor="title" value="Nama limbah" />
                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(event) => setData('title', event.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.title} />
                </div>

                <div>
                    <InputLabel htmlFor="waste_category_id" value="Kategori" />
                    <select
                        id="waste_category_id"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                        value={data.waste_category_id}
                        onChange={(event) => setData('waste_category_id', event.target.value)}
                        required
                    >
                        <option value="">Pilih kategori</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.waste_category_id} />
                </div>

                <div>
                    <InputLabel htmlFor="quantity_kg" value="Berat (kg)" />
                    <TextInput
                        id="quantity_kg"
                        type="number"
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full"
                        value={data.quantity_kg}
                        onChange={(event) => setData('quantity_kg', event.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.quantity_kg} />
                </div>

                <div className="md:col-span-2">
                    <InputLabel htmlFor="description" value="Deskripsi" />
                    <textarea
                        id="description"
                        className="mt-1 block min-h-28 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                        value={data.description}
                        onChange={(event) => setData('description', event.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div>
                    <label className="flex items-center gap-3 pt-7">
                        <input
                            type="checkbox"
                            checked={data.is_free}
                            onChange={(event) => setData('is_free', event.target.checked)}
                            className="rounded border-gray-300 text-green-700 focus:ring-green-700"
                        />
                        <span className="text-sm text-gray-700">Limbah ini gratis</span>
                    </label>
                </div>

                <div>
                    <InputLabel htmlFor="price" value="Harga" />
                    <TextInput
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={(event) => setData('price', event.target.value)}
                        disabled={data.is_free}
                    />
                    <InputError className="mt-2" message={errors.price} />
                </div>

                <div className="md:col-span-2">
                    <InputLabel htmlFor="address" value="Alamat" />
                    <textarea
                        id="address"
                        className="mt-1 block min-h-24 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                        value={data.address}
                        onChange={(event) => setData('address', event.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="latitude" value="Latitude" />
                    <TextInput
                        id="latitude"
                        type="number"
                        step="0.000001"
                        className="mt-1 block w-full"
                        value={data.latitude}
                        onChange={(event) => setData('latitude', event.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.latitude} />
                </div>

                <div>
                    <InputLabel htmlFor="longitude" value="Longitude" />
                    <TextInput
                        id="longitude"
                        type="number"
                        step="0.000001"
                        className="mt-1 block w-full"
                        value={data.longitude}
                        onChange={(event) => setData('longitude', event.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.longitude} />
                </div>

                <div>
                    <InputLabel htmlFor="available_date" value="Tanggal tersedia" />
                    <TextInput
                        id="available_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.available_date}
                        onChange={(event) => setData('available_date', event.target.value)}
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
                        onChange={(event) => setData('expiry_date', event.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.expiry_date} />
                </div>

                <div>
                    <InputLabel htmlFor="claim_radius_km" value="Radius claim (km)" />
                    <TextInput
                        id="claim_radius_km"
                        type="number"
                        min="1"
                        max="200"
                        className="mt-1 block w-full"
                        value={data.claim_radius_km}
                        onChange={(event) => setData('claim_radius_km', event.target.value)}
                    />
                    <InputError className="mt-2" message={errors.claim_radius_km} />
                </div>

                <div>
                    <InputLabel htmlFor="image" value="Foto limbah" />
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-green-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-green-800"
                        onChange={(event) => setData('image', event.target.files[0])}
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
