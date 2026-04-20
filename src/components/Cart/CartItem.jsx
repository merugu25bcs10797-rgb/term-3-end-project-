import { HiMinus, HiPlus, HiOutlineTrash } from 'react-icons/hi';
import { formatPrice } from '../../utils/helpers';
import useCart from '../../hooks/useCart';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item glass animate-fade">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-info">
        <span className="cart-item-category">{item.category}</span>
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-controls glass">
          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>
            <HiMinus />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
            <HiPlus />
          </button>
        </div>
        <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>
          <HiOutlineTrash />
        </button>
      </div>
      <div className="cart-item-total">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
