import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAllProducts, fetchProductsByCategory } from '../services/api';
import { sortProducts, filterByPrice } from '../utils/helpers';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (category && category !== 'all') {
        data = await fetchProductsByCategory(category);
      } else {
        data = await fetchAllProducts();
      }
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    result = filterByPrice(result, priceRange);
    result = sortProducts(result, sortBy);
    return result;
  }, [products, searchQuery, priceRange, sortBy]);

  return {
    products: filteredProducts,
    loading,
    error,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    refetch: loadProducts,
  };
};

export default useProducts;
