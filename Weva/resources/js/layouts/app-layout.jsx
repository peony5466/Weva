import CartProvider from '@/contexts/CartContext';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
export default ({ children, breadcrumbs, ...props }) => (
    <CartProvider>
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    </CartProvider>
);
