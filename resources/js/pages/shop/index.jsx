import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/layouts/client-layout';

export default function Index({ products }) {
    const productList = products.data || products;

    return (
        <ClientLayout>
            <Head title="Collection — WEVA" />

            <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12">
                {/* HEADER DE LA COLLECTION */}
                <header className="mb-16 border-b border-white/10 pb-10">
                    <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Season_2026_Assets</span>
                    <h1 className="text-6xl md:text-8xl font-[1000] tracking-tighter uppercase italic skew-x-[-10deg]">
                        The_Collection
                    </h1>
                </header>

                {/* GRILLE DE PRODUITS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                    {productList.map((product) => (
                        <div key={product.id} className="group relative flex flex-col">

                            {/* CONTENEUR IMAGE */}
                            <div className="cursor-pointer relative aspect-[3/4] overflow-hidden bg-[#111] border border-white/5 transition-all duration-700 group-hover:border-white/30">


                                {/* --- ÉTIQUETTE LIMITED EDITION (Style Chrome Liquid Glass) --- */}
                                {(product.is_limited == 1) && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="relative overflow-hidden backdrop-blur-md bg-white/10 px-4 py-1.5 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] skew-x-[-15deg] border border-white/20 border-r-4 border-r-white">

                                            {/* Effet de reflet brillant (Liquid Glass) */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                            <div className="flex items-center gap-2 skew-x-[15deg] relative z-10">
                                                {/* Petit voyant argenté */}
                                                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

                                                <p className="text-[9px] font-[1000] text-white uppercase tracking-[0.2em] italic drop-shadow-md">
                                                    Limited_Asset
                                                </p>
                                            </div>

                                            {/* Overlay de texture métal brossé léger */}
                                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
                                        </div>
                                    </div>
                                )}

                                {product.image_path ? (
                                    <img
                                        src={`/storage/${product.image_path}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/10 font-black italic uppercase">
                                        Img_Not_Found
                                    </div>
                                )}

                                {/* BADGE PRIX AU SURVOL */}
                                <div className="absolute bottom-4 left-0 bg-white text-black px-4 py-2 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 skew-x-[-15deg] z-10">
                                    <p className="font-[1000] text-sm skew-x-[15deg]">{product.price}€</p>
                                </div>
                            </div>

                            {/* INFOS PRODUIT */}
                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        {/* AFFICHAGE DE LA CATÉGORIE ASSIGNÉE */}

                                        <h2 className="text-lg font-[1000] uppercase tracking-tighter italic leading-none group-hover:text-white/100 text-white/70 transition-colors">
                                            {product.name}
                                        </h2>
                                    </div>
                                    <span className="font-mono text-[10px] text-white/20">
                                        REF_{product.id.toString().padStart(4, '0')}
                                    </span>
                                </div>

                                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold line-clamp-1 italic">
                                    {product.description || 'No_Description_Available'}
                                </p>

                                <Link
                                    href={route('shop.show', product.id)}
                                    className="mt-4 block w-full py-4 border border-white/10 text-center text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all skew-x-[-10deg]"
                                >
                                    <span className="skew-x-[10deg] block">View_Details</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ClientLayout>
    );
}