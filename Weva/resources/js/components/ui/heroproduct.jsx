import React from 'react';
import silverFlower from '@/assets/images/silver-flower.png';
const HeroProduct = () => {
    return (
        <section className="relative w-full h-[80vh] overflow-hidden bg-gray-100">
            {/* L'image de l'accessoire */}
            <img
                src={silverFlower}
                alt="Accessoire de luxe"
                className="w-full h-full object-cover"
            />

            {/* Overlay texte en bas à gauche */}
            <div className="absolute bottom-16 left-8 md:left-20">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-black uppercase tracking-widest">
                    Silver Blossom
                </h2>
                <p className="mt-2 text-lg text-gray-700 font-light max-w-xs">
                    Bijou de bouton sculpté à la main.
                    L'élégance dans le moindre détail.
                </p>

                {/* Optionnel : Bouton d'action rapide */}
                {/* <button className="mt-6 px-8 py-3 bg-black text-white text-sm uppercase tracking-tighter hover:bg-gray-800 transition-colors">
                    Découvrir la pièce
                </button> */}
            </div>
        </section>
    );
};

export default HeroProduct;