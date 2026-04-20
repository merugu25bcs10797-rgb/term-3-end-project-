/**
 * Format price to currency string
 */
export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

/**
 * Sort products based on sort option
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};

/**
 * Filter products by price range
 */
export const filterByPrice = (products, priceRange) => {
  if (!priceRange || priceRange === 'all') return products;
  const ranges = {
    '0-100': [0, 100],
    '100-500': [100, 500],
    '500-1000': [500, 1000],
    '1000+': [1000, Infinity],
  };
  const [min, max] = ranges[priceRange] || [0, Infinity];
  return products.filter((p) => p.price >= min && p.price <= max);
};

/**
 * Capitalize first letter of each word
 */
export const capitalize = (str) =>
  str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/**
 * Truncate text to given length
 */
export const truncate = (str, n = 60) =>
  str.length > n ? str.slice(0, n - 1) + '…' : str;

/**
 * Calculate cart totals
 */
export const calcCartTotals = (items) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

/**
 * Star rating array helper
 */
export const getStars = (rate) => {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};
