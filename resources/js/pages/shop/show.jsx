import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Plus, Minus, Bookmark, Share2, Coins, CreditCard, Sparkles } from 'lucide-react';
import ClientLayout from '@/layouts/client-layout';
import CartDrawer from '@/components/ui/cart-drawer';

export default function ProductShow({ product }) {
    const [cartOpen, setCartOpen] = useState(false);
    const { cart, auth } = usePage().props;
    const cartCount = Object.keys(cart || {}).length;

    // 1. État local pour la quantité et la variante
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || null);

    // 2. Initialisation du formulaire
    const { setData, processing } = useForm({
        product_id: product.id,
        variant_id: selectedVariant?.id,
        variant_name: selectedVariant?.size || 'Unique', // Utilisation de size pour plus de clarté
        quantity: 1,
    });

    // 3. Fonctions de changement de quantité
    const incrementQty = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQty = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    // 4. Gestion de l'ajout au panier
    const handleAddToBag = (e) => {
        e.preventDefault();

        const payload = {
            product_id: product.id,
            variant_id: selectedVariant?.id,
            variant_name: selectedVariant?.size || 'Unique',
            quantity: quantity
        };

        router.post(route('cart.store'), payload, {
            preserveScroll: true,
            onSuccess: () => {
                setCartOpen(true);
            },
            onError: (err) => console.log("Erreur ajout panier:", err)
        });
    };

    return (
        <ClientLayout>
            <div className="min-h-screen bg-white text-black font-sans antialiased">
                <Head title={`${product.name} | WEVA Asset`} />

                {/* --- NAVIGATION --- */}
                <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-100 uppercase text-[10px] tracking-widest font-medium bg-white sticky top-0 z-40">
                    <Link href={route('shop.index')} className="hover:opacity-50 transition-opacity flex items-center gap-2">
                        <span className="text-lg">←</span> All_Collections
                    </Link>
                    <div className="flex gap-8">
                        <button
                            onClick={() => setCartOpen(true)}
                            className="hover:text-gray-400 transition-colors flex items-center gap-1"
                        >
                            Bag ({cartCount})
                        </button>
                    </div>
                </nav>

                <main className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">

                    {/* --- SECTION VISUELLE (GAUCHE) --- */}
                    <div className={`lg:col-span-8 flex items-center justify-center p-12 relative group border-b lg:border-b-0 ${product.is_exclusive ? 'bg-[#fafafa]' : 'bg-[#fcfcfc]'}`}>

                        {/* Badge Exclusive Vault */}
                        {product.is_exclusive === 1 && (
                            <div className="absolute top-10 left-10 z-10 animate-pulse">
                                <div className="bg-black text-amber-500 border border-amber-500/30 px-5 py-2 flex items-center gap-3 shadow-2xl">
                                    <Sparkles className="w-3 h-3" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Vault_Restricted_Asset</span>
                                </div>
                            </div>
                        )}

                        <div className="w-full max-w-2xl transform transition-transform duration-1000 group-hover:scale-105">
                            <div className="aspect-[4/3] bg-white flex items-center justify-center p-12 shadow-sm border border-gray-50">
                                {product.image_path ? (
                                    <img
                                        src={product.image_path.startsWith('http')
                                            ? product.image_path
                                            : `/storage/${product.image_path.replace('storage/', '')}`}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                ) : (
                                    <div className="text-gray-100 uppercase tracking-[0.5em] font-black italic text-5xl">Empty_Slot</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- SECTION INFOS (DROITE) --- */}
                    <div className="lg:col-span-4 p-8 lg:p-20 flex flex-col justify-center border-l border-gray-50 bg-white">
                        <div className="max-w-sm mx-auto w-full">

                            {/* Header Produit */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <span className={`text-[9px] uppercase tracking-[0.4em] font-bold ${product.is_exclusive ? 'text-amber-600' : 'text-gray-400'}`}>
                                        {product.is_exclusive ? 'Exclusive WT Series' : (product.category?.name || 'Standard Release')}
                                    </span>
                                    <h1 className="text-4xl font-light tracking-tighter uppercase leading-none italic">
                                        {product.name}
                                    </h1>
                                </div>
                                <Bookmark className={`w-6 h-6 cursor-pointer transition-all ${product.is_exclusive ? 'hover:text-amber-500' : 'hover:fill-black'}`} strokeWidth={1} />
                            </div>

                            {/* LOGIQUE DE PRIX DYNAMIQUE */}
                            <div className="mb-12 pt-6 border-t border-gray-50">
                                {product.is_exclusive ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Coins className="w-4 h-4 text-amber-500" />
                                            <span className="text-3xl font-mono font-bold tracking-tighter italic">
                                                {product.wt_price} <span className="text-xs text-amber-600 font-sans tracking-widest uppercase">WT Credits</span>
                                            </span>
                                        </div>
                                        <p className="text-[10px] uppercase text-gray-400 tracking-widest">Digital_Currency_Acquisition_Only</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-gray-400" />
                                            <span className="text-3xl font-light tracking-tighter italic">€ {product.price}</span>
                                        </div>
                                        <p className="text-[9px] uppercase text-emerald-600 font-bold tracking-[0.2em]">
                                            + {Math.floor(product.price)} WT Credits Reward
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* SÉLECTEUR DE TAILLES (VARIANTS) */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-8">
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-4">Select_Size</span>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-4 py-2 text-xs font-bold transition-all border ${selectedVariant?.id === variant.id
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-gray-200 hover:border-black'
                                                    }`}
                                            >
                                                {variant.size}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-[9px] text-gray-400 uppercase tracking-widest">
                                        Stock_Level: {selectedVariant?.stock > 0 ? `${selectedVariant.stock} Units` : 'Depleted'}
                                    </p>
                                </div>
                            )}

                            {/* QUANTITÉ */}
                            <div className="mb-12">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-4">Quantity</span>
                                <div className="flex items-center border border-gray-100 w-fit">
                                    <button onClick={decrementQty} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-6 py-3 text-xs font-black min-w-[3rem] text-center">{quantity}</span>
                                    <button onClick={incrementQty} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* BOUTON D'ACTION DYNAMIQUE */}
                            <button
                                onClick={handleAddToBag}
                                disabled={processing || (selectedVariant?.stock <= 0)}
                                className={`w-full py-6 text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 mb-10 shadow-2xl active:scale-[0.98] ${selectedVariant?.stock <= 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : product.is_exclusive
                                            ? 'bg-amber-600 text-white hover:bg-black shadow-amber-500/20'
                                            : 'bg-black text-white hover:bg-zinc-800 shadow-black/10'
                                    }`}
                            >
                                {selectedVariant?.stock <= 0
                                    ? 'Out of Stock'
                                    : product.is_exclusive
                                        ? 'Trade Credits for Asset'
                                        : 'Append to Order'}
                            </button>

                            {/* DÉTAILS SUPPLÉMENTAIRES */}
                            <div className="space-y-8 text-[10px] tracking-widest uppercase border-t border-gray-100 pt-10">
                                <div className="group">
                                    <div className="flex justify-between items-center mb-6 cursor-pointer">
                                        <span className="font-black tracking-[0.3em]">Manifest_Log</span>
                                        <Minus className="w-3 h-3 text-gray-300" />
                                    </div>
                                    <div className="normal-case text-gray-500 leading-relaxed tracking-normal text-[12px] space-y-4 font-light italic">
                                        <p>{product.description}</p>
                                        <ul className="list-none p-0 space-y-2 text-black font-medium uppercase text-[9px] tracking-[0.2em] not-italic">
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-black rounded-full" />
                                                Reference: {product.id.toString().padStart(6, '0')}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-black rounded-full" />
                                                System_Tag: {product.is_exclusive ? 'VAULT_ONLY' : 'OPEN_MARKET'}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <CartDrawer open={cartOpen} setOpen={setCartOpen} />
            </div>
        </ClientLayout>
    );
}