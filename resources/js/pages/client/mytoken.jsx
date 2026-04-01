import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';

export default function MyTokens({ auth, userPoints = 0, orders = [] }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="min-h-screen bg-[#0A0A0A] text-white">
                <Head title="ASSETS — WEVA" />

                {/* Header Mobile Sticky */}
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-white/5 bg-[#0A0A0A]/80 px-4 backdrop-blur-sm md:hidden">
                    <SidebarTrigger className="text-white" />
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Gestionnaire de coffre-fort</span>
                </header>

                <div className="flex flex-col font-sans selection:bg-white selection:text-black">
                    <div className="mx-auto w-full max-w-[1400px] space-y-12 p-6 md:p-8 lg:space-y-20 lg:p-16">
                        {/* HEADER PROTOCOL */}
                        <header className="hidden items-end justify-between border-b border-white/10 pb-6 md:flex">
                            <div className="space-y-1">
                                <span className="text-[10px] font-light tracking-[0.5em] text-neutral-500 uppercase">Financier / Registre</span>
                                <h1 className="text-2xl font-light tracking-[0.2em] text-white uppercase">Gestion des actifs</h1>
                            </div>
                            <div className="flex items-center gap-2 text-right">
                                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></div>
                                <p className="text-[10px] font-light tracking-widest text-white uppercase">Synchronisation active</p>
                            </div>
                        </header>

                        {/* BALANCE DISPLAY */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Solde disponible */}
                            <div className="relative">
                                <div className="flex flex-col items-center gap-8 border border-white/5 bg-[#0F0F0F] p-8 md:items-start lg:p-12">
                                    <span className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.4em] text-neutral-600 uppercase">
                                        Coffre-fort: WEVA-{auth.user.id.toString().padStart(5, '0')}
                                    </span>

                                    <div className="space-y-2 text-center md:text-left">
                                        <p className="text-[10px] font-light tracking-[0.5em] text-neutral-500 uppercase">Solde disponible</p>
                                        <h2 className="text-5xl font-extralight tracking-tighter text-white md:text-7xl">
                                            {userPoints.toLocaleString()}
                                            <span className="ml-2 text-xl font-thin tracking-[0.3em] text-neutral-600 md:text-2xl">WT</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* Total dépensé */}
                            <div className="relative">
                                <div className="flex flex-col items-center gap-8 border border-white/5 bg-[#0F0F0F] p-8 md:items-start lg:p-12">
                                    <span className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.4em] text-neutral-600 uppercase">
                                        Historique des dépenses
                                    </span>

                                    <div className="space-y-2 text-center md:text-left">
                                        <p className="text-[10px] font-light tracking-[0.5em] text-neutral-500 uppercase">Total dépensé</p>
                                        <h2 className="text-5xl font-extralight tracking-tighter text-white md:text-7xl">
                                            {orders.reduce((acc, o) => acc + (parseFloat(o.total) || 0), 0).toLocaleString()}
                                            <span className="ml-2 text-xl font-thin tracking-[0.3em] text-neutral-600 md:text-2xl">€</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DATA GRID */}

                        {/* LOGS / HISTORY */}
                        <section className="space-y-6">
                            <h3 className="text-center text-[10px] font-light tracking-[0.5em] text-neutral-500 uppercase">— Journal d'activité —</h3>
                            <div className="space-y-px border border-white/5 bg-white/5">
                                {orders.length > 0 ? (
                                    orders.map((order, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between bg-[#0A0A0A] p-6 transition-colors hover:bg-[#141414]"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] tracking-widest text-neutral-600 uppercase">
                                                    {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                                <span className="text-xs font-light tracking-[0.2em] text-white uppercase">
                                                    Commande {order.order_number}
                                                </span>
                                            </div>
                                            <div className="font-mono text-sm tracking-widest text-white">+{order.points_earned} WT</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center text-[10px] tracking-[0.5em] text-neutral-600 uppercase">Aucune activité</div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
