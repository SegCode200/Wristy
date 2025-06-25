import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast"

interface WatchItem {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  category: "Men" | "Women" | "Others" | "All";
  quantity?: number; // used when added to cart
}
interface CartContextType {
  cartItems: WatchItem[];
  addToCart: (item: WatchItem) => void;
  increaseQty: (id: string | number) => void;
  decreaseQty: (id: string | number) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: any }) => {
  const [cartItems, setCartItems] = useState<WatchItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (watch: WatchItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === watch.id);
      if (existing) {
        toast.success("🛍 Added to cart");
        return prev.map((item) =>
          item.id === watch.id ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item
        );
      } else {
        toast.success("🛍 Added to cart");
        return [...prev, { ...watch, quantity: 1 }];
      }
    });

  };

  const increaseQty = (id: string | number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string | number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max((item.quantity ?? 1) - 1, 0) }
            : item
        )
        .filter((item) => (item.quantity ?? 1) > 0)
    );
  };

  const removeFromCart = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
