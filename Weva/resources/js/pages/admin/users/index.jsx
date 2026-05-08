import AppLayout from '@/layouts/app-layout';
import { Head, router, Link } from '@inertiajs/react';
import { Search, ShoppingCart, ShieldCheck, Ban, Trash2, UserCheck, UserPlus, Mail } from 'lucide-react';

export default function UserIndex({ users }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Users', href: '#' },
    ];

    const handleToggleBan = (id) => {
        if (confirm("PROTOCOL_CHANGE: Modifier l'accès de ce citoyen ?")) {
            router.patch(route('admin.users.ban', id));
        }
    };

    const handleDelete = (id) => {
        if (confirm("TERMINATE_IDENTITY: Cette action est irréversible. Confirmer ?")) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Registry — WEVA" />

            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] font-sans p-6 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                            <nav className="text-xs text-gray-500 flex gap-2 items-center uppercase tracking-widest">
                                <span>Administration</span>
                                <span>/</span>
                                <span className="text-gray-300">Population_Control</span>
                            </nav>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Users Registry</h1>
                        </div>

                        <Link
                            href={route('admin.users.create')}
                            className="bg-[#E67E22] hover:bg-[#D35400] text-black text-xs font-bold py-3 px-6 rounded-md transition-all uppercase tracking-wider flex items-center gap-3 shadow-lg active:scale-95"
                        >
                            <UserPlus className="w-4 h-4 stroke-[3px]" />
                            Register Citizen
                        </Link>
                    </div>

                    {/* --- SEARCH & STATS BAR --- */}
                    <div className="bg-[#111111] rounded-xl border border-white/5 p-4 flex flex-col md:flex-row gap-6 items-center justify-between shadow-2xl">
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#E67E22] transition-colors" />
                            <input
                                type="text"
                                placeholder="Identify citizen by ID or Name..."
                                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-[#E67E22] outline-none transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                Live_Database: <span className="text-white">{users.length} Citizens</span>
                            </div>
                        </div>
                    </div>

                    {/* --- USERS TABLE --- */}
                    <div className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.01]">
                                    <th className="px-6 py-5">Citizen_Identity</th>
                                    <th className="px-6 py-5 text-center">Access_Level</th>
                                    <th className="px-6 py-5 text-center">Status</th>
                                    <th className="px-6 py-5 text-center">Wallet</th>
                                    <th className="px-6 py-5 text-center">Activity</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((citizen) => (
                                    <tr key={citizen.id} className="hover:bg-white/[0.02] transition-all group">

                                        {/* IDENTITY */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white group-hover:text-[#E67E22] transition-colors">
                                                    {citizen.name}
                                                </span>
                                                <div className="flex items-center gap-1 text-[10px] text-gray-600 font-mono">
                                                    <Mail className="w-3 h-3" />
                                                    {citizen.email}
                                                </div>
                                            </div>
                                        </td>

                                        {/* ROLE */}
                                        <td className="px-6 py-4 text-center">
                                            {citizen.role === 'admin' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white text-black text-[9px] font-black uppercase tracking-tighter shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex px-2 py-1 rounded border border-white/10 text-gray-500 text-[9px] font-bold uppercase tracking-tighter">
                                                    Citizen
                                                </span>
                                            )}
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest border ${citizen.status === 'Banned'
                                                    ? 'border-red-500/30 text-red-500 bg-red-500/5'
                                                    : 'border-green-500/20 text-green-500 bg-green-500/5'
                                                }`}>
                                                {citizen.status || 'Active'}
                                            </span>
                                        </td>

                                        {/* WALLET */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold text-gray-300 font-mono italic">
                                                {citizen.balance ?? 0} <span className="text-[10px] opacity-30 text-white">WT</span>
                                            </span>
                                        </td>

                                        {/* ACTIVITY */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-2 text-gray-500">
                                                <ShoppingCart className="w-3.5 h-3.5 opacity-20" />
                                                <span className="text-[11px] font-bold">{citizen.orders_count ?? 0} PKT</span>
                                            </div>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-5">
                                                <button
                                                    onClick={() => handleToggleBan(citizen.id)}
                                                    className={`transition-all transform hover:scale-110 ${citizen.status === 'Banned' ? 'text-red-500' : 'text-gray-600 hover:text-white'
                                                        }`}
                                                    title={citizen.status === 'Banned' ? 'Unban User' : 'Ban User'}
                                                >
                                                    {citizen.status === 'Banned' ? <Ban className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(citizen.id)}
                                                    className="text-gray-800 hover:text-red-600 transition-colors transform hover:scale-110"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* --- FOOTER STATUS --- */}
                        <div className="bg-[#0F0F0F] px-6 py-4 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em]">
                            <span>Registry_Protocol_v2.1</span>
                            <span className="italic">Secured_Identity_Module</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}