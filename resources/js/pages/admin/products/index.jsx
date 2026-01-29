import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

const breadcrumbs = [
    { title: 'System', href: '/dashboard' },
    { title: 'Product Inventory', href: '/admin/products' },
];

export default function ProductIndex() {
    const products = [
        { id: 1, name: 'Cyber Monocle', category: 'Accessory', price: '1.200', stock: 45 },
        { id: 2, name: 'Neon Skin V.1', category: 'Skin', price: '2.500', stock: 12 },
        { id: 3, name: 'Gravity Boots', category: 'Equipment', price: '3.800', stock: 8 },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory — WEVA" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#050505] text-white overflow-hidden">

                {/* 1. HEADER CHROME & BADGE ACTION */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 relative group">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Asset_Inventory_v.1</span>

                        <div className="relative inline-block">
                            <h1 className="text-7xl font-[1000] tracking-tighter leading-none uppercase bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] bg-clip-text text-transparent italic skew-x-[-10deg]">
                                Product<br />Registry
                            </h1>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* BADGE "ADD ITEM" : Clone du System_Online */}
                    <button className="relative overflow-hidden bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] px-10 py-4 shadow-[0_0_40px_rgba(255,255,255,0.15)] skew-x-[-15deg] border-r-4 border-white group transition-transform hover:scale-105 active:scale-95">
                        <div className="flex items-center gap-4 skew-x-[15deg]">
                            <Plus className="w-5 h-5 text-black stroke-[3px]" />
                            <p className="text-[12px] font-[1000] text-black uppercase tracking-[0.4em] italic">
                                Add_New_Asset
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </button>
                </header>

                {/* 2. RECHERCHE & FILTRES : Style Lingot */}
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="relative w-full md:w-96 group skew-x-[-10deg] overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 border border-white/10 group-focus-within:border-white transition-all"></div>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 skew-x-[10deg]" />
                        <input
                            type="text"
                            placeholder="SEARCH_BY_ID..."
                            className="relative w-full bg-transparent border-none py-5 pl-14 pr-4 text-[11px] tracking-[0.3em] font-black uppercase text-white focus:ring-0 outline-none skew-x-[10deg] placeholder:text-white/10"
                        />
                    </div>

                    <div className="flex gap-2">
                        {['All', 'Skins', 'Accessory'].map((cat) => (
                            <button key={cat} className="px-6 py-2 bg-[#111] border border-white/5 skew-x-[-10deg] hover:bg-white hover:text-black transition-all group">
                                <span className="text-[9px] tracking-[0.3em] uppercase font-black skew-x-[10deg] block">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. TABLEAU STYLE "ACIER DÉCOUPÉ" */}
                <div className="space-y-4">
                    {/* Header Table */}
                    <div className="grid grid-cols-6 bg-[#0D0D0D] p-6 skew-x-[-5deg] border-l-2 border-white/30">
                        {['Ref.', 'Designation', 'Category', 'Value (WT)', 'Stock', 'Actions'].map((h) => (
                            <span key={h} className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 italic skew-x-[5deg]">{h}</span>
                        ))}
                    </div>

                    {/* Lignes de produits style Dashboard Logs/Stats */}
                    <div className="space-y-2">
                        {products.map((product) => (
                            <div key={product.id} className="relative group bg-[#080808] border border-white/5 p-8 flex justify-between items-center overflow-hidden skew-x-[-5deg] hover:border-white/40 transition-all duration-500">
                                <div className="grid grid-cols-6 w-full items-center relative z-10 skew-x-[5deg]">
                                    <span className="font-mono text-[10px] text-white/10 group-hover:text-white transition-colors">#00{product.id}</span>

                                    {/* Texte Chrome sur les Noms */}
                                    <span className="text-sm font-[1000] tracking-[0.1em] uppercase bg-gradient-to-r from-white to-[#555] bg-clip-text text-transparent italic">
                                        {product.name}
                                    </span>

                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">{product.category}</span>

                                    {/* Valeur Style Stat */}
                                    <span className="text-lg font-[1000] tracking-tighter text-white italic drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                                        {product.price}
                                    </span>

                                    <div>
                                        <span className={`text-[9px] font-black px-4 py-1 border skew-x-[-10deg] inline-block ${product.stock < 10 ? 'border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-white/10 text-white/40 group-hover:border-white group-hover:text-white'}`}>
                                            <span className="skew-x-[10deg] block">{product.stock} PCS</span>
                                        </span>
                                    </div>

                                    <div className="flex justify-end gap-6">
                                        <button className="text-white/10 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button className="text-white/10 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>

                                {/* Shimmer au hover sur la ligne */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                {/* Bordure néon discrète à gauche */}
                                <div className="absolute left-0 top-0 h-full w-[2px] bg-white opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#fff] transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. WATERMARK GÉANT */}
                <div className="fixed bottom-[-5%] left-[-5%] opacity-[0.03] pointer-events-none select-none">
                    <h1 className="text-[20vw] font-[1000] italic tracking-tighter text-white">STORAGE</h1>
                </div>
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