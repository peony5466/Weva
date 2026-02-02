import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, X, Plus, Trash2, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';

const breadcrumbs = [
    { title: 'System', href: '/dashboard' },
    { title: 'Inventory', href: '/admin/products' },
    { title: 'New_Asset', href: '#' },
];

export default function CreateProduct({ categories }) { // <--- AJOUTE LES CATEGORIES ICI
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '', // <--- AJOUT
        is_limited: false, // <--- AJOUT
        image: null, // <--- AJOUT
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
        // Utilise post() même pour les updates quand il y a des fichiers (Laravel/Inertia convention)
        post(route('admin.products.store'));
    };

    const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register — WEVA" />

            <div className="p-8 lg:p-12 min-h-screen bg-[#050505] text-white">

                {/* HEADER */}
                <header className="flex justify-between items-center border-b border-white/10 pb-10 mb-12">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Protocol_04_Creation</span>
                        <h1 className="text-6xl font-[1000] tracking-tighter uppercase bg-gradient-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent italic skew-x-[-10deg]">
                            New_Asset_Entry
                        </h1>
                    </div>

                    <Link href={route('admin.products.index')} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black tracking-widest uppercase italic">Abort_Mission</span>
                    </Link>
                </header>

                <form onSubmit={submit} className="max-w-5xl space-y-12 pb-20">

                    {/* SECTION 1: CORE DATA & CATEGORY */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            {/* DESIGNATION */}
                            <div className="relative group skew-x-[-5deg]">
                                <label className="block text-[10px] font-black tracking-[0.3em] uppercase text-white/20 mb-2 ml-2 italic">Designation_Label</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-[#0D0D0D] border border-white/10 p-4 text-sm font-bold tracking-widest uppercase focus:border-white focus:ring-0 outline-none transition-all placeholder:text-white/5"
                                    placeholder="ASSET_NAME..."
                                />
                                {errors.name && <p className="text-red-500 text-[9px] mt-2 font-black italic">{errors.name}</p>}
                            </div>

                            {/* CLASSIFICATION (CATEGORY) */}
                            <div className="relative group skew-x-[-5deg]">
                                <label className="block text-[10px] font-black tracking-[0.3em] uppercase text-white/20 mb-2 ml-2 italic">Classification_Module</label>
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="w-full bg-[#0D0D0D] border border-white/10 p-4 text-sm font-black tracking-widest uppercase focus:border-white outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-black">UNCLASSIFIED_ASSET</option>
                                    {categories?.map(cat => (
                                        <option key={cat.id} value={cat.id} className="bg-black">
                                            {cat.name.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* VALUE ASSESSMENT */}
                            <div className="relative group skew-x-[-5deg]">
                                <label className="block text-[10px] font-black tracking-[0.3em] uppercase text-white/20 mb-2 ml-2 italic">Value_Assessment (EUR)</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    className="w-full bg-[#0D0D0D] border border-white/10 p-4 text-sm font-bold tracking-widest focus:border-white focus:ring-0 outline-none transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* BRIEFING & OPTIONS */}
                        <div className="space-y-8">
                            <div className="relative group skew-x-[-5deg]">
                                <label className="block text-[10px] font-black tracking-[0.3em] uppercase text-white/20 mb-2 ml-2 italic">Detailed_Briefing</label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-[#0D0D0D] border border-white/10 p-4 text-sm font-medium tracking-wide focus:border-white focus:ring-0 outline-none transition-all"
                                />
                            </div>

                            {/* LIMITED EDITION CHECK */}
                            <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/5 skew-x-[-10deg]">
                                <input
                                    type="checkbox"
                                    id="limited"
                                    checked={data.is_limited}
                                    onChange={e => setData('is_limited', e.target.checked)}
                                    className="w-4 h-4 bg-black border-white/20 text-white rounded-none focus:ring-0"
                                />
                                <label htmlFor="limited" className="text-[10px] font-[1000] uppercase tracking-[0.3em] italic cursor-pointer skew-x-[10deg]">
                                    Limited_Edition_Protocol
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: VISUAL DATA (IMAGE) */}
                    <section className="space-y-6">
                        <div className="border-l-2 border-white/30 pl-4">
                            <h2 className="text-xl font-[1000] uppercase italic tracking-tighter">Visual_Data_Mapping</h2>
                        </div>

                        <div className="relative group border-2 border-dashed border-white/10 hover:border-white/30 transition-all p-12 text-center bg-[#080808] skew-x-[-5deg]">
                            <input
                                type="file"
                                onChange={e => setData('image', e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center gap-4 skew-x-[5deg]">
                                {data.image ? (
                                    <div className="flex items-center gap-4 text-green-500">
                                        <ImageIcon className="w-8 h-8" />
                                        <span className="text-[10px] font-black uppercase tracking-widest italic">{data.image.name}</span>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-white/10 group-hover:text-white transition-all" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic group-hover:text-white/40">Drop_Visual_Asset_Here</p>
                                    </>
                                )}
                            </div>
                        </div>
                        {errors.image && <p className="text-red-500 text-[9px] font-black italic">{errors.image}</p>}
                    </section>

                    {/* SECTION 4: VARIANTS TABLE */}
                    <section className="space-y-6">
                        <div className="flex justify-between items-center border-l-2 border-white/30 pl-4">
                            <h2 className="text-xl font-[1000] uppercase italic tracking-tighter">Variants_Matrix</h2>
                            <button
                                type="button"
                                onClick={addVariant}
                                className="px-4 py-1 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all skew-x-[-10deg]"
                            >
                                <span className="skew-x-[10deg] block">+ Add_Row</span>
                            </button>
                        </div>

                        <div className="space-y-2">
                            {data.variants.map((variant, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4 bg-[#080808] p-4 border border-white/5 skew-x-[-5deg] group hover:border-white/20 transition-all">
                                    <div className="relative skew-x-[5deg]">
                                        <select
                                            value={variant.size}
                                            className="w-full bg-transparent border-b border-white/10 p-2 text-[10px] font-black uppercase outline-none focus:border-white appearance-none cursor-pointer"
                                            onChange={e => {
                                                const v = [...data.variants];
                                                v[index].size = e.target.value;
                                                setData('variants', v);
                                            }}
                                        >
                                            <option value="" className="bg-[#050505]">SELECT_SIZE</option>
                                            {AVAILABLE_SIZES.map(size => (
                                                <option key={size} value={size} className="bg-[#050505] text-white">{size}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 text-[8px]">▼</div>
                                    </div>

                                    <input
                                        type="number"
                                        placeholder="STOCK"
                                        className="bg-transparent border-b border-white/10 p-2 text-[10px] font-black outline-none focus:border-white skew-x-[5deg]"
                                        onChange={e => {
                                            const v = [...data.variants];
                                            v[index].stock = e.target.value;
                                            setData('variants', v);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="flex justify-center items-center text-white/10 hover:text-red-500 transition-colors skew-x-[5deg]"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ACTION BUTTON */}
                    <div className="flex justify-end pt-12">
                        <button
                            type="submit"
                            disabled={processing}
                            className="relative overflow-hidden bg-white px-16 py-5 shadow-[0_0_50px_rgba(255,255,255,0.2)] skew-x-[-15deg] group transition-transform hover:scale-105 active:scale-95"
                        >
                            <div className="flex items-center gap-4 skew-x-[15deg]">
                                <Save className="w-5 h-5 text-black stroke-[3px]" />
                                <span className="text-[14px] font-[1000] text-black uppercase tracking-[0.5em] italic">
                                    {processing ? 'UPLOADING...' : 'INITIALIZE_ASSET'}
                                </span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}