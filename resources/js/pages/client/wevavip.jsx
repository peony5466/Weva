import { Head, Link, usePage } from '@inertiajs/react';
import ClientLayout from '@/layouts/client-layout';
import { ShoppingBag, Coins, Clock, ChevronRight } from 'lucide-react';

export default function WevaVip({ progress = {}, recentOrders = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const points        = progress.points ?? user?.points ?? 0;
    const totalSpent    = progress.total_spent ?? user?.total_spent ?? 0;
    const eligible      = progress.eligible ?? (points >= 250);
    const pct           = progress.progress_percent ?? Math.min(100, Math.round(points / 250 * 100));
    const needed        = progress.points_needed ?? Math.max(0, 250 - points);

    const getInitials = (name) => {
        if (!name) return 'W';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <ClientLayout>
            <Head title="VIP — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-6 space-y-8">

                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">
                                WEVA · Espace membre
                            </p>
                            <h1 className="text-3xl font-semibold uppercase tracking-tight text-black">
                                Bienvenue, {user?.name?.split(' ')[0] || 'Client'}
                            </h1>
                        </div>

                        {/* Avatar */}
                        <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white text-lg font-black">
                            {getInitials(user?.name)}
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Tokens', value: points, accent: '#000', sub: '1€ = 1 token' },
                            { label: 'Total dépensé', value: `${parseFloat(totalSpent || 0).toFixed(0)}€`, accent: '#000', sub: 'depuis le début' },
                            { label: 'Cashback', value: eligible ? '-15%' : '0%', accent: eligible ? '#16a34a' : '#9ca3af', sub: eligible ? 'actif' : `${needed} tokens restants` },
                            { label: 'Commandes', value: recentOrders.length, accent: '#000', sub: 'récentes' },
                        ].map(s => (
                            <div key={s.label} className="bg-white border border-gray-100 p-5">
                                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-2">
                                    {s.label}
                                </p>
                                <p className="text-2xl font-black" style={{ color: s.accent }}>
                                    {s.value}
                                </p>
                                <p className="text-[9px] text-gray-400 mt-1">{s.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tokens progress */}
                    <div className="bg-white border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">
                                    Programme de fidélité
                                </p>
                                <p className="text-xl font-black text-black">
                                    {points} / 250 tokens
                                </p>
                            </div>
                            <Link
                                href={route('tokens.my-wallet')}
                                className="text-[9px] font-black uppercase tracking-[0.2em] text-black border-b border-black hover:opacity-60 transition-opacity flex items-center gap-1"
                            >
                                Voir détails <ChevronRight size={10} />
                            </Link>
                        </div>

                        {/* Barre */}
                        <div className="bg-gray-100 rounded-full h-2 overflow-hidden mb-3">
                            <div
                                className="h-full bg-black rounded-full transition-all duration-1000"
                                style={{ width: `${pct}%` }}
                            />
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[9px] text-gray-400 uppercase tracking-wide">
                                {pct}% vers le cashback
                            </span>
                            <span className="text-[9px] text-gray-400 uppercase tracking-wide">
                                {eligible ? '🎉 -15% actif !' : `encore ${needed} tokens`}
                            </span>
                        </div>

                        {eligible && (
                            <div className="mt-4 bg-black text-white p-4 flex items-center justify-between">
                                <p className="text-[11px] font-black uppercase tracking-[0.2em]">
                                    Cashback -15% activé
                                </p>
                                <p className="text-[11px] font-light text-gray-300">
                                    Appliqué automatiquement
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Raccourcis */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { icon: ShoppingBag, label: 'Mes commandes', href: '/dashboard/orders', sub: 'Historique & suivi' },
                            { icon: Coins, label: 'Mes tokens', href: route('tokens.my-wallet'), sub: 'Solde & transactions' },
                            { icon: Clock, label: 'La boutique', href: route('shop.index'), sub: 'Nouveaux arrivages' },
                        ].map(({ icon: Icon, label, href, sub }) => (
                            <Link
                                key={label}
                                href={href}
                                className="bg-white border border-gray-100 p-5 flex items-start gap-4 hover:border-black transition-colors group"
                            >
                                <div className="w-10 h-10 bg-[#f8f7f4] flex items-center justify-center shrink-0 group-hover:bg-black transition-colors">
                                    <Icon className="w-4 h-4 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-wide text-black mb-0.5">
                                        {label}
                                    </p>
                                    <p className="text-[10px] text-gray-400">{sub}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Commandes récentes */}
                    {recentOrders.length > 0 && (
                        <div className="bg-white border border-gray-100">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                    Commandes récentes
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {recentOrders.slice(0, 5).map(order => (
                                    <div key={order.id} className="flex items-center justify-between px-6 py-4">
                                        <div>
                                            <p className="text-[11px] font-semibold text-black">
                                                {order.order_number}
                                            </p>
                                            <p className="text-[9px] text-gray-400 uppercase tracking-wide mt-0.5">
                                                {new Date(order.created_at).toLocaleDateString('fr-FR')}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[12px] font-black">{parseFloat(order.total).toFixed(2)}€</p>
                                            <span className={`text-[8px] font-bold uppercase tracking-wide px-2 py-0.5 ${
                                                order.status === 'completed' ? 'bg-green-50 text-green-600' :
                                                order.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-gray-50 text-gray-500'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {recentOrders.length === 0 && (
                        <div className="bg-white border border-gray-100 p-12 text-center">
                            <ShoppingBag className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-4">
                                Aucune commande pour l'instant
                            </p>
                            <Link
                                href={route('shop.index')}
                                className="inline-block bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-3 hover:bg-zinc-800 transition-colors"
                            >
                                Découvrir la collection
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </ClientLayout>
    );
}
