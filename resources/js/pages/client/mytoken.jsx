import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';
import { Coins, History, TrendingUp, CreditCard } from 'lucide-react';

export default function MyTokens({ auth }) {
    return (
        <SidebarProvider>
            {/* Sidebar à gauche */}
            <AppSidebar />

            <SidebarInset className="bg-[#0A0A0A] text-white">
                <Head title="Mes Tokens - Weva" />

                <div className="flex flex-col gap-8 p-6 md:p-10 min-h-screen max-w-5xl mx-auto w-full">

                    {/* Header Minimaliste */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-semibold tracking-tight">My Tokens</h1>
                            <p className="text-neutral-500 mt-2">Manage your virtual currency and assets.</p>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Status</span>
                            <p className="text-green-400 text-sm font-medium">Account Verified</p>
                        </div>
                    </div>

                    {/* Zone du Solde (Focus Principal) */}
                    <div className="bg-[#161616] border border-white/5 rounded-[2rem] p-10 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                                    <Coins className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold mb-1">Available Balance</p>
                                    <h2 className="text-5xl font-light tracking-tighter">
                                        10,000 <span className="text-xl text-neutral-500 font-medium">WT</span>
                                    </h2>
                                </div>
                            </div>

                            <button className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all active:scale-95">
                                Add Tokens
                            </button>
                        </div>

                        {/* Décoration subtile en arrière-plan */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    </div>

                    {/* Grille d'infos secondaires */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-neutral-500 font-bold">Monthly Spending</p>
                                <p className="text-lg font-medium">1,250 WT</p>
                            </div>
                        </div>
                        <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl">
                                <CreditCard className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-neutral-500 font-bold">Total Earned</p>
                                <p className="text-lg font-medium">45,000 WT</p>
                            </div>
                        </div>
                    </div>

                    {/* Section Historique Épurée */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <History className="w-4 h-4 text-neutral-500" />
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Recent Activity</h3>
                            </div>
                            <button className="text-[10px] uppercase font-bold text-neutral-600 hover:text-white transition">View All</button>
                        </div>

                        <div className="bg-[#111111] border border-white/5 rounded-2xl divide-y divide-white/5">
                            <div className="p-5 flex justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">+</div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Reward Pack</p>
                                        <p className="text-xs text-neutral-600">Jan 24, 2026</p>
                                    </div>
                                </div>
                                <p className="font-medium text-green-400">+500 WT</p>
                            </div>
                            <div className="p-5 flex justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400">-</div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Avatar Skin Purchase</p>
                                        <p className="text-xs text-neutral-600">Jan 22, 2026</p>
                                    </div>
                                </div>
                                <p className="font-medium text-white">-1,200 WT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}