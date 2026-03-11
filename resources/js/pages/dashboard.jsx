import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [{ title: 'System Dashboard', href: '/dashboard' }];

export default function Dashboard({ stats, logs }) {

    const statCards = [
        {
            label: 'Citizens',
            value: stats.citizens.toLocaleString(),
            sub: 'Active_Nodes',
        },
        {
            label: 'Fiat Sales',
            value: `€${Number(stats.fiat_sales).toLocaleString()}`,
            sub: 'Euro_Revenue',
        },
        {
            label: 'WT Sales',
            value: `${Number(stats.wt_sales).toLocaleString()} WT`,
            sub: 'Vault_Credits',
        },
    ];

    const statusColor = (status) => {
        switch (status) {
            case 'completed': return '#00ff88';
            case 'pending': return '#ffaa00';
            case 'failed': return '#ff4444';
            default: return '#ffffff';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Dashboard" />

            <style>{`
                @keyframes shimmer {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(200%);  }
                }
                .shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>

            <div
                style={{ backgroundColor: '#050505', color: '#ffffff' }}
                className="flex flex-col gap-12 p-8 min-h-screen overflow-hidden"
            >

                {/* ── HEADER ── */}
                <header
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-10"
                >
                    <div>
                        <span
                            style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.6em' }}
                            className="text-xs uppercase font-black italic block mb-2"
                        >
                            Unit_Protocol
                        </span>

                        <h1
                            style={{
                                fontSize: '5rem',
                                fontWeight: 900,
                                lineHeight: 1,
                                letterSpacing: '-0.05em',
                                background: 'linear-gradient(135deg, #ffffff, #888888, #eeeeee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontStyle: 'italic',
                                transform: 'skewX(-10deg)',
                                display: 'inline-block',
                            }}
                        >
                            System<br />Control
                        </h1>
                    </div>

                    {/* Badge */}
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #ffffff, #888888, #eeeeee)',
                            transform: 'skewX(-15deg)',
                            borderRight: '4px solid white',
                            boxShadow: '0 0 40px rgba(255,255,255,0.15)',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                        className="px-10 py-4"
                    >
                        <p
                            style={{
                                color: '#000000',
                                letterSpacing: '0.4em',
                                transform: 'skewX(15deg)',
                                fontStyle: 'italic',
                            }}
                            className="text-xs font-black uppercase relative z-10"
                        >
                            System_Online
                        </p>
                        <div
                            className="shimmer"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                            }}
                        />
                    </div>
                </header>

                {/* ── STAT CARDS ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {statCards.map((stat, i) => (
                        <div
                            key={i}
                            style={{
                                backgroundColor: '#0D0D0D',
                                border: '1px solid rgba(255,255,255,0.05)',
                                transform: 'skewX(-5deg)',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'border-color 0.3s',
                            }}
                            className="p-12"
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'white';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                            }}
                        >
                            {/* Corner line */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '8rem',
                                height: '1px',
                                background: 'linear-gradient(to right, transparent, white)',
                                opacity: 0.5,
                            }} />

                            <div style={{ transform: 'skewX(5deg)' }}>
                                <p
                                    style={{
                                        color: 'rgba(255,255,255,0.3)',
                                        letterSpacing: '0.5em',
                                        fontSize: '10px',
                                        fontStyle: 'italic',
                                        marginBottom: '2rem',
                                    }}
                                    className="uppercase font-bold"
                                >
                                    // {stat.label}
                                </p>

                                <p
                                    style={{
                                        fontSize: '3.5rem',
                                        fontWeight: 900,
                                        letterSpacing: '-0.05em',
                                        fontStyle: 'italic',
                                        background: 'linear-gradient(180deg, #ffffff, #999999, #444444)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {stat.value}
                                </p>

                                <p style={{
                                    color: 'rgba(255,255,255,0.2)',
                                    fontSize: '10px',
                                    letterSpacing: '0.4em',
                                    marginTop: '0.5rem',
                                    fontStyle: 'italic',
                                }}>
                                    {stat.sub}
                                </p>

                                <div style={{
                                    marginTop: '1.5rem',
                                    height: '1px',
                                    width: '100%',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '33%',
                                        backgroundColor: 'white',
                                        boxShadow: '0 0 10px #fff',
                                    }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── LIVE FEED ── */}
                <section className="flex flex-col gap-4">
                    <div className="flex items-center gap-6">
                        <div style={{
                            height: '2px',
                            width: '3rem',
                            backgroundColor: 'white',
                            boxShadow: '0 0 10px #fff',
                        }} />
                        <h2
                            style={{ letterSpacing: '0.6em', color: 'white' }}
                            className="text-xs uppercase font-black italic"
                        >
                            Live_Secure_Feed
                        </h2>
                        <div style={{
                            height: '1px',
                            flex: 1,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        }} />
                    </div>

                    <div style={{
                        backgroundColor: '#080808',
                        border: '1px solid rgba(255,255,255,0.05)',
                    }}>
                        {/* Table header */}
                        <div
                            className="flex items-center gap-6 px-8 py-4"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            {['#', 'User', 'Amount', 'Currency', 'Status', 'Date'].map(h => (
                                <span
                                    key={h}
                                    style={{
                                        color: 'rgba(255,255,255,0.2)',
                                        fontSize: '10px',
                                        letterSpacing: '0.4em',
                                        flex: h === 'User' || h === 'Date' ? 2 : 1,
                                    }}
                                    className="uppercase font-black italic"
                                >
                                    {h}
                                </span>
                            ))}
                        </div>

                        {/* Rows */}
                        {logs && logs.length > 0 ? logs.map((log) => (
                            <div
                                key={log.id}
                                style={{
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    padding: '1.5rem 2rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'background-color 0.3s',
                                    cursor: 'default',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                {/* ID */}
                                <span style={{
                                    flex: 1,
                                    fontFamily: 'monospace',
                                    fontSize: '11px',
                                    color: 'rgba(255,255,255,0.2)',
                                }}>
                                    #{log.id}
                                </span>

                                {/* User */}
                                <span style={{
                                    flex: 2,
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    color: 'rgba(255,255,255,0.7)',
                                    letterSpacing: '0.1em',
                                }}>
                                    {log.user}
                                </span>

                                {/* Amount */}
                                <span style={{
                                    flex: 1,
                                    fontWeight: 700,
                                    fontStyle: 'italic',
                                    background: 'linear-gradient(90deg, #ffffff, #888888)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>
                                    {Number(log.amount).toLocaleString()}
                                </span>

                                {/* Currency */}
                                <span style={{
                                    flex: 1,
                                    fontSize: '10px',
                                    letterSpacing: '0.3em',
                                    color: 'rgba(255,255,255,0.4)',
                                    textTransform: 'uppercase',
                                    fontStyle: 'italic',
                                }}>
                                    {log.currency}
                                </span>

                                {/* Status */}
                                <span style={{
                                    flex: 1,
                                    fontSize: '10px',
                                    letterSpacing: '0.3em',
                                    color: statusColor(log.status),
                                    textTransform: 'uppercase',
                                    fontStyle: 'italic',
                                    fontWeight: 700,
                                }}>
                                    {log.status}
                                </span>

                                {/* Date */}
                                <span style={{
                                    flex: 2,
                                    fontFamily: 'monospace',
                                    fontSize: '11px',
                                    color: 'rgba(255,255,255,0.2)',
                                }}>
                                    {log.date}
                                </span>
                            </div>
                        )) : (
                            <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', letterSpacing: '0.3em' }}>
                                NO_DATA_STREAM
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}
