import ClientLayout from '@/layouts/client-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ethers } from 'ethers';
import { Bitcoin, CreditCard, Mail, MapPin, ShieldCheck, Tag, Wallet } from 'lucide-react';
import { useState } from 'react';

const CryptoIcons = () => (
    <div className="flex items-center gap-2">
        {['ETH'].map((coin) => (
            <span
                key={coin}
                className="rounded border border-gray-200 bg-[#faf8f4] px-2 py-0.5 text-[9px] font-bold tracking-wider text-gray-500"
            >
                {coin}
            </span>
        ))}
        <span className="text-[9px] text-gray-400">via MetaMask</span>
    </div>
);

const PAYMENT_METHODS = [
    {
        id: 'stripe',
        label: 'Carte bancaire',
        sublabel: 'Visa, Mastercard, Amex — via Stripe',
        icon: <CreditCard className="h-4 w-4" />,
        badge: 'CB',
        badgeBg: 'bg-black',
    },
    {
        id: 'crypto',
        label: 'Cryptomonnaie',
        sublabel: 'Payer en ETH via MetaMask',
        icon: <Bitcoin className="h-4 w-4" />,
        badge: '₿',
        badgeBg: 'bg-orange-500',
    },
    {
        id: 'points',
        label: 'Points WT',
        sublabel: 'Payer avec vos tokens WEVA (produits exclusifs)',
        icon: <Wallet className="h-4 w-4" />,
        badge: 'WT',
        badgeBg: 'bg-amber-500',
    },
];

const CRYPTO_STATUS_LABELS = {
    idle: null,
    connecting: 'Connexion à MetaMask…',
    fetching_price: 'Récupération du prix ETH…',
    waiting: 'En attente de confirmation dans MetaMask…',
    confirming: 'Transaction en cours de confirmation…',
    error: 'Erreur — réessayez',
};

export default function Checkout() {
    const { auth, cart, cartTotal = 0, merchantEthAddress = '' } = usePage().props;
    const user = auth?.user;
    const items = Object.values(cart || {});

    const [selectedMethod, setSelectedMethod] = useState('stripe');
    const [cryptoStatus, setCryptoStatus] = useState('idle');
    const [cryptoError, setCryptoError] = useState('');
    const [ethAmount, setEthAmount] = useState(null);

    const fiatTotal =
        cartTotal ||
        items.reduce((acc, item) => {
            if (item.is_exclusive || item.wt_price > 0) return acc;
            return acc + item.price * item.quantity;
        }, 0);

    const wtTotal = items.reduce((acc, item) => {
        if (item.is_exclusive || item.wt_price > 0) {
            return acc + (item.wt_price || 0) * item.quantity;
        }
        return acc;
    }, 0);

    const pointsToEarn = Math.floor(fiatTotal);
    const finalTotal = fiatTotal;

    const { data, setData, post, processing, errors } = useForm({
        email: user?.email || '',
        address: '',
        payment_method: 'stripe',
        tx_hash: '',
    });

    const handleMethodSelect = (id) => {
        setSelectedMethod(id);
        setData('payment_method', id);
        setCryptoStatus('idle');
        setCryptoError('');
        setEthAmount(null);
    };

    const handleMetaMaskPayment = async () => {
        if (!window.ethereum) {
            setCryptoError("MetaMask non détecté. Installez l'extension MetaMask dans votre navigateur.");
            return;
        }
        if (!merchantEthAddress) {
            setCryptoError('Adresse wallet marchande non configurée.');
            return;
        }
        if (!data.address) {
            setCryptoError('Veuillez renseigner votre adresse de livraison.');
            return;
        }

        try {
            setCryptoError('');
            setCryptoStatus('connecting');

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();

            setCryptoStatus('fetching_price');
            const res = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur'
            );
            const priceData = await res.json();
            const ethPriceInEur = priceData.ethereum.eur;
            const eth = Math.max(finalTotal, 0.01) / ethPriceInEur;
            const ethFormatted = eth.toFixed(8);
            setEthAmount(ethFormatted);

            setCryptoStatus('waiting');
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const from = accounts[0];
            const valueHex = '0x' + BigInt(Math.round(parseFloat(ethFormatted) * 1e18)).toString(16);

            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from,
                    to: merchantEthAddress,
                    value: valueHex,
                    gas: '0x5208', // 21000 gas fixe pour un transfer ETH
                }],
            });

            setCryptoStatus('confirming');

            // Soumettre la commande avec le hash de transaction
            router.post(route('orders.store'), {
                email: data.email,
                address: data.address,
                payment_method: 'crypto',
                tx_hash: txHash,
            }, {
                onError: (err) => {
                    setCryptoError('Erreur lors de la confirmation de commande.');
                    setCryptoStatus('error');
                    console.error(err);
                },
            });
        } catch (err) {
            console.error('MetaMask error:', err);
            if (err.code === 4001) {
                setCryptoError('Transaction refusée dans MetaMask.');
            } else {
                setCryptoError(err.message || 'Erreur MetaMask.');
            }
            setCryptoStatus('error');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedMethod === 'crypto') {
            handleMetaMaskPayment();
            return;
        }
        post(route('orders.store'), {
            preserveScroll: true,
            onError: (err) => console.error('Checkout error:', err),
        });
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return '/storage/' + path.replace(/^storage\//, '');
    };

    const submitLabel = () => {
        if (cryptoStatus === 'connecting') return 'Connexion MetaMask…';
        if (cryptoStatus === 'fetching_price') return 'Récupération prix ETH…';
        if (cryptoStatus === 'waiting') return 'Confirmez dans MetaMask…';
        if (cryptoStatus === 'confirming') return 'Confirmation en cours…';
        if (processing) return 'Traitement…';

        const amountStr = fiatTotal > 0 ? `${finalTotal.toFixed(2)}€` : '';
        const wtStr = wtTotal > 0 ? `${wtTotal} WT` : '';
        const amount = [amountStr, wtStr].filter(Boolean).join(' / ');

        if (selectedMethod === 'crypto') return `Payer avec MetaMask${ethAmount ? ` · ${ethAmount} ETH` : ''}`;
        if (selectedMethod === 'points') return `Payer avec mes Points WT${wtStr ? ` · ${wtStr}` : ''}`;
        return `Payer ${amount}`;
    };

    const isCryptoLoading = ['connecting', 'fetching_price', 'waiting', 'confirming'].includes(cryptoStatus);

    return (
        <ClientLayout>
            <Head title="Checkout — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mb-12">
                        <p className="mb-2 text-[9px] font-bold tracking-[0.4em] text-gray-400 uppercase">
                            WEVA · Finaliser ma commande
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-black uppercase">Checkout</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            {/* ── GAUCHE ── */}
                            <div className="space-y-6 lg:col-span-7">
                                {!user && (
                                    <div className="border border-gray-100 bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <h2 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
                                                Contact
                                            </h2>
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="votre@email.com"
                                            required
                                            className="w-full border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide transition-colors focus:border-black focus:outline-none"
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-[10px] text-red-500">{errors.email}</p>
                                        )}
                                    </div>
                                )}

                                <div className="border border-gray-100 bg-white p-6">
                                    <div className="mb-4 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <h2 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
                                            Adresse de livraison
                                        </h2>
                                    </div>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Numéro, rue, ville, code postal, pays"
                                        required
                                        rows={3}
                                        className="w-full resize-none border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide transition-colors focus:border-black focus:outline-none"
                                    />
                                    {errors.address && (
                                        <p className="mt-2 text-[10px] text-red-500">{errors.address}</p>
                                    )}
                                </div>

                                {user && (
                                    <div className="border border-gray-100 bg-white p-5">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            <h3 className="text-[10px] font-black tracking-[0.3em] uppercase">
                                                Tokens WEVA
                                            </h3>
                                        </div>
                                        <p className="text-[12px] font-semibold text-black">
                                            {user.points || 0} tokens
                                        </p>
                                        <p className="mt-0.5 text-[10px] text-gray-400">
                                            1€ dépensé = 1 token gagné
                                        </p>
                                    </div>
                                )}

                                {/* Méthodes de paiement */}
                                <div className="border border-gray-100 bg-white p-6">
                                    <h2 className="mb-4 text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
                                        Méthode de paiement
                                    </h2>

                                    <div className="space-y-3">
                                        {PAYMENT_METHODS.map((method) => {
                                            const isSelected = selectedMethod === method.id;
                                            const isDisabled = method.id === 'points' && wtTotal === 0;

                                            return (
                                                <button
                                                    key={method.id}
                                                    type="button"
                                                    disabled={isDisabled}
                                                    onClick={() => !isDisabled && handleMethodSelect(method.id)}
                                                    className={`w-full border p-4 text-left transition-all ${
                                                        isDisabled
                                                            ? 'cursor-not-allowed border-gray-100 bg-gray-50 opacity-40'
                                                            : isSelected
                                                              ? 'border-black bg-black text-white'
                                                              : 'border-gray-100 bg-[#faf8f4] hover:border-gray-300'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${
                                                                isSelected ? 'bg-white text-black' : `${method.badgeBg} text-white`
                                                            }`}
                                                        >
                                                            <span className="text-[9px] font-black">{method.badge}</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={`text-[12px] font-semibold ${isSelected ? 'text-white' : 'text-black'}`}>
                                                                {method.label}
                                                            </p>
                                                            <p className={`text-[10px] ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                                                                {method.sublabel}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                                                                isSelected ? 'border-white bg-white' : 'border-gray-300 bg-white'
                                                            }`}
                                                        >
                                                            {isSelected && (
                                                                <div className="m-auto mt-0.5 h-2 w-2 rounded-full bg-black" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {method.id === 'crypto' && isSelected && (
                                                        <div className="mt-3 border-t border-gray-700 pt-3">
                                                            <CryptoIcons />
                                                            <p className="mt-2 text-[9px] text-gray-400">
                                                                MetaMask s'ouvrira pour confirmer le paiement en ETH. Taux en temps réel via CoinGecko.
                                                            </p>
                                                        </div>
                                                    )}

                                                    {method.id === 'points' && isSelected && wtTotal > 0 && (
                                                        <div className="mt-3 border-t border-gray-700 pt-3">
                                                            <p className="text-[10px] text-amber-400">
                                                                {wtTotal} WT seront déduits de votre solde
                                                            </p>
                                                            <p className="mt-1 text-[9px] text-gray-400">
                                                                Votre solde actuel : {user?.points || 0} WT
                                                            </p>
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Status MetaMask */}
                                    {selectedMethod === 'crypto' && cryptoStatus !== 'idle' && (
                                        <div className={`mt-4 rounded p-3 text-[10px] font-bold tracking-wide ${
                                            cryptoStatus === 'error'
                                                ? 'bg-red-50 text-red-600'
                                                : 'bg-orange-50 text-orange-600'
                                        }`}>
                                            {cryptoStatus === 'error' ? cryptoError : CRYPTO_STATUS_LABELS[cryptoStatus]}
                                        </div>
                                    )}

                                    {errors.payment_method && (
                                        <p className="mt-2 text-[10px] text-red-500">{errors.payment_method}</p>
                                    )}
                                </div>
                            </div>

                            {/* ── DROITE — Récap ── */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-28 border border-gray-100 bg-white p-6">
                                    <h2 className="mb-6 border-b border-gray-100 pb-4 text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
                                        Récapitulatif
                                    </h2>

                                    <div className="mb-6 space-y-4">
                                        {items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="h-12 w-12 shrink-0 overflow-hidden bg-[#f8f7f4]">
                                                    {item.image ? (
                                                        <img
                                                            src={getImageUrl(item.image)}
                                                            alt={item.name}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-[7px] font-bold text-gray-300">
                                                            WEVA
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-[11px] font-semibold tracking-wide uppercase">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-[9px] tracking-wide text-gray-400 uppercase">
                                                        {item.variant || 'Unique'} · Qté {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="shrink-0 text-[12px] font-bold">
                                                    {item.wt_price > 0 ? (
                                                        <>
                                                            <span className="text-gray-500">
                                                                {(item.price * item.quantity).toFixed(2)}€
                                                            </span>
                                                            <span className="ml-2 text-amber-600">
                                                                ({item.wt_price * item.quantity} WT)
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span>{(item.price * item.quantity).toFixed(2)}€</span>
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 border-t border-gray-100 pt-4">
                                        {fiatTotal > 0 && (
                                            <div className="flex justify-between text-[11px] text-gray-500">
                                                <span>Sous-total</span>
                                                <span>{fiatTotal.toFixed(2)}€</span>
                                            </div>
                                        )}
                                        {wtTotal > 0 && (
                                            <div className="flex justify-between text-[11px] font-bold text-amber-600">
                                                <span>WT Total</span>
                                                <span>{wtTotal} WT</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-[11px] text-gray-500">
                                            <span>Livraison</span>
                                            <span className="font-semibold text-green-600">Gratuite</span>
                                        </div>
                                        {selectedMethod === 'crypto' && ethAmount && (
                                            <div className="flex justify-between text-[11px] font-bold text-orange-500">
                                                <span>≈ en ETH</span>
                                                <span>{ethAmount} ETH</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-[11px] text-gray-500">
                                            <span>Paiement</span>
                                            <span className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                                selectedMethod === 'crypto'
                                                    ? 'bg-orange-100 text-orange-600'
                                                    : selectedMethod === 'points'
                                                      ? 'bg-amber-100 text-amber-600'
                                                      : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {selectedMethod === 'crypto' ? 'MetaMask' : selectedMethod === 'points' ? 'Points WT' : 'Stripe'}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-black text-black">
                                            <span>Total</span>
                                            <span>
                                                {fiatTotal > 0 && <span>{finalTotal.toFixed(2)}€</span>}
                                                {wtTotal > 0 && fiatTotal > 0 && <span className="mx-2">/</span>}
                                                {wtTotal > 0 && <span className="text-amber-600">{wtTotal} WT</span>}
                                            </span>
                                        </div>
                                        <p className="text-right text-[9px] text-gray-400">
                                            +{pointsToEarn} tokens après commande
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing || items.length === 0 || isCryptoLoading}
                                        className={`mt-6 w-full py-4 text-[11px] font-black tracking-[0.4em] uppercase transition-all ${
                                            processing || items.length === 0 || isCryptoLoading
                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                                : selectedMethod === 'crypto'
                                                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                  : selectedMethod === 'points'
                                                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                                                    : 'bg-black text-white hover:bg-zinc-800'
                                        }`}
                                    >
                                        {submitLabel()}
                                    </button>

                                    <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
                                        <ShieldCheck className="h-3 w-3" />
                                        <span className="text-[8px] font-bold tracking-[0.3em] uppercase">
                                            Paiement sécurisé SSL
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </ClientLayout>
    );
}
