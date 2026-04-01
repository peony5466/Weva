import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { Coins, Database, Layers, LayoutGrid, Package, ShoppingBag, UserCircle, Users } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const userRole = user?.role?.toLowerCase();

    let mainNavItems = [];

    if (userRole === 'admin') {
        mainNavItems = [
            { title: 'System Control', url: '/dashboard', icon: LayoutGrid },
            { title: 'Inventory Log', url: '/dashboard/admin/products', icon: Package },
            { title: 'Terminal Orders', url: '/dashboard/admin/orders', icon: ShoppingBag },
            { title: 'Citizens', url: '/dashboard/admin/users', icon: Users },
            { title: 'Categories', url: '/dashboard/admin/categories', icon: Layers },
        ];
    } else if (user) {
        mainNavItems = [
            { title: 'Vip Protocol', url: '/dashboard/wevavip', icon: UserCircle },
            // { title: 'Asset Vault', url: '/dashboard/tokens', icon: Coins },
            { title: 'Historique des Commandes', url: '/dashboard/orders', icon: Database },
            { title: 'Boutique', url: '/shop', icon: ShoppingBag },
        ];
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={user ? '/' : '/'} prefetch>
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
                <NavFooter items={[]} className="mt-auto" />
                {user && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}
