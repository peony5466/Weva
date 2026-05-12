import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Layers, Package, Plus, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getImageUrl } from '@/utils/image';

export default function Edit({ product, categories = [] }) {
    const [preview, setPreview] = useState(product.image_path ? getImageUrl(product.image_path) : null);

    // Initialisation
    const { data, setData, post, processing, errors, transform } = useForm({
        name: product.name || '',
        price: product.price || '',
        wt_price: product.wt_price || '',
        description: product.description || '',
        marque: product.marque || '',
        composition: product.composition || '',
        entretien: product.entretien || '',
        category_id: product.category_id || '',
        is_limited: product.is_limited == 1,
        is_exclusive: product.is_exclusive == 1,
        image: null,
        variants:
            product.variants?.map((v) => ({
                id: v.id,
                size: v.size,
                stock: v.stock,
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
        newVariants[index][field] = field === 'stock' ? parseInt(value) || 0 : value;
        setData('variants', newVariants);
    };

    const submit = (e) => {
        e.preventDefault();

        // On utilise la méthode post de useForm car on a utilisé transform() plus haut
        post(route('admin.products.update', product.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => alert('DATABASE_SYNC_COMPLETE'),
        });
    };

    const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'Unique'];

    return (
        <AppLayout>
            <Head title={`Edit ${product.name}`} />

            <div className="min-h-screen bg-[#0A0A0A] p-6 font-sans text-[#E5E7EB] lg:p-10">
                <div className="mx-auto max-w-6xl space-y-8">
                    {/* HEADER */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tighter text-white uppercase italic">Edit_Asset</h1>
                            <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-gray-500">NODE_ID: {product.id}</p>
                        </div>
                        <Link
                            href={route('admin.products.index')}
                            className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-500 uppercase transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" /> Return_To_Registry
                        </Link>
                    </div>

                    <form onSubmit={submit} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* COLONNE GAUCHE */}
                        <div className="space-y-6 lg:col-span-4">
                            <div className="space-y-4 rounded-xl border border-white/5 bg-[#111111] p-6 shadow-2xl">
                                <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                    <Layers className="h-3 w-3" /> Visual_Source
                                </label>
                                <div className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:opacity-100"
                                            alt="Preview"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-[10px] font-black text-gray-800 uppercase">
                                            No_Data_Link
                                        </div>
                                    )}
                                    <input type="file" onChange={handleImageChange} className="absolute inset-0 z-10 cursor-pointer opacity-0" />
                                </div>
                                {errors.image && <p className="text-[10px] font-black tracking-tighter text-red-500 uppercase">{errors.image}</p>}
                            </div>

                            {/* STATUS PANEL */}
                            <div className="space-y-4 rounded-xl border border-white/5 bg-[#111111] p-6">
                                <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Edition_Type</label>
                                <button
                                    type="button"
                                    onClick={() => setData('is_limited', !data.is_limited)}
                                    className={`flex w-full items-center justify-between rounded-lg border p-4 transition-all ${data.is_limited ? 'border-amber-500/50 bg-amber-500/10 text-amber-500' : 'border-white/5 bg-white/5 text-gray-400'}`}
                                >
                                    <span className="text-[10px] font-black tracking-widest uppercase">Limited_Protocol</span>
                                    <div
                                        className={`h-2 w-2 rounded-full ${data.is_limited ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-gray-800'}`}
                                    />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('is_exclusive', !data.is_exclusive)}
                                    className={`flex w-full items-center justify-between rounded-lg border p-4 transition-all ${data.is_exclusive ? 'border-purple-500/50 bg-purple-500/10 text-purple-400' : 'border-white/5 bg-white/5 text-gray-400'}`}
                                >
                                    <span className="text-[10px] font-black tracking-widest uppercase">WT_Exclusive</span>
                                    <div
                                        className={`h-2 w-2 rounded-full ${data.is_exclusive ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 'bg-gray-800'}`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* COLONNE DROITE */}
                        <div className="space-y-6 lg:col-span-8">
                            <div className="relative space-y-8 overflow-hidden rounded-xl border border-white/5 bg-[#111111] p-8 shadow-2xl">
                                {/* GLITCH DECORATION */}
                                <div className="pointer-events-none absolute top-0 right-0 p-2 font-mono text-[8px] text-white opacity-10">
                                    SYSTEM_EDIT_ENABLED_V3.1
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* MODE EUR */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                            {data.is_exclusive ? 'Price (EUR) - DISABLED' : 'Price (EUR)'}
                                        </label>
                                        <input
                                            type="number"
                                            disabled={data.is_exclusive}
                                            value={data.is_exclusive ? 0 : data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className={`w-full rounded-lg border bg-[#1A1A1A] p-3 font-mono text-sm text-white transition-all ${data.is_exclusive ? 'cursor-not-allowed border-white/5 opacity-30' : 'border-white/10'}`}
                                        />
                                    </div>

                                    {/* MODE WT */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                            {!data.is_exclusive ? 'WT_Value (Points) - DISABLED' : 'WT_Value (Points)'}
                                        </label>
                                        <input
                                            type="number"
                                            disabled={!data.is_exclusive}
                                            value={!data.is_exclusive ? 0 : data.wt_price}
                                            onChange={(e) => setData('wt_price', e.target.value)}
                                            className={`w-full rounded-lg border bg-[#1A1A1A] p-3 font-mono text-sm text-white transition-all ${!data.is_exclusive ? 'cursor-not-allowed border-white/5 opacity-30' : 'border-white/10'}`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                        <Tag className="h-3 w-3" /> Classification
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full appearance-none rounded-lg border border-white/10 bg-[#1A1A1A] p-3 text-sm text-white outline-none focus:border-[#E67E22]"
                                    >
                                        <option value="">UNCATEGORIZED_VOID</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id} className="bg-[#111]">
                                                {cat.name.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-[9px] font-bold text-red-500 italic">{errors.category_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Description_Manifest</label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full resize-none rounded-lg border border-white/10 bg-[#1A1A1A] p-3 text-sm text-white transition-all outline-none focus:border-[#E67E22]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Brand_Label</label>
                                    <input
                                        type="text"
                                        value={data.marque}
                                        onChange={(e) => setData('marque', e.target.value)}
                                        className="w-full rounded-lg border border-white/10 bg-[#1A1A1A] p-3 text-sm text-white transition-all outline-none focus:border-[#E67E22]"
                                        placeholder="EX: WEVA_ORIGINAL"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Composition_Matrix</label>
                                    <textarea
                                        rows="2"
                                        value={data.composition}
                                        onChange={(e) => setData('composition', e.target.value)}
                                        className="w-full resize-none rounded-lg border border-white/10 bg-[#1A1A1A] p-3 text-sm text-white transition-all outline-none focus:border-[#E67E22]"
                                        placeholder="EX: 100% Cotton, 200 GSM..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Care_Protocol</label>
                                    <textarea
                                        rows="2"
                                        value={data.entretien}
                                        onChange={(e) => setData('entretien', e.target.value)}
                                        className="w-full resize-none rounded-lg border border-white/10 bg-[#1A1A1A] p-3 text-sm text-white transition-all outline-none focus:border-[#E67E22]"
                                        placeholder="EX: Machine wash cold, do not bleach..."
                                    />
                                </div>

                                {/* INVENTORY MATRIX */}
                                <div className="space-y-6 border-t border-white/5 pt-6">
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                            <Package className="h-3 w-3" /> Quantity_Module
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addVariant}
                                            className="flex items-center gap-1 text-[9px] font-black tracking-widest text-[#E67E22] uppercase transition-all hover:text-white"
                                        >
                                            <Plus className="h-3 w-3" /> Add_Unit
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.variants.map((variant, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center gap-4 rounded-lg border border-white/5 bg-black/40 p-3 transition-all duration-300 hover:border-[#E67E22]/30"
                                            >
                                                <select
                                                    value={variant.size}
                                                    onChange={(e) => updateVariant(index, 'size', e.target.value)}
                                                    className="flex-1 cursor-pointer border-none bg-transparent text-[11px] font-black text-white uppercase focus:ring-0"
                                                >
                                                    <option value="" className="bg-[#111]">
                                                        SIZE_NULL
                                                    </option>
                                                    {AVAILABLE_SIZES.map((s) => (
                                                        <option key={s} value={s} className="bg-[#111]">
                                                            {s}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-2">
                                                    <label className="text-[8px] font-black text-gray-600 uppercase">Stock</label>
                                                    <input
                                                        type="number"
                                                        value={variant.stock}
                                                        onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                                        className="w-16 border-none bg-transparent p-0 text-center font-mono text-xs text-white focus:ring-0"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeVariant(index)}
                                                    className="p-1 text-gray-700 transition-colors hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ERREUR VARIANTS SPECIFIQUE */}
                                    {errors.variants && (
                                        <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                            <p className="text-[10px] font-black tracking-widest text-red-500 uppercase">
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
                                        className="w-full rounded-lg bg-[#E67E22] py-4 font-black tracking-[0.5em] text-black uppercase shadow-[0_10px_40px_rgba(230,126,34,0.1)] transition-all hover:bg-[#D35400] active:scale-[0.97] disabled:opacity-20"
                                    >
                                        {processing ? 'UPLOADING_LOGS...' : 'Commit_Changes'}
                                    </button>

                                    {Object.keys(errors).length > 0 && (
                                        <p className="mt-4 text-center text-[9px] font-bold tracking-widest text-red-500/60 uppercase">
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
