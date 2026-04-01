import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Head, Link } from '@inertiajs/react';

export default function OrderShow({ auth, order }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#0A0A0A] text-white">
                <Head title={`LOG_${order.order_number} — WEVA`} />

                <div className="flex min-h-screen flex-col selection:bg-white selection:text-black">
                    <div className="mx-auto w-full max-w-[1000px] space-y-16 p-8 lg:p-16">
                        {/* HEADER NAVIGATION */}
                        <Link
                            href={route('client.orders')}
                            className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase transition-colors hover:text-white"
                        >
                            ← Back to Archive
                        </Link>

                        <header className="space-y-4 border-l-2 border-white/10 pl-8">
                            <span className="text-[10px] font-light tracking-[0.5em] text-neutral-500 uppercase">Transaction Summary</span>
                            <h1 className="text-4xl font-extralight tracking-tighter text-white uppercase">{order.order_number}</h1>
                            <div className="flex gap-8 pt-4">
                                <div>
                                    <p className="mb-1 text-[9px] tracking-widest text-neutral-600 uppercase">Status</p>
                                    <p className="text-[10px] font-bold tracking-widest text-white uppercase">{order.status}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-[9px] tracking-widest text-neutral-600 uppercase">Processed</p>
                                    <p className="text-[10px] tracking-widest text-white uppercase">
                                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                            </div>
                        </header>

                        {/* ITEMS TABLE */}
                        {/* ITEMS TABLE */}
                        <section className="space-y-6">
                            <h3 className="text-[10px] font-semibold tracking-[0.3em] text-neutral-500 uppercase">Manifest_Items</h3>
                            <div className="divide-y divide-white/5 border border-white/5 bg-[#0F0F0F]">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex items-center justify-between p-6 transition-colors hover:bg-white/[0.02]"
                                    >
                                        <div className="flex items-center gap-6">
                                            {/* MINIATURE DU PRODUIT */}
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden border border-white/10 bg-black">
                                                {item.product.image_path ? (
                                                    <img
                                                        src={`/images/${item.product.image_path}`}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <span className="text-[8px] tracking-tighter text-neutral-800 uppercase">No_Img</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-1">
                                                <p className="text-sm font-light tracking-widest text-white uppercase">{item.product.name}</p>
                                                <p className="text-[10px] text-neutral-600 uppercase">
                                                    Qty: {item.quantity} — {item.attributes?.size || 'Unique'}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-mono text-sm tracking-tighter transition-colors group-hover:text-white">
                                            {item.product?.is_exclusive && item.product?.wt_price ? (
                                                <span className="text-amber-400">{item.product.wt_price * item.quantity} WT</span>
                                            ) : (
                                                <span className="text-neutral-400">{item.price} €</span>
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FINANCIALS */}
                        <section className="grid grid-cols-1 gap-12 border-t border-white/10 pt-8 md:grid-cols-2">
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-semibold tracking-[0.3em] text-neutral-500 uppercase">Shipping_Address</h3>
                                <p className="text-sm leading-relaxed font-light tracking-wider text-neutral-400 uppercase">
                                    {order.shipping_address}
                                </p>
                            </div>

                            <div className="space-y-4 bg-white/5 p-8">
                                <div className="flex justify-between text-[10px] tracking-widest uppercase">
                                    <span className="text-neutral-500">Subtotal</span>
                                    <span>{order.subtotal} €</span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="flex justify-between text-[10px] tracking-widest text-[#E67E22] uppercase">
                                        <span>Points Discount</span>
                                        <span>-{order.discount} €</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-light tracking-tighter">
                                    <span className="text-xs tracking-[0.3em] uppercase">Total</span>
                                    <span>{order.total} €</span>
                                </div>
                                <div className="pt-4 text-center">
                                    <p className="text-[9px] tracking-[0.2em] text-green-500 uppercase">
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
