import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

function SimpleProductsPage() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  // Hard-coded mock data
  const products = [
    {
      id: 1,
      name: "Chocolate Chip Cookie",
      description: "Classic chocolate chip cookie with a soft center and crisp edges",
      price: 2.50,
      imageUrl: "/placeholder-product.jpg"
    },
    {
      id: 2,
      name: "Vanilla Cupcake",
      description: "Light and fluffy vanilla cupcake with buttercream frosting",
      price: 3.75,
      imageUrl: "/placeholder-product.jpg"
    },
    {
      id: 3,
      name: "Blueberry Muffin",
      description: "Moist muffin packed with fresh blueberries",
      price: 3.25,
      imageUrl: "/placeholder-product.jpg"
    }
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Our Products</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '8px', width: '300px' }}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <p>
            {searchTerm
              ? `No products found matching "${searchTerm}"`
              : 'No products available at the moment.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px' }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p style={{ fontWeight: 'bold', color: '#e91e63' }}>${product.price.toFixed(2)}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <Link to={`/productlist/${product.id}`} style={{ textDecoration: 'none', color: '#333', padding: '8px 16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SimpleProductsPage;