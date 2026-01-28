import React, { useState } from 'react'; // N'oublie pas l'import de useState !
import { PRODUCTS } from '@/data/products';
import Navbar from '@/components/home/navbar';
import ProductCard from '@/components/ui/productcard';
import Filters from '@/components/ui/filter';

export default function ShopIndex() {
    // 1. Toute la logique doit être ICI, au début de la fonction
    const [activeFilter, setActiveFilter] = useState('Best sellers');

    const filteredProducts = PRODUCTS.filter(product =>
        activeFilter === 'All' ? true : product.category === activeFilter
    );

    // 2. Le return doit être ICI, à la fin de la fonction
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Conteneur pour espacer du haut à cause de la navbar */}
            <div className="pt-24">
                <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-10">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}