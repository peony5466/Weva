import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [{ title: 'System Dashboard', href: '/dashboard' }];

export default function Dashboard({ stats, logs }) {
    console.group('--- DASHBOARD DATA DEBUG ---');
    console.log('Stats Object:', stats);
    console.log('Total Orders Value:', stats?.orders);
    console.log('Total Orders Type:', typeof stats?.orders);
    console.log('Keys in stats:', Object.keys(stats || {}));
    console.groupEnd();

    console.group('--- LOGS DEBUG ---');
    console.log('Logs array length:', logs?.length);
    console.log('First log item:', logs?.[0]);
    console.groupEnd();
    const statCards = [
        {
            label: 'Total Citizens',
            value: stats.citizens,
            icon: '👥'
        },
        {
            label: 'Total Sales (€)',
            value: `€${Number(stats.total_sales).toLocaleString()}`,
            icon: '💶'
        },
        {
            label: 'WT Points Used',
            value: `${Number(stats.wt_sales).toLocaleString()} WT`,
            icon: '🪙'
        },

    ];


    const statusColor = (status) => {
        switch (status) {
            case 'completed':
            case 'paid': return 'text-[#00ff88]';
            case 'pending': return 'text-[#ffaa00]';
            case 'failed': return 'text-[#ff4444]';
            default: return 'text-white';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Dashboard" />

            <style>{`
                @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
                .shimmer { animation: shimmer 2s infinite; }
            `}</style>

            <div className="bg-[#050505] text-white p-4 md:p-8 min-h-screen">
                {/* ── HEADER ── */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-10 border-b border-white/10">
                    <div>
                        <span className="text-[10px] uppercase font-black italic block mb-2 text-white/30 tracking-[0.6em]">Unit_Protocol</span>
                        <h1 className="text-5xl md:text-8xl font-black italic leading-[0.9] tracking-tighter bg-gradient-to-br from-white via-[#888] to-[#eee] bg-clip-text text-transparent skew-x-[-10deg]">
                            System<br />Control
                        </h1>
                    </div>
                    <div className="px-6 md:px-10 py-3 md:py-4 bg-gradient-to-br from-white via-[#888] to-[#eee] skew-x-[-15deg] border-r-4 border-white shadow-[0_0_40px_rgba(255,255,255,0.15)] overflow-hidden relative">
                        <p className="text-[10px] font-black uppercase relative z-10 text-black tracking-[0.4em] italic skew-x-[15deg]">System_Online</p>
                        <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                    </div>
                </header>

                {/* ── STAT CARDS ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">

                    {statCards.map((stat, i) => (
                        <div key={i} className="p-8 md:p-12 bg-[#0D0D0D] border border-white/5 skew-x-0 md:skew-x-[-5deg] relative overflow-hidden transition-all hover:border-white group">
                            <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-white opacity-50" />
                            <div className="skew-x-0 md:skew-x-[5deg]">
                                <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.5em] italic mb-8">// {stat.label}</p>
                                <p className="text-4xl md:text-5xl font-black italic tracking-tighter bg-gradient-to-b from-white to-[#444] bg-clip-text text-transparent">{stat.value}</p>
                                <p className="text-[10px] text-white/20 tracking-[0.4em] italic mt-2">{stat.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </AppLayout>
    );
}