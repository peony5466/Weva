import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    console.log("Données du produit :", product);
    const isOutOfStock = product.stock <= 0;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;

        // 1. Si c'est déjà une URL externe (http...), on renvoie tel quel
        if (imagePath.startsWith('http')) return imagePath;

        // 2. Si le chemin contient "products/" (créé par le storage Laravel), 
        // on utilise /storage/
        if (imagePath.startsWith('products/')) {
            return `/storage/${imagePath}`;
        }

        // 3. Sinon, on considère que c'est une image héritée du dossier /public/images/
        return `/images/${imagePath}`;
    };

    return (
        <div className="group flex flex-col w-full bg-white">
            {/* Conteneur Image - Aspect ratio vertical type Gentle Monster */}
            <div className="relative aspect-[3/4] overflow-hidden bg-white]">
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

                {/* Badge minimaliste si nécessaire (ex: Exclusive) */}
                {product.is_exclusive === 1 && !isOutOfStock && (
                    <div className="absolute top-4 left-4">
                        <span className="text-[9px] tracking-[0.3em] uppercase font-medium text-black bg-white/80 px-2 py-1 backdrop-blur-sm">
                            Limited
                        </span>
                    </div>
                )}
            </div>

            {/* Infos Produit - Style épuré sous l'image */}
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
                        {product.is_exclusive === 1 ? `${product.wt_price} WT` : `€ ${product.price}`}
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