import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function ProductCard({ product, onAddToCart }) {
  const { isAuthenticated, isAdmin } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {/* If product has an image, display it, otherwise show a placeholder */}
        <img
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="product-description">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>

        <div className="product-price">${product.price.toFixed(2)}</div>

        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="btn-secondary">
            View Details
          </Link>

          {isAuthenticated && !isAdmin && (
            <button onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;