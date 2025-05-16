import { useCart } from '../hooks/useCart';
import ProductDetail from '../components/products/ProductDetail';

function ProductDetailPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-content">
        <ProductDetail onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}

export default ProductDetailPage;