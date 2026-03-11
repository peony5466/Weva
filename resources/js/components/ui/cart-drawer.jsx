import { Fragment, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Trash2, Coins, CreditCard, ShoppingBag, Plus, Minus, AlertTriangle, PackageX } from 'lucide-react'
import { Link, router, usePage } from '@inertiajs/react'

export default function CartDrawer({ open, setOpen }) {
    const { cart, auth } = usePage().props;
    const user = auth?.user;
    const items = Object.entries(cart || {});

    // Calcul des totaux hybrides (Euros vs WT)
    const totals = useMemo(() => {
        let fiat = 0;
        let wt = 0;
        items.forEach(([_, item]) => {
            if (item.is_exclusive || item.wt_price > 0) {
                wt += (item.wt_price || 0) * item.quantity;
            } else {
                fiat += item.price * item.quantity;
            }
        });
        return { fiat, wt };
    }, [cart]);

    // --- LOGIQUE DE SÉCURITÉ ---
    const hasEnoughPoints = !user || user.points >= totals.wt;

    // Vérifie si au moins un article dépasse le stock (sécurité supplémentaire)
    const hasStockIssue = items.some(([_, item]) => item.quantity > item.stock);

    const updateQuantity = (key, newQty, maxStock) => {
        if (newQty < 1 || newQty > maxStock) return; // Bloquage JS

        router.patch(route('cart.update', key), { quantity: newQty }, {
            preserveScroll: true,
        });
    };

    const removeItem = (key) => {
        router.delete(route('cart.destroy', key), { preserveScroll: true });
    };

    const clearCart = () => {
        if (confirm('Are you sure you want to clear your bag?')) {
            router.post(route('cart.clear'), {}, { preserveScroll: true });
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={setOpen}>
                <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col bg-white shadow-2xl">

                                        <div className="flex-1 overflow-y-auto px-6 py-8">
                                            <div className="flex items-start justify-between border-b border-gray-100 pb-6">
                                                <div className="space-y-1">
                                                    <Dialog.Title className="text-xl font-[1000] uppercase italic tracking-tighter flex items-center gap-2 text-black">
                                                        <ShoppingBag className="w-5 h-5" strokeWidth={3} /> Your_Bag
                                                    </Dialog.Title>
                                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest italic">{items.length} Asset(s) ready for sync</p>
                                                </div>
                                                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-black transition p-2 hover:bg-gray-50 rounded-full">
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>

                                            <div className="mt-8">
                                                {items.length === 0 ? (
                                                    <div className="flex flex-col items-center justify-center mt-32 space-y-4 opacity-20 text-black">
                                                        <ShoppingBag className="w-12 h-12" strokeWidth={1} />
                                                        <p className="text-[10px] uppercase tracking-[0.3em] font-black italic">Bag_Is_Empty</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-8">
                                                        <div className="flex justify-end">
                                                            <button onClick={clearCart} className="text-[9px] font-bold uppercase tracking-widest text-red-500 hover:underline">
                                                                Clear_All_Manifests
                                                            </button>
                                                        </div>

                                                        {items.map(([key, item]) => {
                                                            const isMaxStock = item.quantity >= item.stock;

                                                            return (
                                                                <div key={key} className="flex gap-4 group">
                                                                    <div className={`h-24 w-24 flex-shrink-0 overflow-hidden p-2 relative ${item.image ? (item.is_exclusive ? 'bg-amber-50' : 'bg-gray-50') : 'bg-zinc-100'}`}>
                                                                        {item.image ? (
                                                                            <img src={`/storage/${item.image}`} className={`h-full w-full object-contain mix-blend-multiply ${item.stock === 0 ? 'grayscale opacity-50' : ''}`} alt={item.name} />
                                                                        ) : (
                                                                            <div className="flex items-center justify-center h-full text-[8px] text-zinc-400 font-black italic">NO_IMG</div>
                                                                        )}
                                                                        {item.stock === 0 && (
                                                                            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                                                                                <span className="text-[8px] font-black bg-red-600 text-white px-1 py-0.5 uppercase tracking-tighter">Sold_Out</span>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <div className="flex flex-1 flex-col justify-between py-1">
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <h3 className={`text-[11px] font-[1000] uppercase tracking-widest ${item.is_exclusive ? 'text-amber-600' : 'text-black'}`}>
                                                                                    {item.name}
                                                                                </h3>
                                                                                <p className="text-[9px] text-gray-400 uppercase mt-1 font-bold italic">Size: {item.variant} // Stock: {item.stock}</p>
                                                                            </div>
                                                                            <button onClick={() => removeItem(key)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                                                <Trash2 className="h-3.5 w-3.5" />
                                                                            </button>
                                                                        </div>

                                                                        <div className="flex justify-between items-end">
                                                                            <div className="flex flex-col gap-1">
                                                                                <div className={`flex items-center border ${isMaxStock ? 'border-red-200 bg-red-50/30' : 'border-gray-100 bg-white'}`}>
                                                                                    <button
                                                                                        onClick={() => updateQuantity(key, item.quantity - 1, item.stock)}
                                                                                        className="px-2 py-1 hover:bg-gray-50 border-r border-gray-100 transition-colors"
                                                                                    >
                                                                                        <Minus className="w-2.5 h-2.5 text-black" />
                                                                                    </button>
                                                                                    <span className={`px-3 py-1 text-[10px] font-black min-w-[25px] text-center ${isMaxStock ? 'text-red-600' : 'text-black'}`}>
                                                                                        {item.quantity}
                                                                                    </span>
                                                                                    <button
                                                                                        onClick={() => updateQuantity(key, item.quantity + 1, item.stock)}
                                                                                        disabled={isMaxStock}
                                                                                        className={`px-2 py-1 border-l border-gray-100 transition-colors ${isMaxStock ? 'opacity-20 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                                                                    >
                                                                                        <Plus className="w-2.5 h-2.5 text-black" />
                                                                                    </button>
                                                                                </div>
                                                                                {isMaxStock && item.stock > 0 && (
                                                                                    <span className="text-[7px] font-black text-red-500 uppercase italic">Max_Stock_Reached</span>
                                                                                )}
                                                                            </div>

                                                                            <div className="text-right">
                                                                                {item.is_exclusive ? (
                                                                                    <p className="text-xs font-mono font-black text-amber-600 italic">{item.wt_price * item.quantity} WT</p>
                                                                                ) : (
                                                                                    <p className="text-xs font-bold text-black italic">€ {(item.price * item.quantity).toFixed(2)}</p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* FOOTER */}
                                        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-8 space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                                    <span className="flex items-center gap-2 text-gray-500"><CreditCard className="w-3 h-3" /> Fiat_Subtotal</span>
                                                    <span className="text-black italic">{(totals.fiat || 0).toFixed(2)} €</span>
                                                </div>

                                                {totals.wt > 0 && (
                                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest pt-3 border-t border-gray-200/50">
                                                        <span className={`flex items-center gap-2 ${!hasEnoughPoints ? 'text-red-600' : 'text-amber-600'}`}>
                                                            <Coins className="w-3 h-3" /> Vault_Credits
                                                        </span>
                                                        <span className={`font-mono italic ${!hasEnoughPoints ? 'text-red-600' : 'text-amber-600'}`}>
                                                            {totals.wt} WT
                                                        </span>
                                                    </div>
                                                )}

                                                {!hasEnoughPoints && (
                                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded text-[8px] font-black uppercase tracking-widest">
                                                        <AlertTriangle className="w-3 h-3" />
                                                        Insufficient_Credits: Need {totals.wt - user.points} more WT
                                                    </div>
                                                )}

                                                {hasStockIssue && (
                                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded text-[8px] font-black uppercase tracking-widest">
                                                        <PackageX className="w-3 h-3" />
                                                        Stock_Error: Some items exceed availability
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-2">
                                                {items.length > 0 && hasEnoughPoints && !hasStockIssue ? (
                                                    <Link
                                                        href={route('checkout')}
                                                        className="block w-full text-center py-5 text-[11px] font-[1000] uppercase tracking-[0.4em] transition-all shadow-xl active:scale-95 bg-black text-white hover:bg-zinc-800 shadow-black/10"
                                                    >
                                                        Process_Order
                                                    </Link>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="block w-full text-center py-5 text-[11px] font-[1000] uppercase tracking-[0.4em] bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    >
                                                        {items.length === 0 ? 'Bag_Empty' : hasStockIssue ? 'Stock_Exceeded' : 'Insufficient_Funds'}
                                                    </button>
                                                )}
                                            </div>

                                            <p className="text-[8px] text-center text-gray-400 uppercase tracking-[0.2em] font-bold italic leading-relaxed">
                                                Secure_Nexus_Transmission // WEVA_OS 2.6 <br />
                                                No_Refunds_On_Vault_Assets
                                            </p>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}