import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Product Inventory', href: '/admin/products' },
    { title: 'Edit Asset', href: '#' },
];

export default function Edit({ product }) {
    // Initialisation du formulaire avec les données existantes du produit
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        // On peut imaginer une gestion simplifiée du stock ici ou par variantes
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // On utilise PUT pour la mise à jour dans Laravel Resource
        put(route('products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name} — WEVA`} />

            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#050505] text-white">

                {/* HEADER */}
                <header className="flex justify-between items-end border-b border-white/10 pb-10">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">System_Update_Mode</span>
                        <h1 className="text-6xl font-[1000] tracking-tighter uppercase italic skew-x-[-10deg] bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                            Edit_Asset
                        </h1>
                    </div>

                    <Link href={route('admin.products.index')} className="text-white/40 hover:text-white flex items-center gap-2 uppercase text-[10px] font-black tracking-widest transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back_To_Registry
                    </Link>
                </header>

                <form onSubmit={handleSubmit} className="max-w-4xl space-y-10">

                    {/* CHAMP : NOM DU PRODUIT */}
                    <div className="space-y-4 group">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 group-focus-within:text-white transition-colors italic">
                            Designation_Label
                        </label>
                        <div className="relative skew-x-[-5deg]">
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full bg-[#0D0D0D] border border-white/10 p-5 text-xl font-bold uppercase tracking-tight focus:border-white focus:ring-0 transition-all outline-none"
                            />
                            {errors.name && <div className="text-red-500 text-[10px] mt-2 uppercase font-black italic">{errors.name}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* CHAMP : PRIX */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Value_Currency_EUR</label>
                            <div className="relative skew-x-[-5deg]">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    className="w-full bg-[#0D0D0D] border border-white/10 p-5 text-xl font-mono focus:border-white focus:ring-0 transition-all outline-none"
                                />
                                {errors.price && <div className="text-red-500 text-[10px] mt-2 uppercase font-black italic">{errors.price}</div>}
                            </div>
                        </div>

                        {/* CHAMP : DESCRIPTION (Optionnel pour l'instant) */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Status_Log</label>
                            <div className="relative skew-x-[-5deg]">
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-[#0D0D0D] border border-white/10 p-5 min-h-[100px] focus:border-white focus:ring-0 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BOUTON DE SAUVEGARDE */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="relative overflow-hidden bg-white text-black px-12 py-5 skew-x-[-15deg] font-[1000] uppercase tracking-[0.3em] italic hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                        <div className="flex items-center gap-3 skew-x-[15deg]">
                            <Save className="w-5 h-5" />
                            <span>Push_Changes</span>
                        </div>
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}