import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import WastePostForm from '@/Pages/WastePosts/Partials/WastePostForm';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        waste_category_id: '',
        description: '',
        quantity_kg: '',
        price: '',
        is_free: false,
        address: '',
        latitude: '',
        longitude: '',
        available_date: '',
        expiry_date: '',
        claim_radius_km: 25,
        image: null,
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('waste-posts.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Buat Posting Limbah</h2>}
            title="Buat Posting Limbah"
        >
            <Head title="Buat Posting Limbah" />

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <form onSubmit={submit}>
                            <WastePostForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                categories={categories}
                                submitLabel="Simpan posting"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
