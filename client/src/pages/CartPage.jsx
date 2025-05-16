import ShoppingCart from '../components/cart/ShoppingCart';

function CartPage() {
  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Your Shopping Cart</h1>
      </div>

      <div className="cart-content">
        <ShoppingCart />
      </div>
    </div>
  );
}

export default CartPage;