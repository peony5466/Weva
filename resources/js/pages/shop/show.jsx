import React, { useState } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Bookmark } from 'lucide-react'; // On ne garde que le nécessaire
import ClientLayout from '@/layouts/client-layout';
import CartDrawer from '@/components/ui/cart-drawer';

export default function ProductShow({ product }) {
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = usePage().props;
    const cartCount = Object.keys(cart || {}).length;
    const isOutOfStock = product.stock <= 0;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;

        // Si le chemin contient "products/", c'est une image stockée via Laravel (Storage)
        // Sinon, c'est une ancienne image dans public/images/
        return imagePath.startsWith('products/')
            ? `/storage/${imagePath}`
            : `/images/${imagePath}`;
    };

    const handleAddToBag = (e) => {
        e.preventDefault();
        if (isOutOfStock) return;
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: 1
        }, {
            preserveScroll: true,
            onSuccess: () => setCartOpen(true),
        });
    };

    return (
        <ClientLayout>
            <div className="min-h-screen bg-white text-black antialiased selection:bg-gray-100">
                <Head title={`${product.name} | GENTLE MONSTER`} />

                {/* Navbar ultra-fine style GM */}
                <nav className="flex justify-between items-center px-6 md:px-12 py-8 bg-white sticky top-0 z-40">
                    <div className="flex gap-8 text-[11px] tracking-[0.1em] uppercase">
                        <Link href={route('shop.index')} className="hover:opacity-50">Sunglasses</Link>
                        <Link href="#" className="hover:opacity-50 hidden md:block">Glasses</Link>
                    </div>
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-[18px] tracking-[0.3em] font-medium uppercase">
                        GENTLE MONSTER
                    </Link>
                    <div className="flex gap-6 text-[11px] tracking-[0.1em] uppercase">
                        <button onClick={() => setCartOpen(true)} className="hover:opacity-50">Cart ({cartCount})</button>
                    </div>
                </nav>

                <main className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-100px)]">
                    {/* SECTION GAUCHE : IMAGE (Fond blanc pur, large espace) */}
                    <div className="lg:col-span-8 flex flex-col items-center justify-center p-6 md:p-20 bg-white relative">
                        <div className={`w-full max-w-4xl transition-opacity duration-1000 ${isOutOfStock ? 'opacity-30' : 'opacity-100'}`}>
                            <img
                                src={getImageUrl(product.image_path)}
                                alt={product.name}
                                className="w-full h-auto object-contain transition-all duration-1000"
                                onError={(e) => {
                                    // Optionnel : remplace par une image par défaut si le chargement échoue
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                            />
                        </div>

                        {/* Indicateur de scroll minimaliste en bas de l'image */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 text-[12px]">
                            ↓
                        </div>
                    </div>

                    {/* SECTION DROITE : INFOS (Fixed-like on desktop) */}
                    <div className="lg:col-span-4 p-6 md:p-12 lg:p-20 flex flex-col bg-white">
                        <div className="max-w-[320px] lg:fixed">
                            <div className="flex justify-between items-start mb-2">
                                <h1 className="text-[16px] tracking-[0.15em] uppercase font-normal">{product.name}</h1>
                                <Bookmark className="w-5 h-5 stroke-[1px] cursor-pointer hover:fill-black transition-all" />
                            </div>

                            <p className="text-[14px] font-light mb-8">
                                {product.is_exclusive ? `${product.wt_price} WT` : `€ ${product.price}`}
                            </p>

                            {/* Variantes (Cercles comme sur ton screen GM) */}
                            {/* <div className="flex gap-2 mb-10">
                                <div className="w-8 h-4 bg-gray-200 border border-black/10"></div>
                                <div className="w-8 h-4 bg-gray-400 border border-black/10"></div>
                                <div className="w-8 h-4 bg-gray-100 border border-black/10"></div>
                                <span className="ml-auto text-[10px] tracking-widest text-gray-400 uppercase">Silver / Clear</span>
                            </div> */}

                            <button
                                onClick={handleAddToBag}
                                disabled={isOutOfStock}
                                className={`w-full py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300
                                    ${isOutOfStock
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-[#111] text-white hover:bg-black'}`}
                            >
                                {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
                            </button>

                            {/* Accordéons factices style GM */}
                            <div className="mt-12 border-t border-gray-100 divide-y divide-gray-100">
                                <details className="group py-4" open>
                                    <summary className="list-none flex justify-between items-center text-[10px] tracking-[0.2em] uppercase cursor-pointer">
                                        Details <span>—</span>
                                    </summary>
                                    <div className="mt-4 text-[11px] leading-[1.8] text-gray-600 font-light space-y-2">
                                        <p>{product.description}</p>
                                        <ul className="list-none space-y-1">
                                            <li>• Metal Frame</li>
                                            <li>• Clear Lenses</li>
                                            <li>• Oval Shape</li>
                                        </ul>
                                    </div>
                                </details>
                                <details className="group py-4">
                                    <summary className="list-none flex justify-between items-center text-[10px] tracking-[0.2em] uppercase cursor-pointer">
                                        Shipping & Returns <span>+</span>
                                    </summary>
                                </details>
                            </div>
                        </div>
                    </div>
                </main>

                <CartDrawer open={cartOpen} setOpen={setCartOpen} />
            </div>
        </ClientLayout>
    );
}