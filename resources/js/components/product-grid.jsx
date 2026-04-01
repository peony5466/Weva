import ProductCard from '@/components/product-card';

export default function ProductGrid({ products }) {
    const safeProducts = products || [];

    if (safeProducts.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-40">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-6">
                    Aucun produit trouvé
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white px-4 md:px-8 pb-20">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 md:gap-y-20 max-w-[2000px] mx-auto">
                {safeProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
