import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton-card glass animate-pulse">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
              <div className="skeleton-footer">
                <div className="skeleton-price"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
