import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineTrash, HiOutlineShoppingCart } from 'react-icons/hi';
import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty container section-padding">
        <HiOutlineHeart className="empty-icon" />
        <h2>Your wishlist is empty</h2>
        <p>Save items you like to see them here later.</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page container section-padding">
      <h1 className="page-title">My Wishlist</h1>
      
      <div className="wishlist-grid">
        {wishlistItems.map((item) => {
          const inCart = isInCart(item.productId);
          return (
            <div key={item.productId} className="wishlist-item glass animate-fade">
              <div className="wishlist-image">
                <img src={item.image} alt={item.title} />
                <button 
                  className="wishlist-remove-btn" 
                  onClick={() => removeFromWishlist(item.productId)}
                  title="Remove from wishlist"
                >
                  <HiOutlineTrash />
                </button>
              </div>
              <div className="wishlist-info">
                <span className="info-category">{item.category}</span>
                <Link to={`/products/${item.productId}`}>
                  <h3 className="info-title">{item.title}</h3>
                </Link>
                <p className="info-price">{formatPrice(item.price)}</p>
                
                <button 
                  className={`btn wishlist-add-btn ${inCart ? 'in-cart' : ''}`}
                  onClick={() => addToCart({ id: item.productId, title: item.title, price: item.price, image: item.image, category: item.category })}
                  disabled={inCart}
                >
                  <HiOutlineShoppingCart />
                  {inCart ? 'Already in Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
