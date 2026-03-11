import React, { useState } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Plus, Minus, Bookmark, Coins, CreditCard, Sparkles, AlertTriangle } from 'lucide-react';
import ClientLayout from '@/layouts/client-layout';
import CartDrawer from '@/components/ui/cart-drawer';

export default function ProductShow({ product }) {
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = usePage().props;
    const cartCount = Object.keys(cart || {}).length;

    const isOutOfStock = product.stock <= 0;
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);

    const incrementQty = () => !isOutOfStock && setQuantity(prev => prev + 1);
    const decrementQty = () => !isOutOfStock && quantity > 1 && setQuantity(prev => prev - 1);

    const handleAddToBag = (e) => {
        e.preventDefault();
        if (isOutOfStock) return;

        router.post(route('cart.store'), {
            product_id: product.id,
            variant_id: selectedVariant?.id,
            variant_name: selectedVariant?.size || 'Unique',
            quantity: quantity
        }, {
            preserveScroll: true,
            onSuccess: () => setCartOpen(true),
        });
    };

    return (
        <ClientLayout>
            <div className={`min-h-screen bg-white text-black antialiased transition-all duration-1000 ${isOutOfStock ? 'grayscale' : ''}`}>
                <Head title={`${product.name} | WEVA`} />

                <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-100 uppercase text-[10px] tracking-[0.4em] font-bold bg-white sticky top-0 z-40">
                    <Link href={route('shop.index')} className="hover:opacity-50">← Back_To_Vault</Link>
                    <button onClick={() => setCartOpen(true)} className="hover:text-gray-400">Bag ({cartCount})</button>
                </nav>

                <main className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
                    {/* SECTION GAUCHE : IMAGE */}
                    <div className={`lg:col-span-8 flex items-center justify-center p-12 relative border-b lg:border-b-0 ${isOutOfStock ? 'bg-gray-50' : 'bg-[#fafafa]'}`}>

                        {isOutOfStock && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                <div className="border-[4px] border-black px-8 py-4 -rotate-12 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="text-4xl font-black uppercase tracking-tighter">Depleted</span>
                                </div>
                            </div>
                        )}

                        <div className={`w-full max-w-2xl transition-all duration-1000 ${isOutOfStock ? 'opacity-20 blur-[1px]' : ''}`}>
                            <div className="aspect-[4/3] bg-white flex items-center justify-center p-12 border border-gray-50">
                                {product.image_path ? (
                                    <img
                                        src={product.image_path?.startsWith('http')
                                            ? product.image_path
                                            : `/images/${product.image_path}`}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                ) : (
                                    <div className="opacity-10 font-black uppercase tracking-[0.5em] text-xl italic">Empty_Link</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SECTION DROITE : INFOS */}
                    <div className={`lg:col-span-4 p-8 lg:p-20 flex flex-col justify-center border-l border-gray-50 bg-white ${isOutOfStock ? 'opacity-40' : ''}`}>
                        <div className="max-w-sm mx-auto w-full">
                            <div className="space-y-1 mb-6">
                                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400">
                                    {isOutOfStock ? 'Status: Sync_Offline' : (product.is_exclusive ? 'Exclusive Series' : 'Standard Release')}
                                </span>
                                <h1 className="text-4xl font-light tracking-tighter uppercase italic">{product.name}</h1>
                            </div>

                            <div className="mb-12 pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-2">
                                    {product.is_exclusive ? <Coins className="w-4 h-4 text-amber-500" /> : <CreditCard className="w-4 h-4 text-gray-400" />}
                                    <span className={`text-3xl font-mono font-bold italic ${isOutOfStock ? 'line-through text-gray-300' : ''}`}>
                                        {product.is_exclusive ? `${product.wt_price} WT` : `€ ${product.price}`}
                                    </span>
                                </div>
                                {isOutOfStock && <p className="text-[10px] text-red-500 font-black mt-2 uppercase tracking-widest italic">Asset_Not_Available</p>}
                            </div>

                            {/* BOUTON DÉSACTIVÉ SI STOCK 0 */}
                            <button
                                disabled={isOutOfStock}
                                onClick={handleAddToBag}
                                className={`w-full py-6 text-[11px] font-black uppercase tracking-[0.4em] mb-10 border transition-all ${isOutOfStock ? 'bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100' : 'bg-black text-white border-black hover:bg-zinc-800'}`}
                            >
                                {isOutOfStock ? 'Unavailable' : 'Append_To_Sync'}
                            </button>

                            <div className="text-[10px] tracking-widest uppercase border-t border-gray-100 pt-10 font-light opacity-50 leading-relaxed italic">
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </main>

                <CartDrawer open={cartOpen} setOpen={setCartOpen} />
            </div>
        </ClientLayout>
    );
}