import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Plus, Layers, Edit3, Trash2, FolderPlus, Info } from 'lucide-react';

export default function CategoryIndex({ categories = [] }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Inventory', href: '/admin/products' },
        { title: 'Categories', href: '#' },
    ];

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
        if (confirm("CRITICAL_WARNING: Are you sure you want to terminate this category?")) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories — WEVA Admin" />

            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] font-sans p-6 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                            <nav className="text-xs text-gray-500 flex gap-2 items-center uppercase tracking-widest">
                                <span>Inventory</span>
                                <span>/</span>
                                <span className="text-gray-300">Classification</span>
                            </nav>
                            <h1 className="text-3xl font-bold tracking-tight text-white">System Categories</h1>
                        </div>

                        <button
                            onClick={handleCreate}
                            className="bg-[#E67E22] hover:bg-[#D35400] text-black text-xs font-bold py-3 px-6 rounded-md transition-all uppercase tracking-wider flex items-center gap-3 shadow-lg active:scale-95"
                        >
                            <Plus className="w-4 h-4 stroke-[3px]" />
                            Create Category
                        </button>
                    </div>

                    {/* --- INFORMATION ALERT --- */}
                    <div className="bg-[#1A1610] border border-[#F39C12]/20 rounded-lg p-4 flex gap-4 items-center">
                        <Info className="w-5 h-5 text-[#F39C12]" />
                        <p className="text-sm text-[#F39C12]/80">
                            Categories help organize your products into logical segments for the storefront.
                        </p>
                    </div>

                    {/* --- GRID DE CATÉGORIES --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat, i) => (
                            <div
                                key={i}
                                className="bg-[#111111] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-all duration-300 group relative overflow-hidden shadow-2xl"
                            >
                                {/* Background Accent au Hover */}
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <Layers className="w-16 h-16 text-white" />
                                </div>

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#E67E22]">
                                            <Layers className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                                            Ref_{cat.slug || cat.id}
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-white group-hover:text-[#E67E22] transition-colors">
                                            {cat.name}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {cat.count} Assets Linked
                                        </p>
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-white/5">
                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-3.5h-3.5" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* EMPTY STATE / QUICK ADD CARD */}
                        <button
                            onClick={handleCreate}
                            className="border-2 border-dashed border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-gray-600 hover:border-[#E67E22]/30 hover:text-gray-300 transition-all gap-4 bg-transparent group"
                        >
                            <FolderPlus className="w-10 h-10 opacity-20 group-hover:text-[#E67E22] group-hover:opacity-100 transition-all" />
                            <span className="text-xs font-bold uppercase tracking-widest italic">Initialize_New_Module</span>
                        </button>
                    </div>

                    {/* --- FOOTER STATUS --- */}
                    <footer className="pt-10 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                        <span>System_Status: Operational</span>
                        <span className="text-gray-800 italic">Weva_Registry_v2.0</span>
                    </footer>
                </div>
            </div>
        </AppLayout>
    );
}