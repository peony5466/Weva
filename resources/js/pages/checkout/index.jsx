import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function Index() {
    const { cart, cartTotal, auth } = usePage().props;

    return (
        <div className="py-12 bg-white">
            <Head title="Checkout" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-[1000] uppercase italic tracking-tighter mb-8">
                    Checkout_Finalize
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Formulaire de livraison */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-black uppercase tracking-widest border-b pb-2">Shipping Details</h2>
                        <p className="text-xs text-gray-500">Connecté en tant que : {auth.user.email}</p>
                        {/* On ajoutera le formulaire de commande ici plus tard */}
                    </div>

                    {/* Résumé du panier */}
                    <div className="bg-gray-50 p-6 space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-widest border-b pb-2">Order Summary</h2>
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>{cartTotal.toFixed(2)} €</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}