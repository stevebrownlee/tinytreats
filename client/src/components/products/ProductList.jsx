import { useState, useEffect } from 'react';
import { productService } from '../../services/api';
import ProductCard from './ProductCard';
import {
  Heading,
  Text,
  Box,
  Grid,
  TextField,
  Flex,
  Card
} from '@radix-ui/themes';
import { MagnifyingGlassIcon, ReloadIcon, UpdateIcon } from '@radix-ui/react-icons';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for development
  const mockProducts = [
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

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        let data;

        try {
          data = await productService.getAllProducts();
          // Check if data is a string (JSON response)
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (parseError) {
              console.error('Error parsing JSON:', parseError);
            }
          }
        } catch (apiError) {
          console.error('API error, using mock data:', apiError);
          data = mockProducts;
        }

        // If data is still not an array, use mock data
        if (!Array.isArray(data)) {
          console.warn('API did not return an array, using mock data');
          data = mockProducts;
        }

        setProducts(data);
      } catch (err) {
        console.error('Error in product loading process:', err);
        setError('Failed to load products. Using sample data instead.');
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box py="9">
        <Flex align="center" justify="center" gap="2">
          <UpdateIcon className="spinning" />
          <Text size="3">Loading products...</Text>
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Card size="3" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Text color="red" size="3">{error}</Text>
      </Card>
    );
  }

  // For debugging
  console.log("Products:", products);

  return (
    <Box className="product-list-container">
      <Flex className="product-list-header" justify="between" align="center" mb="6">
        <Heading size="5" as="h2">Browse Our Treats</Heading>

        <Box className="search-container" style={{ maxWidth: '300px', width: '100%' }}>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </TextField.Root>
        </Box>
      </Flex>

      {filteredProducts.length === 0 ? (
        <Card size="3" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <Text size="3" color="gray">
            {searchTerm
              ? `No products found matching "${searchTerm}"`
              : 'No products available at the moment.'}
          </Text>
        </Card>
      ) : (
        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ProductList;