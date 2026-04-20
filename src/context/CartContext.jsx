import { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext(null);

const CART_KEY = 'shopwave_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        toast.info(`Updated quantity for "${product.title.slice(0, 30)}..."`);
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success(`Added to cart!`);
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    toast.error('Removed from cart');
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const isInCart = useCallback(
    (productId) => cartItems.some((item) => item.productId === productId),
    [cartItems]
  );

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
