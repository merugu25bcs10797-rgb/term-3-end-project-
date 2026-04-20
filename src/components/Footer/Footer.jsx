import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaTwitter, FaFacebookF, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            SHOP<span>WAVE</span>
          </Link>
          <p className="footer-desc">
            Elevate your lifestyle with our curated collection of premium products. Quality meets elegance in every piece.
          </p>
          <div className="social-links">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products?category=electronics">Electronics</Link></li>
            <li><Link to="/products?category=jewelery">Jewelery</Link></li>
            <li><Link to="/products?category=men's clothing">Men's Clothing</Link></li>
            <li><Link to="/products?category=women's clothing">Women's Clothing</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><HiOutlineMail className="icon" /> support@shopwave.com</li>
            <li><HiOutlinePhone className="icon" /> +1 (555) 000-SHOP</li>
            <li><HiOutlineLocationMarker className="icon" /> 123 Luxury Ave, NY 10001</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} ShopWave. All rights reserved.</p>
        <div className="legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
