import ClientLayout from '@/layouts/client-layout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Clock, Copy, Home, Loader2, Package } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const TIMEOUT_SECONDS = 15 * 60; // 15 minutes
const POLL_INTERVAL   = 10000;   // 10 secondes

export default function Pending({ order, merchantAddress, qrUri }) {
    const [status, setStatus]       = useState('polling'); // polling | confirmed | timeout
    const [remaining, setRemaining] = useState(TIMEOUT_SECONDS);
    const [copied, setCopied]       = useState(false);
    const pollRef                   = useRef(null);
    const countdownRef              = useRef(null);

    useEffect(() => {
        // Countdown
        countdownRef.current = setInterval(() => {
            setRemaining((s) => {
                if (s <= 1) {
                    clearInterval(countdownRef.current);
                    clearInterval(pollRef.current);
                    setStatus('timeout');
                    return 0;
                }
                return s - 1;
            });
        }, 1000);

        // Polling Etherscan via backend
        const poll = async () => {
            try {
                const res  = await fetch(`/api/check-payment/${order.order_number}`);
                const data = await res.json();
                if (data.status === 'confirmed') {
                    clearInterval(pollRef.current);
                    clearInterval(countdownRef.current);
                    setStatus('confirmed');
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 1500);
                }
            } catch {}
        };

        poll(); // premier check immédiat
        pollRef.current = setInterval(poll, POLL_INTERVAL);

        return () => {
            clearInterval(pollRef.current);
            clearInterval(countdownRef.current);
        };
    }, []);

    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');

    return (
        <ClientLayout>
            <Head title="Paiement en attente — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] px-6 pt-24 pb-20">
                <div className="mx-auto max-w-lg space-y-8">

                    {/* Header */}
                    <div className="space-y-4 text-center">
                        <div className={`mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                            status === 'confirmed' ? 'bg-green-500' : 'bg-orange-500'
                        }`}>
                            {status === 'confirmed'
                                ? <CheckCircle className="h-8 w-8 stroke-[1.5] text-white" />
                                : <Clock className="h-8 w-8 stroke-[1.5] text-white" />
                            }
                        </div>

                        {status === 'confirmed' ? (
                            <>
                                <h1 className="text-3xl font-semibold tracking-tight text-black uppercase">
                                    Paiement confirmé !
                                </h1>
                                <p className="text-[11px] text-gray-400">Redirection en cours…</p>
                            </>
                        ) : status === 'timeout' ? (
                            <>
                                <h1 className="text-3xl font-semibold tracking-tight text-black uppercase">
                                    Délai expiré
                                </h1>
                                <p className="text-[11px] text-gray-400">
                                    Nous n'avons pas détecté de paiement. Contactez-nous si vous avez déjà payé.
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-3xl font-semibold tracking-tight text-black uppercase">
                                    En attente de paiement
                                </h1>
                                <p className="text-[11px] font-bold tracking-[0.3em] text-gray-400 uppercase">
                                    Réf. <span className="text-black">{order.order_number}</span>
                                </p>
                            </>
                        )}
                    </div>

                    {/* QR Code + polling */}
                    {status === 'polling' && (
                        <div className="border border-orange-100 bg-white p-6">
                            {qrUri && (
                                <div className="mb-6 flex flex-col items-center gap-4">
                                    <div className="border border-gray-100 p-4">
                                        <QRCodeSVG
                                            value={qrUri}
                                            size={200}
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                            level="M"
                                        />
                                    </div>
                                    <p className="text-center text-[10px] text-gray-500">
                                        Scannez avec <strong>MetaMask Mobile</strong>, <strong>Trust Wallet</strong>, <strong>Coinbase Wallet</strong>…
                                    </p>
                                    {merchantAddress && (
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] text-gray-500">
                                                {merchantAddress.slice(0, 8)}…{merchantAddress.slice(-6)}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(merchantAddress);
                                                    setCopied(true);
                                                    setTimeout(() => setCopied(false), 2000);
                                                }}
                                                className="text-gray-400 hover:text-black"
                                            >
                                                {copied
                                                    ? <CheckCircle className="h-3 w-3 text-green-500" />
                                                    : <Copy className="h-3 w-3" />
                                                }
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="border-t border-gray-100 pt-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-orange-500">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-[11px] font-semibold">Détection automatique en cours…</span>
                                </div>
                                <div className="mt-3 font-mono text-3xl font-black tracking-widest text-black">
                                    {minutes}:{seconds}
                                </div>
                                <p className="mt-1 text-[9px] uppercase tracking-widest text-gray-400">
                                    Temps restant
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Infos commande */}
                    <div className="border border-gray-100 bg-white p-5 space-y-3">
                        <p className="text-[9px] font-bold tracking-[0.3em] text-gray-400 uppercase">Détails</p>
                        <div className="flex justify-between text-[11px]">
                            <span className="text-gray-500">Montant</span>
                            <span className="font-bold">{order.total} €</span>
                        </div>
                        {order.eth_amount && (
                            <div className="flex justify-between text-[11px]">
                                <span className="text-gray-500">≈ ETH</span>
                                <span className="font-bold text-orange-500">{order.eth_amount} ETH</span>
                            </div>
                        )}
                        <div className="flex justify-between text-[11px]">
                            <span className="text-gray-500">Wallet destinataire</span>
                            <span className="font-mono text-[10px] text-gray-600">
                                {order.merchant_address
                                    ? `${order.merchant_address.slice(0,6)}…${order.merchant_address.slice(-4)}`
                                    : '0x325C…818E'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="flex flex-1 items-center justify-center gap-2 border border-gray-200 bg-white py-3 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:border-black"
                        >
                            <Home className="h-3 w-3" />
                            Accueil
                        </Link>
                        <Link
                            href="/dashboard/orders"
                            className="flex flex-1 items-center justify-center gap-2 bg-black py-3 text-[10px] font-black tracking-[0.3em] text-white uppercase transition-colors hover:bg-zinc-800"
                        >
                            <Package className="h-3 w-3" />
                            Mes commandes
                        </Link>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
