import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react'; // Import de router
import { ShoppingBag, CreditCard, Filter, Terminal, Search, ExternalLink } from 'lucide-react';

export default function OrderIndex({ orders = [] }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '#' },
    ];

    // Fonction pour rediriger au clic sur la ligne
    const handleRowClick = (id) => {
        router.visit(route('client.orders.show', id));
    };

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
                            <h1 className="text-3xl font-bold tracking-tight text-white italic uppercase">Commercial Orders</h1>
                        </div>
                    </div>

                    {/* --- TABLE --- */}
                    <div className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.01]">
                                    <th className="px-6 py-5">Reference</th>
                                    <th className="px-6 py-5">Buyer_Identity</th>
                                    <th className="px-6 py-5 text-center">Status</th>
                                    <th className="px-6 py-5 text-center">Amount</th>
                                    <th className="px-6 py-5 text-right">Access</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.length > 0 ? orders.map((order) => (
                                    <tr
                                        key={order.real_id}
                                        onClick={() => handleRowClick(order.real_id)}
                                        className="hover:bg-white/[0.03] transition-all group cursor-pointer"
                                    >
                                        {/* REFERENCE */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Terminal className="w-3.5 h-3.5 text-[#E67E22] group-hover:scale-110 transition-transform" />
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

                                        {/* STATUS */}
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-tighter ${order.status.toLowerCase() === 'paid' || order.status.toLowerCase() === 'completed'
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                    : 'bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/20'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>

                                        {/* AMOUNT */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-base font-black tracking-tighter text-white font-mono italic">
                                                {order.price}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex items-center justify-center w-8 h-8 text-gray-500 group-hover:text-white transition-all transform group-hover:rotate-45">
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center text-[10px] text-gray-600 uppercase tracking-[0.5em]">
                                            Empty Ledger
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}