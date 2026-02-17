import AppLayout from '@/layouts/app-layout'; // Ou ton layout client
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Package, Printer, Home } from 'lucide-react';

export default function Success({ order }) {
    return (
        <AppLayout>
            <Head title="Order_Confirmed" />

            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] py-20 px-6">
                <div className="max-w-3xl mx-auto space-y-12">

                    {/* STATUS HEADER */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E67E22]/10 border border-[#E67E22]/30 rounded-full mb-4">
                            <CheckCircle className="w-10 h-10 text-[#E67E22] stroke-[1.5]" />
                        </div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                            Transaction_Complete
                        </h1>
                        <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">
                            Order_ID: <span className="text-white">{order.order_number}</span>
                        </p>
                    </div>

                    {/* RECAP CARD */}
                    <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-2">
                                <Package className="w-3 h-3" /> Manifest_Details
                            </h2>
                        </div>

                        <div className="p-8 space-y-6">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="w-20 h-20 bg-black rounded-lg border border-white/10 overflow-hidden shrink-0">
                                        <img
                                            src={item.product?.image_path ? `/storage/${item.product.image_path}` : '/images/placeholder.png'}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                            alt={item.product?.name}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold uppercase text-sm tracking-tight">{item.product?.name}</h3>
                                        <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase">
                                            Size: {item.attributes?.size || 'Unique'} | Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <div className="text-right font-mono text-sm text-white">
                                        {item.price}€
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTALS */}
                        <div className="p-8 bg-black/40 border-t border-white/5 space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500">
                                <span>Subtotal</span>
                                <span>{order.subtotal}€</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-[10px] uppercase font-bold text-[#E67E22]">
                                    <span>Cashback_Applied</span>
                                    <span>-{order.discount}€</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xl font-black text-white pt-4">
                                <span className="uppercase italic tracking-tighter">Total_Charged</span>
                                <span className="text-[#E67E22]">{order.total}€</span>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <Link
                            href="/"
                            className="flex-1 bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                        >
                            <Home className="w-4 h-4" /> Return_To_Base
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="flex-1 border border-white/10 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                        >
                            <Printer className="w-4 h-4" /> Download_Invoice
                        </button>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}