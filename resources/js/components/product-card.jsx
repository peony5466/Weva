import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    console.log("Données du produit :", product);
    const isOutOfStock = product.stock <= 0;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('products/')) return `/storage/${imagePath}`;
        return `/images/${imagePath}`;
    };

    return (
        <div className="group flex flex-col w-full bg-white">
            {/* Conteneur Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-white">

                {/* --- ZONE DES PILLS (Etiquettes) --- */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {/* Pill "Limited" (déjà existante) */}
                    {product.is_exclusive === 1 && !isOutOfStock && (
                        <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-white bg-black px-2 py-1">
                            Limited
                        </span>
                    )}

                    {/* Nouvelle Pill "New" (si tu as une colonne is_new) */}
                    {product.is_new === 1 && !isOutOfStock && (
                        <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-black bg-white/90 px-2 py-1 backdrop-blur-sm border border-black/10">
                            New
                        </span>
                    )}
                </div>

                <Link
                    href={route('shop.show', product.slug)}
                    className="w-full h-full flex items-center justify-center p-6"
                >
                    {product.image_path ? (
                        <img
                            src={getImageUrl(product.image_path)}
                            alt={product.name}
                            className={`w-full h-full object-contain transition-transform duration-1000 ease-out
                                ${isOutOfStock ? 'opacity-40' : 'group-hover:scale-105'}`}
                        />
                    ) : (
                        <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                            No Image
                        </div>
                    )}
                </Link>
            </div>

            {/* Infos Produit */}
            <div className="mt-4 mb-8 flex flex-col items-start px-1">
                <Link href={route('shop.show', product.slug)} className="hover:opacity-70 transition-opacity">
                    <h2 className={`text-[12px] md:text-[13px] tracking-[0.15em] uppercase font-normal leading-relaxed
                        ${isOutOfStock ? 'text-gray-400' : 'text-black'}`}>
                        {product.name}
                    </h2>
                </Link>

                <div className="mt-1 flex flex-col">
                    <span className={`text-[11px] md:text-[12px] tracking-[0.1em] font-light
                        ${isOutOfStock ? 'text-gray-300' : 'text-gray-600'}`}>
                        {product.is_exclusive ? `${product.wt_price} WT` : `€ ${product.price}`}
                    </span>

                    {isOutOfStock && (
                        <span className="text-[10px] tracking-[0.2em] uppercase text-red-800 mt-2 font-light">
                            Sold Out
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}