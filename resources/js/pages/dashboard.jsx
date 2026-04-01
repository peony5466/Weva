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
            case 'completed':
                return 'text-emerald-400 bg-emerald-400/10';
            case 'pending':
                return 'text-amber-400 bg-amber-400/10';
            case 'failed':
                return 'text-red-400 bg-red-400/10';
            default:
                return 'text-white/40 bg-white/5';
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

            <div className="min-h-screen bg-[#050505] p-6 text-white md:p-10">
                {/* HEADER */}
                <header className="fade-up flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end">
                    <div>
                        <span className="mb-3 block text-[10px] font-black tracking-[0.6em] text-white/25 uppercase">WEVA · Admin Panel</span>
                        <h1 className="bg-gradient-to-br from-white via-white/70 to-white/30 bg-clip-text text-5xl leading-none font-black tracking-tighter text-transparent italic md:text-7xl">
                            System
                            <br />
                            Control
                        </h1>
                    </div>
                </header>

                {/* STAT CARDS */}
                <div className="mt-10 mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((stat, i) => (
                        <div
                            key={i}
                            className="fade-up group relative overflow-hidden border border-white/5 bg-[#0D0D0D] p-8 transition-all hover:border-white/20"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="shimmer-bar absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100" />

                            <p className="mb-6 text-[10px] font-bold tracking-[0.5em] text-white/30 uppercase">// {stat.label}</p>
                            <p className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-3xl font-black tracking-tight text-transparent italic md:text-4xl">
                                {stat.value}
                            </p>
                            <p className="mt-3 text-[10px] tracking-widest text-white/20">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* RECENT ORDERS TABLE */}
                <section className="fade-up" style={{ animationDelay: '350ms' }}>
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xs font-black tracking-[0.4em] text-white/40 uppercase">// Dernières commandes</h2>
                        <Link
                            href="/dashboard/admin/orders"
                            className="text-[10px] tracking-widest text-white/30 uppercase transition-colors hover:text-white"
                        >
                            Voir tout →
                        </Link>
                    </div>

                    <div className="overflow-hidden border border-white/5">
                        {/* Table header */}
                        <div className="grid grid-cols-5 gap-4 border-b border-white/5 bg-white/3 px-6 py-3">
                            {['Client', 'Montant', 'Tokens', 'Statut', 'Date'].map((h) => (
                                <span key={h} className="text-[9px] font-bold tracking-[0.5em] text-white/25 uppercase">
                                    {h}
                                </span>
                            ))}
                        </div>

                        {logs.length === 0 ? (
                            <div className="px-6 py-16 text-center text-xs tracking-widest text-white/20 uppercase">
                                Aucune commande pour l'instant
                            </div>
                        ) : (
                            logs.map((log, i) => (
                                <div
                                    key={log.id}
                                    className="grid grid-cols-5 gap-4 border-b border-white/5 px-6 py-4 transition-colors hover:bg-white/2"
                                    style={{ animationDelay: `${400 + i * 40}ms` }}
                                >
                                    <span className="truncate text-sm font-medium text-white/70">{log.user}</span>
                                    <span className="text-sm font-black text-white">€{Number(log.amount).toFixed(2)}</span>
                                    <span className="text-sm text-white/40">{log.points > 0 ? `${log.points} WT` : '—'}</span>
                                    <span>
                                        <span
                                            className={`rounded-sm px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${statusColor(log.status)}`}
                                        >
                                            {log.status}
                                        </span>
                                    </span>
                                    <span className="font-mono text-xs text-white/30">{log.date}</span>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
