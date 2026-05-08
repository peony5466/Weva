import React, { useState } from 'react';
import Navbar from '@/components/home/navbar';
import Footer from '@/components/home/footer';
import CartDrawer from '@/components/ui/cart-drawer';
import { usePage } from '@inertiajs/react';

export default function ClientLayout({ children, showFooter = true }) {
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = usePage().props;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar onOpenCart={() => setCartOpen(true)} />
            <main className="flex-1">{children}</main>
            {showFooter && <Footer />}
            <CartDrawer open={cartOpen} setOpen={setCartOpen} />
        </div>
    );
}
