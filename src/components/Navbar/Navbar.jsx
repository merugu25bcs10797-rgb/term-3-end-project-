import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingCart, HiOutlineHeart, HiOutlineSearch, HiMenuAlt3, HiX, HiOutlineLogout } from 'react-icons/hi';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          SHOP<span>WAVE</span>
        </Link>

        {/* Desktop Search */}
        <form className="nav-search-desktop" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit"><HiOutlineSearch /></button>
        </form>

        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          
          <div className="nav-icons-mobile">
            <Link to="/wishlist" className="nav-icon-link">
              <HiOutlineHeart />
              {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
            </Link>
            <Link to="/cart" className="nav-icon-link">
              <HiOutlineShoppingCart />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            {currentUser && (
              <button onClick={logout} className="nav-icon-link logout-btn">
                <HiOutlineLogout />
              </button>
            )}
          </div>
        </div>

        <div className="nav-actions">
          {currentUser && <span className="user-email">{currentUser.email.split('@')[0]}</span>}
          
          <Link to="/wishlist" className="nav-icon-link nav-desktop-icon">
            <HiOutlineHeart />
            {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" className="nav-icon-link nav-desktop-icon">
            <HiOutlineShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          {currentUser ? (
            <button onClick={logout} className="nav-icon-link nav-desktop-icon logout-btn" title="Logout">
              <HiOutlineLogout />
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary login-nav-btn">Login</Link>
          )}
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
