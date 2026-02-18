import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Head, Link } from '@inertiajs/react';

export default function OrderShow({ auth, order }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#0A0A0A] text-white">
                <Head title={`LOG_${order.order_number} — WEVA`} />

                <div className="flex flex-col min-h-screen selection:bg-white selection:text-black">
                    <div className="p-8 lg:p-16 max-w-[1000px] mx-auto w-full space-y-16">

                        {/* HEADER NAVIGATION */}
                        <Link href={route('client.orders')} className="text-[10px] tracking-[0.4em] text-neutral-500 hover:text-white transition-colors uppercase">
                            ← Back to Archive
                        </Link>

                        <header className="space-y-4 border-l-2 border-white/10 pl-8">
                            <span className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-light">
                                Transaction Summary
                            </span>
                            <h1 className="text-4xl font-extralight tracking-tighter text-white uppercase">
                                {order.order_number}
                            </h1>
                            <div className="flex gap-8 pt-4">
                                <div>
                                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-[10px] text-white uppercase font-bold tracking-widest">{order.status}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1">Processed</p>
                                    <p className="text-[10px] text-white uppercase tracking-widest">
                                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                            </div>
                        </header>

                        {/* ITEMS TABLE */}
                        {/* ITEMS TABLE */}
                        <section className="space-y-6">
                            <h3 className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase font-semibold">Manifest_Items</h3>
                            <div className="border border-white/5 bg-[#0F0F0F] divide-y divide-white/5">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-6 flex justify-between items-center group hover:bg-white/[0.02] transition-colors">
                                        <div className="flex items-center gap-6">
                                            {/* MINIATURE DU PRODUIT */}
                                            <div className="w-16 h-16 bg-black border border-white/10 overflow-hidden flex-shrink-0">
                                                {item.product.image ? (
                                                    <img
                                                        src={`/storage/${item.product.image}`}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-[8px] text-neutral-800 uppercase tracking-tighter">No_Img</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-1">
                                                <p className="text-sm tracking-widest uppercase font-light text-white">{item.product.name}</p>
                                                <p className="text-[10px] text-neutral-600 uppercase">
                                                    Qty: {item.quantity} — {item.attributes?.size || 'Unique'}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-mono tracking-tighter text-neutral-400 group-hover:text-white transition-colors">
                                            {item.price} €
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FINANCIALS */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/10">
                            <div className="space-y-6">
                                <h3 className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase font-semibold">Shipping_Address</h3>
                                <p className="text-sm text-neutral-400 font-light leading-relaxed uppercase tracking-wider">
                                    {order.shipping_address}
                                </p>
                            </div>

                            <div className="space-y-4 bg-white/5 p-8">
                                <div className="flex justify-between text-[10px] tracking-widest uppercase">
                                    <span className="text-neutral-500">Subtotal</span>
                                    <span>{order.subtotal} €</span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="flex justify-between text-[10px] tracking-widest uppercase text-[#E67E22]">
                                        <span>Points Discount</span>
                                        <span>-{order.discount} €</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-light tracking-tighter border-t border-white/10 pt-4">
                                    <span className="uppercase text-xs tracking-[0.3em]">Total</span>
                                    <span>{order.total} €</span>
                                </div>
                                <div className="pt-4 text-center">
                                    <p className="text-[9px] text-green-500 uppercase tracking-[0.2em]">
                                        + {order.points_earned} WT Credits earned in this session
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}