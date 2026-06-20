import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div
            className="flex min-h-screen bg-[#FAF6EC] text-[#1A1A1A]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
            {/* PANEL KIRI — branding */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0B2E22] p-14 text-[#FAF6EC] lg:flex">
                {/* ambient gradient, bergerak pelan */}
                <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] animate-[pulse_12s_ease-in-out_infinite] rounded-full bg-[#C6F135] opacity-[0.07] blur-[100px]" />
                <div className="absolute -bottom-48 -left-24 h-[28rem] w-[28rem] animate-[pulse_14s_ease-in-out_infinite] rounded-full bg-[#5C8A00] opacity-[0.15] blur-[100px]" />

                {/* garis organik tipis, berlapis */}
                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 600 800"
                    fill="none"
                >
                    <path
                        d="M -50 320 C 90 220, 180 420, 320 320 C 440 230, 520 380, 650 280"
                        stroke="#FAF6EC"
                        strokeOpacity="0.06"
                        strokeWidth="1"
                    />
                    <path
                        d="M -50 460 C 110 380, 230 560, 370 450 C 480 365, 560 500, 650 410"
                        stroke="#C6F135"
                        strokeOpacity="0.14"
                        strokeWidth="1"
                    />
                    <path
                        d="M -50 600 C 100 540, 240 680, 380 580 C 500 495, 570 630, 650 560"
                        stroke="#FAF6EC"
                        strokeOpacity="0.05"
                        strokeWidth="1"
                    />
                    <circle cx="300" cy="330" r="2" fill="#C6F135" fillOpacity="0.5" />
                    <circle cx="440" cy="470" r="1.5" fill="#FAF6EC" fillOpacity="0.3" />
                </svg>

                {/* noise/grain halus pakai overlay gradient tipis */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />

                <Link
                    href="/"
                    className="relative z-10 text-2xl font-black tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Green<span className="text-[#C6F135]">Loop</span>
                </Link>

                <div className="relative z-10 max-w-sm">
                    <span
                        className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C6F135]/70"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        Kabupaten Toba
                    </span>

                    <h2
                        className="mt-5 text-[2.4rem] font-black leading-[1.12] tracking-tight"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Limbah organik,
                        <br />
                        <span className="text-[#C6F135]">kembali jadi manfaat.</span>
                    </h2>

                    <p className="mt-5 text-sm leading-relaxed text-[#FAF6EC]/55">
                        Satu platform yang menghubungkan producer dan receiver
                        limbah organik — dari posting, klaim, hingga diproses
                        kembali.
                    </p>

                    <div className="mt-10 flex gap-3">
                        <div className="rounded-xl border border-[#FAF6EC]/10 bg-[#FAF6EC]/5 px-4 py-3 backdrop-blur-sm">
                            <div
                                className="text-lg font-black text-[#C6F135]"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                3 peran
                            </div>
                            <div className="mt-0.5 text-[11px] text-[#FAF6EC]/45">
                                producer · receiver · admin
                            </div>
                        </div>
                        <div className="rounded-xl border border-[#FAF6EC]/10 bg-[#FAF6EC]/5 px-4 py-3 backdrop-blur-sm">
                            <div
                                className="text-lg font-black text-[#C6F135]"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                1 siklus
                            </div>
                            <div className="mt-0.5 text-[11px] text-[#FAF6EC]/45">
                                tertutup &amp; terukur
                            </div>
                        </div>
                    </div>
                </div>

                <span
                    className="relative z-10 text-[11px] uppercase tracking-[0.25em] text-[#FAF6EC]/25"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                    MVP — Kabupaten Toba
                </span>
            </div>

            {/* PANEL KANAN — form */}
            <div className="flex w-full flex-col items-center justify-center bg-[#FAF6EC] px-6 py-10 lg:w-1/2">
                <Link
                    href="/"
                    className="mb-8 text-xl font-black tracking-tight lg:hidden"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Green<span className="text-[#5C8A00]">Loop</span>
                </Link>

                <div className="w-full max-w-sm rounded-2xl bg-white p-9 shadow-[0_8px_40px_-12px_rgba(15,61,46,0.18)]">
                    {children}
                </div>
            </div>
        </div>
    );
}
