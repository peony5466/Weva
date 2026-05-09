import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function OrderShow({ order }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '/dashboard/admin/orders' },
        { title: order.order_number, href: '#' },
    ];

    const statusStyle = (status) => {
        const s = status?.toLowerCase();
        if (s === 'paid' || s === 'completed') {
            return 'bg-green-500/10 text-green-500 border border-green-500/20';
        }
        if (s === 'pending' || s === 'pending_payment') {
            return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
        }
        if (s === 'cancelled' || s === 'failed') {
            return 'bg-red-500/10 text-red-500 border border-red-500/20';
        }
        return 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
    };

    // Calculer si la commande contient des produits WT
    const hasWT = order.items?.some((item) => item.product?.is_exclusive && item.product?.wt_price);

    // Calculer le total WT
    const totalWT =
        order.items?.reduce((sum, item) => {
            if (item.product?.is_exclusive && item.product?.wt_price) {
                return sum + item.product.wt_price * item.quantity;
            }
            return sum;
        }, 0) || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order ${order.order_number} — WEVA Admin`} />

            <div className="min-h-screen bg-[#0A0A0A] p-6 text-white lg:p-10">
                <div className="mx-auto max-w-5xl space-y-10">
                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <div>
                            <Link
                                href="/dashboard/admin/orders"
                                className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase transition-colors hover:text-white"
                            >
                                ← Back to Orders
                            </Link>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white uppercase italic">Order {order.order_number}</h1>
                        </div>
                        <span className={`rounded-full px-4 py-2 text-[10px] font-black tracking-tighter uppercase ${statusStyle(order.status)}`}>
                            {order.status}
                        </span>
                    </div>

                    {/* CLIENT INFO */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="border border-white/5 bg-[#111111] p-6">
                            <h3 className="mb-4 text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase">Client Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[9px] tracking-widest text-neutral-600 uppercase">Name</p>
                                    <p className="text-sm font-medium text-white">{order.user?.name || 'Inconnu'}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] tracking-widest text-neutral-600 uppercase">Email</p>
                                    <p className="text-sm text-neutral-400">{order.email || 'Non disponible'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-white/5 bg-[#111111] p-6">
                            <h3 className="mb-4 text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase">Shipping Address</h3>
                            <p className="text-sm leading-relaxed text-neutral-400 uppercase">{order.shipping_address || 'Adresse non disponible'}</p>
                        </div>
                    </div>

                    {/* ITEMS */}
                    <div className="overflow-hidden border border-white/5 bg-[#111111]">
                        <div className="border-b border-white/5 px-6 py-4">
                            <h3 className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase">Items</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            {order.items?.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-6 hover:bg-white/[0.02]">
                                    <div className="flex items-center gap-6">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden border border-white/10 bg-black">
                                            {item.product?.image_path ? (
                                                <img
                                                    src={`/storage/${item.product.image_path.replace(/^storage\//, '')}`}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <span className="text-[8px] text-neutral-800">No Img</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white uppercase">{item.product?.name || 'Produit'}</p>
                                            <p className="mt-1 text-[10px] text-neutral-500 uppercase">
                                                Qty: {item.quantity} — {item.attributes?.size || 'Unique'}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-mono text-sm">
                                        {item.product?.is_exclusive && item.product?.wt_price ? (
                                            <span className="text-amber-400">{item.product.wt_price * item.quantity} WT</span>
                                        ) : (
                                            <span className="text-white">{item.price} €</span>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TOTALS */}
                    <div className="flex justify-end">
                        <div className="w-full max-w-md space-y-4 bg-white/5 p-6">
                            <div className="flex justify-between text-[10px] tracking-widest uppercase">
                                <span className="text-neutral-500">Subtotal</span>
                                <span className="text-white">{hasWT ? totalWT + ' WT' : order.subtotal + ' €'}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-[10px] tracking-widest text-amber-400 uppercase">
                                    <span>Discount</span>
                                    <span>-{order.discount} €</span>
                                </div>
                            )}
                            <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
                                <span className="text-xs tracking-[0.3em] uppercase">Total</span>
                                <span className={hasWT ? 'text-amber-400' : 'text-white'}>{hasWT ? totalWT + ' WT' : order.total + ' €'}</span>
                            </div>
                            {order.points_earned > 0 && (
                                <div className="pt-4 text-center">
                                    <p className="text-[9px] tracking-[0.2em] text-green-500 uppercase">+ {order.points_earned} WT Credits earned</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
