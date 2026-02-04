import React from 'react';
import { usePage, router } from '@inertiajs/react';

import wevaXP from '@/assets/images/wevaXP.png';
import wevaRang from '@/assets/images/wava-rang.png';

const TokenPage = () => {


    const { auth } = usePage().props;
    const user = auth.user;

    const handleCardClick = () => {

        // verifie si co
        if (!user) {
            router.visit('/register');
            return;
        }

        // redirection de role
        if (user.role === 'admin') {
            router.visit('/admin/dashboard');
        } else {
            router.visit('/dashboard');
        }
    };

    const cardClasses = "relative flex h-[730px] w-[480px] flex-col items-start justify-end overflow-hidden rounded-[4px] bg-cover bg-center bg-no-repeat border border-gray-800 transition-transform duration-300 hover:scale-[1.01] cursor-pointer group";

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start bg-[#010101] p-10 pt-32">

            <div className="mb-20 text-center">
                <h1 className="text-5xl font-extrabold tracking-tighter text-white uppercase md:text-6xl">
                    L'ÉCOSYSTÈME WEVA
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                    Découvrez une nouvelle manière d'interagir avec l'univers WEVA.
                </p>
            </div>

            <div className="flex flex-row flex-wrap justify-center gap-[130px] pb-20">
                {/* Carte 1 */}
                <div
                    className={cardClasses}
                    style={{ backgroundImage: `url(${wevaXP})` }}
                    onClick={handleCardClick}
                >

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 p-10">
                        <h3 className="text-2xl font-bold tracking-wider text-white uppercase">Collecter des tokens</h3>
                        <p className="mt-2 text-gray-400">
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

                    <div className="relative z-10 p-10">
                        <h3 className="text-2xl font-bold tracking-wider text-white uppercase">Augmenter votre niveau</h3>
                        <p className="mt-2 text-gray-400">
                            Échangez vos tokens* WEVA XP contre des récompenses sur mesure.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenPage;