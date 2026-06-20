import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar" />

            <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Buat akun baru
            </h1>
            <p className="mt-1 text-sm text-[#1A1A1A]/60">
                Gabung jadi bagian dari siklus limbah organik Toba.
            </p>

            <form onSubmit={submit} className="mt-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full rounded-lg border-[#1A1A1A]/20 focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-lg border-[#1A1A1A]/20 focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-lg border-[#1A1A1A]/20 focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-lg border-[#1A1A1A]/20 focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Daftar sebagai" />
                    <div className="mt-2 grid grid-cols-2 gap-3">
                        {[
                            { value: 'producer', label: 'Producer' },
                            { value: 'receiver', label: 'Receiver' },
                        ].map((option) => (
                            <label
                                key={option.value}
                                className={`flex cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                                    data.role === option.value
                                        ? 'border-[#0F3D2E] bg-[#C6F135]/40 text-[#0F3D2E]'
                                        : 'border-[#1A1A1A]/15 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/40'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value={option.value}
                                    checked={data.role === option.value}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="sr-only"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-6 w-full rounded-full bg-[#0F3D2E] px-5 py-3 text-sm font-bold text-[#C6F135] transition-all duration-300 hover:bg-[#1A1A1A] disabled:opacity-50"
                >
                    Daftar
                </button>

                <p className="mt-5 text-center text-sm text-[#1A1A1A]/60">
                    Sudah punya akun?{' '}
                    <Link href={route('login')} className="font-semibold text-[#5C8A00] hover:underline">
                        Masuk di sini
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
