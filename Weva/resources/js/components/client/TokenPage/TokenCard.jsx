import React from 'react';
import { usePage, router } from '@inertiajs/react';

import wevaXP from '@/assets/images/wevaXP.png';
import wevaRang from '@/assets/images/wava-rang.png';

const TokenPage = () => {
    const { auth } = usePage().props;
    const user = auth?.user; // Sécurisation avec le optional chaining

    const handleCardClick = () => {
        if (!user) {
            router.visit('/register');
            return;
        }
        // Redirige vers /dashboard, ton contrôleur interne se chargera de la redirection automatique
        router.visit('/dashboard');
    };

    // Style dynamique : on remplace les dimensions fixes par des tailles relatives ou max-width
    const cardClasses = "relative flex h-[500px] w-full max-w-[480px] sm:h-[600px] md:h-[730px] flex-col items-start justify-end overflow-hidden rounded-[4px] bg-cover bg-center bg-no-repeat border border-gray-800 transition-transform duration-300 hover:scale-[1.01] cursor-pointer group";

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start bg-[#010101] p-6 pt-24 md:p-10 md:pt-32">

            <div className="mb-12 text-center md:mb-20">
                <h1 className="text-3xl font-extrabold tracking-tighter text-white uppercase md:text-5xl lg:text-6xl">
                    L'ÉCOSYSTÈME WEVA
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-500 md:text-lg">
                    Découvrez une nouvelle manière d'interagir avec l'univers WEVA.
                </p>
            </div>

            {/* Ajustement du gap : plus petit sur mobile, plus grand sur desktop */}
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 md:gap-16 lg:gap-[130px] pb-20 w-full px-4">

                {/* Carte 1 */}
                <div
                    className={cardClasses}
                    style={{ backgroundImage: `url(${wevaXP})` }}
                    onClick={handleCardClick}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 p-6 md:p-10">
                        <h3 className="text-xl md:text-2xl font-bold tracking-wider text-white uppercase">Collecter des tokens</h3>
                        <p className="mt-2 text-sm md:text-base text-gray-400">
                            Achetez en ligne et en boutique pour obtenir des tokens*.
                        </p>
                    </div>
                </div>

                {/* Carte 2 */}
                <div
                    className={cardClasses}
                    style={{ backgroundImage: `url(${wevaRang})` }}
                    onClick={handleCardClick}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 p-6 md:p-10">
                        <h3 className="text-xl md:text-2xl font-bold tracking-wider text-white uppercase">Augmenter votre niveau</h3>
                        <p className="mt-2 text-sm md:text-base text-gray-400">
                            Échangez vos tokens* WEVA XP contre des récompenses sur mesure.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenPage;