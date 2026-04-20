import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineShoppingCart, HiOutlineHeart, HiHeart, HiStar, HiArrowLeft, HiMinus, HiPlus } from 'react-icons/hi';
import { fetchProductById } from '../services/api';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import { formatPrice } from '../utils/helpers';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-page container section-padding">
        <div className="skeleton-details">
          <div className="skeleton-image-large animate-pulse"></div>
          <div className="skeleton-info-large">
            <div className="skeleton-line-lg animate-pulse" style={{width: '80%'}}></div>
            <div className="skeleton-line-lg animate-pulse" style={{width: '40%'}}></div>
            <div className="skeleton-line-lg animate-pulse" style={{width: '90%', height: '150px'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="container section-padding">Product not found</div>;

  const inCart = isInCart(product.id);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="product-details-page container section-padding">
      <Link to="/products" className="back-link">
        <HiArrowLeft /> Back to Products
      </Link>

      <div className="details-layout">
        <div className="details-image-section">
          <div className="main-image-container glass">
            <img src={product.image} alt={product.title} />
          </div>
          <button 
            className={`detail-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={() => toggleWishlist(product)}
          >
            {isWishlisted ? <HiHeart /> : <HiOutlineHeart />}
            {isWishlisted ? 'Saved' : 'Add to Wishlist'}
          </button>
        </div>

        <div className="details-info-section">
          <div className="info-header">
            <span className="info-category">{product.category}</span>
            <div className="info-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className={i < Math.floor(product.rating.rate) ? 'star-filled' : 'star-empty'} />
                ))}
              </div>
              <span className="rating-text">{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>
          </div>

          <h1 className="info-title">{product.title}</h1>
          <p className="info-price">{formatPrice(product.price)}</p>
          
          <div className="info-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="info-actions">
            <div className="quantity-selector glass">
              <button disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}><HiMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}><HiPlus /></button>
            </div>

            <button 
              className={`btn btn-primary add-detail-btn ${inCart ? 'in-cart' : ''}`}
              onClick={() => addToCart(product, quantity)}
            >
              <HiOutlineShoppingCart />
              {inCart ? 'Add More to Cart' : 'Add to Cart'}
            </button>
          </div>

          <div className="info-extras">
            <div className="extra-item">
              <strong>Category:</strong> {product.category}
            </div>
            <div className="extra-item">
              <strong>Availability:</strong> <span className="status-in-stock">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
