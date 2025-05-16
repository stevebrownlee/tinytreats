import { useCart } from '../hooks/useCart';
import ProductList from '../components/products/ProductList';

function ProductsPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Our Products</h1>
      </div>

      <div className="products-content">
        <ProductList onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}

export default ProductsPage;