import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'System Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Dashboard" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#0A0A0A] text-white">

                {/* 1. HEADER : Plus affirmé */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/20 pb-10">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/40 uppercase font-black">
                            Administrative Unit
                        </span>
                        <h1 className="text-5xl font-extralight tracking-[-0.05em] leading-none uppercase">
                            Control <span className="font-black text-white">Panel</span>
                        </h1>
                    </div>
                    <div className="bg-white px-6 py-2">
                        <p className="text-[10px] font-bold text-black uppercase tracking-widest">System Online</p>
                    </div>
                </header>

                {/* 2. STATS : Plus grosses et plus lisibles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Active Citizens', value: '1,240', sub: '+12% this week' },
                        { label: 'Total WT Minted', value: '850,230', sub: 'Last sync: 2m ago' },
                        { label: 'System Load', value: '24%', sub: 'Optimized' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#111111] border border-white/10 p-10 space-y-6 hover:border-white/40 transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase font-bold">{stat.label}</p>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-6xl font-black tracking-tighter text-white uppercase italic">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] text-white/30 uppercase mt-2 tracking-widest">{stat.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. ZONE DE DONNÉES : Structure de table minimaliste mais contrastée */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center bg-[#161616] p-4 border-l-4 border-white">
                        <h2 className="text-xs tracking-[0.3em] uppercase text-white font-bold">Recent System Logs</h2>
                        <button className="text-[10px] text-white/40 hover:text-white transition uppercase font-bold tracking-widest">Refresh Feed</button>
                    </div>

                    <div className="bg-[#111111] border border-white/10 overflow-hidden">
                        <div className="divide-y divide-white/5">
                            {[1, 2, 3, 4].map((log) => (
                                <div key={log} className="p-6 flex justify-between items-center hover:bg-white/[0.02] transition">
                                    <div className="flex items-center gap-8">
                                        <span className="font-mono text-[10px] text-white/20">0{log}</span>
                                        <p className="text-sm font-light tracking-wide uppercase text-white/80">User_ID_092{log} executed Token_Minting</p>
                                    </div>
                                    <span className="text-[10px] font-mono text-white/40">14:02:21</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. BACKGROUND TEXTURE : Pour combler le vide sans distraire */}
                <div className="fixed bottom-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                    <p className="text-[20vw] font-black leading-none">ROOT</p>
                </div>
            </div>
        </AppLayout>
    );
}