import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [{ title: 'System Dashboard', href: '/dashboard' }];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Dashboard" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#050505] text-white overflow-hidden">

                {/* 1. HEADER CHROME - Comme le bouton System Online */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 relative group">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Unit_Protocol</span>

                        {/* TITRE CHROME LIQUIDE */}
                        <div className="relative inline-block">
                            <h1 className="text-7xl font-[1000] tracking-tighter leading-none uppercase bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] bg-clip-text text-transparent italic skew-x-[-10deg]">
                                System<br />Control
                            </h1>
                            {/* Éclair de lumière sur le titre au hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* BADGE SYSTEM ONLINE (Ton favori) */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] px-10 py-4 shadow-[0_0_40px_rgba(255,255,255,0.15)] skew-x-[-15deg] border-r-4 border-white">
                        <p className="text-[12px] font-[1000] text-black uppercase tracking-[0.4em] relative z-10 skew-x-[15deg] italic">
                            System_Online
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                </header>

                {/* 2. STATS CARDS - Comme des lingots d'argent */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { label: 'Citizens', value: '1.240', sub: 'Active_Node' },
                        { label: 'Tokens', value: '850.230', sub: 'Minted_Supply' },
                        { label: 'Load', value: '24%', sub: 'Safe_Status' }
                    ].map((stat, i) => (
                        <div key={i} className="relative group bg-[#0D0D0D] border border-white/5 p-12 overflow-hidden skew-x-[-5deg] hover:border-white transition-all duration-700">
                            {/* Reflet permanent en coin */}
                            <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent to-white opacity-50 shadow-[0_0_15px_#fff]"></div>

                            <div className="relative z-10 skew-x-[5deg]">
                                <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-bold mb-8 italic">// {stat.label}</p>

                                {/* VALEUR CHROME */}
                                <p className="text-6xl font-[1000] tracking-tighter uppercase italic bg-gradient-to-b from-white via-[#999] to-[#444] bg-clip-text text-transparent">
                                    {stat.value}
                                </p>

                                <div className="mt-6 h-[1px] w-full bg-white/10 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white w-1/3 shadow-[0_0_10px_#fff]"></div>
                                </div>
                            </div>

                            {/* Shimmer au survol sur toute la carte */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                    ))}
                </div>

                {/* 3. LOGS - Style "Acier Découpé" */}
                <section className="space-y-4">
                    <div className="flex items-center gap-6">
                        <div className="h-[2px] w-12 bg-white shadow-[0_0_10px_#fff]"></div>
                        <h2 className="text-[11px] tracking-[0.6em] uppercase text-white font-black italic">Live_Secure_Feed</h2>
                        <div className="h-[1px] flex-grow bg-white/10"></div>
                    </div>

                    <div className="bg-[#080808] border border-white/5 divide-y divide-white/5">
                        {[1, 2, 3].map((log) => (
                            <div key={log} className="p-8 hover:bg-white/[0.02] transition-all group flex justify-between items-center overflow-hidden relative">
                                <div className="flex items-center gap-10 relative z-10">
                                    <span className="text-[10px] font-mono text-white/10 group-hover:text-white transition-colors">00{log}</span>
                                    <p className="text-sm font-light tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-all italic">
                                        Data_Stream_Access <span className="text-white/10 mx-4">::</span>
                                        <span className="font-bold text-white/80 group-hover:bg-gradient-to-r from-white to-[#555] group-hover:bg-clip-text group-hover:text-transparent">
                                            ENCRYPTED_SIGNAL_STABLE
                                        </span>
                                    </p>
                                </div>
                                {/* Reflet fugace sur la ligne au hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                </section>
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