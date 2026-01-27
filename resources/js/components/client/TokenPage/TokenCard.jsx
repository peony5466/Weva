import React from 'react';
import wevaXP from '@/assets/images/wevaXP.png';
import wevaRang from '@/assets/images/wava-rang.png';

const TokenPage = () => {
    const cardClasses = "relative flex h-[730px] w-[480px] flex-col items-start justify-end overflow-hidden rounded-[4px] bg-cover bg-center bg-no-repeat border border-gray-800 transition-transform duration-300 hover:scale-[1.01]";

    return (
        <div className=" pt-22 flex min-h-screen w-full flex-col items-center justify-center bg-[#010101] p-10">


            <div className="mb-20 text-center">
                <h1 className="text-5xl font-extrabold tracking-tighter text-white  md:text-5xl">
                    Nouveau programme de fidélité
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                    Nous tenons à récompenser votre soutien. Découvrez Weva XP, notre programme de fidélité exclusif qui vous ouvre les portes de l’univers Weva.
                </p>
            </div>

            {/* --- Conteneur Cartes --- */}
            <div className="flex flex-row flex-wrap justify-center gap-[130px]">

                {/* Carte 1 */}
                <div
                    className={cardClasses}
                    style={{ backgroundImage: `url(${wevaXP})` }}
                >
                    <div className="absolute inset-0 cursor-pointer bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="relative z-10 p-10">
                        <h3 className="text-2xl font-bold tracking-wider text-white uppercase">Collecter des tokens</h3>
                        <p className="mt-2 text-gray-400">
                            Achetez en ligne et en boutique pour obtenir des tokens* . Ces objets digitaux très demandés permettent d’accéder au meilleur de WEVA.
                        </p>
                    </div>
                </div>

                {/* Carte 2 */}
                <div
                    className={cardClasses}
                    style={{ backgroundImage: `url(${wevaRang})` }}
                >
                    <div className="absolute inset-0 cursor-pointer bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="relative z-10 p-10">
                        <h3 className="text-2xl font-bold tracking-wider text-white uppercase">Augmenter votre niveau</h3>
                        <p className="mt-2 text-gray-400">
                            Une fois débloqués, les tokens* WEVA XP peuvent être échangés contre des récompenses sur mesure. Remises exclusives, cadeaux personnalisés ou expériences inoubliables : à chaque token* sa récompense.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TokenPage;