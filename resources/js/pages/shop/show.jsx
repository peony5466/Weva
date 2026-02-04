import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Plus, Minus, Share2, Bookmark } from 'lucide-react';

export default function ProductShow({ product }) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || null);

    return (
        <div className="min-h-screen bg-white text-black font-sans antialiased">
            <Head title={`${product.name} | WEVA`} />

            {/* Navigation ultra-fine */}
            <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-100 uppercase text-[10px] tracking-widest font-medium">
                <Link href={route('shop.index')} className="hover:opacity-50 transition-opacity">Collections</Link>
                <div className="flex gap-8">
                    <span className="opacity-30">Search</span>
                    <span className="opacity-30">Cart (0)</span>
                </div>
            </nav>

            <main className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">

                {/* GAUCHE : VISUEL ÉPURÉ (7 colonnes) */}
                <div className="lg:col-span-8 flex items-center justify-center p-12 bg-[#fcfcfc] relative group">
                    {/* Placeholder image avec effet de zoom subtil au survol */}
                    <div className="w-full max-w-2xl transform transition-transform duration-700 group-hover:scale-105">
                        <img
                            src={product.image_url ? `/storage/${product.image_url}` : '/images/default-product.jpg'}
                            alt={product.name}
                            className="w-full h-auto mix-blend-multiply"
                        />
                    </div>

                    {/* Flèche de scroll bas (comme sur ton screen) */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                        </svg>
                    </div>
                </div>

                {/* DROITE : INFOS (4 colonnes) */}
                <div className="lg:col-span-4 p-12 lg:p-20 flex flex-col justify-center border-l border-gray-50">
                    <div className="max-w-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-2xl font-light tracking-tight uppercase">{product.name}</h1>
                            <Bookmark className="w-5 h-5 cursor-pointer hover:fill-black transition-all" strokeWidth={1} />
                        </div>

                        <p className="text-lg font-medium mb-8">€ {product.price}</p>

                        {/* Sélecteur de Variantes (Couleurs/Tailles) */}
                        <div className="flex gap-3 mb-12">
                            {product.variants.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`w-8 h-8 rounded-full border transition-all ${selectedVariant?.id === variant.id
                                        ? 'border-black scale-110 shadow-sm'
                                        : 'border-transparent hover:border-gray-200'
                                        }`}
                                    style={{ backgroundColor: variant.color_hex || '#e5e5e5' }}
                                    title={variant.color}
                                />
                            ))}
                        </div>

                        {/* CTA ADD TO BAG */}
                        <button className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-colors mb-10 shadow-xl shadow-black/5">
                            Add to Bag
                        </button>

                        {/* Accordéons de détails (Style minimaliste) */}
                        <div className="space-y-6 text-[11px] tracking-wider uppercase border-t border-gray-100 pt-10">
                            <div className="flex justify-between items-center cursor-pointer group hover:opacity-50">
                                <span>Shipping & Returns | Import Duty & Tax</span>
                                <Plus className="w-4 h-4" />
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-bold tracking-[0.2em]">Details</span>
                                    <Minus className="w-4 h-4" />
                                </div>
                                <div className="normal-case text-gray-500 leading-relaxed tracking-normal text-xs space-y-4 italic">
                                    <p>{product.description || "Design asymétrique inspiré des structures botaniques."}</p>
                                    <ul className="list-none p-0 space-y-1 not-italic text-black font-medium uppercase text-[10px]">
                                        <li>• Oval Shape</li>
                                        <li>• Silver Metal Frame</li>
                                        <li>• Lenses Block 99.9% of UV Rays</li>
                                        <li>• Country of Manufacturer: France</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}