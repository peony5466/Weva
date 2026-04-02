import ClientLayout from '@/layouts/client-layout';
import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, ChevronRight, Package } from 'lucide-react';

const statusStyle = {
    paid:       'bg-green-50 text-green-600',
    completed:  'bg-green-50 text-green-600',
    pending:    'bg-yellow-50 text-yellow-600',
    pending_payment: 'bg-yellow-50 text-yellow-600',
    cancelled:  'bg-red-50 text-red-500',
};

const statusLabel = {
    paid:            'Payée',
    completed:       'Livrée',
    pending:         'En attente',
    pending_payment: 'Paiement en attente',
    cancelled:       'Annulée',
};

export default function Orders({ orders = [] }) {
    return (
        <ClientLayout>
            <Head title="Mes commandes — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-6 space-y-8">

                    {/* Header */}
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">
                            WEVA · Mon compte
                        </p>
                        <h1 className="text-3xl font-semibold uppercase tracking-tight text-black">
                            Mes commandes
                        </h1>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white border border-gray-100 p-16 text-center">
                            <ShoppingBag className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-6">
                                Aucune commande pour l'instant
                            </p>
                            <Link
                                href={route('shop.index')}
                                className="inline-block bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-3 hover:bg-zinc-800 transition-colors"
                            >
                                Découvrir la collection
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-100">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                <Package className="w-4 h-4 text-gray-400" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                    {orders.length} commande{orders.length > 1 ? 's' : ''}
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {orders.map(order => (
                                    <div key={order.id} className="flex items-center justify-between px-6 py-5 hover:bg-[#faf8f4] transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <p className="text-[12px] font-black text-black uppercase tracking-wide">
                                                    {order.order_number}
                                                </p>
                                                <span className={`text-[8px] font-bold uppercase tracking-wide px-2 py-0.5 ${statusStyle[order.status] || 'bg-gray-50 text-gray-500'}`}>
                                                    {statusLabel[order.status] || order.status}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                                                {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                                    day: '2-digit', month: 'long', year: 'numeric'
                                                })}
                                            </p>
                                            {order.points_earned > 0 && (
                                                <p className="text-[9px] text-black font-bold mt-1">
                                                    +{order.points_earned} tokens gagnés
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <div>
                                                {parseFloat(order.discount) > 0 && (
                                                    <p className="text-[9px] text-green-600 font-bold">
                                                        -{parseFloat(order.discount).toFixed(2)}€ cashback
                                                    </p>
                                                )}
                                                <p className="text-[14px] font-black text-black">
                                                    {parseFloat(order.total).toFixed(2)}€
                                                </p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-300" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Retour VIP */}
                    <div className="text-center">
                        <Link
                            href={route('wevavip')}
                            className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-60 transition-opacity"
                        >
                            ← Retour espace VIP
                        </Link>
                    </div>

                </div>
            </div>
        </ClientLayout>
    );
}