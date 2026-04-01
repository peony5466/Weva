import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const value = {
    cartItems,
    addToCart,
  };

  return (
    <CartContext.Provider value={{cartItems, addToCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    console.warn("useCart utilisé hors CartProvider");
    return null;
  }
  return context;
}
 export default CartProvider