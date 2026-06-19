import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import WastePostForm from '@/Pages/WastePosts/Partials/WastePostForm';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ categories, post }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: post.title,
        waste_category_id: String(post.category?.id ?? ''),
        description: post.description,
        quantity_kg: post.quantity_kg,
        price: post.price,
        is_free: post.is_free,
        address: post.address,
        latitude: post.latitude,
        longitude: post.longitude,
        available_date: post.available_date,
        expiry_date: post.expiry_date,
        claim_radius_km: post.claim_radius_km,
        image: null,
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('my-posts.update', post.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Edit Posting Limbah</h2>}
            title="Edit Posting Limbah"
        >
            <Head title="Edit Posting Limbah" />

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
                                submitLabel="Simpan perubahan"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
