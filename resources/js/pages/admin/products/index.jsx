import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function ProductIndex({ products, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const productList = products.data;

    // On utilise un Ref pour savoir si c'est le premier rendu
    const isFirstRender = useRef(true);

    useEffect(() => {
        // On évite de déclencher la recherche au chargement initial
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // On ne déclenche la recherche que si la valeur de recherche est différente des filtres actuels
        if (search !== (filters.search || '')) {
            const delayDebounceFn = setTimeout(() => {
                router.get(
                    route('admin.products.index'),
                    { search: search },
                    { preserveState: true, replace: true, preserveScroll: true }
                );
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [search]);

    const handleDelete = (id) => {
        if (confirm('CONFIRM_DELETION : Supprimer cet asset ?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Products — WEVA Admin" />

            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] font-sans p-6 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* BREADCRUMBS & TITLE */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <nav className="text-xs text-gray-500 flex gap-2 items-center">
                                <span>Products</span>
                                <span>/</span>
                                <span className="text-gray-300">List</span>
                            </nav>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Asset Inventory</h1>
                        </div>
                        <Link
                            href={route('admin.products.create')}
                            className="bg-[#E67E22] hover:bg-[#D35400] text-black text-xs font-bold py-2.5 px-5 rounded-md transition-all uppercase tracking-wider"
                        >
                            New Product
                        </Link>
                    </div>

                    {/* TABLE CONTAINER */}
                    <div className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden">

                        {/* TABLE DESCRIPTION & SEARCH */}
                        <div className="p-6 border-b border-white/5 space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">
                            <div className="max-w-xl">
                                <h3 className="text-white font-semibold">Products</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    View and manage the products available in your store.
                                </p>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-[#1A1A1A] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-[#E67E22] outline-none transition-all w-full md:w-64"
                                />
                            </div>
                        </div>

                        {/* THE TABLE */}
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-white/5">
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4 text-center">Limited</th>
                                    <th className="px-6 py-4 text-center">Stock</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {productList.length > 0 ? (
                                    productList.map((product) => (
                                        <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-12 bg-[#1A1A1A] rounded border border-white/10 overflow-hidden flex-shrink-0">
                                                        {product.image_path ? (
                                                            <img
                                                                src={`/storage/${product.image_path}`}
                                                                alt=""
                                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <ImageIcon className="w-4 h-4 text-gray-700" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-gray-400 font-mono bg-white/5 px-2 py-1 rounded">
                                                    {product.category?.name || 'Standard'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {product.is_limited ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-gray-800 mx-auto" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm text-gray-300">
                                                    {product.variants?.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0) || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Link href={route('admin.products.edit', product.id)} className="text-gray-500 hover:text-white transition-colors">
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(product.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic text-sm">
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* FOOTER PAGINATION - CORRIGÉ */}
                        <div className="p-4 bg-[#0F0F0F] border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                            <span className="italic uppercase tracking-widest text-[10px]">
                                Showing {products.from || 0}-{products.to || 0} of {products.total} assets
                            </span>
                            <div className="flex gap-1 flex-wrap justify-center">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        // On préserve le scroll et l'état lors du clic sur la pagination
                                        preserveScroll
                                        preserveState
                                        className={`px-3 py-1.5 rounded border border-white/5 transition-all text-[10px] font-bold uppercase ${link.active
                                                ? 'bg-white text-black border-white'
                                                : 'hover:bg-white/10 text-gray-400'
                                            } ${!link.url ? 'opacity-20 cursor-not-allowed' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}