import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/layouts/client-layout';
import ProductGrid from '@/components/product-grid';

export default function Index({ products, categories, currentCategory }) {
    const productList = products?.data || products || [];

    return (
        <ClientLayout>
            <Head title="Collection — WEVA" />

            <div className="min-h-screen bg-white text-black">

                {/* Header */}
                <div className="pt-32 pb-12 px-6 text-center border-b border-gray-100">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-3">
                        Weva · 2026
                    </p>
                    <h1 className="text-3xl font-semibold uppercase tracking-[0.2em] text-black">
                        Collection
                    </h1>
                </div>

                {/* Filtres catégories */}
                {categories?.length > 0 && (
                    <div className="flex gap-2 px-6 py-6 flex-wrap border-b border-gray-100 justify-center">
                        <Link
                            href={route('shop.index')}
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 transition-all border ${
                                !currentCategory
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                            }`}
                        >
                            Tout
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={route('shop.index', { category: cat.slug })}
                                className={`text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 transition-all border ${
                                    currentCategory === cat.slug
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Nombre de résultats */}
                <div className="px-8 py-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                        {productList.length} article{productList.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Grille produits */}
                <ProductGrid products={productList} />

            </div>
        </ClientLayout>
    );
}
