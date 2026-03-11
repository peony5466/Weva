import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Head, Link } from '@inertiajs/react';

export default function MyOrders({ auth, orders = [] }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="bg-[#0A0A0A] text-white min-h-screen">
                <Head title="HISTORY — WEVA" />

                {/* Mobile Header Sticky */}
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-white/5 bg-[#0A0A0A]/80 px-4 backdrop-blur-sm md:hidden">
                    <SidebarTrigger className="text-white" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">Archive_Log</span>
                </header>

                <div className="flex flex-col font-sans selection:bg-white selection:text-black">
                    <div className="p-6 md:p-8 lg:p-16 max-w-[1400px] mx-auto w-full space-y-12 lg:space-y-20">

                        {/* HEADER */}
                        <header className="hidden md:flex justify-between items-end border-b border-white/10 pb-6">
                            <div className="space-y-1">
                                <span className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">Archive / Logs</span>
                                <h1 className="text-2xl font-light tracking-[0.2em] text-white uppercase">Order History</h1>
                            </div>
                        </header>

                        {/* ORDERS LIST */}
                        <div className="space-y-3">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <Link
                                        key={order.id}
                                        href={route('client.orders.show', order.id)}
                                        className="bg-[#0F0F0F] border border-white/5 p-6 lg:p-8 group hover:border-white/20 transition-all block"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">
                                            {/* Left Column */}
                                            <div className="space-y-1">
                                                <p className="text-[9px] text-neutral-600 uppercase tracking-widest">{order.order_number}</p>
                                                <p className="text-lg md:text-xl font-light tracking-widest uppercase italic group-hover:text-[#E67E22] transition-colors">
                                                    {new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>

                                            {/* Right Columns - Grid adaptatif */}
                                            <div className="grid grid-cols-2 md:flex gap-x-8 gap-y-4 text-left md:text-right items-center">
                                                <div>
                                                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-0.5">Status</p>
                                                    <p className={`text-[10px] uppercase font-bold tracking-widest ${order.status === 'paid' ? 'text-green-500' : 'text-[#E67E22]'}`}>
                                                        {order.status}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-0.5">Amount</p>
                                                    <p className="text-sm md:text-lg font-light tracking-tighter">{order.total} €</p>
                                                </div>
                                                <div className="hidden md:block">
                                                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-0.5">Earned</p>
                                                    <p className="text-lg text-white font-light tracking-tighter">+{order.points_earned} WT</p>
                                                </div>
                                                <div className="hidden md:block text-neutral-700 group-hover:text-white transition-colors">
                                                    →
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="py-20 text-center border border-dashed border-white/10 text-[10px] uppercase tracking-[0.5em] text-neutral-600">
                                    No records found
                                </div>
                            )}
                        </div>

                        {/* DECORATIVE TEXTURE - Masqué sur mobile */}
                        <div className="pt-12 opacity-5 pointer-events-none select-none hidden md:block">
                            <p className="text-[10vw] font-black tracking-tighter text-white leading-none">
                                ARCHIVE
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}