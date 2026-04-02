import Logo from '@/assets/images/Logo.svg';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogOut, Settings, ShoppingBag, X } from 'lucide-react';
import { Fragment, useState } from 'react';

export default function Navbar({ onOpenCart }) {
    const { auth, cartCount } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const navigation = [
        { name: 'Accueil', href: '/' },
        { name: 'Weva X Token', href: route('token.public') },
        { name: 'Collection', href: route('shop.index') },
    ];

    return (
        <>
            {/* HEADER */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:p-6 lg:px-8">

                    {/* gauche desktop */}
                    <div className="hidden lg:flex flex-1 gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 hover:text-gray-500 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* logo centre */}
                    <div className="flex justify-center lg:flex-1">
                        <Link href="/">
                            <img className="h-9 md:h-10 w-auto" src={Logo} alt="Weva Logo" />
                        </Link>
                    </div>

                    {/* droite */}
                    <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">

                        {/* panier */}
                        <button onClick={onOpenCart} className="relative group flex items-center gap-1">
                            <span className="hidden sm:block text-[11px] font-[1000] uppercase italic tracking-tighter group-hover:text-gray-400 transition">
                                Panier
                            </span>

                            <div className="relative">
                                <ShoppingBag className="h-5 w-5 text-gray-900 group-hover:text-gray-400 transition" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </button>

                        {/* auth */}
                        {auth.user ? (
                            <Menu as="div" className="relative">
                                <Menu.Button className="flex items-center gap-3 group">
                                    <div className="hidden sm:flex flex-col items-end mr-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                            {auth.user.points || 0} pts
                                        </span>
                                    </div>

                                    <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-black text-white">
                                        <span className="text-sm font-bold">
                                            {getInitials(auth.user.name)}
                                        </span>
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
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5">
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-sm font-semibold">{auth.user.name}</p>
                                            <p className="text-xs text-gray-400">{auth.user.email}</p>
                                        </div>

                                        <div className="p-1">
                                            <Menu.Item>
                                                <Link
                                                    href={auth.user.role === 'admin'
                                                        ? route('dashboard')
                                                        : route('wevavip')}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    {auth.user.role === 'admin'
                                                        ? 'Panel Admin'
                                                        : 'Vip Area'}
                                                </Link>
                                            </Menu.Item>

                                            <Menu.Item>
                                                <Link
                                                    href={route('profile.edit')}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Paramètres
                                                </Link>
                                            </Menu.Item>
                                        </div>

                                        <div className="p-1 border-t">
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
                            <div className="hidden sm:flex items-center gap-4">
                                <Link
                                    href={route('login')}
                                    className="text-xs font-black uppercase tracking-widest hover:text-gray-500"
                                >
                                    Connexion
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="bg-black px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-zinc-800"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        )}

                        {/* burger */}
                        <button
                            className="lg:hidden p-2"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>
                </nav>
            </header>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[100] bg-black text-white flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                            Menu
                        </span>

                        <button onClick={() => setMobileMenuOpen(false)}>
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="mt-10 flex flex-col gap-8 p-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-black uppercase tracking-tighter hover:text-gray-400"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {!auth.user && (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-3xl font-black uppercase"
                                >
                                    Login
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="text-3xl font-black uppercase"
                                >
                                    Join Us
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}