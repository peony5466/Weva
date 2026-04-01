import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs = [{ title: 'Dashboard Admin', href: '/dashboard' }];

export default function Dashboard({ stats = {}, logs = [] }) {
    const statCards = [
        {
            label: 'Citizens',
            value: stats.citizens ?? 0,
            icon: '👥',
            sub: 'Membres enregistrés',
        },
        {
            label: 'Ventes totales',
            value: `€${Number(stats.total_sales ?? 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`,
            icon: '💶',
            sub: 'Commandes payées',
        },
        {
            label: 'WT Points utilisés',
            value: `${Number(stats.wt_sales ?? 0).toLocaleString()} WT`,
            icon: '🪙',
            sub: 'Tokens dépensés',
        },
        {
            label: 'Commandes',
            value: stats.orders ?? 0,
            icon: '📦',
            sub: `${stats.pending ?? 0} en attente`,
        },
    ];

    const statusColor = (status) => {
        switch (status) {
            case 'paid':
            case 'completed': return 'text-emerald-400 bg-emerald-400/10';
            case 'pending':   return 'text-amber-400 bg-amber-400/10';
            case 'failed':    return 'text-red-400 bg-red-400/10';
            default:          return 'text-white/40 bg-white/5';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin — WEVA" />

            <style>{`
                @keyframes shimmer {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(250%); }
                }
                .shimmer-bar { animation: shimmer 2.4s infinite; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fade-up { animation: fadeUp 0.5s ease both; }
            `}</style>

            <div className="bg-[#050505] text-white min-h-screen p-6 md:p-10">

                {/* HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-10 border-b border-white/10 fade-up">
                    <div>
                        <span className="text-[10px] uppercase font-black tracking-[0.6em] text-white/25 block mb-3">
                            WEVA · Admin Panel
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black italic leading-none tracking-tighter bg-gradient-to-br from-white via-white/70 to-white/30 bg-clip-text text-transparent">
                            System<br />Control
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href="/admin/products"
                            className="px-5 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-white/80 transition-colors"
                        >
                            Produits
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="px-5 py-2.5 border border-white/20 text-white text-xs font-black uppercase tracking-widest hover:border-white/60 transition-colors"
                        >
                            Commandes
                        </Link>
                    </div>
                </header>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-10 mb-12">
                    {statCards.map((stat, i) => (
                        <div
                            key={i}
                            className="fade-up p-8 bg-[#0D0D0D] border border-white/5 relative overflow-hidden hover:border-white/20 transition-all group"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="shimmer-bar absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100" />

                            <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold mb-6">
                                // {stat.label}
                            </p>
                            <p className="text-3xl md:text-4xl font-black italic tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                                {stat.value}
                            </p>
                            <p className="text-[10px] text-white/20 tracking-widest mt-3">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* RECENT ORDERS TABLE */}
                <section className="fade-up" style={{ animationDelay: '350ms' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xs uppercase tracking-[0.4em] font-black text-white/40">
                            // Dernières commandes
                        </h2>
                        <Link
                            href="/admin/orders"
                            className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                        >
                            Voir tout →
                        </Link>
                    </div>

                    <div className="border border-white/5 overflow-hidden">
                        {/* Table header */}
                        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-white/3 border-b border-white/5">
                            {['Client', 'Montant', 'Tokens', 'Statut', 'Date'].map(h => (
                                <span key={h} className="text-[9px] uppercase tracking-[0.5em] text-white/25 font-bold">{h}</span>
                            ))}
                        </div>

                        {logs.length === 0 ? (
                            <div className="px-6 py-16 text-center text-white/20 text-xs tracking-widest uppercase">
                                Aucune commande pour l'instant
                            </div>
                        ) : (
                            logs.map((log, i) => (
                                <div
                                    key={log.id}
                                    className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/2 transition-colors"
                                    style={{ animationDelay: `${400 + i * 40}ms` }}
                                >
                                    <span className="text-sm font-medium text-white/70 truncate">{log.user}</span>
                                    <span className="text-sm font-black text-white">
                                        €{Number(log.amount).toFixed(2)}
                                    </span>
                                    <span className="text-sm text-white/40">
                                        {log.points > 0 ? `${log.points} WT` : '—'}
                                    </span>
                                    <span>
                                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm ${statusColor(log.status)}`}>
                                            {log.status}
                                        </span>
                                    </span>
                                    <span className="text-xs text-white/30 font-mono">{log.date}</span>
                                </div>
                            ))
                        )}
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}
