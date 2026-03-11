import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Head, Link } from "@inertiajs/react";

export default function WevaVip({ auth }) {
    const userRank = auth.user.rank || 'ELITE COLLECTOR';

    return (
        // defaultOpen={true} maintient la sidebar ouverte au chargement
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="bg-[#0A0A0A] min-h-screen">
                <Head title="VIP STATUS — WEVA" />

                {/* Bouton Trigger visible sur mobile ET desktop pour le contrôle */}
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-white/5 bg-[#0A0A0A]/80 px-4 backdrop-blur-sm">
                    <SidebarTrigger className="text-white hover:bg-white/10" />
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Weva Nexus</span>
                </header>

                <div className="flex flex-col font-sans selection:bg-white selection:text-black">
                    <div className="p-6 md:p-12 lg:p-16 max-w-[1600px] mx-auto w-full space-y-12 lg:space-y-24">

                        {/* SECTION HEADER */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-6">
                            <div className="space-y-1">
                                <span className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">Membership / 001</span>
                                <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white uppercase">VIP Protocol</h1>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-[10px] tracking-widest text-neutral-500 uppercase">Current Access</p>
                                <p className="text-sm text-white font-light tracking-tighter">{auth.user.name}</p>
                            </div>
                        </div>

                        {/* SECTION RANG */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            <div className="lg:col-span-7 relative group">
                                <div className="relative bg-[#0F0F0F] border border-white/5 aspect-[4/3] md:aspect-[16/7] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
                                    <h2 className="text-4xl md:text-8xl font-extralight tracking-[0.2em] text-white uppercase text-center">
                                        {userRank.split(' ')[0]}
                                        <span className="block text-base md:text-2xl mt-2 md:mt-4 tracking-[0.4em] md:tracking-[0.8em] text-neutral-500 font-thin">
                                            {userRank.split(' ')[1] || 'CITIZEN'}
                                        </span>
                                    </h2>
                                </div>
                            </div>

                            <div className="lg:col-span-5 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xs tracking-[0.3em] text-white uppercase font-semibold">Privileges</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed font-light">
                                        Your standing within the Weva ecosystem grants you entry to high-tier customization modules and priority rendering.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                                    <div>
                                        <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1">XP Score</p>
                                        <p className="text-lg text-white font-light">12,400</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1">Global Standing</p>
                                        <p className="text-lg text-white font-light">#042</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER TEXTURE */}
                        <div className="pt-12 opacity-10 hidden md:block">
                            <p className="text-[12vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent leading-none">
                                WEVA VIP
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}