import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Plus, Layers } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Inventory', href: '/dashboard/inventory' },
    { title: 'Categories', href: '/dashboard/inventory/categories' },
];

export default function CategoryIndex() {
    const categories = [

        { id: 2, name: 'Accessories', count: 12, slug: 'ACC' },
        { id: 3, name: 'Limited Edition', count: 5, slug: 'LTD' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CATEGORIES — WEVA" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#050505] text-white overflow-hidden">

                {/* 1. HEADER CHROME - Style Dashboard */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 relative group">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Classification_Protocol</span>

                        {/* TITRE CHROME LIQUIDE */}
                        <div className="relative inline-block">
                            <h1 className="text-7xl font-[1000] tracking-tighter leading-none uppercase bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] bg-clip-text text-transparent italic skew-x-[-10deg]">
                                System<br />Categories
                            </h1>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* BADGE SYSTEM ONLINE STYLE (Create Button) */}
                    <button className="relative overflow-hidden bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] px-10 py-4 shadow-[0_0_40px_rgba(255,255,255,0.15)] skew-x-[-15deg] border-r-4 border-white transition-transform hover:scale-105 active:scale-95 duration-300">
                        <div className="flex items-center gap-4 skew-x-[15deg]">
                            <Plus className="w-5 h-5 text-black stroke-[3px]" />
                            <p className="text-[12px] font-[1000] text-black uppercase tracking-[0.4em] italic">
                                Create_New
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </button>
                </header>

                {/* 2. CATEGORY CARDS - Style Stat Cards du Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {categories.map((cat, i) => (
                        <div key={i} className="relative group bg-[#0D0D0D] border border-white/5 p-12 overflow-hidden skew-x-[-5deg] hover:border-white transition-all duration-700">
                            {/* Reflet permanent en coin style Dashboard */}
                            <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent to-white opacity-50 shadow-[0_0_15px_#fff]"></div>

                            <div className="relative z-10 skew-x-[5deg] space-y-8">
                                <div className="flex justify-between items-start">
                                    <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-bold italic">// REF_{cat.slug}</p>
                                    <Layers className="w-4 h-4 text-white/10 group-hover:text-white transition-colors" />
                                </div>

                                <div>
                                    {/* VALEUR CHROME */}
                                    <h2 className="text-5xl font-[1000] tracking-tighter uppercase italic bg-gradient-to-b from-white via-[#999] to-[#444] bg-clip-text text-transparent leading-none mb-4">
                                        {cat.name}
                                    </h2>
                                    <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-bold italic">
                                        {cat.count} Units_Registered
                                    </p>
                                </div>

                                <div className="mt-6 h-[1px] w-full bg-white/10 relative overflow-hidden group-hover:bg-white/20 transition-colors">
                                    <div className="absolute inset-0 bg-white w-1/4 shadow-[0_0_10px_#fff] group-hover:w-full transition-all duration-1000"></div>
                                </div>

                                <div className="flex gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <button className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors italic border-b border-white/20">Edit</button>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-red-500 transition-colors italic">Delete</button>
                                </div>
                            </div>

                            {/* Shimmer au survol sur toute la carte */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                    ))}
                </div>

                {/* 3. LOG FOOTER - Style Logs du Dashboard */}
                <footer className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center opacity-40">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-8 bg-white shadow-[0_0_8px_#fff]"></div>
                        <p className="text-[9px] tracking-[0.5em] uppercase font-mono italic">Database_Stable_Node_Alpha</p>
                    </div>
                    <p className="text-[9px] font-mono">© WEVA_CORP_2026</p>
                </footer>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
            `}</style>
        </AppLayout>
    );
}