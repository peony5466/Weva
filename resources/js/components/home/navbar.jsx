import Logo from '@/assets/images/wevaLogo.png';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogOut, Settings, ShoppingBag } from 'lucide-react';
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
        { name: 'Home', href: '/' },
        { name: 'Weva X Token', href: route('token.public') },
        { name: 'Collection', href: route('shop.index') },
    ];

    return (
        <>
            {/* HEADER FIXE */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="hidden flex-1 lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[11px] font-black tracking-[0.2em] text-gray-900 uppercase transition hover:text-gray-500"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <img className="h-10 w-auto" src={Logo} alt="Weva Logo" />
                        </Link>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-6">
                        <button onClick={onOpenCart} className="group relative flex items-center gap-1 focus:outline-none">
                            <span className="text-[11px] font-[1000] tracking-tighter uppercase italic transition group-hover:text-gray-400">
                                Your_Bag
                            </span>
                            <div className="relative">
                                <ShoppingBag className="h-5 w-5 text-gray-900 transition group-hover:text-gray-400" strokeWidth={2.5} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </button>

                        {auth.user ? (
                            <Menu as="div" className="relative ml-3">
                                <Menu.Button className="group flex items-center gap-3 focus:outline-none">
                                    <div className="mr-2 hidden flex-col items-end sm:flex">
                                        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
                                            {auth.user.points || 0} PTS
                                        </span>
                                    </div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-transparent bg-black text-white transition-all group-hover:border-gray-300">
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
                                    <Menu.Items className="ring-opacity-5 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black focus:outline-none">
                                        <div className="border-b border-gray-100 px-4 py-3">
                                            <p className="text-sm font-semibold text-gray-900">{auth.user.name}</p>
                                        </div>
                                        <div className="p-1">
                                            <Menu.Item>
                                                <Link
                                                    href={auth.user.role === 'admin' ? route('dashboard') : route('wevavip')}
                                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <LayoutDashboard className="h-4 w-4" /> {auth.user.role === 'admin' ? 'Panel Admin' : 'Vip Area'}
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link
                                                    href={route('profile.edit')}
                                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <Settings className="h-4 w-4" /> Paramètres
                                                </Link>
                                            </Menu.Item>
                                        </div>
                                        <div className="border-t border-gray-100 p-1">
                                            <Menu.Item>
                                                <Link
                                                    method="post"
                                                    href={route('logout')}
                                                    as="button"
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <LogOut className="h-4 w-4" /> Déconnexion
                                                </Link>
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ) : (
                            <div className="flex items-center gap-x-4">
                                <Link
                                    href={route('login')}
                                    className="text-xs font-black tracking-widest text-gray-900 uppercase transition hover:text-gray-500"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-none bg-black px-6 py-2 text-[10px] font-black tracking-[0.2em] text-white uppercase shadow-sm transition hover:bg-zinc-800"
                                >
                                    JOIN_US
                                </Link>
                            </div>
                        )}

                        <button type="button" className="p-2 text-gray-700 lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>
                </nav>
            </header>

            {/* MENU MOBILE (Sorti du Header pour éviter les conflits CSS) */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col bg-[#050505] pt-6 text-white lg:hidden">
                    <div className="flex items-center justify-between border-b border-white/10 p-6">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Navigation_Menu</span>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="mt-10 flex flex-col gap-8 p-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-black tracking-tighter text-white uppercase transition-colors hover:text-[#E67E22]"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
