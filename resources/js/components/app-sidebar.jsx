import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { Coins, Database, LayoutGrid, Layers, Package, ShoppingBag, UserCheck, UserCircle } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const userRole = user?.role?.toLowerCase();

    let mainNavItems = [];

    if (userRole === 'admin') {
        mainNavItems = [
            { title: 'System Control',    url: route('dashboard'),              icon: LayoutGrid },
            { title: 'Inventory Log',     url: route('admin.products.index'),   icon: Package },
            { title: 'Core Categories',   url: route('admin.categories.index'), icon: Layers },
            { title: 'Citizen Registry',  url: route('admin.users.index'),      icon: UserCheck },
            { title: 'Terminal Orders',   url: route('admin.orders.index'),     icon: ShoppingBag },
        ];
    } else if (user) {
        mainNavItems = [
            { title: 'Vip Protocol',  url: route('wevavip'),          icon: UserCircle },
            { title: 'Asset Vault',   url: route('tokens.my-wallet'), icon: Coins },
            { title: 'Order History', url: route('client.orders'),    icon: Database },
            { title: 'Boutique',      url: route('shop.index'),       icon: ShoppingBag },
        ];
    } else {
        mainNavItems = [
            { title: 'Access Boutique',  url: route('shop.index'), icon: ShoppingBag },
            { title: 'Initialize Login', url: route('login'),       icon: UserCircle },
        ];
    }

    const footerNavItems = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
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
                {user && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}