import CartDrawer from '@/components/ui/cart-drawer';
import ClientLayout from '@/layouts/client-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function ProductShow({ product }) {
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { cart } = usePage().props;
    const cartCount = Object.keys(cart || {}).length;

    const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
    const isOutOfStock = totalStock <= 0;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return imagePath.startsWith('products/') ? `/storage/${imagePath}` : `/images/${imagePath}`;
    };

    const handleAddToBag = (e) => {
        e.preventDefault();
        if (isOutOfStock || !selectedVariant) return;

        const variant = product.variants.find((v) => v.id === selectedVariant);
        if (!variant || variant.stock <= 0) return;

        router.post(
            route('cart.store'),
            {
                product_id: product.id,
                variant_id: selectedVariant,
                variant_name: variant.size,
                quantity: 1,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setCartOpen(true);
                    setSelectedVariant(null);
                },
            },
        );
    };

    return (
        <ClientLayout>
            <div className="min-h-screen bg-white text-black antialiased selection:bg-gray-100">
                <Head title={`${product.name} | GENTLE MONSTER`} />

                <nav className="sticky top-0 z-40 flex items-center justify-between bg-white px-6 py-8 md:px-12">
                    <div className="flex gap-8 text-[11px] tracking-[0.1em] uppercase">
                        <Link href={route('shop.index')} className="hover:opacity-50">
                            Sunglasses
                        </Link>
                        <Link href="#" className="hidden hover:opacity-50 md:block">
                            Glasses
                        </Link>
                    </div>
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-[18px] font-medium tracking-[0.3em] uppercase">
                        GENTLE MONSTER
                    </Link>
                    <div className="flex gap-6 text-[11px] tracking-[0.1em] uppercase">
                        <button onClick={() => setCartOpen(true)} className="hover:opacity-50">
                            Cart ({cartCount})
                        </button>
                    </div>
                </nav>

                <main className="grid min-h-[calc(100vh-100px)] grid-cols-1 lg:grid-cols-12">
                    <div className="relative flex flex-col items-center justify-center bg-white p-6 md:p-20 lg:col-span-8">
                        <div className={`w-full max-w-4xl transition-opacity duration-1000 ${isOutOfStock ? 'opacity-30' : 'opacity-100'}`}>
                            <img
                                src={getImageUrl(product.image_path)}
                                alt={product.name}
                                className="h-auto w-full object-contain transition-all duration-1000"
                                onError={(e) => {
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                            />
                        </div>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[12px] opacity-30">↓</div>
                    </div>

                    <div className="flex flex-col bg-white p-6 md:p-12 lg:col-span-4 lg:p-20">
                        <div className="max-w-[320px] lg:fixed">
                            <div className="mb-2 flex items-start justify-between">
                                <h1 className="text-[16px] font-normal tracking-[0.15em] uppercase">{product.name}</h1>
                                <Bookmark className="h-5 w-5 cursor-pointer stroke-[1px] transition-all hover:fill-black" />
                            </div>

                            <p className="mb-8 text-[14px] font-light">{product.is_exclusive ? `${product.wt_price} WT` : `€ ${product.price}`}</p>

                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-10">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Size</span>
                                        {selectedVariant && (
                                            <span className="text-[10px] tracking-[0.1em] uppercase">
                                                {product.variants.find((v) => v.id === selectedVariant)?.size}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((variant) => {
                                            const isAvailable = variant.stock > 0;
                                            const isSelected = selectedVariant === variant.id;

                                            return (
                                                <button
                                                    key={variant.id}
                                                    onClick={() => isAvailable && setSelectedVariant(variant.id)}
                                                    disabled={!isAvailable}
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-medium transition-all duration-300 ${
                                                        isSelected
                                                            ? 'bg-black text-white'
                                                            : isAvailable
                                                              ? 'border border-gray-200 bg-white text-black hover:border-black'
                                                              : 'cursor-not-allowed bg-gray-100 text-gray-300 line-through'
                                                    }`}
                                                >
                                                    {variant.size}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {!selectedVariant && !isOutOfStock && (
                                        <p className="mt-2 text-[10px] tracking-wider text-gray-400">Please select a size</p>
                                    )}
                                </div>
                            )}

                            <button
                                onClick={handleAddToBag}
                                disabled={isOutOfStock || !selectedVariant}
                                className={`w-full py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                                    isOutOfStock || !selectedVariant
                                        ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                        : 'bg-[#111] text-white hover:bg-black'
                                }`}
                            >
                                {isOutOfStock ? 'Sold Out' : !selectedVariant ? 'Select Size' : 'Add to Bag'}
                            </button>

                            <div className="mt-12 divide-y divide-gray-100 border-t border-gray-100">
                                <details className="group py-4" open>
                                    <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] tracking-[0.2em] uppercase">
                                        Details <span>—</span>
                                    </summary>
                                    <div className="mt-4 space-y-2 text-[11px] leading-[1.8] font-light text-gray-600">
                                        {product.description && <p>{product.description}</p>}
                                        {product.marque && (
                                            <ul className="list-none space-y-1">
                                                <li>• Brand: {product.marque}</li>
                                            </ul>
                                        )}
                                        {product.composition && (
                                            <ul className="list-none space-y-1">
                                                <li>• Composition: {product.composition}</li>
                                            </ul>
                                        )}
                                        {product.entretien && (
                                            <ul className="list-none space-y-1">
                                                <li>• Care: {product.entretien}</li>
                                            </ul>
                                        )}
                                    </div>
                                </details>
                                <details className="group py-4">
                                    <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] tracking-[0.2em] uppercase">
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
