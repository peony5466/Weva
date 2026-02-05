import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Plus, Minus, Bookmark, Share2 } from 'lucide-react';
import ClientLayout from '@/layouts/client-layout';
import CartDrawer from '@/components/ui/cart-drawer';
import { router } from '@inertiajs/react';
export default function ProductShow({ product }) {
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = usePage().props;
    const cartCount = Object.keys(cart || {}).length;

    // 1. État local pour la quantité
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || null);

    // 2. Initialisation du formulaire avec le champ quantity
    const { post, processing, setData } = useForm({
        product_id: product.id,
        variant_id: selectedVariant?.id,
        variant_name: selectedVariant?.color || 'Unique',
        quantity: 1,
    });

    // 3. Mise à jour de useForm quand selectedVariant change
    useEffect(() => {
        setData({
            ...useForm.data,
            variant_id: selectedVariant?.id,
            variant_name: selectedVariant?.color || 'Unique',
        });
    }, [selectedVariant]);

    // 4. Fonctions de changement de quantité
    const incrementQty = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        setData('quantity', newQty);
    };

    const decrementQty = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            setData('quantity', newQty);
        }
    };

    const { post: inertiaPost, processing: inertiaProcessing } = useForm(); // On l'utilise vide

    const handleAddToBag = (e) => {
        e.preventDefault();

        // On crée l'objet manuellement
        const payload = {
            product_id: product.id,
            variant_id: selectedVariant?.id,
            variant_name: selectedVariant?.color || 'Unique',
            quantity: quantity
        };

        console.log("Envoi du payload :", payload);

        // On utilise la méthode router d'Inertia directement pour éviter les délais de useForm


        router.post(route('cart.store'), payload, {
            preserveScroll: true,
            onSuccess: () => {
                setCartOpen(true);
            },
            onError: (err) => console.log(err)
        });
    };

    return (
        <ClientLayout>
            <div className="min-h-screen bg-white text-black font-sans antialiased">
                <Head title={`${product.name} | WEVA`} />

                <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-100 uppercase text-[10px] tracking-widest font-medium">
                    <Link href={route('shop.index')} className="hover:opacity-50 transition-opacity flex items-center gap-2">
                        <span className="text-lg">←</span> Collections
                    </Link>
                    <div className="flex gap-8">
                        <span className="opacity-30 cursor-not-allowed">Search</span>
                        <button
                            onClick={() => setCartOpen(true)}
                            className="hover:text-gray-400 transition-colors flex items-center gap-1"
                        >
                            Bag ({cartCount})
                        </button>
                    </div>
                </nav>

                <main className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">

                    <div className="lg:col-span-8 flex items-center justify-center p-12 bg-[#fcfcfc] relative group border-b lg:border-b-0">
                        <div className="w-full max-w-2xl transform transition-transform duration-1000 group-hover:scale-105">
                            <div className="aspect-square bg-white flex items-center justify-center p-12 shadow-sm">
                                {product.image_path ? (
                                    <img
                                        src={product.image_path.startsWith('http')
                                            ? product.image_path
                                            : `/storage/${product.image_path.replace('storage/', '')}`}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                ) : (
                                    <div className="text-gray-200 uppercase tracking-[0.3em] font-black italic text-4xl">
                                        No_Asset
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 p-8 lg:p-20 flex flex-col justify-center border-l border-gray-50 bg-white">
                        <div className="max-w-sm mx-auto w-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">
                                        {product.category?.name || 'Collection 2026'}
                                    </span>
                                    <h1 className="text-3xl font-light tracking-tight uppercase leading-none">
                                        {product.name}
                                    </h1>
                                </div>
                                <Bookmark className="w-6 h-6 cursor-pointer hover:fill-black transition-all" strokeWidth={1} />
                            </div>

                            <p className="text-xl font-medium mb-12">€ {product.price}</p>

                            {/* SÉLECTEUR DE VARIANTES */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-8">
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-4">Select Style</span>
                                    <div className="flex flex-wrap gap-4">
                                        {product.variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 p-0.5 ${selectedVariant?.id === variant.id
                                                    ? 'border-black scale-110'
                                                    : 'border-transparent hover:border-gray-200'
                                                    }`}
                                            >
                                                <div
                                                    className="w-full h-full rounded-full border border-black/5"
                                                    style={{ backgroundColor: variant.color_hex || '#e5e5e5' }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-[11px] uppercase tracking-widest font-bold italic">
                                        {selectedVariant?.color || 'Standard Edition'}
                                    </p>
                                </div>
                            )}

                            {/* 5. SÉLECTEUR DE QUANTITÉ */}
                            <div className="mb-12">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-4">Quantity</span>
                                <div className="flex items-center border border-gray-200 w-fit">
                                    <button
                                        type="button"
                                        onClick={decrementQty}
                                        className="px-4 py-2 hover:bg-gray-50 transition-colors border-r border-gray-200"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-6 py-2 text-xs font-bold min-w-[3rem] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={incrementQty}
                                        className="px-4 py-2 hover:bg-gray-50 transition-colors border-l border-gray-200"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToBag}
                                disabled={processing}
                                className={`w-full py-6 text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 mb-10 shadow-2xl ${processing
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-zinc-800 shadow-black/10'
                                    }`}
                            >
                                {processing ? 'Processing...' : 'Add to Bag'}
                            </button>

                            <div className="space-y-8 text-[10px] tracking-widest uppercase border-t border-gray-100 pt-10">
                                <div className="flex justify-between items-center cursor-pointer hover:opacity-50 transition-opacity">
                                    <span>Shipping & Returns</span>
                                    <Plus className="w-3 h-3" />
                                </div>

                                <div className="group">
                                    <div className="flex justify-between items-center mb-6 cursor-pointer">
                                        <span className="font-black tracking-[0.3em]">Technical Details</span>
                                        <Minus className="w-3 h-3" />
                                    </div>
                                    <div className="normal-case text-gray-500 leading-loose tracking-normal text-[12px] space-y-4 font-light">
                                        <p className="italic">{product.description}</p>
                                        <ul className="list-none p-0 space-y-2 text-black font-medium uppercase text-[9px] tracking-widest">
                                            <li>• Handcrafted Frame</li>
                                            <li>• 100% UV Protection</li>
                                            <li>• Signature WEVA branding</li>
                                            <li>• Ref: {product.id.toString().padStart(5, '0')}</li>
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