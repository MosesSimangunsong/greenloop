import AppSidebarLayout from '@/Components/AppSidebar';

export default function AppLayout({
    children,
    header,
    navigation,
    sectionLabel,
    title,
}) {
    return (
        <AppSidebarLayout
            header={header}
            navigation={navigation}
            sectionLabel={sectionLabel}
            title={title}
        >
            {children}
        </AppSidebarLayout>
    );
}
