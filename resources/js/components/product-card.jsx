import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) ?? (product.stock ?? 1);
    const isOutOfStock = totalStock <= 0;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('images/products/')) return `/${imagePath}`;
        if (imagePath.startsWith('products/')) return `/storage/${imagePath}`;
        return `/images/${imagePath}`;
    };

    return (
        <div className="group flex flex-col w-full bg-white">

            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f7f4]">

                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.is_limited === 1 && !isOutOfStock && (
                        <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-white bg-black px-2 py-1">
                            Limited
                        </span>
                    )}
                </div>

                <Link
                    href={route('shop.show', product.slug)}
                    className="w-full h-full flex items-center justify-center p-6"
                >
                    {getImageUrl(product.image_path) ? (
                        <img
                            src={getImageUrl(product.image_path)}
                            alt={product.name}
                            className={`w-full h-full object-contain transition-transform duration-700 ease-out ${isOutOfStock ? 'opacity-40' : 'group-hover:scale-105'}`}
                        />
                    ) : (
                        <div className="text-[10px] tracking-[0.2em] text-gray-300 uppercase font-bold">
                            WEVA
                        </div>
                    )}
                </Link>

                {/* Sold out overlay */}
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white/90 text-black text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2">
                            Sold Out
                        </span>
                    </div>
                )}

                {/* Quick view on hover */}
                {!isOutOfStock && (
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Link
                            href={route('shop.show', product.slug)}
                            className="block w-full bg-black text-white text-center text-[9px] font-bold uppercase tracking-[0.3em] py-3"
                        >
                            Voir le produit
                        </Link>
                    </div>
                )}
            </div>

            {/* Infos */}
            <div className="mt-3 px-1">
                <Link href={route('shop.show', product.slug)} className="hover:opacity-60 transition-opacity">
                    <h2 className="text-[11px] tracking-[0.15em] uppercase font-medium text-black leading-relaxed">
                        {product.name}
                    </h2>
                </Link>
                <p className="text-[11px] tracking-[0.1em] font-light text-gray-500 mt-0.5">
                    € {product.price}
                </p>
            </div>
        </div>
    );
}
