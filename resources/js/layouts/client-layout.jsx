import React, { useState } from 'react';
import Navbar from '@/components/home/navbar';
import CartDrawer from '@/components/ui/cart-drawer';
import CookieBanner from '@/components/ui/CookieBanner';
import { usePage } from '@inertiajs/react';

export default function ClientLayout({ children }) {
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = usePage().props;

    return (
        <div className="min-h-screen bg-white">
            <Navbar onOpenCart={() => setCartOpen(true)} />
            <main>{children}</main>
            <CartDrawer open={cartOpen} setOpen={setCartOpen} />
            <CookieBanner />
        </div>
    );
}