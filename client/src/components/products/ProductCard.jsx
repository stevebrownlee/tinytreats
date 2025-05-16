import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card, Heading, Text, Flex, Box, Button, AspectRatio, Inset } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

function ProductCard({ product, onAddToCart }) {
  const { isAuthenticated, isAdmin } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  };

  return (
    <Card className="product-card" size="2">
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

          {isAuthenticated && !isAdmin && (
            <Button onClick={handleAddToCart} size="2">
              <PlusIcon />
              Add to Cart
            </Button>
          )}
        </Flex>
      </Box>
    </Card>
  );
}

export default ProductCard;