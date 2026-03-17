import React from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import tokenCtaBg from '@/assets/images/bck-token.png';

const TokenCTA = () => {
    // On récupère l'objet auth depuis les props partagées d'Inertia
    const { auth } = usePage().props;
    const user = auth?.user;

    const handleCtaClick = () => {
        // Si l'utilisateur n'est pas connecté, on l'envoie vers l'inscription
        if (!user) {
            router.visit(route('register'));
        } else {
            // S'il est connecté, on l'envoie vers le dashboard
            router.visit(route('dashboard'));
        }
    };

    return (
        <div className="relative isolate overflow-hidden bg-[#010101] py-16 sm:py-24 lg:py-32">
            <div className="absolute inset-0 -z-10 bg-black/60" />
            <img
                src={tokenCtaBg}
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-40"
            />

            <div className="px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white sm:text-5xl lg:text-7xl">
                        Plongez dans un programme de fidélité unique
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-300 font-medium">
                        Nous tenons à récompenser votre soutien. Découvrez WEVA XP, notre programme de fidélité exclusif.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {/* On utilise un bouton pour exécuter la logique de redirection */}
                        <button
                            onClick={handleCtaClick}
                            className="rounded-none bg-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-gray-200 transition cursor-pointer"
                        >
                            {user ? 'Accéder_au_Dashboard' : 'Découvrir_XP'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenCTA;