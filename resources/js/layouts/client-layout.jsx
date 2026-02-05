import React, { useState } from 'react';
import Navbar from '@/components/home/navbar';
import CartDrawer from '@/components/ui/cart-drawer';
import { usePage } from '@inertiajs/react';

export default function ClientLayout({ children }) {
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = usePage().props;

    return (
        <div className="min-h-screen bg-white">
            {/* On passe la fonction d'ouverture à la Navbar */}
            <Navbar onOpenCart={() => setCartOpen(true)} />

            <main>{children}</main>

            {/* Le panier est maintenant global */}
            <CartDrawer open={cartOpen} setOpen={setCartOpen} />
        </div>
    );
}