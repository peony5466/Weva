import ClientLayout from '@/layouts/client-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ShieldCheck, MapPin, Mail, Tag } from 'lucide-react';

export default function Checkout() {
    const { auth, cart, cartTotal = 0 } = usePage().props;
    const user = auth?.user;
    const items = Object.values(cart || {});

    const fiatTotal = cartTotal || items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const pointsToEarn = Math.floor(fiatTotal);

    // Cashback si user a >= 250 tokens
    const hasCashback = user && (user.points || 0) >= 250;
    const discountAmount = hasCashback ? Math.round(fiatTotal * 0.15 * 100) / 100 : 0;
    const finalTotal = fiatTotal - discountAmount;

    const { data, setData, post, processing, errors } = useForm({
        email: user?.email || '',
        address: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'), {
            preserveScroll: true,
            onError: (err) => {
                console.error('Checkout error:', err);
            },
        });
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('images/products/')) return `/${path}`;
        return `/storage/${path}`;
    };

    return (
        <ClientLayout>
            <Head title="Checkout — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20">
                <div className="max-w-5xl mx-auto px-6">

                    {/* Header */}
                    <div className="mb-12">
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">
                            WEVA · Finaliser ma commande
                        </p>
                        <h1 className="text-3xl font-semibold uppercase tracking-tight text-black">
                            Checkout
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* ── GAUCHE ── */}
                            <div className="lg:col-span-7 space-y-6">

                                {/* Email (si non connecté) */}
                                {!user && (
                                    <div className="bg-white border border-gray-100 p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                                Contact
                                            </h2>
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="votre@email.com"
                                            required
                                            className="w-full border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide focus:border-black focus:outline-none transition-colors"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-[10px] mt-2">{errors.email}</p>
                                        )}
                                    </div>
                                )}

                                {/* Adresse */}
                                <div className="bg-white border border-gray-100 p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                            Adresse de livraison
                                        </h2>
                                    </div>
                                    <textarea
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        placeholder="Numéro, rue, ville, code postal, pays"
                                        required
                                        rows={3}
                                        className="w-full border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide focus:border-black focus:outline-none transition-colors resize-none"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-[10px] mt-2">{errors.address}</p>
                                    )}
                                </div>

                                {/* Cashback info */}
                                {user && (
                                    <div className={`border p-5 ${hasCashback ? 'bg-black text-white border-black' : 'bg-white border-gray-100'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Tag className="w-4 h-4" />
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">
                                                Tokens WEVA
                                            </h3>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className={`text-[12px] font-semibold ${hasCashback ? 'text-white' : 'text-black'}`}>
                                                    {user.points || 0} tokens
                                                </p>
                                                <p className={`text-[10px] mt-0.5 ${hasCashback ? 'text-gray-300' : 'text-gray-400'}`}>
                                                    {hasCashback
                                                        ? '🎉 Cashback -15% appliqué automatiquement'
                                                        : `${250 - (user.points || 0)} tokens avant le cashback -15%`}
                                                </p>
                                            </div>
                                            {hasCashback && (
                                                <span className="text-2xl font-black text-green-400">-15%</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Paiement info */}
                                <div className="bg-white border border-gray-100 p-6">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4">
                                        Paiement
                                    </h2>
                                    <div className="flex items-center gap-3 p-4 border border-gray-100 bg-[#faf8f4]">
                                        <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                                            <span className="text-white text-[8px] font-black">CB</span>
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-semibold text-black">Carte bancaire</p>
                                            <p className="text-[10px] text-gray-400">Visa, Mastercard, Amex — via Stripe</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-3 text-center">
                                        Le paiement Stripe sera intégré prochainement
                                    </p>
                                </div>

                            </div>

                            {/* ── DROITE — Récap ── */}
                            <div className="lg:col-span-5">
                                <div className="bg-white border border-gray-100 p-6 sticky top-28">
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 pb-4 border-b border-gray-100">
                                        Récapitulatif
                                    </h2>

                                    {/* Items */}
                                    <div className="space-y-4 mb-6">
                                        {items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-[#f8f7f4] shrink-0 overflow-hidden">
                                                    {item.image ? (
                                                        <img
                                                            src={getImageUrl(item.image)}
                                                            alt={item.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[7px] text-gray-300 font-bold">
                                                            WEVA
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-semibold uppercase tracking-wide truncate">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-[9px] text-gray-400 uppercase tracking-wide">
                                                        {item.variant || 'Unique'} · Qté {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-[12px] font-bold shrink-0">
                                                    {(item.price * item.quantity).toFixed(2)}€
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totaux */}
                                    <div className="border-t border-gray-100 pt-4 space-y-2">
                                        <div className="flex justify-between text-[11px] text-gray-500">
                                            <span>Sous-total</span>
                                            <span>{fiatTotal.toFixed(2)}€</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] text-gray-500">
                                            <span>Livraison</span>
                                            <span className="text-green-600 font-semibold">Gratuite</span>
                                        </div>
                                        {hasCashback && (
                                            <div className="flex justify-between text-[11px] text-green-600 font-bold">
                                                <span>Cashback -15%</span>
                                                <span>-{discountAmount.toFixed(2)}€</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-lg font-black text-black pt-3 border-t border-gray-100">
                                            <span>Total</span>
                                            <span>{finalTotal.toFixed(2)}€</span>
                                        </div>
                                        <p className="text-[9px] text-gray-400 text-right">
                                            +{pointsToEarn} tokens après commande
                                        </p>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={processing || items.length === 0}
                                        className={`mt-6 w-full py-4 text-[11px] font-black uppercase tracking-[0.4em] transition-all
                                            ${processing || items.length === 0
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-black text-white hover:bg-zinc-800'}`}
                                    >
                                        {processing ? 'Traitement...' : `Payer ${finalTotal.toFixed(2)}€`}
                                    </button>

                                    <div className="flex items-center justify-center gap-2 mt-4 opacity-40">
                                        <ShieldCheck className="w-3 h-3" />
                                        <span className="text-[8px] font-bold uppercase tracking-[0.3em]">
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
