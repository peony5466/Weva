import ClientLayout from '@/layouts/client-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CreditCard, Coins, ShieldCheck, MapPin } from 'lucide-react';

export default function Checkout() {
    const { auth, cart, cartTotal = 0 } = usePage().props;
    const user = auth?.user;
    const items = Object.values(cart || {});

    // --- CALCULS HYBRIDES ---
    // On calcule combien de WT Credits sont nécessaires pour les objets exclusifs
    const creditsNeeded = items.reduce((acc, item) => {
        return item.is_exclusive ? acc + (item.wt_price * item.quantity) : acc;
    }, 0);

    // Le cartTotal envoyé par le backend doit correspondre uniquement aux produits Fiat
    const fiatTotal = cartTotal;
    const pointsToEarn = Math.floor(fiatTotal);

    const { data, setData, post, processing, errors } = useForm({
        email: user?.email || '',
        address: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // On passe l'adresse manuellement si useForm ne l'a pas captée
        post(route('orders.store'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Success: Redirection en cours...");
            },
            onError: (errors) => {
                console.error("Erreur détectée:", errors);
            }
        });
    };

    return (
        <ClientLayout>
            <Head title="Checkout — WEVA" />
            <div className="max-w-5xl mx-auto p-8 pt-24 text-white">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-1 w-12 bg-[#E67E22]"></div>
                    <h1 className="text-3xl font-[1000] uppercase italic tracking-tighter">Secure_Checkout</h1>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- COLONNE GAUCHE : INFOS --- */}
                    <div className="lg:col-span-7 space-y-10">

                        {/* Section Expédition */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-[#E67E22]">
                                <MapPin className="w-4 h-4" />
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em]">Shipping_Information</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Delivery_Address</label>
                                    <input
                                        type="text"
                                        placeholder="STREET, CITY, POSTCODE, COUNTRY"
                                        className="w-full bg-[#0F0F0F] border border-zinc-800 rounded px-4 py-4 text-xs font-bold uppercase tracking-wider focus:border-[#E67E22] transition-all outline-none"
                                        onChange={e => setData('address', e.target.value)}
                                        required
                                    />
                                    {errors.address && <p className="text-red-500 text-[9px] mt-2 uppercase tracking-tighter">{errors.address}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Section Wallet / Points Info */}
                        {creditsNeeded > 0 && (
                            <section className="bg-amber-950/20 border border-amber-500/20 p-6 rounded-xl space-y-4">
                                <div className="flex items-center gap-3 text-amber-500">
                                    <Coins className="w-4 h-4" />
                                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em]">Vault_Authentication</h2>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-tighter">
                                    Your bag contains <span className="text-white font-bold">Vault-Restricted Assets</span>.
                                    A total of <span className="text-amber-500 font-bold">{creditsNeeded} WT</span> will be deducted from your account.
                                </p>
                                <div className="flex justify-between items-center bg-black/40 p-4 rounded border border-white/5">
                                    <span className="text-[9px] uppercase font-bold text-zinc-500">Current Balance</span>
                                    <span className="text-sm font-mono font-black">{user?.points || 0} WT</span>
                                </div>
                                {user?.points < creditsNeeded && (
                                    <div className="text-red-500 text-[9px] font-black uppercase animate-pulse">
                                        Warning: Insufficient credits for this sync.
                                    </div>
                                )}
                            </section>
                        )}
                    </div>

                    {/* --- COLONNE DROITE : RÉCAPITULATIF --- */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#0F0F0F] p-8 rounded-2xl border border-white/5 sticky top-32 space-y-8 shadow-2xl">
                            <h2 className="text-xs font-[1000] uppercase tracking-[0.4em] text-zinc-400 border-b border-white/5 pb-4">Sync_Summary</h2>

                            <div className="space-y-4">
                                {/* Ligne Cash */}
                                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2 text-zinc-400">
                                        <CreditCard className="w-3 h-3" />
                                        <span>Fiat Assets</span>
                                    </div>
                                    <span>{fiatTotal.toFixed(2)}€</span>
                                </div>

                                {/* Ligne WT Credits */}
                                {creditsNeeded > 0 && (
                                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-2 text-amber-500">
                                            <Coins className="w-3 h-3" />
                                            <span>Vault Assets</span>
                                        </div>
                                        <span className="font-mono">{creditsNeeded} WT</span>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-white/5 space-y-2">
                                    <div className="flex justify-between text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                                        <span>Data_Mining_Rewards</span>
                                        <span>+{pointsToEarn} WT</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <p className="text-[9px] uppercase text-zinc-600 mb-1 font-bold tracking-[0.2em]">Final_Transfer_Value</p>
                                <div className="flex flex-col gap-2">
                                    <p className="text-4xl font-[1000] uppercase italic tracking-tighter text-white">
                                        {fiatTotal.toFixed(2)}<span className="text-lg ml-1">€</span>
                                    </p>
                                    {creditsNeeded > 0 && (
                                        <p className="text-xl font-mono font-black text-amber-500 italic">
                                            + {creditsNeeded} WT
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing || (creditsNeeded > user?.points)}
                                className={`w-full py-6 text-[11px] font-[1000] uppercase tracking-[0.5em] transition-all shadow-2xl active:scale-95 ${(creditsNeeded > user?.points)
                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-red-500/20'
                                    : 'bg-white text-black hover:bg-[#E67E22] hover:text-white'
                                    }`}
                            >
                                {processing ? 'Syncing...' : (creditsNeeded > user?.points ? 'Insufficient_Credits' : 'Authorize_Transfer')}
                            </button>

                            <div className="flex items-center gap-3 justify-center opacity-30">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Encrypted_Transaction</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </ClientLayout>
    );
}