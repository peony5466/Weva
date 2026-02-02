import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Layers } from 'lucide-react'; // Ajout de Layers pour l'icône
import { useState, useEffect } from 'react';

const breadcrumbs = [
    { title: 'System', href: '/dashboard' },
    { title: 'Product Inventory', href: '/admin/products' },
];

export default function ProductIndex({ products, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const productList = products.data;

    useEffect(() => {
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

    const getStockTotal = (variants) => {
        return variants ? variants.reduce((sum, v) => sum + v.stock, 0) : 0;
    };

    const handleDelete = (id) => {
        if (confirm('CONFIRM_DELETION : Voulez-vous supprimer cet asset ?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory — WEVA" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#050505] text-white overflow-hidden">

                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 relative group">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Asset_Inventory_v.1</span>
                        <div className="relative inline-block">
                            <h1 className="text-7xl font-[1000] tracking-tighter leading-none uppercase bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] bg-clip-text text-transparent italic skew-x-[-10deg]">
                                Product<br />Registry
                            </h1>
                        </div>
                    </div>

                    <Link
                        href={route('admin.products.create')}
                        className="relative overflow-hidden bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] px-10 py-4 shadow-[0_0_40px_rgba(255,255,255,0.15)] skew-x-[-15deg] border-r-4 border-white group transition-transform hover:scale-105 active:scale-95 block"
                    >
                        <div className="flex items-center gap-4 skew-x-[15deg]">
                            <Plus className="w-5 h-5 text-black stroke-[3px]" />
                            <p className="text-[12px] font-[1000] text-black uppercase tracking-[0.4em] italic">
                                Add_New_Asset
                            </p>
                        </div>
                    </Link>
                </header>

                {/* --- BARRE DE RECHERCHE --- */}
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="relative w-full md:w-96 group skew-x-[-10deg] overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 border border-white/10 group-focus-within:border-white transition-all"></div>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 skew-x-[10deg]" />
                        <input
                            type="text"
                            placeholder="SEARCH_BY_NAME..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="relative w-full bg-transparent border-none py-5 pl-14 pr-4 text-[11px] tracking-[0.3em] font-black uppercase text-white focus:ring-0 outline-none skew-x-[10deg] placeholder:text-white/10"
                        />
                    </div>
                </div>

                {/* --- LISTE DES PRODUITS --- */}
                <div className="space-y-4">
                    {/* Header : Changé à grid-cols-6 */}
                    <div className="grid grid-cols-6 bg-[#0D0D0D] p-6 skew-x-[-5deg] border-l-2 border-white/30 items-center">
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 italic skew-x-[5deg]">Asset</span>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 italic skew-x-[5deg]">Designation</span>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 italic skew-x-[5deg]">Category</span>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 italic skew-x-[5deg]">Value</span>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 italic skew-x-[5deg]">Stock</span>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 italic skew-x-[5deg] text-right">Actions</span>
                    </div>

                    <div className="space-y-2">
                        {productList.length > 0 ? (
                            productList.map((product) => (
                                <div key={product.id} className="relative group bg-[#080808] border border-white/5 p-8 overflow-hidden skew-x-[-5deg] hover:border-white/40 transition-all duration-500">
                                    <div className="grid grid-cols-6 w-full items-center relative z-10 skew-x-[5deg]">

                                        {/* COL 1: IMAGE + ID */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-14 bg-[#111] border border-white/10 overflow-hidden relative group-hover:border-white/40 transition-colors skew-x-[-10deg]">
                                                {product.image_path ? (
                                                    <img
                                                        src={`/storage/${product.image_path}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 skew-x-[10deg] scale-125"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[8px] text-white/10 uppercase font-black italic skew-x-[10deg]">
                                                        N_A
                                                    </div>
                                                )}
                                            </div>
                                            <span className="font-mono text-[10px] text-white/10 group-hover:text-white transition-colors">
                                                #{product.id.toString().padStart(4, '0')}
                                            </span>
                                        </div>

                                        {/* COL 2: DESIGNATION */}
                                        <span className="text-sm font-[1000] tracking-[0.1em] uppercase bg-gradient-to-r from-white to-[#555] bg-clip-text text-transparent italic">
                                            {product.name}
                                        </span>

                                        {/* COL 3: CATEGORY (NOUVEAU) */}
                                        <div className="flex items-center">
                                            <span className="text-[10px] font-black tracking-widest uppercase italic px-3 py-1 bg-white/5 border border-white/10 text-white/40 group-hover:text-white group-hover:border-white/30 transition-all">
                                                {product.category ? product.category.name : 'UNCLASSIFIED'}
                                            </span>
                                        </div>

                                        {/* COL 4: VALUE */}
                                        <span className="text-lg font-[1000] tracking-tighter text-white italic">
                                            {product.price}€
                                        </span>

                                        {/* COL 5: STOCK */}
                                        <div>
                                            <span className={`text-[9px] font-black px-4 py-1 border skew-x-[-10deg] inline-block ${getStockTotal(product.variants) < 5 ? 'border-red-500 text-red-500' : 'border-white/10 text-white/40 group-hover:border-white group-hover:text-white'}`}>
                                                <span className="skew-x-[10deg] block uppercase">{getStockTotal(product.variants)} PCS</span>
                                            </span>
                                        </div>

                                        {/* COL 6: ACTIONS */}
                                        <div className="flex justify-end gap-6">
                                            <Link href={route('admin.products.edit', product.id)} className="text-white/10 hover:text-white transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(product.id)} className="text-white/10 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 border border-dashed border-white/10 skew-x-[-5deg]">
                                <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase italic skew-x-[5deg]">No_Assets_Detected_In_Registry</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- PAGINATION --- */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {products.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-6 py-3 text-[10px] font-black uppercase italic skew-x-[-15deg] transition-all border ${link.active
                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'bg-transparent text-white/30 border-white/10 hover:border-white hover:text-white'
                                } ${!link.url ? 'opacity-10 cursor-not-allowed' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}