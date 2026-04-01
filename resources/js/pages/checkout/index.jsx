import ClientLayout from '@/layouts/client-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Mail, MapPin, ShieldCheck, Tag } from 'lucide-react';

export default function Checkout() {
    const { auth, cart, cartTotal = 0 } = usePage().props;
    const user = auth?.user;
    const items = Object.values(cart || {});

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
    const hasCashback = user && (user.points || 0) >= 250;
    const discountAmount = hasCashback ? Math.round(fiatTotal * 0.15 * 100) / 100 : 0;
    const finalTotal = fiatTotal - discountAmount;

    const { data, setData, post, processing, errors } = useForm({
        email: user?.email || '',
        address: '',
        city: '',
        postal_code: '',
        country: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'), {
            preserveScroll: true,
            onError: (err) => console.error('Checkout error:', err),
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
                <div className="mx-auto max-w-5xl px-6">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="mb-2 text-[9px] font-bold tracking-[0.4em] text-gray-400 uppercase">WEVA · Finaliser ma commande</p>
                        <h1 className="text-3xl font-semibold tracking-tight text-black uppercase">Checkout</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            {/* ── GAUCHE ── */}
                            <div className="space-y-6 lg:col-span-7">
                                {/* Email */}
                                {!user && (
                                    <div className="border border-gray-100 bg-white p-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <h2 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Contact</h2>
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="votre@email.com"
                                            required
                                            className="w-full border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide focus:border-black focus:outline-none"
                                        />
                                        {errors.email && <p className="mt-2 text-[10px] text-red-500">{errors.email}</p>}
                                    </div>
                                )}

                                {/* Adresse */}
                                <div className="border border-gray-100 bg-white p-6 space-y-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <h2 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
                                            Adresse de livraison
                                        </h2>
                                    </div>

                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Numéro, rue"
                                        required
                                        className="w-full border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide focus:border-black focus:outline-none"
                                    />
                                    {errors.address && <p className="mt-1 text-[10px] text-red-500">{errors.address}</p>}

                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="Ville"
                                        required
                                        className="w-full border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide focus:border-black focus:outline-none"
                                    />
                                    {errors.city && <p className="mt-1 text-[10px] text-red-500">{errors.city}</p>}

                                    <input
                                        type="text"
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        placeholder="Code postal"
                                        required
                                        className="w-full border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide focus:border-black focus:outline-none"
                                    />
                                    {errors.postal_code && <p className="mt-1 text-[10px] text-red-500">{errors.postal_code}</p>}

                                    <select
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        required
                                        className="w-full border border-gray-200 bg-white px-4 py-3 text-[12px] tracking-wide focus:border-black focus:outline-none"
                                    >
                                        <option value="">Sélectionnez un pays</option>
                                        <option value="FR">France</option>
                                        <option value="BE">Belgique</option>
                                        <option value="CH">Suisse</option>
                                        <option value="US">États-Unis</option>
                                    </select>
                                    {errors.country && <p className="mt-1 text-[10px] text-red-500">{errors.country}</p>}
                                </div>

                                {/* Cashback info */}
                                {user && (
                                    <div className={`border p-5 ${hasCashback ? 'border-black bg-black text-white' : 'border-gray-100 bg-white'}`}>
                                        <div className="mb-2 flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            <h3 className="text-[10px] font-black tracking-[0.3em] uppercase">Tokens WEVA</h3>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className={`text-[12px] font-semibold ${hasCashback ? 'text-white' : 'text-black'}`}>
                                                    {user.points || 0} tokens
                                                </p>
                                                <p className={`mt-0.5 text-[10px] ${hasCashback ? 'text-gray-300' : 'text-gray-400'}`}>
                                                    {hasCashback
                                                        ? '🎉 Cashback -15% appliqué automatiquement'
                                                        : `${250 - (user.points || 0)} tokens avant le cashback -15%`}
                                                </p>
                                            </div>
                                            {hasCashback && <span className="text-2xl font-black text-green-400">-15%</span>}
                                        </div>
                                    </div>
                                )}

                                {/* Paiement */}
                                <div className="border border-gray-100 bg-white p-6">
                                    <h2 className="mb-4 text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Paiement</h2>
                                    <div className="flex items-center gap-3 border border-gray-100 bg-[#faf8f4] p-4">
                                        <div className="flex h-8 w-8 items-center justify-center rounded bg-black">
                                            <span className="text-[8px] font-black text-white">CB</span>
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-semibold text-black">Carte bancaire</p>
                                            <p className="text-[10px] text-gray-400">Visa, Mastercard, Amex — via Stripe</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-center text-[10px] text-gray-400">Le paiement Stripe sera intégré prochainement</p>
                                </div>
                            </div>

                            {/* ── DROITE — Récap ── */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-28 border border-gray-100 bg-white p-6">
                                    <h2 className="mb-6 border-b border-gray-100 pb-4 text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
                                        Récapitulatif
                                    </h2>

                                    {/* Items */}
                                    <div className="mb-6 space-y-4">
                                        {items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="h-12 w-12 shrink-0 overflow-hidden bg-[#f8f7f4]">
                                                    {item.image ? (
                                                        <img src={getImageUrl(item.image)} alt={item.name} className="h-full w-full object-contain" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-[7px] font-bold text-gray-300">WEVA</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-[11px] font-semibold tracking-wide uppercase">{item.name}</p>
                                                    <p className="text-[9px] tracking-wide text-gray-400 uppercase">{item.variant || 'Unique'} · Qté {item.quantity}</p>
                                                </div>
                                                <p className="shrink-0 text-[12px] font-bold">
                                                    {item.is_exclusive || item.wt_price > 0
                                                        ? `${item.wt_price * item.quantity} WT`
                                                        : `${(item.price * item.quantity).toFixed(2)}€`}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totaux */}
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
                                        {hasCashback && (
                                            <div className="flex justify-between text-[11px] font-bold text-green-600">
                                                <span>Cashback -15%</span>
                                                <span>-{discountAmount.toFixed(2)}€</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between border-t border-gray-100 pt-3 text-lg font-black text-black">
                                            <span>Total</span>
                                            <span>{fiatTotal > 0 ? `${finalTotal.toFixed(2)}€` : `${wtTotal} WT`}</span>
                                        </div>
                                        <p className="text-right text-[9px] text-gray-400">+{pointsToEarn} tokens après commande</p>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={processing || items.length === 0}
                                        className={`mt-6 w-full py-4 text-[11px] font-black tracking-[0.4em] uppercase transition-all ${
                                            processing || items.length === 0
                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                                : 'bg-black text-white hover:bg-zinc-800'
                                        }`}
                                    >
                                        {processing ? 'Traitement...' : wtTotal > 0 ? `Payer ${wtTotal} WT` : `Payer ${finalTotal.toFixed(2)}€`}
                                    </button>

                                    <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
                                        <ShieldCheck className="h-3 w-3" />
                                        <span className="text-[8px] font-bold tracking-[0.3em] uppercase">Paiement sécurisé SSL</span>
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