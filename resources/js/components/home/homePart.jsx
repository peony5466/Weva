import Home from '@/assets/images/Home.png'; 

export default function Example() {
  return (
    // 🛑 Le conteneur ne doit plus limiter la largeur (suppression de mx-auto max-w-7xl)
    <div className="bg-white">
      {/* J'ai supprimé max-w-7xl et les paddings horizontaux du conteneur extérieur pour la pleine largeur */}
      <div className="py-16 sm:py-24">
        <div className="relative overflow-hidden">
          {/* Section d'image de fond qui prend toute la largeur/hauteur de la fenêtre parente */}
          <div className="absolute inset-0">
            <img
              alt=""
              src={Home}
              className="size-full object-cover"
            />
          </div>
          
          {/* Contenu textuel avec fond semi-transparent */}
          <div className="relative bg-gray-900/75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block sm:inline">Level up</span>
                <span className="block sm:inline">your desk</span>
              </h2>
              <p className="mt-3 text-xl text-white">
                Make your desk beautiful and organized. Post a picture to social media and watch it get more likes than
                life-changing announcements. Reflect on the shallow nature of existence. At least you have a really nice
                desk setup.
              </p>
              
              {/* Conteneur pour les deux boutons */}
              <div className="mt-8 flex space-x-4">
                
                {/*  Bouton   */}
                <a
                  href="#"
                  className="block w-full rounded-full border-2 border-white bg-transparent px-8 py-3 text-base font-medium text-white hover:bg-white/10 sm:w-auto transition duration-150"
                >
                  Shop Workspace
                </a>

                {/* BOUTON : Transparent, bordure blanche, coins arrondis  */}
                <a
                  href="#"
                  // Style pour le bouton transparent, bordure blanche et coins ronds
                  className="block w-full rounded-full border-2 border-white bg-transparent px-8 py-3 text-base font-medium text-white hover:bg-white/10 sm:w-auto transition duration-150"
                >
                  View Details
                </a>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}