import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';
import { Sheet, SheetContent } from '@/Components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    ClipboardList,
    FolderKanban,
    LayoutDashboard,
    Leaf,
    ListChecks,
    LogOut,
    Menu,
    PackageSearch,
    PlusCircle,
    Recycle,
    Settings,
    Shield,
    Tags,
    UserCircle2,
    Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const iconMap = {
    admin: Shield,
    analytics: BarChart3,
    browse: PackageSearch,
    categories: Tags,
    claims: ClipboardList,
    create: PlusCircle,
    dashboard: LayoutDashboard,
    incomingClaims: ListChecks,
    myClaims: ClipboardList,
    myPosts: FolderKanban,
    posts: Recycle,
    profile: Settings,
    recommendations: Leaf,
    users: Users,
};

export default function AppSidebarLayout({
    children,
    header,
    navigation,
    sectionLabel = 'Workspace',
    title,
}) {
    const user = usePage().props.auth.user;
    const flashStatus = usePage().props.flash?.status;
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerContent = useMemo(() => normalizeHeader(header, title), [header, title]);

    return (
        <div className="min-h-screen bg-[#F6F4ED]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="flex min-h-screen">
                <aside className="hidden w-72 shrink-0 border-r border-[#1A1A1A]/8 bg-white lg:flex lg:flex-col">
                    <SidebarContent
                        navigation={navigation}
                        sectionLabel={sectionLabel}
                        user={user}
                    />
                </aside>

                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetContent className="w-[85vw] max-w-xs bg-white p-0">
                        <SidebarContent
                            navigation={navigation}
                            sectionLabel={sectionLabel}
                            user={user}
                            onNavigate={() => setMobileOpen(false)}
                        />
                    </SheetContent>
                </Sheet>

                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="sticky top-0 z-30 border-b border-[#1A1A1A]/8 bg-white/95 backdrop-blur">
                        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div className="flex min-w-0 items-center gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 text-[#0F3D2E] hover:bg-[#0F3D2E]/5 lg:hidden"
                                    onClick={() => setMobileOpen(true)}
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                                <div className="min-w-0">
                                    <p
                                        className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5C8A00]"
                                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                    >
                                        {sectionLabel}
                                    </p>
                                    <p className="truncate text-sm font-bold text-[#1A1A1A]">
                                        {headerContent.title}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-semibold text-[#1A1A1A]">{user.name}</p>
                                    <p className="text-xs capitalize text-[#1A1A1A]/50">
                                        {user.roles?.length > 0 ? user.roles.join(', ') : 'Akun aktif'}
                                    </p>
                                </div>
                                <UserMenu user={user} />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        {(header || flashStatus) && (
                            <div className="border-b border-[#1A1A1A]/8 bg-white">
                                <div className="px-4 py-5 sm:px-6 lg:px-8">
                                    {header && (
                                        <div className="mb-4">
                                            {typeof header === 'function' ? header() : header}
                                        </div>
                                    )}
                                    {flashStatus && (
                                        <div className="rounded-xl border border-[#C6F135]/40 bg-[#C6F135]/15 px-4 py-3 text-sm font-medium text-[#0F3D2E]">
                                            {formatFlashStatus(flashStatus)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <main className="pb-10">{children}</main>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarContent({ navigation, onNavigate, sectionLabel, user }) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center gap-3 px-5">
                <Link href="/" className="flex items-center gap-3" onClick={onNavigate}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F3D2E] text-[#C6F135]">
                        <ApplicationLogo className="h-6 w-6 fill-current" />
                    </div>
                    <div>
                        <p
                            className="text-sm font-black tracking-tight text-[#1A1A1A]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            GreenLoop
                        </p>
                        <p className="text-xs text-[#1A1A1A]/45">{sectionLabel}</p>
                    </div>
                </Link>
            </div>

            <Separator className="bg-[#1A1A1A]/8" />

            <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-6">
                    {navigation.map((group) => (
                        <div key={group.label} className="space-y-1.5">
                            <p
                                className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A]/35"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                {group.label}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <SidebarItem key={item.label} item={item} onNavigate={onNavigate} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-[#1A1A1A]/8" />

            <div className="p-4">
                <div className="rounded-2xl bg-[#F6F4ED] p-4">
                    <p className="truncate text-sm font-semibold text-[#1A1A1A]">{user.name}</p>
                    <p className="mt-0.5 truncate text-xs text-[#1A1A1A]/50">{user.email}</p>
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ item, onNavigate }) {
    const Icon = iconMap[item.icon] ?? LayoutDashboard;
    const isActive = item.activePatterns.some((pattern) => route().current(pattern));

    return (
        <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200 lg:py-2.5',
                isActive
                    ? 'bg-[#C6F135]/25 text-[#0F3D2E] font-semibold'
                    : 'text-[#1A1A1A]/65 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]',
            )}
        >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
        </Link>
    );
}

function UserMenu({ user }) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1A1A1A]/10 bg-white text-[#0F3D2E] transition-colors hover:bg-[#0F3D2E]/5"
                >
                    <UserCircle2 className="h-5 w-5" />
                </button>
            </Dropdown.Trigger>

            <Dropdown.Content align="right" width="48" contentClasses="rounded-xl border border-[#1A1A1A]/10 bg-white py-2 shadow-xl">
                <div className="px-4 pb-2">
                    <p className="text-sm font-semibold text-[#1A1A1A]">{user.name}</p>
                    <p className="text-xs text-[#1A1A1A]/50">{user.email}</p>
                </div>
                <Separator className="mb-2 bg-[#1A1A1A]/8" />
                <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Profile
                </Dropdown.Link>
                <Dropdown.Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex items-center gap-2 text-red-600 hover:bg-red-50 focus:bg-red-50"
                >
                    <LogOut className="h-4 w-4" />
                    Log Out
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}

function normalizeHeader(header, title) {
    if (title) {
        return { title };
    }

    if (!header) {
        return { title: 'GreenLoop Workspace' };
    }

    if (typeof header === 'string') {
        return { title: header };
    }

    return { title: 'GreenLoop Workspace' };
}

function formatFlashStatus(status) {
    const labelMap = {
        'waste-post-created': 'Posting limbah berhasil dibuat.',
        'waste-post-updated': 'Posting limbah berhasil diperbarui.',
        'waste-post-deleted': 'Posting limbah berhasil dihapus.',
        'claim-created': 'Claim berhasil diajukan.',
        'claim-approved': 'Claim berhasil disetujui.',
        'claim-rejected': 'Claim berhasil ditolak.',
        'claim-completed': 'Claim berhasil diselesaikan.',
        'claim-cancelled': 'Claim berhasil dibatalkan.',
        'category-created': 'Kategori berhasil ditambahkan.',
        'category-updated': 'Kategori berhasil diperbarui.',
        'recommendation-created': 'Rekomendasi berhasil ditambahkan.',
        'recommendation-updated': 'Rekomendasi berhasil diperbarui.',
    };

    return labelMap[status] ?? status;
}
