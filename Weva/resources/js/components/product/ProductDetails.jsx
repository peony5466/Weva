import { useCart } from "@/contexts/CartContext";
import Navbar from "../home/navbar";

export default function ProductDetails({ product }) {
  const cart = useCart();
  const addToCart = cart?.addToCart;

  if (!product) return <div>Produit introuvable</div>;

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        {/* Breadcrumb */}
        <Navbar />


        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            {/* Infos produit */}
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {product.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>

            {/* Images */}
            <div className="mt-8 lg:col-span-7 lg:row-span-3 lg:mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                <img
                  src={product.imageSrc}
                  className="rounded-lg lg:col-span-2 lg:row-span-2"
                  alt={product.name}
                />
                <img
                  src={product.imageSrc}
                  className="hidden rounded-lg lg:block"
                  alt=""
                />
                <img
                  src={product.imageSrc}
                  className="hidden rounded-lg lg:block"
                  alt=""
                />
              </div>
            </div>

            {/* Formulaire */}
            <div className="mt-8 lg:col-span-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addToCart?.(product);
                }}
              >
                {/* Couleur */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Color</h2>
                  <fieldset className="mt-2 flex items-center gap-x-3">
                    <label className="flex rounded-full border border-black/10">
                      <input
                        type="radio"
                        defaultChecked
                        className="h-8 w-8 appearance-none rounded-full bg-gray-900"
                      />
                    </label>
                  </fieldset>
                </div>

                {/* Taille */}
                <div className="mt-8">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {["XXS", "XS", "S", "M", "L", "XL"].map((size) => (
                      <label
                        key={size}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white p-3"
                      >
                        <input type="radio" name="size" className="hidden" />
                        <span className="text-sm font-medium text-gray-900">
                          {size}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
                >
                  Ajouter au panier
                </button>
              </form>

              {/* Description */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  {product.description || "This is a high quality product."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
