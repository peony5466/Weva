import ClientLayout from '@/layouts/client-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Checkout() {
    const { auth, cartTotal = 0 } = usePage().props;
    const user = auth?.user;

    const { data, setData, post, processing, errors } = useForm({
        email: user?.email || '',
        address: '',
        use_points: false,
    });

    const [usePoints, setUsePoints] = useState(false);
    const pointsValue = (user?.points || 0) / 100;
    const finalTotal = usePoints ? Math.max(0, cartTotal - pointsValue) : cartTotal;
    const pointsToEarn = Math.floor(finalTotal);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <ClientLayout>
            <Head title="Checkout" />
            <div className="max-w-4xl mx-auto p-8 pt-24 text-white">
                <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-12">Checkout_System</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {!user && (
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest mb-2 block text-zinc-500">Contact_Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#E67E22] focus:ring-0 py-3 px-0 text-sm font-bold uppercase"
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-[10px] mt-1">{errors.email}</div>}
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest mb-2 block text-zinc-500">Shipping_Address</label>
                            <input
                                type="text"
                                placeholder="STREET, CITY, POSTCODE"
                                className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#E67E22] focus:ring-0 py-3 px-0 text-sm font-bold uppercase"
                                onChange={e => setData('address', e.target.value)}
                                required
                            />
                            {errors.address && <div className="text-red-500 text-[10px] mt-1">{errors.address}</div>}
                        </div>

                        {user && user.points > 0 && (
                            <div className="bg-zinc-900/50 p-6 border border-zinc-800 rounded-lg">
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={usePoints}
                                        onChange={(e) => {
                                            setUsePoints(e.target.checked);
                                            setData('use_points', e.target.checked);
                                        }}
                                        className="w-5 h-5 bg-black border-zinc-700 text-[#E67E22] focus:ring-[#E67E22]"
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        Redeem_{user.points}_Credits (-{pointsValue.toFixed(2)}€)
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="bg-zinc-900/30 p-8 rounded-2xl border border-white/5 h-fit space-y-6">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4">Order_Summary</h2>

                        <div className="space-y-3 border-b border-zinc-800 pb-6 text-[11px] font-bold uppercase tracking-widest">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Subtotal</span>
                                <span>{cartTotal.toFixed(2)}€</span>
                            </div>
                            {usePoints && (
                                <div className="flex justify-between text-[#E67E22]">
                                    <span>Points_Discount</span>
                                    <span>-{pointsValue.toFixed(2)}€</span>
                                </div>
                            )}
                            <div className="flex justify-between text-green-500">
                                <span>Earned_Points</span>
                                <span>+{pointsToEarn} PTS</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <p className="flex justify-between text-3xl font-black uppercase italic tracking-tighter">
                                <span>Total</span>
                                <span className="text-[#E67E22]">{finalTotal.toFixed(2)}€</span>
                            </p>
                        </div>

                        <button
                            disabled={processing}
                            className="w-full bg-[#E67E22] text-black py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-20"
                        >
                            {processing ? 'Processing...' : (finalTotal <= 0 ? 'Claim_For_Free' : 'Proceed_To_Payment')}
                        </button>
                    </div>
                </form>
            </div>
        </ClientLayout>
    );
}