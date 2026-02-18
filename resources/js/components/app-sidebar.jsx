import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, LayoutGrid, UserCircle, Coins, ShoppingBag, Package, Layers, UserCheck } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;

    // SÉCURITÉ : On utilise ?. pour éviter le crash si auth.user est null
    const user = auth?.user;

    // Définition des items de navigation selon le rôle (ou guest)
    let mainNavItems = [];

    if (user?.role === 'admin') {
        mainNavItems = [
            { title: 'Dashboard Admin', url: route('dashboard'), icon: LayoutGrid },
            { title: 'Inventory', url: route('admin.products.index'), icon: Package },
            { title: 'Categories', url: route('admin.categories.index'), icon: Layers },
            { title: 'User Management', url: route('admin.users.index'), icon: UserCheck },
            { title: 'Orders', url: route('admin.orders.index'), icon: ShoppingBag },
        ];
    } else if (user?.role === 'client') {
        mainNavItems = [
            { title: 'Vip Area', url: route('wevavip'), icon: UserCircle },
            { title: 'My Tokens', url: route('tokens.my-wallet'), icon: Coins },
            { title: 'Boutique', url: route('shop.index'), icon: ShoppingBag },
        ];
    } else {
        // Menu pour les invités (Non connectés)
        mainNavItems = [
            { title: 'Boutique', url: route('shop.index'), icon: ShoppingBag },
        ];
    }

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
                            {/* On redirige vers l'accueil si pas de dashboard accessible */}
                            <Link href={user ? route('dashboard') : route('home')} prefetch>
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
                {/* On n'affiche NavUser que si l'utilisateur est connecté */}
                {user && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}