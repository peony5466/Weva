import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, UserCircle, ShoppingBag, Coins } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const user = auth.user;

    // Utilisation des noms de routes Laravel via Ziggy
    const mainNavItems = user.role === 'admin'
        ? [
            {
                title: 'Dashboard Admin',
                url: route('dashboard'),
                icon: LayoutGrid,
            },
        ]
        : [
            {
                title: 'Mon Avatar',
                url: route('avatar'),
                icon: UserCircle,
            },
            {
                title: 'Mes Tokens',
                url: route('token'),
                icon: Coins,
            },
            {
                title: 'Boutique',
                url: route('shop'),
                icon: ShoppingBag,
            },
        ];

    const footerNavItems = [
        {
            title: 'Documentation',
            url: 'https://laravel.com/docs',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}