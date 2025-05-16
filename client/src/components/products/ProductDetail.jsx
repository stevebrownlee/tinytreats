import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart({ ...product, quantity });
      navigate('/cart');
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div className="error-message">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.name}
          />
        </div>

        <div className="product-detail-info">
          <h2 className="product-detail-name">{product.name}</h2>

          <div className="product-detail-price">${product.price.toFixed(2)}</div>

          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {isAuthenticated && !isAdmin && (
            <div className="product-detail-actions">
              <div className="quantity-control">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>

              <button onClick={handleAddToCart} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          )}

          <button
            onClick={() => navigate('/products')}
            className="btn-secondary back-btn"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;