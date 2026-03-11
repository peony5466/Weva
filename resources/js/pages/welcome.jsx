import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/home/navbar';
import HomePart from '@/components/home/HomePart';
import Filters from '@/components/ui/filter';
import ProductGrid from '@/components/product-grid';

export default function Welcome() {
    const { products, categories } = usePage().props;


    const productList = products.data || products;
    const categoryList = Array.isArray(categories) ? categories : categories?.data ?? [];

    return (
        <>
            <Head title="WEVA" />
            <Navbar />
            <HomePart />

            {/* Section catalogue */}
            {/* Section catalogue */}
            <section className="px-4 lg:px-8 py-16 bg-white">
                <header className="mb-12 text-center">
                    <h2 className="text-2xl font-medium uppercase tracking-[0.3em] italic mb-2">
                        All_Collection
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        Asset_Inventory_Management // Systems_Active
                    </p>
                </header>

                <div className="-mx-4 lg:-mx-8 mb-8">
                    <Filters
                        categories={categoryList}
                        currentCategory={null}
                        baseRoute="welcome"
                    />
                </div>

                <ProductGrid products={productList} />
            </section>
        </>
    );
}
