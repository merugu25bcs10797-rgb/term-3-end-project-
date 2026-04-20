import { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export const WishlistContext = createContext(null);

const WISH_KEY = 'shopwave_wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.productId === product.id)) {
        toast.info('Already in wishlist!');
        return prev;
      }
      toast.success('Added to wishlist! ❤️');
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
    toast.error('Removed from wishlist');
  }, []);

  const isInWishlist = useCallback(
    (productId) => wishlistItems.some((item) => item.productId === productId),
    [wishlistItems]
  );

  const toggleWishlist = useCallback(
    (product) => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
