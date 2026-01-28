import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import Navbar from '@/components/home/navbar';
import CartProvider from '@contexts/CartContext';
export default ({ children, breadcrumbs, ...props }) => (
    <CartProvider>
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Navbar/>
            {children}
        </AppLayoutTemplate>
    </CartProvider>

);
