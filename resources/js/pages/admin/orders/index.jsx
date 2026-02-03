import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ShoppingBag, CreditCard, Filter, Terminal, Search, ExternalLink } from 'lucide-react';

export default function OrderIndex() {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '#' },
    ];

    const orders = [
        { id: 'ORD-2026-X1', customer: 'Alex Rivera', email: 'alex@weva.com', item: 'Cyber Monocle', price: '1,200 WT', type: 'Token', status: 'Completed', date: '2026-02-03' },
        { id: 'ORD-2026-X2', customer: 'Sarah Chen', email: 'sarah.c@net.io', item: 'Neon Skin V.1', price: '45.00 €', type: 'Fiat', status: 'Pending', date: '2026-02-03' },
        { id: 'ORD-2026-X3', customer: 'Marc Vador', email: 'lord@empire.dev', item: 'Gravity Boots', price: '3,800 WT', type: 'Token', status: 'Processing', date: '2026-02-02' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders — WEVA Admin" />

            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] font-sans p-6 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                            <nav className="text-xs text-gray-500 flex gap-2 items-center uppercase tracking-widest">
                                <span>Sales</span>
                                <span>/</span>
                                <span className="text-gray-300">Financial_Ledger</span>
                            </nav>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Commercial Orders</h1>
                        </div>

                        <button className="bg-[#E67E22] hover:bg-[#D35400] text-black text-xs font-bold py-3 px-6 rounded-md transition-all uppercase tracking-wider flex items-center gap-3 shadow-lg active:scale-95">
                            <Filter className="w-4 h-4" />
                            Filter Logs
                        </button>
                    </div>

                    {/* --- SEARCH BAR --- */}
                    <div className="relative max-w-md group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#E67E22] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by order ref or customer..."
                            className="w-full bg-[#111111] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-[#E67E22] outline-none transition-all"
                        />
                    </div>

                    {/* --- ORDERS TABLE --- */}
                    <div className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.01]">
                                    <th className="px-6 py-5">Reference</th>
                                    <th className="px-6 py-5">Buyer_Identity</th>
                                    <th className="px-6 py-5">Asset</th>
                                    <th className="px-6 py-5 text-center">Method</th>
                                    <th className="px-6 py-5 text-center">Amount</th>
                                    <th className="px-6 py-5 text-right">Access</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/[0.02] transition-all group">

                                        {/* REFERENCE */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Terminal className="w-3.5 h-3.5 text-gray-600" />
                                                <span className="font-mono text-[11px] text-gray-400 group-hover:text-white transition-colors">
                                                    {order.id}
                                                </span>
                                            </div>
                                        </td>

                                        {/* IDENTITY */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white uppercase italic tracking-tight">
                                                    {order.customer}
                                                </span>
                                                <span className="text-[10px] text-gray-600 lowercase">{order.email}</span>
                                            </div>
                                        </td>

                                        {/* ASSET */}
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold text-gray-400 group-hover:text-[#E67E22] transition-colors">
                                                {order.item}
                                            </span>
                                        </td>

                                        {/* PAYMENT METHOD */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {order.type === 'Token' ? (
                                                    <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
                                                ) : (
                                                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                                                )}
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                    {order.type}
                                                </span>
                                            </div>
                                        </td>

                                        {/* AMOUNT */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-base font-black tracking-tighter text-white font-mono italic">
                                                {order.price}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-700 hover:text-white transition-all transform hover:scale-110">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* --- TABLE FOOTER --- */}
                        <div className="bg-[#0F0F0F] px-6 py-4 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em]">
                            <span>Ledger_State: Synced</span>
                            <span className="italic">Weva_Financial_Node_v2.1</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}