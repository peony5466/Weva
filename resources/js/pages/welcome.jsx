import { Head, usePage, Link } from '@inertiajs/react';
import Navbar from '@/components/home/navbar';
import HomePart from '@/components/home/homePart';
import Footer from '@/components/home/footer';
import ProductGrid from '@/components/product-grid';

export default function Welcome() {
    const { featuredProducts = [] } = usePage().props;

    return (
        <>
            <Head title="WEVA">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <Navbar />
            <HomePart />

            {/* Section nouveautés */}
            <section className="bg-white pt-20 pb-4">
                <div className="text-center mb-16 px-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-3">
                        Weva · 2026
                    </p>
                    <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-black">
                        New Arrivals
                    </h2>
                </div>

                {featuredProducts.length > 0 ? (
                    <ProductGrid products={featuredProducts} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-6">
                            Aucun produit disponible
                        </p>
                        <Link
                            href={route('shop.index')}
                            className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-60 transition-opacity"
                        >
                            Voir la collection
                        </Link>
                    </div>
                )}

                <div className="text-center pb-20 pt-8">
                    <Link
                        href={route('shop.index')}
                        className="inline-block border border-black text-black text-[10px] font-black uppercase tracking-[0.3em] px-12 py-4 hover:bg-black hover:text-white transition-all duration-300"
                    >
                        View All Collection
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
