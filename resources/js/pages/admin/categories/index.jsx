import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Plus, Hash, Layers } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Inventory', href: '/dashboard/inventory' },
    { title: 'Categories', href: '/dashboard/inventory/categories' },
];

export default function CategoryIndex() {
    const categories = [
        { id: 1, name: 'Skins', count: 24, slug: 'SKN' },
        { id: 2, name: 'Accessories', count: 12, slug: 'ACC' },
        { id: 3, name: 'Limited Edition', count: 5, slug: 'LTD' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CATEGORIES — WEVA" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#0A0A0A] text-white">

                {/* HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10">
                    <div className="space-y-2">
                        <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-light underline underline-offset-8 decoration-white/20">Classification System</span>
                        <h1 className="text-4xl font-extralight tracking-[0.1em] uppercase text-white">Categories</h1>
                    </div>

                    <button className="flex items-center gap-4 border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-700">
                        <Plus className="w-3 h-3" />
                        <span className="text-[10px] tracking-[0.3em] uppercase">Create Category</span>
                    </button>
                </header>

                {/* GRID DE CATEGORIES */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-[#0A0A0A] p-10 space-y-8 group hover:bg-[#0F0F0F] transition-all duration-500 relative overflow-hidden">
                            <div className="flex justify-between items-start relative z-10">
                                <span className="text-[9px] font-mono text-white/20 tracking-tighter">REF_{cat.slug}</span>
                                <Layers className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                            </div>

                            <div className="space-y-2 relative z-10">
                                <h2 className="text-2xl font-light tracking-[0.1em] uppercase group-hover:translate-x-2 transition-transform duration-500">{cat.name}</h2>
                                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold italic">{cat.count} Items registered</p>
                            </div>

                            <div className="pt-4 flex gap-4 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <button className="text-[9px] tracking-widest uppercase border-b border-white/40 hover:border-white pb-1">Edit</button>
                                <button className="text-[9px] tracking-widest uppercase border-b border-white/40 hover:border-red-500 hover:text-red-500 pb-1">Delete</button>
                            </div>

                            {/* Filigrane d'arrière-plan discret */}
                            <span className="absolute -bottom-4 -right-2 text-6xl font-black text-white/[0.02] pointer-events-none uppercase">
                                {cat.slug}
                            </span>
                        </div>
                    ))}
                </div>

                {/* FOOTER LOG */}
                <footer className="pt-20 border-t border-white/5">
                    <p className="text-[9px] tracking-[0.5em] text-white/20 uppercase text-center font-mono">
                        Secure Database Access — 2026 Weva Corp
                    </p>
                </footer>
            </div>
        </AppLayout>
    );
}