import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';

export default function MyTokens({ auth, userPoints = 0, orders = [] }) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset className="bg-[#0A0A0A] text-white">
                <Head title="ASSETS — WEVA" />

                <div className="flex flex-col min-h-screen selection:bg-white selection:text-black">
                    <div className="p-8 lg:p-16 max-w-[1400px] mx-auto w-full space-y-20">

                        {/* HEADER PROTOCOL */}
                        <header className="flex justify-between items-end border-b border-white/10 pb-6">
                            <div className="space-y-1">
                                <span className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">
                                    Financial / Ledger
                                </span>
                                <h1 className="text-2xl font-light tracking-[0.2em] text-white uppercase">
                                    Asset Management
                                </h1>
                            </div>
                            <div className="text-right hidden md:block">
                                <p className="text-[9px] tracking-[0.3em] text-neutral-600 uppercase mb-1">Network Status</p>
                                <div className="flex items-center gap-2 justify-end">
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                    <p className="text-[10px] text-white font-light tracking-widest uppercase">Sync Active</p>
                                </div>
                            </div>
                        </header>

                        {/* BALANCE DISPLAY - DONNÉES RÉELLES */}
                        <div className="relative group">
                            <div className="bg-[#0F0F0F] border border-white/5 p-12 lg:p-20 flex flex-col md:flex-row justify-between items-center gap-12 overflow-hidden">
                                <span className="absolute top-6 left-6 text-[8px] text-neutral-600 tracking-[0.4em] uppercase font-mono">
                                    Vault_id: WEVA-{auth.user.id.toString().padStart(5, '0')}
                                </span>

                                <div className="space-y-4 text-center md:text-left">
                                    <p className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">
                                        Total Balance
                                    </p>
                                    <h2 className="text-6xl md:text-8xl font-extralight tracking-tighter text-white">
                                        {userPoints.toLocaleString()} <span className="text-xl md:text-2xl font-thin text-neutral-600 tracking-[0.3em] ml-2">WT</span>
                                    </h2>
                                </div>

                                <button className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/20 transition-all duration-500 hover:border-white">
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors duration-500">
                                        Top Up Assets
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* SECONDARY DATA GRID - CASHBACK & TOTAL SPENT */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                            <div className="bg-[#0A0A0A] p-10 space-y-2">
                                <p className="text-[9px] text-neutral-600 uppercase tracking-[0.3em]">Euro Equivalent</p>
                                <p className="text-2xl font-light tracking-widest text-[#E67E22] uppercase">{(userPoints / 100).toFixed(2)} €</p>
                            </div>
                            <div className="bg-[#0A0A0A] p-10 space-y-2">
                                <p className="text-[9px] text-neutral-600 uppercase tracking-[0.3em]">System Standing</p>
                                <p className="text-2xl font-light tracking-widest text-white uppercase">{auth.user.rank || 'LEVEL 01'}</p>
                            </div>
                        </div>

                        {/* LOGS / HISTORY - DYNAMIQUE VIA ORDERS */}
                        <section className="space-y-10">
                            <h3 className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light text-center">
                                — Activity Log —
                            </h3>

                            <div className="space-y-px bg-white/5">
                                {orders.length > 0 ? (
                                    orders.map((order, i) => (
                                        <div key={i} className="bg-[#0A0A0A] group hover:bg-[#0F0F0F] transition-colors duration-300 p-6 flex justify-between items-center">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] text-neutral-600 tracking-widest uppercase">
                                                    {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                                <span className="text-xs tracking-[0.2em] text-white uppercase font-light">
                                                    Order {order.order_number}
                                                </span>
                                            </div>
                                            <div className="text-sm tracking-widest font-mono text-white">
                                                +{order.points_earned} WT
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-[#0A0A0A] p-10 text-center text-[10px] text-neutral-600 tracking-[0.5em] uppercase">
                                        No transaction history found
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* BACKGROUND TEXTURE */}
                        <div className="pt-12 opacity-5 pointer-events-none select-none">
                            <p className="text-[15vw] font-black tracking-tighter text-white leading-none">
                                VAULT
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}