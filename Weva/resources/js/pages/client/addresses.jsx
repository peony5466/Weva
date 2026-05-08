import ClientLayout from '@/layouts/client-layout';
import { Head, useForm } from '@inertiajs/react';
import { Check, Edit2, MapPin, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Addresses({ addresses = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        label: '',
        address: '',
        city: '',
        postal_code: '',
        country: 'France',
        phone: '',
        is_default: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(route('addresses.update', editingId), {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingId(null);
                    reset();
                },
            });
        } else {
            post(route('addresses.store'), {
                onSuccess: () => {
                    setShowForm(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (addr) => {
        setEditingId(addr.id);
        setData({
            label: addr.label,
            address: addr.address,
            city: addr.city,
            postal_code: addr.postal_code,
            country: addr.country || 'France',
            phone: addr.phone || '',
            is_default: addr.is_default,
        });
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm('Supprimer cette adresse ?')) {
            destroy(route('addresses.destroy', id));
        }
    };

    const handleSetDefault = (id) => {
        post(route('addresses.setDefault', id));
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingId(null);
        reset();
    };

    return (
        <ClientLayout>
            <Head title="Mes adresses — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20">
                <div className="mx-auto max-w-3xl space-y-8 px-6">
                    {/* Header */}
                    <div>
                        <p className="mb-2 text-[9px] font-bold tracking-[0.4em] text-gray-400 uppercase">WEVA · Mon compte</p>
                        <h1 className="text-3xl font-semibold tracking-tight text-black uppercase">Mes adresses</h1>
                    </div>

                    {/* Address List */}
                    <div className="border border-gray-100 bg-white">
                        <div className="flex items-center justify-between border-b border-gray-100 p-6">
                            <h2 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Adresses enregistrées</h2>
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex items-center gap-1 text-xs font-black tracking-widest text-black uppercase transition-colors hover:text-gray-600"
                            >
                                <Plus className="h-4 w-4" />
                                Ajouter
                            </button>
                        </div>

                        {addresses.length === 0 ? (
                            <div className="p-12 text-center text-sm text-gray-400">Aucune adresse enregistrée.</div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className="flex items-start justify-between p-6">
                                        <div className="flex gap-4">
                                            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gray-300" />
                                            <div>
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-black uppercase">{addr.label}</span>
                                                    {addr.is_default && (
                                                        <span className="bg-black px-2 py-0.5 text-[8px] font-bold tracking-wider text-white uppercase">
                                                            Défaut
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500">{addr.address}</p>
                                                <p className="text-sm text-gray-500">
                                                    {addr.postal_code} {addr.city}
                                                </p>
                                                <p className="text-sm text-gray-400">{addr.country}</p>
                                                {addr.phone && <p className="mt-1 text-sm text-gray-400">{addr.phone}</p>}
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            {!addr.is_default && (
                                                <button
                                                    onClick={() => handleSetDefault(addr.id)}
                                                    className="text-gray-300 transition-colors hover:text-black"
                                                    title="Définir par défaut"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </button>
                                            )}
                                            <button onClick={() => handleEdit(addr)} className="text-gray-300 transition-colors hover:text-black">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(addr.id)}
                                                className="text-gray-300 transition-colors hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Add/Edit Form Modal */}
                    {showForm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div className="w-full max-w-md bg-white p-6">
                                <h3 className="mb-6 text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
                                    {editingId ? "Modifier l'adresse" : 'Nouvelle adresse'}
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">Libellé</label>
                                        <input
                                            type="text"
                                            value={data.label}
                                            onChange={(e) => setData('label', e.target.value)}
                                            placeholder="Maison, Bureau, etc."
                                            required
                                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none"
                                        />
                                        {errors.label && <p className="mt-1 text-xs text-red-500">{errors.label}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">Adresse</label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Numéro, rue"
                                            required
                                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none"
                                        />
                                        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">Ville</label>
                                            <input
                                                type="text"
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                placeholder="Ville"
                                                required
                                                className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none"
                                            />
                                            {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">
                                                Code postal
                                            </label>
                                            <input
                                                type="text"
                                                value={data.postal_code}
                                                onChange={(e) => setData('postal_code', e.target.value)}
                                                placeholder="75001"
                                                required
                                                className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none"
                                            />
                                            {errors.postal_code && <p className="mt-1 text-xs text-red-500">{errors.postal_code}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">Pays</label>
                                        <input
                                            type="text"
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">
                                            Téléphone (optionnel)
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+33 6 00 00 00 00"
                                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="is_default"
                                            checked={data.is_default}
                                            onChange={(e) => setData('is_default', e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                        <label htmlFor="is_default" className="text-sm text-gray-600">
                                            Définir comme adresse par défaut
                                        </label>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={cancelForm}
                                            className="flex-1 border border-gray-200 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase transition-colors hover:border-gray-400"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-black py-3 text-[10px] font-black tracking-widest text-white uppercase transition-colors hover:bg-zinc-800 disabled:opacity-50"
                                        >
                                            {processing ? '...' : editingId ? 'Mettre à jour' : 'Ajouter'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}
