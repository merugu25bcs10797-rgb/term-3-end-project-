import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart, HiOutlineHeart, HiHeart, HiStar } from 'react-icons/hi';
import { motion } from 'framer-motion';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import { formatPrice, truncate } from '../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <motion.div 
      className="product-card glass"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image-wrapper">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.title} className="product-image" />
        </Link>
        <button 
          className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
        >
          {isWishlisted ? <HiHeart /> : <HiOutlineHeart />}
        </button>
        <div className="product-category-tag">{product.category}</div>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <HiStar className="star-icon" />
          <span>{product.rating.rate}</span>
          <span className="count">({product.rating.count})</span>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{truncate(product.title, 40)}</h3>
        </Link>
        
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button 
            className={`add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
            onClick={() => addToCart(product)}
          >
            <HiOutlineShoppingCart />
            {inCart ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
