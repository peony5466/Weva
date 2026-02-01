import React from 'react';
import { Head, Link } from '@inertiajs/react'; // Helpers indispensables

export default function Index({ products }) { // 'products' arrive de Laravel
    return (
        <>
            <Head title="Boutique de Vêtements" />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Notre Collection</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 shadow rounded-lg">
                            {/* Affichage de l'image */}
                            <img src={product.image_path} alt={product.name} className="w-full h-64 object-cover" />

                            <h2 className="mt-4 text-xl">{product.name}</h2>
                            <p className="text-gray-600">{product.price} €</p>

                            {/* Lien vers la page produit avec le helper Link d'Inertia */}
                            <Link
                                href={route('shop.show', product.slug)}
                                className="mt-4 block bg-black text-white text-center py-2 rounded"
                            >
                                Voir le produit
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}