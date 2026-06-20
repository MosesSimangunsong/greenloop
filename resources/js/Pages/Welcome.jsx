import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const steps = [
    {
        label: 'Producer posting',
        title: 'Limbah organik didaftarkan',
        desc: 'Producer mencatat jenis, berat, lokasi, dan radius klaim limbah yang tersedia.',
    },
    {
        label: 'Receiver menemukan',
        title: 'Sistem mencocokkan otomatis',
        desc: 'Receiver melihat limbah relevan berdasarkan kategori, jarak, dan rekomendasi pemanfaatan.',
    },
    {
        label: 'Klaim & verifikasi',
        title: 'Receiver mengajukan klaim',
        desc: 'Producer meninjau, menyetujui, lalu menyerahkan limbah ke receiver yang tepat.',
    },
    {
        label: 'Diproses & berputar',
        title: 'Limbah kembali jadi manfaat',
        desc: 'Receiver mengolah limbah, siklus tertutup, dan loop berikutnya dimulai lagi.',
    },
];

const features = [
    {
        title: 'Matching transparan',
        desc: 'Setiap hasil pencarian disertai alasan kecocokan: kategori, radius, dan jarak — bukan kotak hitam.',
    },
    {
        title: 'Rekomendasi pemanfaatan',
        desc: 'Tiap kategori limbah dilengkapi ide pengolahan, jadi receiver tahu limbah itu bisa jadi apa.',
    },
    {
        title: 'Dashboard monitoring',
        desc: 'Admin memantau aktivitas user, posting, dan klaim secara real-time dalam satu tempat.',
    },
    {
        title: 'Alur klaim yang jelas',
        desc: 'Status pending, approved, hingga completed terekam rapi di kedua sisi, producer dan receiver.',
    },
];

function Reveal({ children, className = '', delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(node);
                }
            },
            { threshold: 0.15 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default function Welcome() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSectionNavigate = (event, sectionId) => {
        event.preventDefault();

        const section = document.getElementById(sectionId);
        if (!section) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        section.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'start',
        });

        window.history.replaceState(null, '', `#${sectionId}`);
    };

    return (
        <>
            <Head title="GreenLoop — Pertukaran Limbah Organik Toba" />

            <div
                className="min-h-screen scroll-smooth bg-[#FAF6EC] text-[#1A1A1A]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
                <header
                    className={`sticky top-0 z-30 border-b bg-[#FAF6EC]/90 backdrop-blur transition-shadow duration-300 ${
                        scrolled ? 'border-[#1A1A1A]/10 shadow-sm' : 'border-transparent'
                    }`}
                >
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <span
                            className="text-xl font-black tracking-tight"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Green<span className="text-[#5C8A00]">Loop</span>
                        </span>

                        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
                            <a
                                href="#cara-kerja"
                                onClick={(event) => handleSectionNavigate(event, 'cara-kerja')}
                                className="transition-colors duration-200 hover:text-[#5C8A00]"
                            >
                                Cara kerja
                            </a>
                            <a
                                href="#fitur"
                                onClick={(event) => handleSectionNavigate(event, 'fitur')}
                                className="transition-colors duration-200 hover:text-[#5C8A00]"
                            >
                                Fitur
                            </a>
                        </nav>

                        <div className="flex items-center gap-3">
                            <Link
                                href={route('login')}
                                className="text-sm font-semibold text-[#1A1A1A] transition-colors duration-200 hover:text-[#5C8A00]"
                            >
                                Masuk
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-[#C6F135] transition-all duration-300 hover:scale-105 hover:bg-[#0F3D2E]"
                            >
                                Daftar gratis
                            </Link>
                        </div>
                    </div>
                </header>

                <section className="relative overflow-hidden">
                    <div className="absolute -right-24 -top-24 h-96 w-96 animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-[#C6F135] opacity-40 blur-3xl" />
                    <div className="absolute -left-32 top-40 h-72 w-72 animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-[#D2691E] opacity-20 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
                        <Reveal>
                            <span
                                className="inline-block rounded-full bg-[#0F3D2E] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C6F135]"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                Kabupaten Toba
                            </span>

                            <h1
                                className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Limbah organik berputar,
                                <br />
                                bukan menumpuk.
                            </h1>

                            <p className="mt-6 max-w-lg text-lg text-[#1A1A1A]/70">
                                GreenLoop mempertemukan pemilik limbah organik dengan pihak
                                yang siap mengolahnya. Posting, temukan, klaim — lalu siklus
                                berputar lagi.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link
                                    href={route('register')}
                                    className="group rounded-full bg-[#C6F135] px-7 py-3.5 text-sm font-bold text-[#0F3D2E] shadow-[4px_4px_0_#0F3D2E] transition-all duration-300 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F3D2E]"
                                >
                                    Mulai sekarang{' '}
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="rounded-full border-2 border-[#1A1A1A] px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:bg-[#1A1A1A] hover:text-[#FAF6EC]"
                                >
                                    Sudah punya akun
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal delay={150} className="mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96">
                            <div className="relative h-full w-full">
                                <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-[#0F3D2E]/30" />

                                <div className="absolute inset-8 rounded-full bg-[#0F3D2E] text-[#FAF6EC] shadow-xl transition-transform duration-500 hover:scale-105">
                                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center">
                                        <span
                                            className="text-3xl font-black"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            4 langkah
                                        </span>
                                        <span className="text-xs uppercase tracking-widest text-[#C6F135]">
                                            satu siklus tertutup
                                        </span>
                                    </div>
                                </div>

                                {steps.map((step, index) => {
                                    const angle = (index / steps.length) * 2 * Math.PI - Math.PI / 2;
                                    const radius = 155;
                                    const x = Math.cos(angle) * radius;
                                    const y = Math.sin(angle) * radius;

                                    return (
                                        <div
                                            key={step.label}
                                            className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-[#C6F135] text-center text-[11px] font-bold leading-tight text-[#0F3D2E] shadow-md transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20 sm:text-xs"
                                            style={{ transform: `translate(${x - 32}px, ${y - 32}px)` }}
                                        >
                                            {step.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </Reveal>
                    </div>
                </section>

                <section id="cara-kerja" className="scroll-mt-20 border-t border-[#1A1A1A]/10 bg-white py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <Reveal className="max-w-xl">
                            <span
                                className="text-xs font-bold uppercase tracking-widest text-[#5C8A00]"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                Cara kerja
                            </span>
                            <h2
                                className="mt-3 text-4xl font-black tracking-tight"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Satu siklus, empat tahap.
                            </h2>
                        </Reveal>

                        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {steps.map((step, index) => (
                                <Reveal key={step.title} delay={index * 100}>
                                    <div className="h-full rounded-2xl border-2 border-[#1A1A1A] bg-[#FAF6EC] p-6 shadow-[4px_4px_0_#1A1A1A] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[6px_6px_0_#1A1A1A]">
                                        <span
                                            className="text-xs font-bold text-[#D2691E]"
                                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="mt-3 text-lg font-bold leading-snug">{step.title}</h3>
                                        <p className="mt-2 text-sm text-[#1A1A1A]/70">{step.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="fitur" className="scroll-mt-20 bg-[#0F3D2E] py-24 text-[#FAF6EC]">
                    <div className="mx-auto max-w-7xl px-6">
                        <Reveal className="max-w-xl">
                            <span
                                className="text-xs font-bold uppercase tracking-widest text-[#C6F135]"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                Fitur
                            </span>
                            <h2
                                className="mt-3 text-4xl font-black tracking-tight"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Dibangun supaya limbah benar-benar tersalurkan.
                            </h2>
                        </Reveal>

                        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[#FAF6EC]/10 sm:grid-cols-2">
                            {features.map((feature, index) => (
                                <Reveal key={feature.title} delay={index * 80}>
                                    <div className="h-full bg-[#0F3D2E] p-8 transition-colors duration-300 hover:bg-[#143F2C]">
                                        <h3 className="text-xl font-bold text-[#C6F135]">{feature.title}</h3>
                                        <p className="mt-3 text-sm text-[#FAF6EC]/70">{feature.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <Reveal className="mx-auto max-w-4xl px-6">
                        <div className="rounded-3xl bg-[#C6F135] px-8 py-16 text-center shadow-[8px_8px_0_#0F3D2E] transition-shadow duration-300 hover:shadow-[10px_10px_0_#0F3D2E]">
                            <h2
                                className="text-4xl font-black tracking-tight text-[#0F3D2E] sm:text-5xl"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Limbahmu, mulai berputar hari ini.
                            </h2>
                            <p className="mx-auto mt-4 max-w-md text-[#0F3D2E]/80">
                                Daftar sebagai producer atau receiver, dan jadi bagian dari
                                siklus limbah organik Kabupaten Toba.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href={route('register')}
                                    className="rounded-full bg-[#0F3D2E] px-7 py-3.5 text-sm font-bold text-[#C6F135] transition-all duration-300 hover:scale-105 hover:bg-[#1A1A1A]"
                                >
                                    Buat akun gratis
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="rounded-full border-2 border-[#0F3D2E] px-7 py-3.5 text-sm font-bold text-[#0F3D2E] transition-all duration-300 hover:bg-[#0F3D2E] hover:text-[#C6F135]"
                                >
                                    Masuk
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </section>

                <footer className="border-t border-[#1A1A1A]/10 py-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-[#1A1A1A]/60 sm:flex-row">
                        <span
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            className="font-bold text-[#1A1A1A]"
                        >
                            GreenLoop
                        </span>
                        <span>MVP — Pertukaran limbah organik, Kabupaten Toba.</span>
                    </div>
                </footer>
            </div>
        </>
    );
}
