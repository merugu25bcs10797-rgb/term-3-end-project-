import { Link } from 'react-router-dom';
import { HiArrowRight, HiShieldCheck, HiTruck, HiSwitchHorizontal } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Home.css';

const Home = () => {
  const featuredCategories = [
    { title: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop", path: "/products?category=electronics" },
    { title: "Jewelery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop", path: "/products?category=jewelery" },
    { title: "Men's Clothing", image: "https://images.unsplash.com/photo-1617135670953-3735a4d163b8?q=80&w=1000&auto=format&fit=crop", path: "/products?category=men's clothing" },
    { title: "Women's Clothing", image: "https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=1000&auto=format&fit=crop", path: "/products?category=women's clothing" },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="hero-swiper"
        >
          <SwiperSlide>
            <div className="hero-slide slide-1">
              <div className="container hero-content">
                <span className="hero-subtitle">New Arrival</span>
                <h1 className="hero-title">Elegance in <br />Every Detail</h1>
                <p className="hero-description">Discover our curated collection of premium products designed to elevate your lifestyle.</p>
                <Link to="/products" className="btn btn-primary">
                  Shop Now <HiArrowRight />
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-slide slide-2">
              <div className="container hero-content">
                <span className="hero-subtitle">Limited Edition</span>
                <h1 className="hero-title">Tech Evolution <br />Unbound</h1>
                <p className="hero-description">The latest electronics at your fingertips. Experience the future today.</p>
                <Link to="/products?category=electronics" className="btn btn-primary">
                  Explore Tech <HiArrowRight />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <div className="feature-card glass">
          <HiTruck className="feature-icon" />
          <div className="feature-text">
            <h4>Free Shipping</h4>
            <p>On all orders over $99</p>
          </div>
        </div>
        <div className="feature-card glass">
          <HiShieldCheck className="feature-icon" />
          <div className="feature-text">
            <h4>Secure Payment</h4>
            <p>100% secure transactions</p>
          </div>
        </div>
        <div className="feature-card glass">
          <HiSwitchHorizontal className="feature-icon" />
          <div className="feature-text">
            <h4>Easy Returns</h4>
            <p>30-day money back guarantee</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/products" className="view-all">View All Products <HiArrowRight /></Link>
        </div>
        <div className="categories-grid">
          {featuredCategories.map((cat, index) => (
            <Link to={cat.path} key={index} className="category-card animate-fade" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="category-image">
                <img src={cat.image} alt={cat.title} />
              </div>
              <div className="category-overlay">
                <h3>{cat.title}</h3>
                <span className="shop-link">Shop Collection</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section container">
        <div className="newsletter-content glass">
          <h2>Join the ShopWave Club</h2>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
