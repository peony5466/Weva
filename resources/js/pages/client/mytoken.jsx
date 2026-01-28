import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';

export default function MyTokens({ auth }) {
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

                        {/* BALANCE DISPLAY - STYLE GALERIE */}
                        <div className="relative group">
                            <div className="bg-[#0F0F0F] border border-white/5 p-12 lg:p-20 flex flex-col md:flex-row justify-between items-center gap-12 overflow-hidden">
                                {/* Label flottant style industriel */}
                                <span className="absolute top-6 left-6 text-[8px] text-neutral-600 tracking-[0.4em] uppercase font-mono">
                                    Vault_id: WEVA-00912
                                </span>

                                <div className="space-y-4 text-center md:text-left">
                                    <p className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">
                                        Total Balance
                                    </p>
                                    <h2 className="text-6xl md:text-8xl font-extralight tracking-tighter text-white">
                                        10,000 <span className="text-xl md:text-2xl font-thin text-neutral-600 tracking-[0.3em] ml-2">WT</span>
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

                        {/* SECONDARY DATA GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                            <div className="bg-[#0A0A0A] p-10 space-y-2">
                                <p className="text-[9px] text-neutral-600 uppercase tracking-[0.3em]">Monthly Flow</p>
                                <p className="text-2xl font-light tracking-widest text-white uppercase">1,250.00</p>
                            </div>
                            <div className="bg-[#0A0A0A] p-10 space-y-2">
                                <p className="text-[9px] text-neutral-600 uppercase tracking-[0.3em]">Accumulated</p>
                                <p className="text-2xl font-light tracking-widest text-white uppercase">45,000.00</p>
                            </div>
                        </div>

                        {/* LOGS / HISTORY */}
                        <section className="space-y-10">
                            <h3 className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light text-center">
                                — Activity Log —
                            </h3>

                            <div className="space-y-px bg-white/5">
                                {[
                                    { label: 'Reward Pack', date: 'JAN 24', value: '+500', type: 'pos' },
                                    { label: 'Avatar Module', date: 'JAN 22', value: '-1,200', type: 'neg' },
                                    { label: 'System Grant', date: 'JAN 18', value: '+2,000', type: 'pos' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-[#0A0A0A] group hover:bg-[#0F0F0F] transition-colors duration-300 p-6 flex justify-between items-center">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] text-neutral-600 tracking-widest uppercase">{item.date}</span>
                                            <span className="text-xs tracking-[0.2em] text-white uppercase font-light">{item.label}</span>
                                        </div>
                                        <div className={`text-sm tracking-widest font-mono ${item.type === 'pos' ? 'text-white' : 'text-neutral-500'}`}>
                                            {item.value} WT
                                        </div>
                                    </div>
                                ))}
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