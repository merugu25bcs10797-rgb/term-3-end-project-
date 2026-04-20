import { HiFilter, HiSortAscending, HiCurrencyDollar } from 'react-icons/hi';
import './Filters.css';

const Filters = ({ 
  categories, 
  currentCategory, 
  setCategory, 
  sortBy, 
  setSortBy, 
  priceRange, 
  setPriceRange 
}) => {
  return (
    <aside className="filters-sidebar glass">
      <div className="filter-section">
        <h4 className="filter-title">
          <HiFilter /> Categories
        </h4>
        <div className="category-list">
          <button 
            className={`category-btn ${currentCategory === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`category-btn ${currentCategory === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">
          <HiSortAscending /> Sort By
        </h4>
        <select 
          className="filter-select glass" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">
          <HiCurrencyDollar /> Price Range
        </h4>
        <div className="price-ranges">
          {['all', '0-100', '100-500', '500-1000', '1000+'].map((range) => (
            <label key={range} className="price-radio">
              <input 
                type="radio" 
                name="price" 
                value={range} 
                checked={priceRange === range}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <span className="radio-label">
                {range === 'all' ? 'All Prices' : range}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
