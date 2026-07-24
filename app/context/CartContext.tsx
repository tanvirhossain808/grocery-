"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product, CartItem } from "../types";
import { json } from "stream/consumers";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("app_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("app_cart", JSON.stringify(items));
  }, [items]);
  const addToCart = (product: Product, quantity = 1) => {
    setItems((pre) => {
      const existing = pre.find((item) => item.product._id === product._id);
      if (existing) {
        return pre.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...pre, { product, quantity }];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (productId: string) =>
    setItems((pre) => pre.filter((item) => item.product._id !== productId));
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((pre) =>
      pre.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    setIsCartOpen(false);
  };
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        clearCart,
        cartCount,
        cartTotal,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Use cart must be used within CartProvider");
  return context;
}
