import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/layouts/client-layout';
import Filters from '@/components/ui/filter';

export default function Index({ products, categories, currentCategory }) {
    const productList = products.data || products;

    return (
        <ClientLayout>
            <Head title="Collection — WEVA" />

            <div className="min-h-screen bg-white text-black p-4 lg:p-8">

                <Filters
                    categories={categories}
                    currentCategory={currentCategory}
                />

                <header className="mt-20 mb-24 text-center">
                    <h1 className="text-2xl font-medium uppercase tracking-[0.3em] mb-4">
                        All Collection
                    </h1>
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Explore our collection that conveys a modern aesthetic feel.
                    </p>
                </header>

                {/* GRILLE DE PRODUITS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
                    {productList.map((product) => (
                        <div key={product.id} className="group flex flex-col relative">

                            {/* CONTENEUR IMAGE */}
                            <div className={`relative aspect-[4/3] overflow-hidden flex items-center justify-center p-8 transition-colors duration-500 
                                ${product.is_exclusive ? 'bg-[#fafafa] border-b-2 border-amber-500/20' : 'bg-white group-hover:bg-[#fafafa]'}`}>

                                {/* BADGE EXCLUSIVE VAULT (WT Credits) */}
                                {product.is_exclusive === 1 ? (
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-black text-white px-3 py-1 border border-amber-500/50 shadow-lg">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em]">
                                                    Exclusive_Vault
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* BADGE LIMITED ASSET (Standard) */
                                    product.is_limited === 1 && (
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-[#222] via-[#444] to-[#111] px-4 py-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.2)] skew-x-[-15deg] border border-white/10 border-r-4 border-r-gray-400">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                                <div className="flex items-center gap-2 skew-x-[15deg] relative z-10">
                                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                                    <p className="text-[9px] font-black text-white uppercase tracking-[0.2em] italic">
                                                        Limited_Asset
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}

                                <Link href={route('shop.show', product.slug)} className="w-full h-full flex items-center justify-center">
                                    {product.image_path ? (
                                        <img
                                            src={product.image_path.startsWith('http')
                                                ? product.image_path
                                                : `/storage/${product.image_path.replace('storage/', '')}`}
                                            alt={product.name}
                                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <img src="https://placehold.co/600x800/FFFFFF/000000?text=No+Asset" alt="No Image" className="w-full h-full object-contain opacity-20" />
                                    )}
                                </Link>

                                <button className="absolute bottom-4 right-4 text-black opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                </button>
                            </div>

                            {/* INFOS PRODUIT */}
                            <div className="mt-4 flex flex-col gap-1">
                                <div className="flex justify-between items-start">
                                    <h2 className={`text-[13px] font-medium tracking-wide uppercase ${product.is_exclusive ? 'text-amber-600' : 'text-gray-900'}`}>
                                        {product.name}
                                    </h2>
                                </div>
                                <div className="flex flex-col">
                                    {product.is_exclusive ? (
                                        <span className="text-[12px] text-gray-900 font-bold flex items-center gap-1">
                                            {product.wt_price} <span className="text-[10px] tracking-tighter">WT CREDITS</span>
                                        </span>
                                    ) : (
                                        <span className="text-[12px] text-gray-900 font-semibold">
                                            € {product.price}
                                        </span>
                                    )}

                                    {product.stock <= 0 && (
                                        <span className="text-[10px] text-red-500 uppercase font-bold mt-1">Sold out</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ClientLayout>
    );
}