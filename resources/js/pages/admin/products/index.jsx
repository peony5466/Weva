import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, Edit2, Image as ImageIcon, Search, Trash2, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ProductIndex({ products, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const productList = products?.data ?? [];

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (search !== (filters?.search || '')) {
            const t = setTimeout(() => {
                router.get(route('admin.products.index'), { search }, { preserveState: true, replace: true, preserveScroll: true });
            }, 300);
            return () => clearTimeout(t);
        }
    }, [search]);

    const handleDelete = (id) => {
        if (confirm('Supprimer cet asset ?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Products — WEVA Admin" />
            <div className="min-h-screen bg-[#0A0A0A] p-6 text-[#E5E7EB] lg:p-10">
                <div className="mx-auto max-w-7xl space-y-8">
                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <div>
                            <nav className="mb-1 flex gap-2 text-xs text-gray-500">
                                <span>Admin</span>
                                <span>/</span>
                                <span className="text-gray-300">Products</span>
                            </nav>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Asset Inventory</h1>
                        </div>
                        <Link
                            href={route('admin.products.create')}
                            className="bg-white px-5 py-2.5 text-xs font-black tracking-widest text-black uppercase transition-all hover:bg-white/80"
                        >
                            + New Product
                        </Link>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-hidden border border-white/5 bg-[#111]">
                        <div className="flex flex-col gap-4 border-b border-white/5 p-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="font-semibold text-white">Products</h3>
                                <p className="mt-1 text-sm text-gray-500">Gérer les produits de la boutique.</p>
                            </div>
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border border-white/10 bg-[#1A1A1A] py-2 pr-4 pl-10 text-sm text-white transition-all outline-none focus:border-white/40 md:w-64"
                                />
                            </div>
                        </div>

                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
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
                                        <tr key={product.id} className="group transition-colors hover:bg-white/[0.02]">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-10 flex-shrink-0 overflow-hidden border border-white/10 bg-[#1A1A1A]">
                                                        {product.image_path ? (
                                                            <img
                                                                src={`/images/${product.image_path}`}
                                                                alt=""
                                                                className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center">
                                                                <ImageIcon className="h-4 w-4 text-gray-700" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-white/5 px-2 py-1 font-mono text-xs text-gray-400">
                                                    {product.category?.name || 'Standard'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {product.is_limited ? (
                                                    <CheckCircle2 className="mx-auto h-4 w-4 text-green-500" />
                                                ) : (
                                                    <XCircle className="mx-auto h-4 w-4 text-gray-700" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm text-gray-300">
                                                    {product.variants?.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0) ?? 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Link
                                                        href={route('admin.products.edit', product.id)}
                                                        className="text-gray-500 transition-colors hover:text-white"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-gray-500 transition-colors hover:text-red-500"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-16 text-center text-sm text-gray-600 italic">
                                            Aucun produit trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* PAGINATION — fix: skip null urls */}
                        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 bg-[#0F0F0F] p-4 text-xs text-gray-500 md:flex-row">
                            <span className="text-[10px] tracking-widest uppercase italic">
                                {products.from ?? 0}–{products.to ?? 0} / {products.total ?? 0} assets
                            </span>
                            <div className="flex flex-wrap justify-center gap-1">
                                {(products.links ?? []).map((link, i) =>
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            preserveScroll
                                            preserveState
                                            className={`border border-white/5 px-3 py-1.5 text-[10px] font-bold uppercase transition-all ${link.active ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/10'}`}
                                        />
                                    ) : (
                                        <span
                                            key={i}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className="cursor-not-allowed border border-white/5 px-3 py-1.5 text-[10px] font-bold text-gray-600 uppercase opacity-20"
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
