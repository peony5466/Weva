import ClientLayout from '@/layouts/client-layout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Package, Home, Printer } from 'lucide-react';

export default function Success({ order, tokensEarned = 0, cashbackApplied = 0 }) {

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('images/products/')) return `/${path}`;
        return `/storage/${path}`;
    };

    return (
        <ClientLayout>
            <Head title="Commande confirmée — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20 px-6">
                <div className="max-w-2xl mx-auto space-y-10">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-2">
                            <CheckCircle className="w-8 h-8 text-white stroke-[1.5]" />
                        </div>
                        <h1 className="text-3xl font-semibold uppercase tracking-tight text-black">
                            Commande Confirmée
                        </h1>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
                            Réf. <span className="text-black">{order.order_number}</span>
                        </p>
                    </div>

                    {/* Tokens earned */}
                    {tokensEarned > 0 && (
                        <div className="bg-black text-white p-5 flex items-center justify-between">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1">
                                    Tokens gagnés
                                </p>
                                <p className="text-2xl font-black">+{tokensEarned} 🪙</p>
                            </div>
                            {cashbackApplied > 0 && (
                                <div className="text-right">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1">
                                        Cashback appliqué
                                    </p>
                                    <p className="text-xl font-black text-green-400">-{cashbackApplied}€</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Order items */}
                    <div className="bg-white border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                Articles commandés
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {order.items?.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-5">
                                    <div className="w-16 h-16 bg-[#f8f7f4] shrink-0 overflow-hidden">
                                        {item.product?.image_path ? (
                                            <img
                                                src={getImageUrl(item.product.image_path)}
                                                alt={item.product?.name}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-300 font-bold uppercase">
                                                WEVA
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-semibold uppercase tracking-wide text-black truncate">
                                            {item.product?.name}
                                        </p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
                                            Taille: {item.attributes?.size || 'Unique'} · Qté: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-[13px] font-bold text-black shrink-0">
                                        {parseFloat(item.price * item.quantity).toFixed(2)}€
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="bg-[#faf8f4] border-t border-gray-100 p-6 space-y-2">
                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                <span>Sous-total</span>
                                <span>{parseFloat(order.subtotal).toFixed(2)}€</span>
                            </div>
                            {parseFloat(order.discount) > 0 && (
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wide text-green-600">
                                    <span>Cashback (-15%)</span>
                                    <span>-{parseFloat(order.discount).toFixed(2)}€</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-black uppercase tracking-tight text-black pt-2 border-t border-gray-200 mt-2">
                                <span>Total</span>
                                <span>{parseFloat(order.total).toFixed(2)}€</span>
                            </div>
                        </div>
                    </div>

                    {/* Infos livraison */}
                    {order.shipping_address && (
                        <div className="bg-white border border-gray-100 p-6">
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">
                                Adresse de livraison
                            </p>
                            <p className="text-[13px] text-gray-700">{order.shipping_address}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/"
                            className="flex-1 bg-black text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
                        >
                            <Home className="w-4 h-4" /> Retour accueil
                        </Link>
                        <Link
                            href={route('shop.index')}
                            className="flex-1 border border-black text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                        >
                            Continuer mes achats
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="sm:w-auto border border-gray-200 text-gray-500 py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                        >
                            <Printer className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </ClientLayout>
    );
}
