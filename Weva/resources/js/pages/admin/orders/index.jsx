import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ExternalLink, Terminal } from 'lucide-react';

export default function OrderIndex({ orders = [] }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '#' },
    ];

    const handleRowClick = (orderNumber) => {
        router.visit(route('admin.orders.show', orderNumber));
    };

    const statusStyle = (status) => {
        const s = status?.toLowerCase();
        if (s === 'paid' || s === 'completed') {
            return 'bg-green-500/10 text-green-500 border border-green-500/20';
        }
        return 'bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/20';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders — WEVA Admin" />

            <div className="min-h-screen bg-[#0A0A0A] p-6 font-sans text-[#E5E7EB] lg:p-10">
                <div className="mx-auto max-w-7xl space-y-8">
                    {/* --- HEADER --- */}
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="space-y-1">
                            <nav className="flex items-center gap-2 text-xs tracking-widest text-gray-500 uppercase">
                                <span>Sales</span>
                                <span>/</span>
                                <span className="text-gray-300">Financial_Ledger</span>
                            </nav>
                            <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">Commercial Orders</h1>
                        </div>
                    </div>

                    {/* --- TABLE --- */}
                    <div className="overflow-hidden rounded-xl border border-white/5 bg-[#111111] shadow-2xl">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.01] text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                                    <th className="px-6 py-5">Reference</th>
                                    <th className="px-6 py-5">Buyer_Identity</th>
                                    <th className="px-6 py-5 text-center">Status</th>
                                    <th className="px-6 py-5 text-center">Amount</th>
                                    <th className="px-6 py-5 text-right">Access</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            onClick={() => handleRowClick(order.order_number)}
                                            className="group cursor-pointer transition-all hover:bg-white/[0.03]"
                                        >
                                            {/* REFERENCE */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Terminal className="h-3.5 w-3.5 text-[#E67E22] transition-transform group-hover:scale-110" />
                                                    <span className="font-mono text-[11px] text-gray-400 transition-colors group-hover:text-white">
                                                        {order.order_number}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* IDENTITY */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold tracking-tight text-white uppercase italic">{order.user}</span>
                                                    <span className="text-[10px] text-gray-600 lowercase">{order.user_email}</span>
                                                </div>
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-[9px] font-black tracking-tighter uppercase ${statusStyle(order.status)}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>

                                            {/* AMOUNT */}
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-mono text-base font-black tracking-tighter text-white italic">
                                                    {order.wt_total > 0 ? (
                                                        <span className="text-amber-400">{order.wt_total} WT</span>
                                                    ) : (
                                                        <span>€{Number(order.total).toFixed(2)}</span>
                                                    )}
                                                </span>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="inline-flex h-8 w-8 transform items-center justify-center text-gray-500 transition-all group-hover:rotate-45 group-hover:text-white">
                                                    <ExternalLink className="h-4 w-4" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center text-[10px] tracking-[0.5em] text-gray-600 uppercase">
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
