import { Link } from '@inertiajs/react';
import { getImageUrl } from '@/utils/image';

export default function ProductCard({ product }) {
    const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) ?? product.stock ?? 1;
    const isOutOfStock = totalStock <= 0;

    return (
        <div className="group flex w-full flex-col bg-white">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f7f4]">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.is_limited === 1 && !isOutOfStock && (
                        <span className="bg-black px-2 py-1 text-[8px] font-bold tracking-[0.2em] text-white uppercase">Limited</span>
                    )}
                </div>

                <Link href={route('shop.show', product.slug)} className="flex h-full w-full items-center justify-center p-6">
                    {getImageUrl(product.image_path) ? (
                        <img
                            src={getImageUrl(product.image_path)}
                            alt={product.name}
                            className={`h-full w-full object-contain transition-transform duration-700 ease-out ${isOutOfStock ? 'opacity-40' : 'group-hover:scale-105'}`}
                        />
                    ) : (
                        <div className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">WEVA</div>
                    )}
                </Link>

                {/* Sold out overlay */}
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white/90 px-4 py-2 text-[9px] font-bold tracking-[0.3em] text-black uppercase">Sold Out</span>
                    </div>
                )}

                {/* Quick view on hover */}
                {!isOutOfStock && (
                    <div className="absolute right-0 bottom-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <Link
                            href={route('shop.show', product.slug)}
                            className="block w-full bg-black py-3 text-center text-[9px] font-bold tracking-[0.3em] text-white uppercase"
                        >
                            Voir le produit
                        </Link>
                    </div>
                )}
            </div>

            {/* Infos */}
            <div className="mt-3 px-1">
                <Link href={route('shop.show', product.slug)} className="transition-opacity hover:opacity-60">
                    <h2 className="text-[11px] leading-relaxed font-medium tracking-[0.15em] text-black uppercase">{product.name}</h2>
                </Link>
                <p className="mt-0.5 text-[11px] font-light tracking-[0.1em] text-gray-500">
                    {product.is_exclusive && product.wt_price ? (
                        <span className="font-bold text-amber-600">{product.wt_price} WT</span>
                    ) : (
                        <span>€ {product.price}</span>
                    )}
                </p>
            </div>
        </div>
    );
}

