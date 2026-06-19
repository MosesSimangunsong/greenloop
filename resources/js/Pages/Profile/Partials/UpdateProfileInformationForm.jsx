import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    availableRoles,
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone ?? '',
            business_name: user.business_name ?? '',
            address: user.address ?? '',
            latitude: user.latitude ?? '',
            longitude: user.longitude ?? '',
            roles: user.roles ?? [],
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Nomor WhatsApp" />

                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="business_name" value="Usaha/Instansi" />

                    <TextInput
                        id="business_name"
                        className="mt-1 block w-full"
                        value={data.business_name}
                        onChange={(e) => setData('business_name', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.business_name} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Alamat" />
                    <textarea
                        id="address"
                        className="mt-1 block min-h-24 w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="latitude" value="Latitude" />
                        <TextInput
                            id="latitude"
                            type="number"
                            step="0.000001"
                            className="mt-1 block w-full"
                            value={data.latitude}
                            onChange={(e) => setData('latitude', e.target.value)}
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
                            onChange={(e) => setData('longitude', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.longitude} />
                    </div>
                </div>

                <div>
                    <InputLabel value="Peran akun" />
                    <div className="mt-3 flex flex-wrap gap-4">
                        {availableRoles.map((role) => (
                            <label key={role} className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.roles.includes(role)}
                                    onChange={(event) =>
                                        setData(
                                            'roles',
                                            event.target.checked
                                                ? [...data.roles, role]
                                                : data.roles.filter((item) => item !== role),
                                        )
                                    }
                                    className="rounded border-gray-300 text-green-700 focus:ring-green-700"
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
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
