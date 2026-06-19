import AppLayout from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children, header, title = 'GreenLoop Workspace' }) {
    const roles = usePage().props.auth.user.roles ?? [];

    const navigation = [
        {
            label: 'Overview',
            items: [
                {
                    label: 'Dashboard',
                    href: route('dashboard'),
                    activePatterns: ['dashboard'],
                    icon: 'dashboard',
                },
                {
                    label: 'Profile',
                    href: route('profile.edit'),
                    activePatterns: ['profile.*'],
                    icon: 'profile',
                },
            ],
        },
        ...(roles.includes('producer')
            ? [
                  {
                      label: 'Producer',
                      items: [
                          {
                              label: 'Posting Saya',
                              href: route('my-posts.index'),
                              activePatterns: ['my-posts.index', 'my-posts.edit', 'waste-posts.show'],
                              icon: 'myPosts',
                          },
                          {
                              label: 'Buat Posting',
                              href: route('waste-posts.create'),
                              activePatterns: ['waste-posts.create'],
                              icon: 'create',
                          },
                          {
                              label: 'Claim Masuk',
                              href: route('incoming-claims.index'),
                              activePatterns: ['incoming-claims.index'],
                              icon: 'incomingClaims',
                          },
                      ],
                  },
              ]
            : []),
        ...(roles.includes('receiver')
            ? [
                  {
                      label: 'Receiver',
                      items: [
                          {
                              label: 'Cari Limbah',
                              href: route('waste-posts.index'),
                              activePatterns: ['waste-posts.index'],
                              icon: 'browse',
                          },
                          {
                              label: 'Claim Saya',
                              href: route('my-claims.index'),
                              activePatterns: ['my-claims.index'],
                              icon: 'myClaims',
                          },
                      ],
                  },
              ]
            : []),
        ...(roles.includes('admin')
            ? [
                  {
                      label: 'Admin',
                      items: [
                          {
                              label: 'Admin Dashboard',
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
              ]
            : []),
    ];

    return (
        <AppLayout
            header={header}
            navigation={navigation}
            sectionLabel="User Workspace"
            title={title}
        >
            {children}
        </AppLayout>
    );
}
