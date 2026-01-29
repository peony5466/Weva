import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ShoppingBag, CreditCard, Filter, Terminal } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Sales & Orders', href: '/dashboard/orders' },
];

export default function OrderIndex() {
    const orders = [
        { id: 'ORD-2026-X1', customer: 'Alex Rivera', item: 'Cyber Monocle', price: '1,200 WT', type: 'Token', date: 'JAN 28' },
        { id: 'ORD-2026-X2', customer: 'Sarah Chen', item: 'Neon Skin V.1', price: '45.00 €', type: 'Fiat', date: 'JAN 28' },
        { id: 'ORD-2026-X3', customer: 'Marc Vador', item: 'Gravity Boots', price: '3,800 WT', type: 'Token', date: 'JAN 27' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ORDERS — WEVA" />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#050505] text-white overflow-hidden">

                {/* 1. HEADER CHROME - Style Dashboard */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 relative group">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Financial_Ledger</span>

                        <div className="relative inline-block">
                            <h1 className="text-7xl font-[1000] tracking-tighter leading-none uppercase bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] bg-clip-text text-transparent italic skew-x-[-10deg]">
                                Commercial<br />Orders
                            </h1>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* BADGE FILTRE STYLE "SYSTEM ONLINE" */}
                    <button className="relative overflow-hidden bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] px-10 py-4 shadow-[0_0_40px_rgba(255,255,255,0.15)] skew-x-[-15deg] border-r-4 border-white transition-transform hover:scale-105 active:scale-95 duration-300 group">
                        <div className="flex items-center gap-4 skew-x-[15deg]">
                            <Filter className="w-5 h-5 text-black stroke-[3px]" />
                            <p className="text-[12px] font-[1000] text-black uppercase tracking-[0.4em] italic">
                                Filter_Logs
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </button>
                </header>

                {/* 2. TRANSACTIONS LIST - Style Dashboard Logs */}
                <div className="space-y-4">
                    {/* Header Table Style */}
                    <div className="grid grid-cols-5 bg-[#0D0D0D] p-6 skew-x-[-5deg] border-l-2 border-white/30 opacity-40">
                        {['Reference', 'Buyer_Identity', 'Asset_Designation', 'Method', 'Total_Amount'].map((h) => (
                            <span key={h} className="text-[10px] font-black tracking-[0.4em] uppercase italic skew-x-[5deg]">{h}</span>
                        ))}
                    </div>

                    {/* Lignes Orders */}
                    <div className="space-y-2">
                        {orders.map((order) => (
                            <div key={order.id} className="relative group bg-[#080808] border border-white/5 p-8 flex justify-between items-center overflow-hidden skew-x-[-5deg] hover:border-white transition-all duration-500">
                                <div className="grid grid-cols-5 w-full items-center relative z-10 skew-x-[5deg]">

                                    {/* Reference Style Mono */}
                                    <div className="flex items-center gap-3">
                                        <Terminal className="w-4 h-4 text-white/20" />
                                        <span className="font-mono text-[11px] text-white/30 group-hover:text-white transition-colors tracking-tighter">
                                            {order.id}
                                        </span>
                                    </div>

                                    {/* Buyer Chrome Name */}
                                    <span className="text-lg font-[1000] tracking-[0.1em] uppercase bg-gradient-to-r from-white to-[#555] bg-clip-text text-transparent italic leading-none group-hover:pl-4 transition-all duration-500">
                                        {order.customer}
                                    </span>

                                    {/* Asset Designation */}
                                    <span className="text-[11px] font-black text-white/40 uppercase tracking-widest italic group-hover:text-white transition-colors">
                                        {order.item}
                                    </span>

                                    {/* Payment Method Badge */}
                                    <div className="flex items-center gap-3">
                                        {order.type === 'Token' ? (
                                            <ShoppingBag className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                        ) : (
                                            <CreditCard className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                        )}
                                        <span className="text-[9px] font-[1000] px-3 py-1 border border-white/10 uppercase italic tracking-widest text-white/20 group-hover:text-white group-hover:border-white transition-all">
                                            {order.type}
                                        </span>
                                    </div>

                                    {/* Amount Style Massive Stat */}
                                    <div className="text-right">
                                        <span className="text-2xl font-[1000] tracking-tighter text-white italic drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                            {order.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Shimmer au survol */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                {/* Bordure lumineuse gauche */}
                                <div className="absolute left-0 top-0 h-full w-[2px] bg-white opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#fff] transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. FOOTER DECO */}
                <footer className="mt-auto pt-10 flex justify-between items-center border-t border-white/5">
                    <div className="flex items-center gap-4 opacity-20 hover:opacity-100 transition-opacity group">
                        <div className="h-[1px] w-12 bg-white group-hover:shadow-[0_0_10px_#fff] transition-all"></div>
                        <p className="text-[9px] tracking-[0.8em] uppercase font-black italic">End_of_Transmission</p>
                    </div>
                    <p className="text-[10px] font-[1000] italic text-white/10 tracking-widest uppercase">Weva_Secure_Ledger_v2.1</p>
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