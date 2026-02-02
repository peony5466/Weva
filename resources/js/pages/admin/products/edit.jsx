import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Upload, X, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Product Inventory', href: '/dashboard/admin/products' },
    { title: 'Edit Asset', href: '#' },
];

export default function Edit({ product, categories = [] }) {
    // État local pour la preview de l'image sélectionnée
    const [preview, setPreview] = useState(product.image_path ? `/storage/${product.image_path}` : null);


    const { data, setData, post, processing, errors } = useForm({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        // Utilise || '' pour forcer une chaîne vide au lieu de null/undefined
        category_id: product.category_id || '',
        is_limited: product.is_limited == 1,
        image: null,
        _method: 'PUT',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // On utilise POST avec _method PUT pour supporter l'upload de fichiers
        post(route('admin.products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
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

                <form onSubmit={submit} className="max-w-5xl space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* COLONNE GAUCHE : VISUAL ASSET */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Visual_Asset_Capture</label>

                            <div className="relative group aspect-[3/4] bg-[#0D0D0D] border-2 border-dashed border-white/10 hover:border-white/40 transition-all flex flex-col items-center justify-center overflow-hidden skew-x-[-2deg]">
                                {preview ? (
                                    <>
                                        <img src={preview} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Preview" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                        <button
                                            type="button"
                                            onClick={() => { setPreview(null); setData('image', null); }}
                                            className="absolute top-4 right-4 bg-red-600 p-2 hover:bg-red-500 transition-colors z-10"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-white/20 group-hover:text-white transition-colors">
                                        <Upload className="w-8 h-8" />
                                        <span className="text-[9px] font-black tracking-[0.3em] uppercase">Upload_Required</span>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-0"
                                />
                            </div>
                            {errors.image && <p className="text-red-500 text-[9px] uppercase font-black">{errors.image}</p>}
                        </div>

                        {/* COLONNE DROITE : FORMULAIRE DATA */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* NOM DU PRODUIT */}
                            <div className="space-y-4 group">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Designation_Label</label>
                                <div className="relative skew-x-[-5deg]">
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-[#0D0D0D] border border-white/10 p-5 text-xl font-bold uppercase tracking-tight focus:border-white focus:ring-0 transition-all outline-none text-white"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-[9px] uppercase font-black">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* PRIX */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Value_Currency_EUR</label>
                                    <div className="relative skew-x-[-5deg]">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="w-full bg-[#0D0D0D] border border-white/10 p-5 text-xl font-mono focus:border-white focus:ring-0 transition-all outline-none text-white"
                                        />
                                    </div>
                                    {errors.price && <p className="text-red-500 text-[9px] uppercase font-black">{errors.price}</p>}
                                </div>

                                {/* SÉLECTEUR DE CATÉGORIE */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">System_Classification</label>
                                    <div className="relative skew-x-[-5deg]">
                                        <select
                                            value={data.category_id}
                                            onChange={e => setData('category_id', e.target.value)}
                                            className="w-full bg-[#0D0D0D] border border-white/10 p-5 text-xs font-bold uppercase tracking-widest text-white outline-none focus:border-white transition-all appearance-none"
                                        >
                                            <option value="">NO_CATEGORY_ASSIGNED</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.category_id && <p className="text-red-500 text-[9px] uppercase font-black">{errors.category_id}</p>}
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Status_Log_Description</label>
                                <div className="relative skew-x-[-5deg]">
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-[#0D0D0D] border border-white/10 p-5 min-h-[120px] focus:border-white focus:ring-0 transition-all outline-none text-[12px] leading-relaxed text-white/80"
                                    />
                                </div>
                            </div>

                            {/* LIMITED EDITION SWITCH */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Special_Protocol</label>
                                <button
                                    type="button"
                                    onClick={() => setData('is_limited', !data.is_limited)}
                                    className={`w-full p-5 border transition-all skew-x-[-5deg] flex justify-between items-center group ${data.is_limited
                                        ? 'bg-red-600 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]'
                                        : 'bg-transparent border-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 italic font-black uppercase tracking-widest text-[10px]">
                                        <ShieldAlert className={`w-4 h-4 ${data.is_limited ? 'text-white' : 'text-white/20'}`} />
                                        <span className={data.is_limited ? 'text-white' : 'text-white/20'}>
                                            {data.is_limited ? 'Limited_Edition_Active' : 'Enable_Limited_Status'}
                                        </span>
                                    </div>
                                    <div className={`h-2 w-2 rounded-full ${data.is_limited ? 'bg-white animate-pulse' : 'bg-white/10'}`} />
                                </button>
                            </div>

                            {/* BOUTON DE SAUVEGARDE */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full relative overflow-hidden bg-white text-black py-6 skew-x-[-15deg] font-[1000] uppercase tracking-[0.5em] italic hover:bg-[#ccc] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                <div className="flex items-center justify-center gap-3 skew-x-[15deg]">
                                    <Save className="w-5 h-5" />
                                    <span>Sync_Database_v.1</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout >
    );
}