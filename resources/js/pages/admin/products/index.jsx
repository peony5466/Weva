import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

const breadcrumbs = [
    { title: 'System', href: '/dashboard' },
    { title: 'Product Inventory', href: '/admin/products' },
];

export default function ProductIndex() {
    // Exemple de données (à remplacer par tes props Laravel plus tard)
    const products = [
        { id: 1, name: 'Cyber Monocle', category: 'Accessory', price: '1,200', stock: 45 },
        { id: 2, name: 'Neon Skin V.1', category: 'Skin', price: '2,500', stock: 12 },
        { id: 3, name: 'Gravity Boots', category: 'Equipment', price: '3,800', stock: 8 },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory — WEVA" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#0A0A0A] text-white">

                {/* HEADER : Minimaliste & Action */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10">
                    <div className="space-y-2">
                        <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-light">Inventory Management</span>
                        <h1 className="text-4xl font-extralight tracking-[0.1em] uppercase text-white">Products</h1>
                    </div>

                    <button className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-none hover:bg-neutral-200 transition-all duration-500 group">
                        <Plus className="w-4 h-4" />
                        <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Add New Item</span>
                    </button>
                </header>

                {/* FILTRES & RECHERCHE */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH BY IDENTIFIER..."
                            className="w-full bg-transparent border border-white/10 py-4 pl-12 pr-4 text-[10px] tracking-widest uppercase focus:border-white/40 focus:ring-0 transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        {['All', 'Skins', 'Accessory', 'Limited'].map((cat) => (
                            <button key={cat} className="text-[9px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition border-b border-transparent hover:border-white pb-1">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* LISTE DES PRODUITS : Style chirurgical */}
                <div className="w-full border border-white/10 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#111111] border-b border-white/10 text-[9px] tracking-[0.3em] text-white/40 uppercase">
                                <th className="p-6 font-medium">Ref.</th>
                                <th className="p-6 font-medium">Designation</th>
                                <th className="p-6 font-medium">Category</th>
                                <th className="p-6 font-medium">Value (WT)</th>
                                <th className="p-6 font-medium">Stock</th>
                                <th className="p-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map((product) => (
                                <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-6 text-[10px] font-mono text-white/30">#00{product.id}</td>
                                    <td className="p-6 text-sm tracking-widest uppercase font-light text-white">{product.name}</td>
                                    <td className="p-6 text-[10px] tracking-widest uppercase text-white/50">{product.category}</td>
                                    <td className="p-6 font-mono text-sm tracking-tighter text-white">{product.price}</td>
                                    <td className="p-6">
                                        <span className={`text-[10px] px-3 py-1 border ${product.stock < 10 ? 'border-red-500/50 text-red-500' : 'border-white/20 text-white/60'}`}>
                                            {product.stock} PCS
                                        </span>
                                    </td>
                                    <td className="p-6 text-right space-x-4">
                                        <button className="text-white/30 hover:text-white transition inline-block"><Edit2 className="w-4 h-4" /></button>
                                        <button className="text-white/30 hover:text-red-500 transition inline-block"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* DECORATION */}
                <div className="fixed bottom-0 left-0 p-12 opacity-[0.02] pointer-events-none">
                    <p className="text-[15vw] font-black leading-none">OBJECTS</p>
                </div>
            </div>
        </AppLayout>
    );
}