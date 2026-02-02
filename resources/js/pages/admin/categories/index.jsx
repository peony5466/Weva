import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react'; // Import de router pour delete
import { Plus, Layers } from 'lucide-react';

export default function CategoryIndex({ categories = [] }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Inventory', href: '/dashboard/inventory' },
        { title: 'Categories', href: '/dashboard/inventory/categories' },
    ];
    // Fonction pour créer une catégorie
    const handleCreate = () => {
        const name = prompt("ENTER_NEW_CATEGORY_NAME:");
        if (name) {
            router.post(route('admin.categories.store'), { name });
        }
    };

    const handleEdit = (category) => {
        const newName = prompt("REWRITE_CATEGORY_NAME:", category.name);
        if (newName && newName !== category.name) {
            router.put(route('admin.categories.update', category.id), {
                name: newName
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("CRITICAL_WARNING: You are about to terminate this category node. Continue?")) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CATEGORIES — WEVA" />
            <div className="flex flex-col gap-12 p-8 lg:p-12 min-h-screen bg-[#050505] text-white overflow-hidden">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 relative group">
                    <div className="space-y-2">
                        <span className="text-[11px] tracking-[0.6em] text-white/30 uppercase font-black italic">Classification_Protocol</span>
                        <h1 className="text-7xl font-[1000] tracking-tighter leading-none uppercase bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] bg-clip-text text-transparent italic skew-x-[-10deg]">
                            System<br />Categories
                        </h1>
                    </div>

                    {/* ACTION CREATE */}
                    <button
                        onClick={handleCreate}
                        className="relative overflow-hidden bg-gradient-to-br from-[#fff] via-[#888] to-[#eee] px-10 py-4 shadow-[0_0_40px_rgba(255,255,255,0.15)] skew-x-[-15deg] border-r-4 border-white transition-transform hover:scale-105 active:scale-95 duration-300"
                    >
                        <div className="flex items-center gap-4 skew-x-[15deg]">
                            <Plus className="w-5 h-5 text-black stroke-[3px]" />
                            <p className="text-[12px] font-[1000] text-black uppercase tracking-[0.4em] italic">Create_New</p>
                        </div>
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {categories.map((cat, i) => (
                        <div key={i} className="relative group bg-[#0D0D0D] border border-white/5 p-12 overflow-hidden skew-x-[-5deg] hover:border-white transition-all duration-700">
                            <div className="relative z-10 skew-x-[5deg] space-y-8">
                                <div className="flex justify-between items-start">
                                    <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-bold italic">// REF_{cat.slug}</p>
                                    <Layers className="w-4 h-4 text-white/10 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h2 className="text-5xl font-[1000] tracking-tighter uppercase italic bg-gradient-to-b from-white via-[#999] to-[#444] bg-clip-text text-transparent leading-none mb-4">
                                        {cat.name}
                                    </h2>
                                    <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-bold italic">
                                        {cat.count} Units_Registered
                                    </p>
                                </div>
                                <div className="flex gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors italic border-b border-white/20"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-red-500 transition-colors italic border-b border-red-500/20"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* ... ton footer ... */}
            </div>
        </AppLayout>
    );
}