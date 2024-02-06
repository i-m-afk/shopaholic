import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const getCartItems = async () => {
    const existingItems = localStorage.getItem("cart");
    setCartItem(JSON.parse(existingItems) || []);
  };
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <CartContext.Provider value={[cartItem, setCartItem]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook for using this context anywhere in the app;

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
