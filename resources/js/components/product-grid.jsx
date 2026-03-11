import ProductCard from '@/components/product-card';

export default function ProductGrid({ products }) {
    // Log pour le debug
    console.log("Products reçus :", products);

    const safeProducts = products || [];

    if (safeProducts.length === 0) {
        return (
            <div className="w-full flex justify-center py-40 bg-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-light">
                    No products found
                </p>
            </div>
        );
    }

    return (
        /* - bg-white: Fond blanc pur
           - gap-x-1: Espace horizontal minimaliste (ou 0 pour un look "flush")
           - gap-y-16: Espace vertical important pour laisser respirer les noms de produits
           - px-4: Padding sur les côtés pour ne pas coller aux bords de l'écran
        */
        <div className="bg-white px-4 md:px-8 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-16 md:gap-y-24 max-w-[2000px] mx-auto">
                {safeProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}