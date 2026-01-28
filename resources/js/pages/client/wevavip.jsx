import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Head, Link } from '@inertiajs/react';

export default function WevaVip({ auth }) {
    const userRank = auth.user.rank || 'ELITE COLLECTOR';

    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset className="bg-[#0A0A0A]">
                <Head title="VIP STATUS — WEVA" />

                <div className="flex flex-col min-h-screen font-sans selection:bg-white selection:text-black">
                    <div className="p-8 lg:p-16 max-w-[1600px] mx-auto w-full space-y-24">

                        {/* HEADER MINIMALISTE */}
                        <header className="flex justify-between items-end border-b border-white/10 pb-6">
                            <div className="space-y-1">
                                <span className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">
                                    Membership / 001
                                </span>
                                <h1 className="text-2xl font-light tracking-[0.2em] text-white uppercase">
                                    VIP Protocol
                                </h1>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] tracking-widest text-neutral-500 uppercase">Current Access</p>
                                <p className="text-sm text-white font-light tracking-tighter">Level Restricted — {auth.user.name}</p>
                            </div>
                        </header>

                        {/* SECTION RANG - STYLE EXPOSITION */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                            {/* Visual Rank Display */}
                            <div className="lg:col-span-7 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative bg-[#0F0F0F] border border-white/5 aspect-[16/7] flex flex-col items-center justify-center p-12 overflow-hidden">
                                    <span className="absolute top-4 left-4 text-[8px] text-neutral-600 tracking-[0.4em] uppercase font-mono italic">Identification System</span>

                                    <h2 className="text-6xl md:text-8xl font-extralight tracking-[0.3em] text-white uppercase text-center">
                                        {userRank.split(' ')[0]}
                                        <span className="block text-xl md:text-2xl mt-4 tracking-[0.8em] text-neutral-500 font-thin">
                                            {userRank.split(' ')[1] || 'CITIZEN'}
                                        </span>
                                    </h2>

                                    <div className="absolute bottom-8 w-1/2 h-[1px] bg-neutral-800">
                                        <div className="h-full bg-white w-[65%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Details & Description */}
                            <div className="lg:col-span-5 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xs tracking-[0.3em] text-white uppercase font-semibold">Privileges</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed font-light tracking-wide">
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

                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-4 text-[10px] tracking-[0.4em] text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500 uppercase group"
                                >
                                    Return to Nexus
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* FOOTER TEXTURE */}
                        <div className="pt-24 opacity-20">
                            <p className="text-[12vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent leading-none select-none">
                                WEVA VIP
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}