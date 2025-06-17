import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, GraduationCapIcon, House, PersonStanding, SquareUserRound } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Guru',
        href: '/admin/teachers',
        icon: SquareUserRound,
    },
    {
        title: 'Siswa',
        href: '/admin/students',
        icon: GraduationCapIcon,
    },
    {
        title: 'Kelas',
        href: '/admin/student-classes',
        icon: House,
    },
    {
        title: 'Orang Tua',
        href: '/admin/parents',
        icon: PersonStanding,
    },
    {
        title: 'Rekap',
        icon: Folder,
        children: [
            {
                title: 'Siswa',
                href: '/admin/recap/students',
            },
            {
                title: 'Guru',
                href: '/admin/recap/teachers',
            },
            {
                title: 'Siswa, Kelas & Guru',
                href: '/admin/recap/all',
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/teachers" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
