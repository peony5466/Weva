'use client'

import { useState } from 'react'
import { Link } from '@inertiajs/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '@/assets/images/Logo.svg'; 


// Note: J'ai conservé le Dialog et l'état 'open' pour le menu mobile, mais j'ai retiré les catégories complexes.

const simpleNavigation = [
    { name: 'Home', href: '#' },
    { name: 'Weva X Token', href: '#' },
    { name: 'Collection', href: '#' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false) // Pour la gestion du menu mobile

    return (
        <div className="bg-white">
            {/* Menu Mobile Simplifié (juste pour la structure) */}
            {/* J'ai omis le code du Dialog/DialogPanel pour garder le focus sur la structure Desktop principale. */}
            {/* ... (Le code du menu mobile reste inchangé ou devrait être ajusté pour refléter simpleNavigation) ... */}

            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Conteneur principal de la barre de navigation */}
                    <div className="flex h-16 items-center justify-between border-b border-gray-200">
                        
                        {/* 1. 👈 Liens de navigation (Gauche) */}
                        <div className="hidden lg:flex lg:gap-x-12 flex-1">
                            {simpleNavigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* 2. 🏛️ Logo Centré */}
                        <div className="flex justify-center flex-1">
                            <a href="#">
                                <span className="sr-only">Weva</span>
                                <img
                                    alt="Company Logo"
                                    src={Logo}
                                    // ⬆️ MODIFICATION ICI : HAUTEUR CHANGÉE DE h-8 à h-10 
                                    className="h-10 w-auto" 
                                />
                            </a>
                        </div>
                        
                        {/* 3. 👉 Authentification (Droite) */}
                        <div className="flex items-center justify-end flex-1 space-x-4">
                            
                            {/* Bouton pour ouvrir le menu mobile (visible sur mobile) */}
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="lg:hidden -ml-2 rounded-md bg-white p-2 text-gray-400"
                            >
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Sign In (Visible sur desktop et mobile) */}
                            <a 
                                href={route('login')} 
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                            >
                                Sign in
                            </a>
                            
                            {/* Sign Up (Bouton Noir) (Visible sur desktop) */}
                            <Link 
                                href={route('register')} 
                                className="hidden lg:block rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition"
                            >
                                Sign up
                            </Link>

                        </div>

                    </div>
                </nav>
            </header>
        </div>
    )
}