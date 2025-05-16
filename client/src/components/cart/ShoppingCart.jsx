import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { orderService } from '../../services/api';
import CartItem from './CartItem';

function ShoppingCart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Create order data from cart items
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      // Submit order to API
      await orderService.createOrder(orderData);

      // Clear cart after successful order
      clearCart();

      // Navigate to orders page
      navigate('/orders');
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to place order. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="btn">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>

        <div className="cart-actions">
          <button
            onClick={() => clearCart()}
            className="btn-secondary"
          >
            Clear Cart
          </button>

          <button
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="checkout-btn"
          >
            {isSubmitting ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;