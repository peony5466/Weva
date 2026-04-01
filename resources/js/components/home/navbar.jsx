import { useState, Fragment } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react';
import {
    LayoutDashboard,
    Settings,
    LogOut,
    ShoppingBag
} from 'lucide-react'
import { Bars3Icon } from '@heroicons/react/24/outline';
import Logo from '@/assets/images/Logo.svg';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '@/assets/images/wevaLogo.png';

export default function Navbar({ onOpenCart }) {
    // On récupère tout ce dont on a besoin depuis les props globales d'Inertia
    const { auth, cartCount } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fonction pour générer les initiales (ex: "John Doe" -> "JD")
    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Weva X Token', href: route('token.public') },
        { name: 'Collection', href: route('shop.index') },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

                {/* 1. GAUCHE : Navigation Desktop */}
                <div className="hidden lg:flex lg:gap-x-8 flex-1">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 hover:text-gray-500 transition">
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* 2. CENTRE : Logo */}
                <div className="flex lg:flex-1 justify-center">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <img className="h-10 w-auto" src={Logo} alt="Weva Logo" />
                    </Link>
                </div>

                {/* 3. DROITE : Actions */}
                <div className="flex flex-1 justify-end items-center gap-6">

                    {/* BOUTON PANIER (Visible par tous) */}
                    <button
                        onClick={onOpenCart}
                        className="relative group flex items-center gap-1 focus:outline-none"
                    >
                        <span className="text-[11px] font-[1000] uppercase italic tracking-tighter group-hover:text-gray-400 transition">
                            Your_Bag
                        </span>
                        <div className="relative">
                            <ShoppingBag className="w-5 h-5 text-gray-900 group-hover:text-gray-400 transition" strokeWidth={2.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </button>

                    {/* AUTHENTIFICATION */}
                    {auth.user ? (
                        <Menu as="div" className="relative ml-3">
                            <Menu.Button className="flex items-center gap-3 focus:outline-none group">
                                {/* Affichage des points si disponible */}
                                <div className="hidden sm:flex flex-col items-end mr-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                                        {auth.user.points || 0} PTS
                                    </span>
                                </div>

                                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white border-2 border-transparent group-hover:border-gray-300 transition-all">
                                    <span className="text-sm font-bold">{getInitials(auth.user.name)}</span>
                                </div>
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                                    </div>

                                    <div className="p-1">
                                        <Menu.Item>
                                            <Link
                                                href={auth.user.role === 'admin' ? route('dashboard') : route('wevavip')}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                {auth.user.role === 'admin' ? 'Panel Admin' : 'Vip Area'}
                                            </Link>
                                        </Menu.Item>

                                        <Menu.Item>
                                            <Link href={route('profile.edit')} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                                                <Settings className="w-4 h-4" />
                                                Paramètres
                                            </Link>
                                        </Menu.Item>
                                    </div>

                                    <div className="p-1 border-t border-gray-100">
                                        <Menu.Item>
                                            <Link
                                                method="post"
                                                href={route('logout')}
                                                as="button"
                                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Déconnexion
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    ) : (
                        <div className="flex items-center gap-x-4">
                            <Link href={route('login')} className="text-xs font-black uppercase tracking-widest text-gray-900 hover:text-gray-500 transition">
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-none bg-black px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm hover:bg-zinc-800 transition"
                            >
                                JOIN_US
                            </Link>
                        </div>
                    )}

                    {/* Menu Mobile Button */}
                    <button type="button" className="lg:hidden p-2 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>
            </nav>
        </header>
    );
}