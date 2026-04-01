import ClientLayout from '@/layouts/client-layout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Home, Package, Printer } from 'lucide-react';

export default function Success({ order, tokensEarned = 0, cashbackApplied = 0 }) {
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `/images/${path}`;
    };

    return (
        <ClientLayout>
            <Head title="Commande confirmée — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] px-6 pt-24 pb-20">
                <div className="mx-auto max-w-2xl space-y-10">
                    {/* Header */}
                    <div className="space-y-4 text-center">
                        <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-black">
                            <CheckCircle className="h-8 w-8 stroke-[1.5] text-white" />
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight text-black uppercase">Commande Confirmée</h1>
                        <p className="text-[11px] font-bold tracking-[0.3em] text-gray-400 uppercase">
                            Réf. <span className="text-black">{order.order_number}</span>
                        </p>
                    </div>

                    {/* Tokens earned */}
                    {tokensEarned > 0 && (
                        <div className="flex items-center justify-between bg-black p-5 text-white">
                            <div>
                                <p className="mb-1 text-[9px] tracking-[0.3em] text-gray-400 uppercase">Tokens gagnés</p>
                                <p className="text-2xl font-black">+{tokensEarned} 🪙</p>
                            </div>
                            {cashbackApplied > 0 && (
                                <div className="text-right">
                                    <p className="mb-1 text-[9px] tracking-[0.3em] text-gray-400 uppercase">Cashback appliqué</p>
                                    <p className="text-xl font-black text-green-400">-{cashbackApplied}€</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Order items */}
                    <div className="border border-gray-100 bg-white">
                        <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
                            <Package className="h-4 w-4" />
                            <h2 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Articles commandés</h2>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {order.items?.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-5">
                                    <div className="h-16 w-16 shrink-0 overflow-hidden bg-[#f8f7f4]">
                                        {item.product?.image_path ? (
                                            <img
                                                src={getImageUrl(item.product.image_path)}
                                                alt={item.product?.name}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[8px] font-bold text-gray-300 uppercase">
                                                WEVA
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[12px] font-semibold tracking-wide text-black uppercase">{item.product?.name}</p>
                                        <p className="mt-0.5 text-[10px] tracking-wider text-gray-400 uppercase">
                                            Taille: {item.attributes?.size || 'Unique'} · Qté: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="shrink-0 text-[13px] font-bold">
                                        {item.product?.is_exclusive && item.product?.wt_price ? (
                                            <span className="text-amber-600">{item.product.wt_price * item.quantity} WT</span>
                                        ) : (
                                            <span className="text-black">{parseFloat(item.price * item.quantity).toFixed(2)}€</span>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Totaux */}
                        {(() => {
                            const fiatTotal =
                                order.items?.reduce((sum, item) => {
                                    if (item.product?.is_exclusive && item.product?.wt_price) return sum;
                                    return sum + item.price * item.quantity;
                                }, 0) || 0;

                            const wtTotal =
                                order.items?.reduce((sum, item) => {
                                    if (item.product?.is_exclusive && item.product?.wt_price) {
                                        return sum + item.product.wt_price * item.quantity;
                                    }
                                    return sum;
                                }, 0) || 0;

                            return (
                                <div className="space-y-2 border-t border-gray-100 bg-[#faf8f4] p-6">
                                    {fiatTotal > 0 && (
                                        <div className="flex justify-between text-[11px] font-bold tracking-wide text-gray-500 uppercase">
                                            <span>Sous-total</span>
                                            <span>{parseFloat(fiatTotal).toFixed(2)}€</span>
                                        </div>
                                    )}
                                    {wtTotal > 0 && (
                                        <div className="flex justify-between text-[11px] font-bold tracking-wide text-amber-600 uppercase">
                                            <span>WT Total</span>
                                            <span>{wtTotal} WT</span>
                                        </div>
                                    )}
                                    {parseFloat(order.discount) > 0 && (
                                        <div className="flex justify-between text-[11px] font-bold tracking-wide text-green-600 uppercase">
                                            <span>Cashback (-15%)</span>
                                            <span>-{parseFloat(order.discount).toFixed(2)}€</span>
                                        </div>
                                    )}
                                    <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-lg font-black tracking-tight text-black uppercase">
                                        <span>Total</span>
                                        <span>
                                            {fiatTotal > 0 && <span>{parseFloat(fiatTotal).toFixed(2)}€</span>}
                                            {fiatTotal > 0 && wtTotal > 0 && <span className="mx-2">/</span>}
                                            {wtTotal > 0 && <span className="text-amber-600">{wtTotal} WT</span>}
                                        </span>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Infos livraison */}
                    {order.shipping_address && (
                        <div className="border border-gray-100 bg-white p-6">
                            <p className="mb-2 text-[9px] font-bold tracking-[0.3em] text-gray-400 uppercase">Adresse de livraison</p>
                            <p className="text-[13px] text-gray-700">{order.shipping_address}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="flex flex-1 items-center justify-center gap-2 bg-black py-4 text-[10px] font-black tracking-[0.3em] text-white uppercase transition-colors hover:bg-zinc-800"
                        >
                            <Home className="h-4 w-4" /> Retour accueil
                        </Link>
                        <Link
                            href={route('shop.index')}
                            className="flex flex-1 items-center justify-center gap-2 border border-black py-4 text-[10px] font-black tracking-[0.3em] text-black uppercase transition-colors hover:bg-gray-50"
                        >
                            Continuer mes achats
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center justify-center gap-2 border border-gray-200 px-6 py-4 text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase transition-colors hover:bg-gray-50 sm:w-auto"
                        >
                            <Printer className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
