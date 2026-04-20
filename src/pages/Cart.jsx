import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineShoppingBag } from 'react-icons/hi';
import useCart from '../hooks/useCart';
import CartItem from '../components/Cart/CartItem';
import { calcCartTotals, formatPrice } from '../utils/helpers';
import './Cart.css';

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const { subtotal, tax, total } = calcCartTotals(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty container section-padding">
        <HiOutlineShoppingBag className="empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container section-padding">
      <header className="page-header">
        <h1 className="page-title">Shopping Cart</h1>
        <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>
      </header>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <aside className="cart-summary glass">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary checkout-btn">
            Proceed to Checkout <HiOutlineArrowRight />
          </Link>
          <p className="summary-note">Taxes and shipping calculated at checkout</p>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
