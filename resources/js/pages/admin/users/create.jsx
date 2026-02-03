import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, Shield, User, Mail, Lock } from 'lucide-react';

export default function CreateUser() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'client', // Match ta migration enum ['admin', 'client']
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AppLayout>
            <Head title="New Citizen — WEVA" />

            <div className="min-h-screen bg-[#0A0A0A] text-[#E5E7EB] font-sans p-6 lg:p-10">
                <div className="max-w-2xl mx-auto space-y-8">

                    {/* --- HEADER --- */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <nav className="text-xs text-gray-500 flex gap-2 items-center uppercase tracking-widest">
                                <span>Administration</span>
                                <span>/</span>
                                <span className="text-gray-300">Identity_Protocol</span>
                            </nav>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Register Citizen</h1>
                        </div>
                        <Link
                            href={route('admin.users.index')}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Registry
                        </Link>
                    </div>

                    {/* --- FORM CONTAINER --- */}
                    <form onSubmit={submit} className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                        <div className="p-8 space-y-6">

                            {/* FULL NAME */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <User className="w-3 h-3" /> Full Identity
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    autoComplete="name"
                                    placeholder="e.g. John Doe"
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] outline-none transition-all"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                            </div>

                            {/* EMAIL ADDRESS */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Mail className="w-3 h-3" /> Digital Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    autoComplete="username"
                                    placeholder="citizen@protocol.com"
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] outline-none transition-all font-mono"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                            </div>

                            {/* PASSWORD */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Lock className="w-3 h-3" /> Access Keyphrase
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] focus:ring-1 focus:ring-[#E67E22] outline-none transition-all"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                            </div>

                            {/* CLEARANCE LEVEL (ROLE) */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <Shield className="w-3 h-3" /> Clearance Level
                                </label>
                                <select
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#E67E22] outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="client">Citizen_Level_01 (Client)</option>
                                    <option value="admin">Sys_Admin_Level_99 (Admin)</option>
                                </select>
                            </div>
                        </div>

                        {/* --- FORM FOOTER --- */}
                        <div className="bg-[#0F0F0F] px-8 py-5 border-t border-white/5 flex justify-end gap-4">
                            <Link
                                href={route('admin.users.index')}
                                className="px-6 py-2 text-sm font-semibold text-gray-500 hover:text-white transition-colors"
                            >
                                Abort
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#E67E22] hover:bg-[#D35400] text-black px-8 py-2 rounded-md text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Syncing...' : 'Confirm Registration'}
                            </button>
                        </div>
                    </form>

                    {/* SYSTEM NOTE */}
                    <div className="text-center">
                        <p className="text-[10px] text-gray-700 uppercase tracking-[0.5em] italic">
                            Identity_Verification_Protocol_Active
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}