import { Link } from 'react-router-dom';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={item.imageUrl || '/placeholder-product.jpg'}
          alt={item.name}
        />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-name">
          <Link to={`/products/${item.id}`}>{item.name}</Link>
        </h3>

        <div className="cart-item-price">${item.price.toFixed(2)}</div>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-control">
          <label htmlFor={`quantity-${item.id}`}>Qty:</label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <div className="cart-item-subtotal">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <button
          onClick={handleRemove}
          className="remove-item-btn"
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;