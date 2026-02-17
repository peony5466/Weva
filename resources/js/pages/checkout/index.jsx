import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Checkout() {
    const { auth, cartTotal = 0 } = usePage().props;
    const user = auth?.user; // Peut être null maintenant

    const { data, setData, post, processing } = useForm({
        email: user?.email || '', // Email auto-rempli si connecté
        address: '',
        use_points: false,
    });

    const [usePoints, setUsePoints] = useState(false);
    const pointsValue = (user?.points || 0) / 100;
    const finalTotal = usePoints ? Math.max(0, cartTotal - pointsValue) : cartTotal;

    return (
        <div className="max-w-4xl mx-auto p-8 pt-24">
            <h1 className="text-3xl font-[1000] uppercase italic tracking-tighter mb-12">Checkout</h1>

            <form onSubmit={(e) => { e.preventDefault(); post(route('orders.store')); }}>
                {/* Champ EMAIL : Requis pour les invités */}
                {!user && (
                    <div className="mb-8">
                        <label className="text-[10px] font-black uppercase tracking-widest mb-2 block">Contact_Email</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full border-0 border-b-2 border-zinc-100 focus:border-black focus:ring-0 py-3 px-0 text-xs font-bold uppercase"
                            onChange={e => setData('email', e.target.value)}
                            required
                        />
                    </div>
                )}

                {/* ADRESSE (toujours requis) */}
                <div className="mb-8">
                    <label className="text-[10px] font-black uppercase tracking-widest mb-2 block">Shipping_Address</label>
                    <input
                        type="text"
                        placeholder="Street, City, Postcode"
                        className="w-full border-0 border-b-2 border-zinc-100 focus:border-black focus:ring-0 py-3 px-0 text-xs font-bold uppercase"
                        onChange={e => setData('address', e.target.value)}
                        required
                    />
                </div>

                {/* CASHBACK : Visible uniquement si connecté ET a des points */}
                {user && user.points > 0 && (
                    <div className="bg-zinc-50 p-6 border border-zinc-100 mb-8">
                        <label className="flex items-center gap-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={usePoints}
                                onChange={(e) => {
                                    setUsePoints(e.target.checked);
                                    setData('use_points', e.target.checked);
                                }}
                                className="w-5 h-5 text-black border-zinc-300 focus:ring-black"
                            />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                Use_{user.points}_Points (-{pointsValue.toFixed(2)}€)
                            </span>
                        </label>
                    </div>
                )}

                <div className="border-t pt-6 mb-8">
                    <p className="flex justify-between text-xl font-[1000] uppercase italic">
                        <span>Total</span>
                        <span>{finalTotal.toFixed(2)}€</span>
                    </p>
                </div>

                <button
                    disabled={processing}
                    className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition"
                >
                    {processing ? 'Processing...' : 'Complete_Order'}
                </button>
            </form>
        </div>
    );
}