import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Clock, Coins, ShoppingBag } from 'lucide-react';

export default function WevaVip({ progress = {}, recentOrders = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const points = progress.points ?? user?.points ?? 0;
    const totalSpent = progress.total_spent ?? user?.total_spent ?? 0;
    const eligible = progress.eligible ?? points >= 250;
    const pct = progress.progress_percent ?? Math.min(100, Math.round((points / 250) * 100));
    const needed = progress.points_needed ?? Math.max(0, 250 - points);

    const getInitials = (name) => {
        if (!name) return 'W';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="min-h-screen bg-[#0A0A0A] text-white">
                <Head title="VIP — WEVA" />

                {/* Header Mobile Sticky */}
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-white/5 bg-[#0A0A0A]/80 px-4 backdrop-blur-sm md:hidden">
                    <SidebarTrigger className="text-white" />
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">VIP Protocol</span>
                </header>

                <div className="flex flex-col font-sans selection:bg-white selection:text-black">
                    <div className="mx-auto w-full max-w-[1400px] space-y-12 p-6 md:p-8 lg:space-y-20 lg:p-16">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="mb-2 text-[9px] font-bold tracking-[0.4em] text-neutral-400 uppercase">WEVA · Espace membre</p>
                                <h1 className="text-3xl font-semibold tracking-tight text-white uppercase">
                                    Bienvenue, {user?.name?.split(' ')[0] || 'Client'}
                                </h1>
                            </div>

                            {/* Avatar */}
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-black text-black">
                                {getInitials(user?.name)}
                            </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {[
                                { label: 'Tokens', value: points, accent: '#fff', sub: '1€ = 1 token' },
                                {
                                    label: 'Total dépensé',
                                    value: `${parseFloat(totalSpent || 0).toFixed(0)}€`,
                                    accent: '#fff',
                                    sub: 'depuis le début',
                                },
                                {
                                    label: 'Cashback',
                                    value: eligible ? '-15%' : '0%',
                                    accent: eligible ? '#16a34a' : '#9ca3af',
                                    sub: eligible ? 'actif' : `${needed} tokens restants`,
                                },
                                { label: 'Commandes', value: recentOrders.length, accent: '#fff', sub: 'récentes' },
                            ].map((s) => (
                                <div key={s.label} className="border border-white/10 bg-[#111] p-5">
                                    <p className="mb-2 text-[8px] font-bold tracking-[0.25em] text-neutral-400 uppercase">{s.label}</p>
                                    <p className="text-2xl font-black" style={{ color: s.accent }}>
                                        {s.value}
                                    </p>
                                    <p className="mt-1 text-[9px] text-neutral-500">{s.sub}</p>
                                </div>
                            ))}
                        </div>


                        {/* Raccourcis */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {[
                                { icon: ShoppingBag, label: 'Mes commandes', href: '/dashboard/orders', sub: 'Historique & suivi' },
                                // { icon: Coins, label: 'Mes tokens', href: route('tokens.my-wallet'), sub: 'Solde & transactions' },
                                { icon: Clock, label: 'La boutique', href: route('shop.index'), sub: 'Nouveaux arrivages' },
                            ].map(({ icon: Icon, label, href, sub }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="group flex items-start gap-4 border border-white/10 bg-[#111] p-5 transition-colors hover:border-white/30"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#222] transition-colors group-hover:bg-white">
                                        <Icon className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-black" />
                                    </div>
                                    <div>
                                        <p className="mb-0.5 text-[11px] font-black tracking-wide text-white uppercase">{label}</p>
                                        <p className="text-[10px] text-neutral-500">{sub}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>



                        {recentOrders.length === 0 && (
                            <div className="border border-white/10 bg-[#111] p-12 text-center">
                                <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-neutral-700" />
                                <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                                    Aucune commande pour l'instant
                                </p>
                                <Link
                                    href={route('shop.index')}
                                    className="inline-block bg-white px-8 py-3 text-[10px] font-black tracking-[0.3em] text-black uppercase transition-colors hover:bg-neutral-200"
                                >
                                    Découvrir la collection
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
