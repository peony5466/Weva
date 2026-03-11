import React from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from '@/layouts/client-layout';
import Filters from '@/components/ui/filter';
import ProductGrid from '@/components/product-grid';


export default function Index({ products, categories, currentCategory }) {
    const productList = products.data || products;

    return (
        <ClientLayout>
            <Head title="Collection — WEVA" />

            <div className="min-h-screen bg-white text-black p-4 lg:p-8 pt-24 lg:pt-28">

                <div className="px-0 -mx-4 lg:-mx-8 mb-8">
                    <Filters
                        categories={categories}
                        currentCategory={currentCategory}
                        baseRoute="shop.index"     // ← reste sur Collection
                    />
                </div>

                <header className="mt-20 mb-24 text-center">
                    <h1 className="text-2xl font-medium uppercase tracking-[0.3em] mb-4 italic">
                        All_Collection
                    </h1>
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed uppercase text-[10px] tracking-widest font-bold">
                        Asset_Inventory_Management // Systems_Active
                    </p>
                </header>

                <ProductGrid products={productList} />

            </div>
        </ClientLayout>
    );
}
