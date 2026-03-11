import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, Plus, Trash2, ArrowLeft, Upload, Image as ImageIcon, Sparkles, AlertCircle, Coins, CreditCard } from 'lucide-react';

export default function CreateProduct({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        wt_price: '',
        is_exclusive: false,
        category_id: '',
        is_limited: false,
        image: null,
        variants: [{ size: '', stock: 0 }]
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
            onError: (err) => console.log("Erreurs détectées :", err)
        });
    };

    const addVariant = () => setData('variants', [...data.variants, { size: '', stock: 0 }]);
    const removeVariant = (index) => {
        const newVariants = [...data.variants];
        newVariants.splice(index, 1);
        setData('variants', newVariants);
    };

    const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <AppLayout>
            <Head title="Create Asset — WEVA" />
            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] p-6 lg:p-10 font-sans">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* --- ERROR TERMINAL --- */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg flex gap-3 items-start animate-pulse">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <div className="space-y-1">
                                <p className="text-xs font-black uppercase tracking-widest text-red-500">System_Validation_Error</p>
                                <ul className="text-[10px] text-red-400 font-mono list-disc list-inside">
                                    {Object.entries(errors).map(([key, value]) => (
                                        <li key={key}>{key.toUpperCase()}: {value}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">New_Asset_Registration</h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Status: Drafting_Mode</p>
                        </div>
                        <Link href={route('admin.products.index')} className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center gap-2 border border-white/5 px-4 py-2 rounded-full hover:bg-white/5">
                            <ArrowLeft className="w-3 h-3" /> Return_To_Nexus
                        </Link>
                    </div>

                    <form onSubmit={submit} className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                        <div className="p-8 space-y-10">

                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    {/* NOM */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Asset_Label</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={`w-full bg-[#1A1A1A] border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none transition-all placeholder:text-gray-700`} placeholder="EX: NEON_SILENCE_HOODIE" />
                                        {errors.name && <p className="text-red-500 text-[10px] uppercase mt-1">{errors.name}</p>}
                                    </div>

                                    {/* CATEGORIE */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Classification</label>
                                        <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} className={`w-full bg-[#1A1A1A] border ${errors.category_id ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none`}>
                                            <option value="">Select_Category</option>
                                            {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                        </select>
                                    </div>

                                    {/* SWITCH EXCLUSIF */}
                                    <div className={`p-5 rounded-lg border transition-all duration-500 ${data.is_exclusive ? 'bg-amber-500/10 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-[#1A1A1A] border-white/5'}`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <Sparkles className={`w-4 h-4 ${data.is_exclusive ? 'text-amber-500' : 'text-gray-600'}`} />
                                                <label htmlFor="exclusive" className={`text-[11px] font-black uppercase tracking-[0.2em] cursor-pointer ${data.is_exclusive ? 'text-amber-500' : 'text-gray-500'}`}>
                                                    Exclusive_Vault
                                                </label>
                                            </div>
                                            <input
                                                type="checkbox"
                                                id="exclusive"
                                                checked={data.is_exclusive}
                                                onChange={e => {
                                                    setData(prev => ({
                                                        ...prev,
                                                        is_exclusive: e.target.checked,
                                                        price: e.target.checked ? '' : prev.price, // Reset prix fiat si exclusif
                                                        wt_price: e.target.checked ? prev.wt_price : '' // Reset points si pas exclusif
                                                    }));
                                                }}
                                                className="accent-amber-500 w-4 h-4 cursor-pointer"
                                            />
                                        </div>
                                        <p className="text-[9px] text-gray-600 uppercase leading-relaxed">
                                            {data.is_exclusive
                                                ? "Asset will be tradeable only via WT Credits. Fiat currency disabled."
                                                : "Standard transaction mode. Fiat currency enabled."}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* PRIX DYNAMIQUE */}
                                    <div className="bg-[#1A1A1A] p-6 rounded-lg border border-white/5 space-y-4">
                                        {!data.is_exclusive ? (
                                            <div className="space-y-2 animate-in fade-in duration-500">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CreditCard className="w-3 h-3 text-[#E67E22]" />
                                                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E67E22]">Fiat_Price (EUR)</label>
                                                </div>
                                                <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className={`w-full bg-black border ${errors.price ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none font-mono`} placeholder="0.00" />
                                                <p className="text-[9px] text-gray-600 uppercase">Standard currency valuation</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2 animate-in fade-in duration-500">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Coins className="w-3 h-3 text-amber-500" />
                                                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500">Credit_Value (WT)</label>
                                                </div>
                                                <input type="number" value={data.wt_price} onChange={e => setData('wt_price', e.target.value)} className={`w-full bg-black border ${errors.wt_price ? 'border-red-500' : 'border-amber-500/30'} rounded p-3 text-sm text-amber-500 outline-none font-mono`} placeholder="5000" />
                                                <p className="text-[9px] text-amber-600 uppercase italic">High-value asset / Points only</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Description_Log</label>
                                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows="4" className={`w-full bg-[#1A1A1A] border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none resize-none placeholder:text-gray-800`} placeholder="TRANSMISSION_DETAILS..." />
                                    </div>
                                </div>
                            </section>

                            {/* ... Reste de ton formulaire (Image & Variants) inchangé ... */}
                            <hr className="border-white/5" />

                            <section className="space-y-4">
                                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Visual_File</label>
                                <div className={`relative border-2 border-dashed ${errors.image ? 'border-red-500' : 'border-white/10'} rounded-xl p-10 hover:bg-white/[0.02] transition-all flex flex-col items-center justify-center min-h-[200px]`}>
                                    <input
                                        type="file"
                                        onChange={e => setData('image', e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />

                                    {data.image ? (
                                        <div className="flex flex-col items-center gap-4">
                                            {/* Petit aperçu temporaire de l'image sélectionnée */}
                                            <img
                                                src={URL.createObjectURL(data.image)}
                                                className="w-32 h-32 object-contain mix-blend-lighten"
                                                alt="Preview"
                                            />
                                            <span className="text-[10px] text-[#E67E22] font-mono uppercase tracking-widest">
                                                {data.image.name}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4 text-gray-600">
                                            <Upload className="w-10 h-10 stroke-1" />
                                            <p className="text-[10px] uppercase tracking-widest">Drop_Asset_Here</p>
                                        </div>
                                    )}
                                </div>
                                {errors.image && <p className="text-red-500 text-[10px] uppercase mt-1">{errors.image}</p>}
                            </section>

                            <hr className="border-white/5" />

                            <section className="space-y-6">
                                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Physical_Matrix</label>
                                <div className="space-y-3">
                                    {data.variants.map((variant, index) => (
                                        <div key={index} className="flex gap-4 items-center bg-[#1A1A1A] p-4 rounded-lg border border-white/5">
                                            <select value={variant.size} className="flex-1 bg-transparent border-none text-xs text-white outline-none" onChange={e => { const v = [...data.variants]; v[index].size = e.target.value; setData('variants', v); }}>
                                                <option value="" className="bg-black">Size</option>
                                                {AVAILABLE_SIZES.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                                            </select>
                                            <input type="number" className="w-24 bg-black border border-white/10 rounded px-3 py-1.5 text-xs text-white font-mono" placeholder="QTY" value={variant.stock} onChange={e => { const v = [...data.variants]; v[index].stock = +e.target.value; setData('variants', v); }} />
                                            <button type="button" onClick={() => removeVariant(index)} className="text-gray-800 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addVariant} className="text-[10px] font-black text-[#E67E22] hover:text-white uppercase tracking-[0.3em] mt-2">+ Append_Variant</button>
                                </div>
                            </section>
                        </div>

                        <div className="bg-[#0F0F0F] px-8 py-6 border-t border-white/5 flex justify-end gap-6">
                            <button type="submit" disabled={processing} className="bg-[#E67E22] hover:bg-white text-black px-12 py-3 rounded text-[11px] font-black uppercase tracking-[0.4em] transition-all active:scale-95 disabled:opacity-50">
                                {processing ? 'Processing_Data...' : 'Confirm_Registration'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}