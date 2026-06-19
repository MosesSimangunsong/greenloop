import AppLayout from '@/Layouts/AppLayout';

const navigation = [
    {
        label: 'Admin Overview',
        items: [
            {
                label: 'Dashboard',
                href: route('admin.dashboard'),
                activePatterns: ['admin.dashboard'],
                icon: 'admin',
            },
            {
                label: 'Analytics',
                href: route('admin.analytics.index'),
                activePatterns: ['admin.analytics.index'],
                icon: 'analytics',
            },
        ],
    },
    {
        label: 'Monitoring',
        items: [
            {
                label: 'Users',
                href: route('admin.users.index'),
                activePatterns: ['admin.users.index'],
                icon: 'users',
            },
            {
                label: 'Waste Posts',
                href: route('admin.waste-posts.index'),
                activePatterns: ['admin.waste-posts.index'],
                icon: 'posts',
            },
            {
                label: 'Claims',
                href: route('admin.claims.index'),
                activePatterns: ['admin.claims.index'],
                icon: 'claims',
            },
        ],
    },
    {
        label: 'Master Data',
        items: [
            {
                label: 'Categories',
                href: route('admin.categories.index'),
                activePatterns: ['admin.categories.index'],
                icon: 'categories',
            },
            {
                label: 'Recommendations',
                href: route('admin.recommendations.index'),
                activePatterns: ['admin.recommendations.index'],
                icon: 'recommendations',
            },
        ],
    },
    {
        label: 'Back to App',
        items: [
            {
                label: 'User Dashboard',
                href: route('dashboard'),
                activePatterns: [],
                icon: 'dashboard',
            },
        ],
    },
];

export default function AdminLayout({ children, header, title = 'Admin Workspace' }) {
    return (
        <AppLayout
            header={header}
            navigation={navigation}
            sectionLabel="Admin Workspace"
            title={title}
        >
            {children}
        </AppLayout>
    );
}
