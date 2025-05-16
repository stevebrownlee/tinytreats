import { Box, Heading, Container, Grid } from '@radix-ui/themes';
import ProductCard from '../components/products/ProductCard';

function TestPage() {
  // Mock data for testing
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

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <Container size="3">
      <Box py="4">
        <Heading size="7" mb="6">Test Product Cards</Heading>

        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
          {mockProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default TestPage;