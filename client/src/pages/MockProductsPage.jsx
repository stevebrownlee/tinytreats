import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import {
  Heading,
  Text,
  Box,
  Grid,
  TextField,
  Flex,
  Card,
  Container,
  Button,
  AspectRatio,
  Inset
} from '@radix-ui/themes';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

function MockProductsPage() {
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
    },
    {
      id: 4,
      name: "Cinnamon Roll",
      description: "Soft roll with cinnamon swirl and cream cheese frosting",
      price: 4.50,
      imageUrl: "/placeholder-product.jpg"
    },
    {
      id: 5,
      name: "Chocolate Brownie",
      description: "Rich and fudgy chocolate brownie",
      price: 3.00,
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

  // Product Card Component (inline to avoid any import issues)
  function ProductCard({ product }) {
    return (
    <Card size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <AspectRatio ratio={4/3}>
          <img
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.name}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 'var(--radius-4)',
              borderTopRightRadius: 'var(--radius-4)'
            }}
          />
        </AspectRatio>
      </Inset>

      <Box p="3">
        <Heading as="h3" size="4" mb="1">
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {product.name}
          </Link>
        </Heading>

        <Text as="p" size="2" color="gray" mb="3" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '2.6em'
        }}>
          {product.description}
        </Text>

        <Text as="div" size="4" weight="bold" color="pink" mb="3">
          ${product.price.toFixed(2)}
        </Text>

        <Flex gap="3" justify="between">
          <Button asChild variant="soft" size="2">
            <Link to={`/products/${product.id}`}>
              View Details
            </Link>
          </Button>

          <Button onClick={() => handleAddToCart(product)} size="2">
            <PlusIcon />
            Add to Cart
          </Button>
        </Flex>
      </Box>
    </Card>
    );
  }

  return (
    <Container size="3">
      <Box py="4">
        <Box mb="6">
          <Heading size="7" mb="4">Our Products (Mock)</Heading>

          <Box style={{ maxWidth: '400px', width: '100%' }}>
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
        </Box>

        <Box>
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
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default MockProductsPage;