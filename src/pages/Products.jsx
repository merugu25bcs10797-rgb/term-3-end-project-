import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/Product/ProductGrid';
import Filters from '../components/Filters/Filters';
import { fetchCategories } from '../services/api';
import { useState } from 'react';
import './Products.css';

const Products = () => {
  const { 
    products, 
    loading, 
    category, 
    setCategory, 
    sortBy, 
    setSortBy, 
    priceRange, 
    setPriceRange,
    searchQuery,
    setSearchQuery
  } = useProducts();
  
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadCats = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCats();
  }, []);

  // Handle URL search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    const searchParam = params.get('search');
    
    if (catParam) setCategory(catParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [location.search, setCategory, setSearchQuery]);

  return (
    <div className="products-page container section-padding">
      <header className="page-header">
        <div className="header-content">
          <h1 className="page-title">Explore Collection</h1>
          <p className="page-subtitle">Showing {products.length} products</p>
        </div>
        
        {/* Category Tabs */}
        <div className="category-tabs">
          <button 
            className={`tab-btn ${category === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`tab-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="products-layout">
        <Filters 
          categories={categories}
          currentCategory={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        
        <main className="products-main">
          {searchQuery && (
            <div className="search-result-info">
              <p>Search results for: <strong>"{searchQuery}"</strong></p>
              <button 
                className="clear-search" 
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            </div>
          )}
          <ProductGrid products={products} loading={loading} />
        </main>
      </div>
    </div>
  );
};

export default Products;
