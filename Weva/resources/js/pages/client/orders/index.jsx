import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Package, ShoppingBag } from 'lucide-react';

const statusStyle = {
    paid: 'bg-green-900/30 text-green-400',
    completed: 'bg-green-900/30 text-green-400',
    pending: 'bg-yellow-900/30 text-yellow-400',
    pending_payment: 'bg-yellow-900/30 text-yellow-400',
    cancelled: 'bg-red-900/30 text-red-400',
};

const statusLabel = {
    paid: 'Payée',
    completed: 'Livrée',
    pending: 'En attente',
    pending_payment: 'Paiement en attente',
    cancelled: 'Annulée',
};

export default function Orders({ orders = [] }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="min-h-screen bg-[#0A0A0A] text-white">
                <Head title="Historique des commandes — WEVA" />

                {/* Header Mobile Sticky */}
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-white/5 bg-[#0A0A0A]/80 px-4 backdrop-blur-sm md:hidden">
                    <SidebarTrigger className="text-white" />
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Historique des commandes</span>
                </header>

                <div className="flex flex-col font-sans selection:bg-white selection:text-black">
                    <div className="mx-auto w-full max-w-[1400px] space-y-12 p-6 md:p-8 lg:space-y-20 lg:p-16">
                        {/* Header */}
                        <div>
                            <p className="mb-2 text-[9px] font-bold tracking-[0.4em] text-neutral-400 uppercase">WEVA · Mon compte</p>
                            <h1 className="text-3xl font-semibold tracking-tight text-white uppercase">Mes commandes</h1>
                        </div>

                        {orders.length === 0 ? (
                            <div className="border border-white/10 bg-[#111] p-16 text-center">
                                <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-neutral-700" />
                                <p className="mb-6 text-[11px] font-bold tracking-[0.3em] text-neutral-500 uppercase">
                                    Aucune commande pour l'instant
                                </p>
                                <Link
                                    href={route('shop.index')}
                                    className="inline-block bg-white px-8 py-3 text-[10px] font-black tracking-[0.3em] text-black uppercase transition-colors hover:bg-neutral-200"
                                >
                                    Découvrir la collection
                                </Link>
                            </div>
                        ) : (
                            <div className="border border-white/10 bg-[#111]">
                                <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
                                    <Package className="h-4 w-4 text-neutral-400" />
                                    <h2 className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">
                                        {orders.length} commande{orders.length > 1 ? 's' : ''}
                                    </h2>
                                </div>

                                <div className="divide-y divide-white/5">
                                    {orders.map((order) => (
                                        <Link
                                            key={order.id}
                                            href={route('client.orders.show', order.order_number)}
                                            className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-white/5"
                                        >
                                            <div className="flex-1">
                                                <div className="mb-1 flex items-center gap-3">
                                                    <p className="text-[12px] font-black tracking-wide text-white uppercase">{order.order_number}</p>
                                                    <span
                                                        className={`px-2 py-0.5 text-[8px] font-bold tracking-wide uppercase ${statusStyle[order.status] || 'bg-neutral-800 text-neutral-400'}`}
                                                    >
                                                        {statusLabel[order.status] || order.status}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] tracking-wide text-neutral-500 uppercase">
                                                    {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                                {order.points_earned > 0 && (
                                                    <p className="mt-1 text-[9px] font-bold text-white">+{order.points_earned} tokens gagnés</p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-right">
                                                <div>
                                                    {parseFloat(order.discount) > 0 && (
                                                        <p className="text-[9px] font-bold text-green-400">
                                                            -{parseFloat(order.discount).toFixed(2)}€ cashback
                                                        </p>
                                                    )}
                                                    {order.items?.some((item) => item.product?.is_exclusive && item.product?.wt_price) ? (
                                                        <p className="text-[14px] font-black text-amber-400">
                                                            {order.items.reduce((sum, item) => {
                                                                if (item.product?.is_exclusive && item.product?.wt_price) {
                                                                    return sum + item.product.wt_price * item.quantity;
                                                                }
                                                                return sum + parseFloat(item.price);
                                                            }, 0)}{' '}
                                                            WT
                                                        </p>
                                                    ) : (
                                                        <p className="text-[14px] font-black text-white">{parseFloat(order.total).toFixed(2)}€</p>
                                                    )}
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-neutral-500" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Retour VIP */}
                        <div className="text-center">
                            <Link
                                href={route('wevavip')}
                                className="border-b border-white pb-1 text-[10px] font-black tracking-[0.3em] uppercase transition-opacity hover:opacity-60"
                            >
                                ← Retour espace VIP
                            </Link>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
