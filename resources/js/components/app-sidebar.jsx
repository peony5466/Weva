import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    LayoutGrid,
    UserCircle,
    Coins,
    ShoppingBag,
    Package,
    Layers,
    UserCheck,
    Database
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const user = auth?.user;

    // Normalisation du rôle pour éviter les erreurs de casse
    const userRole = user?.role?.toLowerCase();

    // --- CONSTRUCTION DU MENU DYNAMIQUE ---
    let mainNavItems = [];

    if (userRole === 'admin') {
        // STRUCTURE DE NAVIGATION : SYSTEM ADMINISTRATOR
        mainNavItems = [
            { title: 'System Control', url: route('dashboard'), icon: LayoutGrid },
            { title: 'Inventory Log', url: route('admin.products.index'), icon: Package },
            { title: 'Core Categories', url: route('admin.categories.index'), icon: Layers },
            { title: 'Citizen Registry', url: route('admin.users.index'), icon: UserCheck },
            { title: 'Terminal Orders', url: route('admin.orders.index'), icon: ShoppingBag },
        ];
    } else if (user) {
        // STRUCTURE DE NAVIGATION : VIP CLIENT
        mainNavItems = [
            { title: 'Vip Protocol', url: route('wevavip'), icon: UserCircle },
            { title: 'Asset Vault', url: route('tokens.my-wallet'), icon: Coins },
            { title: 'Order History', url: route('client.orders'), icon: Database },
            { title: 'Boutique', url: route('shop.index'), icon: ShoppingBag },
        ];
    } else {
        // STRUCTURE DE NAVIGATION : GUEST
        mainNavItems = [
            { title: 'Access Boutique', url: route('shop.index'), icon: ShoppingBag },
            { title: 'Initialize Login', url: route('login'), icon: UserCircle },
        ];
    }

    const footerNavItems = [
        {
            title: 'System Docs',
            url: 'https://laravel.com/docs',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                {/* DEBUG : À supprimer après le test */}
                <div className="p-2 text-[10px] bg-red-500 text-white font-mono">
                    ROLE_DETECTED: {user?.role || 'NULL'}
                </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            {/* Le logo redirige vers le tableau de bord approprié */}
                            <Link href={user ? route('dashboard') : route('home')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Injection des items filtrés par rôle */}
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                {/* Affichage du profil utilisateur uniquement si connecté */}
                {user && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}