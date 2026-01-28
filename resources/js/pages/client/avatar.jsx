import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'; // On ajoute SidebarInset
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth }) {
    return (
        <SidebarProvider>
            {/* 1. La barre latérale à gauche */}
            <AppSidebar />

            {/* 2. Le conteneur à droite (SidebarInset) */}
            <SidebarInset className="bg-[#0A0A0A]">
                <Head title="Mon Compte" />

                {/* Tout ton contenu Figma va ici */}
                <div className="flex flex-col gap-4 p-4 min-h-screen">
                    <div className="p-8 max-w-7xl mx-auto space-y-10 w-full">

                        {/* 1. Bannière */}
                        <div className="bg-[#161616] border border-white/5 rounded-3xl p-10 relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase font-bold text-neutral-400">Workspace</span>
                                <h1 className="text-4xl font-medium mt-4 tracking-tight text-white">
                                    Welcome to your <br /> Weva account, {auth.user.name}
                                </h1>
                                <Link
                                    href={route('avatar')}
                                    className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition"
                                >
                                    Start To Personalize Your Avatar
                                </Link>
                            </div>
                        </div>

                        {/* 2. Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                            <div className="bg-[#161616] border border-white/5 p-6 rounded-2xl shadow-sm">
                                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-bold">Weva Tokens Owned</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-light text-white">10,0000</p>
                                    <span className="text-xs text-neutral-500 font-bold uppercase">WT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}