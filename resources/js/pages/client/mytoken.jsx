import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';

export default function MyTokens({ auth, userPoints = 0, orders = [] }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="bg-[#0A0A0A] text-white min-h-screen">
                <Head title="ASSETS — WEVA" />

                {/* Header Mobile Sticky */}
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-white/5 bg-[#0A0A0A]/80 px-4 backdrop-blur-sm md:hidden">
                    <SidebarTrigger className="text-white" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">Vault_Asset_Manager</span>
                </header>

                <div className="flex flex-col font-sans selection:bg-white selection:text-black">
                    <div className="p-6 md:p-8 lg:p-16 max-w-[1400px] mx-auto w-full space-y-12 lg:space-y-20">

                        {/* HEADER PROTOCOL */}
                        <header className="hidden md:flex justify-between items-end border-b border-white/10 pb-6">
                            <div className="space-y-1">
                                <span className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">Financial / Ledger</span>
                                <h1 className="text-2xl font-light tracking-[0.2em] text-white uppercase">Asset Management</h1>
                            </div>
                            <div className="text-right flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-[10px] text-white font-light tracking-widest uppercase">Sync Active</p>
                            </div>
                        </header>

                        {/* BALANCE DISPLAY */}
                        <div className="relative">
                            <div className="bg-[#0F0F0F] border border-white/5 p-8 lg:p-20 flex flex-col items-center md:items-start gap-8">
                                <span className="absolute top-4 left-4 text-[8px] text-neutral-600 tracking-[0.4em] uppercase font-mono">
                                    Vault_id: WEVA-{auth.user.id.toString().padStart(5, '0')}
                                </span>

                                <div className="space-y-2 text-center md:text-left">
                                    <p className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">Total Balance</p>
                                    <h2 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white">
                                        {userPoints.toLocaleString()}
                                        <span className="text-xl md:text-2xl font-thin text-neutral-600 tracking-[0.3em] ml-2">WT</span>
                                    </h2>
                                </div>
                                <button className="w-full md:w-auto px-8 py-4 border border-white/20 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">
                                    Top Up Assets
                                </button>
                            </div>
                        </div>

                        {/* DATA GRID */}



                        {/* LOGS / HISTORY */}
                        <section className="space-y-6">
                            <h3 className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light text-center">— Activity Log —</h3>
                            <div className="space-y-px bg-white/5 border border-white/5">
                                {orders.length > 0 ? (
                                    orders.map((order, i) => (
                                        <div key={i} className="bg-[#0A0A0A] p-6 flex justify-between items-center hover:bg-[#141414] transition-colors">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] text-neutral-600 tracking-widest uppercase">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                <span className="text-xs tracking-[0.2em] text-white uppercase font-light">Order {order.order_number}</span>
                                            </div>
                                            <div className="text-sm tracking-widest font-mono text-white">+{order.points_earned} WT</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center text-[10px] text-neutral-600 tracking-[0.5em] uppercase">No activity</div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}