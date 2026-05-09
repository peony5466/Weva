import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Coins, CreditCard, Sparkles, Trash2, Upload } from 'lucide-react';

export default function CreateProduct({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        marque: '',
        composition: '',
        entretien: '',
        price: '',
        wt_price: '',
        is_exclusive: false,
        category_id: '',
        is_limited: false,
        image: null,
        variants: [{ size: '', stock: 0 }],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
            onError: (err) => console.log('Erreurs détectées :', err),
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
            <div className="min-h-screen bg-[#0A0A0A] p-6 font-sans text-[#E5E7EB] lg:p-10">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* --- ERROR TERMINAL --- */}
                    {Object.keys(errors).length > 0 && (
                        <div className="flex animate-pulse items-start gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
                            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                            <div className="space-y-1">
                                <p className="text-xs font-black tracking-widest text-red-500 uppercase">System_Validation_Error</p>
                                <ul className="list-inside list-disc font-mono text-[10px] text-red-400">
                                    {Object.entries(errors).map(([key, value]) => (
                                        <li key={key}>
                                            {key.toUpperCase()}: {value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">New_Asset_Registration</h1>
                            <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">Status: Drafting_Mode</p>
                        </div>
                        <Link
                            href={route('admin.products.index')}
                            className="flex items-center gap-2 rounded-full border border-white/5 px-4 py-2 text-xs tracking-widest text-gray-500 uppercase transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <ArrowLeft className="h-3 w-3" /> Return_To_Nexus
                        </Link>
                    </div>

                    <form onSubmit={submit} className="overflow-hidden rounded-xl border border-white/5 bg-[#111111] shadow-2xl">
                        <div className="space-y-10 p-8">
                            <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="space-y-6">
                                    {/* NOM */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Asset_Label</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={`w-full border bg-[#1A1A1A] ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white transition-all outline-none placeholder:text-gray-700 focus:border-[#E67E22]`}
                                            placeholder="EX: NEON_SILENCE_HOODIE"
                                        />
                                        {errors.name && <p className="mt-1 text-[10px] text-red-500 uppercase">{errors.name}</p>}
                                    </div>

                                    {/* CATEGORIE */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Classification</label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className={`w-full border bg-[#1A1A1A] ${errors.category_id ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white outline-none focus:border-[#E67E22]`}
                                        >
                                            <option value="">Select_Category</option>
                                            {categories?.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* SWITCH EXCLUSIF */}
                                    <button
                                        type="button"
                                        onClick={() => setData((prev) => ({
                                            ...prev,
                                            is_exclusive: !prev.is_exclusive,
                                            price: !prev.is_exclusive ? '' : prev.price,
                                            wt_price: !prev.is_exclusive ? prev.wt_price : '',
                                        }))}
                                        className={`flex w-full items-center justify-between rounded-lg border p-4 transition-all ${data.is_exclusive ? 'border-purple-500/50 bg-purple-500/10 text-purple-400' : 'border-white/5 bg-white/5 text-gray-400'}`}
                                    >
                                        <span className="text-[10px] font-black tracking-widest uppercase">WT_Exclusive</span>
                                        <div className={`h-2 w-2 rounded-full ${data.is_exclusive ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 'bg-gray-800'}`} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* PRIX DYNAMIQUE */}
                                    <div className="space-y-4 rounded-lg border border-white/5 bg-[#1A1A1A] p-6">
                                        {!data.is_exclusive ? (
                                            <div className="animate-in fade-in space-y-2 duration-500">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <CreditCard className="h-3 w-3 text-[#E67E22]" />
                                                    <label className="text-[11px] font-bold tracking-[0.2em] text-[#E67E22] uppercase">
                                                        Fiat_Price (EUR)
                                                    </label>
                                                </div>
                                                <input
                                                    type="number"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    className={`w-full border bg-black ${errors.price ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 font-mono text-sm text-white outline-none focus:border-[#E67E22]`}
                                                    placeholder="0.00"
                                                />
                                                <p className="text-[9px] text-gray-600 uppercase">Standard currency valuation</p>
                                            </div>
                                        ) : (
                                            <div className="animate-in fade-in space-y-2 duration-500">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <Coins className="h-3 w-3 text-amber-500" />
                                                    <label className="text-[11px] font-bold tracking-[0.2em] text-amber-500 uppercase">
                                                        Credit_Value (WT)
                                                    </label>
                                                </div>
                                                <input
                                                    type="number"
                                                    value={data.wt_price}
                                                    onChange={(e) => setData('wt_price', e.target.value)}
                                                    className={`w-full border bg-black ${errors.wt_price ? 'border-red-500' : 'border-amber-500/30'} rounded p-3 font-mono text-sm text-amber-500 outline-none`}
                                                    placeholder="5000"
                                                />
                                                <p className="text-[9px] text-amber-600 uppercase italic">High-value asset / Points only</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Description_Log</label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows="4"
                                            className={`w-full border bg-[#1A1A1A] ${errors.description ? 'border-red-500' : 'border-white/10'} resize-none rounded-lg p-3 text-sm text-white outline-none placeholder:text-gray-800 focus:border-[#E67E22]`}
                                            placeholder="TRANSMISSION_DETAILS..."
                                        />
                                    </div>

                                    {/* MARQUE */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Brand_Label</label>
                                        <input
                                            type="text"
                                            value={data.marque}
                                            onChange={(e) => setData('marque', e.target.value)}
                                            className={`w-full border bg-[#1A1A1A] ${errors.marque ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white transition-all outline-none placeholder:text-gray-700 focus:border-[#E67E22]`}
                                            placeholder="EX: WEVA_ORIGINAL"
                                        />
                                    </div>

                                    {/* COMPOSITION */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Composition_Matrix</label>
                                        <textarea
                                            value={data.composition}
                                            onChange={(e) => setData('composition', e.target.value)}
                                            rows="2"
                                            className={`w-full border bg-[#1A1A1A] ${errors.composition ? 'border-red-500' : 'border-white/10'} resize-none rounded-lg p-3 text-sm text-white outline-none placeholder:text-gray-800 focus:border-[#E67E22]`}
                                            placeholder="EX: 100% Cotton, 200 GSM..."
                                        />
                                    </div>

                                    {/* ENTRETIEN */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Care_Protocol</label>
                                        <textarea
                                            value={data.entretien}
                                            onChange={(e) => setData('entretien', e.target.value)}
                                            rows="2"
                                            className={`w-full border bg-[#1A1A1A] ${errors.entretien ? 'border-red-500' : 'border-white/10'} resize-none rounded-lg p-3 text-sm text-white outline-none placeholder:text-gray-800 focus:border-[#E67E22]`}
                                            placeholder="EX: Machine wash cold, do not bleach..."
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* ... Reste de ton formulaire (Image & Variants) inchangé ... */}
                            <hr className="border-white/5" />

                            <section className="space-y-4">
                                <label className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Visual_File</label>
                                <div
                                    className={`relative border-2 border-dashed ${errors.image ? 'border-red-500' : 'border-white/10'} flex min-h-[200px] flex-col items-center justify-center rounded-xl p-10 transition-all hover:bg-white/[0.02]`}
                                >
                                    <input
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                    />

                                    {data.image ? (
                                        <div className="flex flex-col items-center gap-4">
                                            {/* Petit aperçu temporaire de l'image sélectionnée */}
                                            <img
                                                src={URL.createObjectURL(data.image)}
                                                className="h-32 w-32 object-contain mix-blend-lighten"
                                                alt="Preview"
                                            />
                                            <span className="font-mono text-[10px] tracking-widest text-[#E67E22] uppercase">{data.image.name}</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4 text-gray-600">
                                            <Upload className="h-10 w-10 stroke-1" />
                                            <p className="text-[10px] tracking-widest uppercase">Drop_Asset_Here</p>
                                        </div>
                                    )}
                                </div>
                                {errors.image && <p className="mt-1 text-[10px] text-red-500 uppercase">{errors.image}</p>}
                            </section>

                            <hr className="border-white/5" />

                            <section className="space-y-6">
                                <label className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">Physical_Matrix</label>
                                <div className="space-y-3">
                                    {data.variants.map((variant, index) => (
                                        <div key={index} className="flex items-center gap-4 rounded-lg border border-white/5 bg-[#1A1A1A] p-4">
                                            <select
                                                value={variant.size}
                                                className="flex-1 border-none bg-transparent text-xs text-white outline-none"
                                                onChange={(e) => {
                                                    const v = [...data.variants];
                                                    v[index].size = e.target.value;
                                                    setData('variants', v);
                                                }}
                                            >
                                                <option value="" className="bg-black">
                                                    Size
                                                </option>
                                                {AVAILABLE_SIZES.map((s) => (
                                                    <option key={s} value={s} className="bg-black">
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                className="w-24 rounded border border-white/10 bg-black px-3 py-1.5 font-mono text-xs text-white"
                                                placeholder="QTY"
                                                value={variant.stock}
                                                onChange={(e) => {
                                                    const v = [...data.variants];
                                                    v[index].stock = +e.target.value;
                                                    setData('variants', v);
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(index)}
                                                className="text-gray-800 transition-all hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addVariant}
                                        className="mt-2 text-[10px] font-black tracking-[0.3em] text-[#E67E22] uppercase hover:text-white"
                                    >
                                        + Append_Variant
                                    </button>
                                </div>
                            </section>
                        </div>

                        <div className="flex justify-end gap-6 border-t border-white/5 bg-[#0F0F0F] px-8 py-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-[#E67E22] px-12 py-3 text-[11px] font-black tracking-[0.4em] text-black uppercase transition-all hover:bg-white active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Processing_Data...' : 'Confirm_Registration'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
