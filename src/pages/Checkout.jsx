import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';
import { calcCartTotals, formatPrice } from '../utils/helpers';
import './Checkout.css';

const schema = yup.object({
  fullName: yup.string().required('Full name is required').min(3, 'At least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('Zip code is required').matches(/^[0-9]{5,6}$/, 'Invalid zip code'),
  cardNumber: yup.string().required('Card number is required').matches(/^[0-9]{16}$/, 'Must be 16 digits'),
  expiryDate: yup.string().required('MM/YY is required').matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid format (MM/YY)'),
  cvv: yup.string().required('CVV is required').matches(/^[0-9]{3}$/, 'Must be 3 digits'),
}).required();

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { subtotal, tax, total } = calcCartTotals(cartItems);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log('Order submitted:', { data, items: cartItems, total });
    toast.success('Order placed successfully! Redirecting...', {
      position: "top-center",
      autoClose: 3000,
    });
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page container section-padding">
      <h1 className="page-title">Secure Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form animate-fade" onSubmit={handleSubmit(onSubmit)}>
          <section className="checkout-section glass">
            <h3>Shipping Information</h3>
            <div className="form-grid">
              <div className="form-group full">
                <label>Full Name</label>
                <input {...register('fullName')} placeholder="John Doe" />
                {errors.fullName && <span className="error">{errors.fullName.message}</span>}
              </div>
              <div className="form-group full">
                <label>Email Address</label>
                <input {...register('email')} placeholder="john@example.com" />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>
              <div className="form-group full">
                <label>Street Address</label>
                <input {...register('address')} placeholder="123 Main St" />
                {errors.address && <span className="error">{errors.address.message}</span>}
              </div>
              <div className="form-group">
                <label>City</label>
                <input {...register('city')} placeholder="New York" />
                {errors.city && <span className="error">{errors.city.message}</span>}
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input {...register('zipCode')} placeholder="10001" />
                {errors.zipCode && <span className="error">{errors.zipCode.message}</span>}
              </div>
            </div>
          </section>

          <section className="checkout-section glass">
            <h3>Payment Method</h3>
            <div className="form-grid">
              <div className="form-group full">
                <label>Card Number</label>
                <input {...register('cardNumber')} placeholder="0000 0000 0000 0000" />
                {errors.cardNumber && <span className="error">{errors.cardNumber.message}</span>}
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input {...register('expiryDate')} placeholder="MM/YY" />
                {errors.expiryDate && <span className="error">{errors.expiryDate.message}</span>}
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input {...register('cvv')} placeholder="123" />
                {errors.cvv && <span className="error">{errors.cvv.message}</span>}
              </div>
            </div>
          </section>

          <button type="submit" className="btn btn-primary place-order-btn">
            Place Order {formatPrice(total)}
          </button>
        </form>

        <aside className="checkout-summary-sidebar glass">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.productId} className="summary-item">
                <img src={item.image} alt={item.title} />
                <div className="item-info">
                  <p className="item-name">{item.title}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="total-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="total-row"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
            <div className="total-row"><span>Shipping</span><span className="free-shipping">FREE</span></div>
            <div className="total-row grand-total"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
