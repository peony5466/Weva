import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, Plus, Trash2, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';

export default function CreateProduct({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '',
        is_limited: false,
        image: null,
        variants: [{ size: '', stock: 0 }]
    });

    const addVariant = () => {
        setData('variants', [...data.variants, { size: '', stock: 0 }]);
    };

    const removeVariant = (index) => {
        const newVariants = [...data.variants];
        newVariants.splice(index, 1);
        setData('variants', newVariants);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <AppLayout>
            <Head title="Create Product — WEVA" />

            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] font-sans p-6 lg:p-10">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* --- HEADER --- */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <nav className="text-xs text-gray-500 flex gap-2 items-center uppercase tracking-wider">
                                <span>Inventory</span>
                                <span>/</span>
                                <span className="text-gray-300">New_Asset</span>
                            </nav>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Create New Product</h1>
                        </div>
                        <Link
                            href={route('admin.products.index')}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Inventory
                        </Link>
                    </div>

                    {/* --- FORM CONTAINER --- */}
                    <form onSubmit={submit} className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden shadow-2xl">

                        <div className="p-8 space-y-10">

                            {/* SECTION 1: CORE DATA */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Product Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] outline-none transition-all"
                                            placeholder="Ex: Cyber-Hoddie v2"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Classification</label>
                                        <select
                                            value={data.category_id}
                                            onChange={e => setData('category_id', e.target.value)}
                                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none transition-all appearance-none"
                                        >
                                            <option value="">Select Category</option>
                                            {categories?.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Price (EUR)</label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Description</label>
                                        <textarea
                                            rows="5"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none transition-all resize-none"
                                            placeholder="Describe your asset..."
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-lg border border-white/5">
                                        <input
                                            type="checkbox"
                                            id="limited"
                                            checked={data.is_limited}
                                            onChange={e => setData('is_limited', e.target.checked)}
                                            className="w-4 h-4 rounded border-white/10 text-[#E67E22] focus:ring-[#E67E22] bg-black"
                                        />
                                        <label htmlFor="limited" className="text-xs font-semibold text-gray-300 cursor-pointer">
                                            Mark as Limited Edition Product
                                        </label>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-white/5" />

                            {/* SECTION 2: VISUAL ASSET */}
                            <section className="space-y-4">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Product Visual</label>
                                <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 transition-all hover:bg-white/[0.02] hover:border-white/20">
                                    <input
                                        type="file"
                                        onChange={e => setData('image', e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="flex flex-col items-center gap-3">
                                        {data.image ? (
                                            <div className="flex items-center gap-3 text-[#E67E22]">
                                                <ImageIcon className="w-8 h-8" />
                                                <span className="text-sm font-medium">{data.image.name}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-700" />
                                                <p className="text-sm text-gray-500">Click or drag image to upload</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <hr className="border-white/5" />

                            {/* SECTION 3: VARIANTS */}
                            <section className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Size & Stock Matrix</label>
                                    <button
                                        type="button"
                                        onClick={addVariant}
                                        className="text-[10px] font-bold uppercase tracking-widest text-[#E67E22] hover:text-white transition-colors"
                                    >
                                        + Add Variant
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {data.variants.map((variant, index) => (
                                        <div key={index} className="flex gap-4 items-center bg-[#1A1A1A] p-3 rounded-lg border border-white/5 group">
                                            <select
                                                value={variant.size}
                                                className="flex-1 bg-transparent border-none text-sm text-white focus:ring-0 cursor-pointer"
                                                onChange={e => {
                                                    const v = [...data.variants];
                                                    v[index].size = e.target.value;
                                                    setData('variants', v);
                                                }}
                                            >
                                                <option value="">Select Size</option>
                                                {AVAILABLE_SIZES.map(size => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>

                                            <input
                                                type="number"
                                                placeholder="Stock"
                                                className="w-24 bg-black/30 border border-white/10 rounded px-3 py-1 text-sm focus:border-[#E67E22] outline-none"
                                                value={variant.stock}
                                                onChange={e => {
                                                    const v = [...data.variants];
                                                    v[index].stock = e.target.value;
                                                    setData('variants', v);
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeVariant(index)}
                                                className="text-gray-700 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* --- FORM FOOTER --- */}
                        <div className="bg-[#0F0F0F] px-8 py-5 border-t border-white/5 flex justify-end gap-4">
                            <Link
                                href={route('admin.products.index')}
                                className="px-6 py-2 text-sm font-semibold text-gray-500 hover:text-white transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#E67E22] hover:bg-[#D35400] text-black px-8 py-2 rounded-md text-sm font-bold transition-all disabled:opacity-50"
                            >
                                {processing ? 'Initializing...' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}