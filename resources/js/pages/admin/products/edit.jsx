import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Save, ArrowLeft, Upload, Package, Layers, Plus, Trash2, Tag, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Edit({ product, categories = [] }) {
    const [preview, setPreview] = useState(product.image_path ? `/storage/${product.image_path}` : null);

    // Initialisation
    const { data, setData, post, processing, errors, transform } = useForm({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category_id: product.category_id || '',
        is_limited: product.is_limited == 1,
        image: null,
        variants: product.variants?.map(v => ({
            id: v.id,
            size: v.size,
            stock: v.stock
        })) || [],
        _method: 'PUT',
    });

    // On transforme les données JUSTE avant l'envoi pour que Laravel reçoive du JSON propre
    transform((data) => ({
        ...data,
        variants: JSON.stringify(data.variants),
    }));

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const addVariant = () => {
        setData('variants', [...data.variants, { size: '', stock: 0 }]);
    };

    const removeVariant = (index) => {
        const newVariants = [...data.variants];
        newVariants.splice(index, 1);
        setData('variants', newVariants);
    };

    const updateVariant = (index, field, value) => {
        const newVariants = [...data.variants];
        newVariants[index][field] = field === 'stock' ? (parseInt(value) || 0) : value;
        setData('variants', newVariants);
    };

    const submit = (e) => {
        e.preventDefault();

        // On utilise la méthode post de useForm car on a utilisé transform() plus haut
        post(route('admin.products.update', product.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => alert("DATABASE_SYNC_COMPLETE"),
        });
    };

    const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'Unique'];

    return (
        <AppLayout>
            <Head title={`Edit ${product.name}`} />

            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] p-6 lg:p-10 font-sans">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* HEADER */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-8">
                        <div>
                            <h1 className="text-3xl font-bold uppercase italic text-white tracking-tighter">Edit_Asset</h1>
                            <p className="text-[10px] text-gray-500 font-mono mt-1 tracking-[0.2em]">NODE_ID: {product.id}</p>
                        </div>
                        <Link href={route('admin.products.index')} className="text-gray-500 hover:text-white flex items-center gap-2 uppercase text-[10px] font-black tracking-widest transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Return_To_Registry
                        </Link>
                    </div>

                    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* COLONNE GAUCHE */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-[#111111] p-6 rounded-xl border border-white/5 space-y-4 shadow-2xl">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Layers className="w-3 h-3" /> Visual_Source
                                </label>
                                <div className="relative aspect-square bg-black rounded-lg border border-white/10 overflow-hidden group">
                                    {preview ? (
                                        <img src={preview} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" alt="Preview" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-800 uppercase font-black text-[10px]">No_Data_Link</div>
                                    )}
                                    <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                </div>
                                {errors.image && <p className="text-red-500 text-[10px] font-black uppercase tracking-tighter">{errors.image}</p>}
                            </div>

                            {/* STATUS PANEL */}
                            <div className="bg-[#111111] p-6 rounded-xl border border-white/5 space-y-4">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Edition_Type</label>
                                <button
                                    type="button"
                                    onClick={() => setData('is_limited', !data.is_limited)}
                                    className={`w-full p-4 rounded-lg border transition-all flex justify-between items-center ${data.is_limited ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'bg-white/5 border-white/5 text-gray-400'}`}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest">Limited_Protocol</span>
                                    <div className={`h-2 w-2 rounded-full ${data.is_limited ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-gray-800'}`} />
                                </button>
                            </div>
                        </div>

                        {/* COLONNE DROITE */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-[#111111] p-8 rounded-xl border border-white/5 space-y-8 shadow-2xl relative overflow-hidden">

                                {/* GLITCH DECORATION */}
                                <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none font-mono text-[8px] text-white">
                                    SYSTEM_EDIT_ENABLED_V3.1
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Asset_Label</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none transition-all placeholder:opacity-20" placeholder="ENTER_NAME..." />
                                        {errors.name && <p className="text-red-500 text-[9px] font-bold italic">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Unit_Value (EUR)</label>
                                        <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm font-mono text-white focus:border-[#E67E22] outline-none transition-all" />
                                        {errors.price && <p className="text-red-500 text-[9px] font-bold italic">{errors.price}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                        <Tag className="w-3 h-3" /> Classification
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none appearance-none"
                                    >
                                        <option value="">UNCATEGORIZED_VOID</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id} className="bg-[#111]">
                                                {cat.name.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-red-500 text-[9px] font-bold italic">{errors.category_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Description_Manifest</label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none resize-none transition-all"
                                    />
                                </div>

                                {/* INVENTORY MATRIX */}
                                <div className="space-y-6 pt-6 border-t border-white/5">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <Package className="w-3 h-3" /> Quantity_Module
                                        </label>
                                        <button type="button" onClick={addVariant} className="text-[9px] font-black text-[#E67E22] uppercase tracking-widest hover:text-white flex items-center gap-1 transition-all">
                                            <Plus className="w-3 h-3" /> Add_Unit
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.variants.map((variant, index) => (
                                            <div key={index} className="flex gap-4 items-center bg-black/40 p-3 rounded-lg border border-white/5 group hover:border-[#E67E22]/30 transition-all duration-300">
                                                <select
                                                    value={variant.size}
                                                    onChange={(e) => updateVariant(index, 'size', e.target.value)}
                                                    className="flex-1 bg-transparent border-none text-[11px] font-black text-white focus:ring-0 uppercase cursor-pointer"
                                                >
                                                    <option value="" className="bg-[#111]">SIZE_NULL</option>
                                                    {AVAILABLE_SIZES.map(s => <option key={s} value={s} className="bg-[#111]">{s}</option>)}
                                                </select>

                                                <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded border border-white/10">
                                                    <label className="text-[8px] font-black text-gray-600 uppercase">Stock</label>
                                                    <input
                                                        type="number"
                                                        value={variant.stock}
                                                        onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                                        className="w-16 bg-transparent border-none p-0 text-xs text-center text-white focus:ring-0 font-mono"
                                                    />
                                                </div>

                                                <button type="button" onClick={() => removeVariant(index)} className="text-gray-700 hover:text-red-500 transition-colors p-1">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ERREUR VARIANTS SPECIFIQUE */}
                                    {errors.variants && (
                                        <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg flex items-center gap-3">
                                            <AlertCircle className="w-4 h-4 text-red-500" />
                                            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">
                                                Sync_Denied: {errors.variants}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* FOOTER ACTIONS */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#E67E22] hover:bg-[#D35400] text-black py-4 rounded-lg font-black uppercase tracking-[0.5em] transition-all disabled:opacity-20 shadow-[0_10px_40px_rgba(230,126,34,0.1)] active:scale-[0.97]"
                                    >
                                        {processing ? 'UPLOADING_LOGS...' : 'Commit_Changes'}
                                    </button>

                                    {Object.keys(errors).length > 0 && (
                                        <p className="text-center mt-4 text-[9px] font-bold text-red-500/60 uppercase tracking-widest">
                                            Attention: {Object.keys(errors).length} validation_faults_detected
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}