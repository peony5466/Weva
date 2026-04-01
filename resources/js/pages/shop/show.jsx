import CartDrawer from '@/components/ui/cart-drawer';
import ClientLayout from '@/layouts/client-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Bookmark, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function ProductShow({ product }) {
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);
    const { cart } = usePage().props;
    const cartCount = Object.keys(cart || {}).length;

    const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
    const isOutOfStock = totalStock <= 0;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('images/products/')) return `/${imagePath}`;
        return imagePath.startsWith('products/') ? `/storage/${imagePath}` : `/images/${imagePath}`;
    };

    const handleAddToBag = (e) => {
        e.preventDefault();
        if (isOutOfStock || !selectedVariant) return;

        const variant = product.variants.find((v) => v.id === selectedVariant);
        if (!variant || variant.stock <= 0) return;

        setAdding(true);
        router.post(
            route('cart.store'),
            {
                product_id: product.id,
                variant_id: selectedVariant,
                variant_name: variant.size,
                quantity: qty,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAdding(false);
                    setAdded(true);
                    setSelectedVariant(null);
                    setTimeout(() => {
                        setAdded(false);
                        setCartOpen(true);
                    }, 800);
                },
                onError: () => setAdding(false),
            },
        );
    };

    return (
        <ClientLayout>
            <Head title={`${product.name} | WEVA`} />

            <div className="min-h-screen bg-white text-black antialiased">

                <main className="grid min-h-screen grid-cols-1 lg:grid-cols-12 pt-20">

                    {/* IMAGE */}
                    <div className="relative flex items-center justify-center bg-[#f8f7f4] p-12 lg:col-span-7 lg:min-h-screen">
                        <div className={`w-full max-w-xl transition-opacity duration-500 ${isOutOfStock ? 'opacity-40' : 'opacity-100'}`}>
                            {product.image_path ? (
                                <img
                                    src={getImageUrl(product.image_path)}
                                    alt={product.name}
                                    className="h-auto w-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            ) : (
                                <div className="flex aspect-square items-center justify-center bg-[#ede9e0]">
                                    <span className="text-[32px] font-black uppercase italic tracking-widest text-[#c8c0b4]">
                                        NO_ASSET
                                    </span>
                                </div>
                            )}
                        </div>

                        {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-white px-6 py-2 text-[11px] font-black uppercase tracking-[0.4em]">
                                    Sold Out
                                </span>
                            </div>
                        )}
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col bg-white p-8 lg:col-span-5 lg:overflow-y-auto lg:p-16 lg:pt-16">
                        <div className="max-w-sm">

                            {/* Catégorie */}
                            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">
                                {product.category?.name || 'Collection 2026'}
                            </p>

                            {/* Nom + bookmark */}
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <h1 className="text-2xl font-semibold uppercase tracking-tight leading-tight">
                                    {product.name}
                                </h1>
                                <Bookmark className="mt-1 h-5 w-5 shrink-0 cursor-pointer stroke-[1px] transition-all hover:fill-black" />
                            </div>

                            {/* Prix */}
                            <p className="mb-10 text-xl font-light tracking-wide">
                                € {product.price}
                            </p>

                            {/* Variants */}
                            {product.variants?.length > 0 && (
                                <div className="mb-8">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                            Taille
                                        </span>
                                        {selectedVariant && (
                                            <span className="text-[10px] font-bold uppercase tracking-wide">
                                                {product.variants.find(v => v.id === selectedVariant)?.size}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((variant) => {
                                            const available = variant.stock > 0;
                                            const selected = selectedVariant === variant.id;
                                            return (
                                                <button
                                                    key={variant.id}
                                                    onClick={() => available && setSelectedVariant(variant.id)}
                                                    disabled={!available}
                                                    className={`flex h-10 w-10 items-center justify-center text-[11px] font-semibold transition-all duration-200 border
                                                        ${selected ? 'bg-black text-white border-black'
                                                        : available ? 'bg-white text-black border-gray-200 hover:border-black'
                                                        : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through'}`}
                                                >
                                                    {variant.size}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {!selectedVariant && !isOutOfStock && (
                                        <p className="mt-2 text-[10px] tracking-wider text-gray-400">
                                            Sélectionnez une taille
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Quantité */}
                            {!isOutOfStock && (
                                <div className="mb-8">
                                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                        Quantité
                                    </p>
                                    <div className="flex w-fit items-center border border-gray-200">
                                        <button
                                            onClick={() => qty > 1 && setQty(q => q - 1)}
                                            className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 transition-colors"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="flex h-10 w-10 items-center justify-center border-x border-gray-200 text-sm font-semibold">
                                            {qty}
                                        </span>
                                        <button
                                            onClick={() => setQty(q => q + 1)}
                                            className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 transition-colors"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Add to bag */}
                            <button
                                onClick={handleAddToBag}
                                disabled={isOutOfStock || !selectedVariant || adding}
                                className={`mb-4 w-full py-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300
                                    ${added ? 'bg-green-600 text-white'
                                    : isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : !selectedVariant ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : adding ? 'bg-gray-200 text-gray-500 cursor-wait'
                                    : 'bg-black text-white hover:bg-zinc-800'}`}
                            >
                                {added ? '✓ Ajouté' : isOutOfStock ? 'Épuisé' : !selectedVariant ? 'Choisir une taille' : adding ? '...' : 'Add to Bag'}
                            </button>

                            {/* Divider */}
                            <div className="mt-8 divide-y divide-gray-100 border-t border-gray-100">
                                {product.description && (
                                    <details className="py-4" open>
                                        <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                                            Description <span className="font-light">—</span>
                                        </summary>
                                        <p className="mt-4 text-[12px] leading-relaxed font-light text-gray-500">
                                            {product.description}
                                        </p>
                                    </details>
                                )}
                                <details className="py-4">
                                    <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                                        Livraison & Retours <span className="font-light">+</span>
                                    </summary>
                                    <div className="mt-4 text-[12px] leading-relaxed font-light text-gray-500 space-y-1">
                                        <p>Livraison standard : 3-5 jours ouvrés</p>
                                        <p>Retours acceptés sous 14 jours</p>
                                    </div>
                                </details>
                                <div className="py-4">
                                    <p className="text-[9px] font-mono text-gray-300 uppercase tracking-widest">
                                        REF: WV{String(product.id).padStart(5, '0')} · {product.is_limited ? 'LIMITED ASSET' : 'STANDARD'}
                                    </p>
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
