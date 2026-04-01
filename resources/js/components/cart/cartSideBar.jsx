// resources/js/components/cart/CartSidebar.jsx
import { useCart } from '@/contexts/CartContext';

export default function CartSidebar() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0)
    return <p className="p-4 text-gray-700">Votre panier est vide</p>;

  return (
    <div className="w-96 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Panier</h2>
      <ul className="space-y-3">
        {cartItems.map(item => (
          <li key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{item.price}</p>
              <button
                className="text-red-500 hover:underline"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        onClick={clearCart}
      >
        Vider le panier
      </button>
    </div>
  );
}
