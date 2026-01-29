import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Search, ShoppingCart, MoreHorizontal, ShieldCheck } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users Control', href: '/dashboard/users' },
];

export default function UserIndex() {
    const citizens = [
        { id: 1, name: 'Alex Rivera', email: 'alex@weva.io', status: 'Active', total_orders: 5, balance: '12,500 WT' },
        { id: 2, name: 'Sarah Chen', email: 'sarah.c@weva.io', status: 'Pending', total_orders: 1, balance: '2,000 WT' },
        { id: 3, name: 'Marc Vador', email: 'marc@weva.io', status: 'Banned', total_orders: 12, balance: '0 WT' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users — WEVA" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#050505] text-white overflow-hidden">

                {/* 1. HEADER CHROME - Style Dashboard */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 relative group">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Population_Control</span>

                        <div className="relative inline-block">
                            <h1 className="text-7xl font-[1000] tracking-tighter leading-none uppercase bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] bg-clip-text text-transparent italic skew-x-[-10deg]">
                                Users<br />Registry
                            </h1>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* BADGE SYSTEM ONLINE STYLE (Status Indicator) */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] px-10 py-4 shadow-[0_0_40px_rgba(255,255,255,0.15)] skew-x-[-15deg] border-r-4 border-white">
                        <div className="flex items-center gap-4 skew-x-[15deg]">
                            <ShieldCheck className="w-5 h-5 text-black stroke-[3px]" />
                            <p className="text-[12px] font-[1000] text-black uppercase tracking-[0.4em] italic">
                                DB_Access_Live
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                </header>

                {/* 2. SEARCH BAR - Style Lingot Creux */}
                <div className="relative group max-w-xl skew-x-[-10deg] overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 border border-white/10 group-focus-within:border-white transition-all"></div>
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 skew-x-[10deg] group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="IDENTIFY_CITIZEN_ID..."
                        className="relative w-full bg-transparent border-none py-6 pl-16 pr-4 text-[11px] tracking-[0.4em] font-black uppercase text-white focus:ring-0 outline-none skew-x-[10deg] placeholder:text-white/10"
                    />
                </div>

                {/* 3. LISTE DES CITOYENS - Style Acier Découpé */}
                <div className="space-y-4">
                    {/* Header de table style Dashboard Header */}
                    <div className="grid grid-cols-5 bg-[#0D0D0D] p-6 skew-x-[-5deg] border-l-2 border-white/30 opacity-40">
                        {['Users', 'Protocol', 'Value_Asset', 'Operations', 'Access'].map((h) => (
                            <span key={h} className="text-[10px] font-black tracking-[0.4em] uppercase italic skew-x-[5deg]">{h}</span>
                        ))}
                    </div>

                    {/* Lignes Citoyens */}
                    <div className="space-y-2">
                        {citizens.map((citizen) => (
                            <div key={citizen.id} className="relative group bg-[#080808] border border-white/5 p-8 flex justify-between items-center overflow-hidden skew-x-[-5deg] hover:border-white transition-all duration-500">
                                <div className="grid grid-cols-5 w-full items-center relative z-10 skew-x-[5deg]">

                                    {/* Profil Chrome */}
                                    <div className="flex flex-col">
                                        <span className="text-lg font-[1000] tracking-[0.1em] uppercase bg-gradient-to-r from-white to-[#555] bg-clip-text text-transparent italic leading-none">
                                            {citizen.name}
                                        </span>
                                        <span className="text-[10px] text-white/20 font-mono italic tracking-widest">{citizen.email}</span>
                                    </div>

                                    {/* Statut Badge Style */}
                                    <div>
                                        <span className={`text-[9px] font-[1000] px-4 py-1 border skew-x-[-10deg] inline-block ${citizen.status === 'Active' ? 'border-white text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' :
                                            citizen.status === 'Banned' ? 'border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                                                'border-white/10 text-white/20'
                                            }`}>
                                            <span className="skew-x-[10deg] block uppercase tracking-widest">{citizen.status}</span>
                                        </span>
                                    </div>

                                    {/* Valeur Monétaire Style Stat Card */}
                                    <span className="text-lg font-[1000] tracking-tighter text-white italic drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] font-mono">
                                        {citizen.balance}
                                    </span>

                                    {/* Commandes */}
                                    <div className="flex items-center gap-3">
                                        <ShoppingCart className="w-4 h-4 text-white/20" />
                                        <span className="text-[11px] font-black tracking-widest text-white/60">{citizen.total_orders} PKT</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end">
                                        <button className="text-white/10 hover:text-white transition-colors">
                                            <MoreHorizontal className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Shimmer au survol sur la ligne */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                {/* Bordure lumineuse gauche */}
                                <div className="absolute left-0 top-0 h-full w-[2px] bg-white opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#fff] transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. WATERMARK */}
                <div className="mt-auto opacity-[0.03] pointer-events-none select-none">
                    <p className="text-[12vw] font-[1000] leading-none uppercase tracking-tighter italic">Database_System</p>
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