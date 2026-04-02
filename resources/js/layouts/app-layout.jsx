import CartProvider from '@/contexts/CartContext';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';

export default function AppLayout({ children, breadcrumbs, ...props }) {
    return (
        <CartProvider>
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                {children}
            </AppLayoutTemplate>
        </CartProvider>
    );
}