import ProductCard from '@/components/product-card';
export default function ProductGrid({ products }) {
    // 1. Log pour voir ce que vous recevez réellement
    console.log("Products reçus :", products);

    // 2. Si products est indéfini, on initialise avec un tableau vide
    const safeProducts = products || [];

    if (safeProducts.length === 0) {
        return (
            <div className="text-center py-24">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 italic">
                    No_Products_Found
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {safeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}