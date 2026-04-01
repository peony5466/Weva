import Home from '@/assets/images/Home.png';

export default function Example() {
    return (
        // 🛑 Le conteneur ne doit plus limiter la largeur (suppression de mx-auto max-w-7xl)
        <div className="bg-white">
            {/* J'ai supprimé max-w-7xl et les paddings horizontaux du conteneur extérieur pour la pleine largeur */}
            <div className="py-16 sm:py-24">
                <div className="relative h-[80vh] w-full overflow-hidden">
                    {/* L'image de fond */}
                    <div className="absolute inset-0">
                        <img alt="" src={Home} className="size-full object-cover" />
                    </div>

                    {/* Conteneur positionné en bas pour le texte et les boutons */}
                    <div className="absolute right-0 bottom-16 left-0 flex flex-col items-center justify-center text-center">
                        <h2 className="text-4xl font-semibold tracking-widest text-white uppercase">Weva 1® COLLECTION</h2>

                        <div className="mt-8 flex space-x-4">
                            <a
                                href="/shop"
                                className="rounded-full border border-white px-10 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                            >
                                Acheter maintenant
                            </a>
                            <a
                                href="/shop"
                                className="rounded-full border border-white px-10 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                            >
                                Voir la campagne
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
