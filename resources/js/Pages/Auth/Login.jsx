import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Selamat datang kembali
            </h1>
            <p className="mt-1 text-sm text-[#1A1A1A]/60">
                Masuk untuk melanjutkan ke akun GreenLoop kamu.
            </p>

            {status && (
                <div className="mt-4 rounded-lg bg-[#C6F135]/30 px-3 py-2 text-sm font-medium text-[#0F3D2E]">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-6">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-lg border-[#1A1A1A]/20 focus:border-[#0F3D2E] focus:ring-[#0F3D2E]"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-[#1A1A1A]/70">Ingat saya</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-[#5C8A00] underline-offset-2 hover:underline"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-6 w-full rounded-full bg-[#0F3D2E] px-5 py-3 text-sm font-bold text-[#C6F135] transition-all duration-300 hover:bg-[#1A1A1A] disabled:opacity-50"
                >
                    Masuk
                </button>

                <p className="mt-5 text-center text-sm text-[#1A1A1A]/60">
                    Belum punya akun?{' '}
                    <Link href={route('register')} className="font-semibold text-[#5C8A00] hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
