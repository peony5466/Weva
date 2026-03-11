import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const isOutOfStock = product.stock <= 0;
    const isExclusive = product.is_exclusive === 1;

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `/images/${imagePath}`;
    };

    return (
        <div className="group flex flex-col relative">
            <div className={`relative aspect-[4/3] overflow-hidden flex items-center justify-center p-8 transition-all duration-500 
                ${isOutOfStock ? 'bg-gray-50 grayscale' : 'bg-white group-hover:bg-[#fafafa]'}
                ${isExclusive && !isOutOfStock ? 'border-b border-amber-500/10' : ''}`}>

                {isExclusive && !isOutOfStock && (
                    <div className="absolute top-4 left-4 z-20">
                        <div className="bg-black text-amber-500 px-3 py-1 border border-amber-500/50 shadow-lg skew-x-[-10deg]">
                            <p className="text-[8px] font-black uppercase tracking-widest skew-x-[10deg]">Vault_Asset</p>
                        </div>
                    </div>
                )}

                <Link href={route('shop.show', product.slug)} className="w-full h-full flex items-center justify-center">
                    {product.image_path ? (
                        <img
                            src={getImageUrl(product.image_path)}
                            alt={product.name}
                            className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 
                                ${isOutOfStock ? 'opacity-20 scale-90' : 'group-hover:scale-105'}`}
                        />
                    ) : (
                        <div className="text-[10px] font-bold text-gray-200 uppercase tracking-widest italic">
                            No_Image_Data
                        </div>
                    )}
                </Link>
            </div>

            <div className="mt-4 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <h2 className={`text-[13px] font-black tracking-widest uppercase 
                        ${isOutOfStock ? 'text-gray-300' : (isExclusive ? 'text-amber-600' : 'text-gray-900')}`}>
                        {product.name}
                    </h2>
                </div>

                <div className="flex flex-col">
                    <span className={`text-[12px] font-bold italic 
                        ${isOutOfStock ? 'text-gray-300 line-through' : (isExclusive ? 'text-amber-600 font-mono' : 'text-gray-900')}`}>
                        {isExclusive ? `${product.wt_price} WT` : `€ ${product.price}`}
                    </span>

                    {isOutOfStock && (
                        <span className="text-[9px] text-red-500 uppercase font-black mt-1 tracking-tighter italic">
                            Sold_Out_Status
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
