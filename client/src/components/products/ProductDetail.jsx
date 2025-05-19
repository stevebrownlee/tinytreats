import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import {
  Heading,
  Text,
  TextField,
  Button,
  Flex,
  Box,
  Card,
  Grid,
  AspectRatio,
  Separator,
  Container
} from '@radix-ui/themes';
import {
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
  BackpackIcon,
  ReloadIcon,
  TrashIcon
} from '@radix-ui/react-icons';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isBaker } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart({ ...product, quantity });
      navigate('/cart');
    }
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await productService.deleteProduct(id);
      navigate('/productlist');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again later.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" py="9">
        <Flex align="center" gap="2">
          <ReloadIcon className="spinning" />
          <Text size="3">Loading product details...</Text>
        </Flex>
      </Flex>
    );
  }

  if (error) {
    return (
      <Card size="3" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Text color="red" size="3">{error}</Text>
      </Card>
    );
  }

  if (!product) {
    return (
      <Card size="3" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Text color="red" size="3">Product not found</Text>
      </Card>
    );
  }

  return (
    <Container size="3">
      <Card size="2" my="4">
        <Grid columns={{ initial: '1', sm: '2' }} gap="6">
          <Box>
            <AspectRatio ratio={1}>
              <img
                src={product.imageUrl || '/placeholder-product.jpg'}
                alt={product.name}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius: 'var(--radius-3)'
                }}
              />
            </AspectRatio>
          </Box>

          <Box>
            <Heading size="6" mb="2">{product.name}</Heading>
            <Text size="6" weight="bold" color="pink" mb="4">
              ${product.price.toFixed(2)}
            </Text>

            <Separator size="4" my="4" />

            <Box mb="4">
              <Heading size="4" mb="2">Description</Heading>
              <Text as="p" size="3" color="gray">
                {product.description}
              </Text>
            </Box>

            {isAuthenticated && !isAdmin && (
              <Box mb="4">
                <Heading size="3" mb="2">Quantity</Heading>
                <Flex align="center" gap="2" mb="4">
                  <Button
                    variant="soft"
                    color="gray"
                    size="2"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon />
                  </Button>

                  <TextField.Root
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Enter quantity" />

                  <Button
                    variant="soft"
                    color="gray"
                    size="2"
                    onClick={handleIncrement}
                  >
                    <PlusIcon />
                  </Button>
                </Flex>

                <Button
                  size="3"
                  onClick={handleAddToCart}
                  style={{ width: '100%' }}
                >
                  <BackpackIcon />
                  Add to Cart
                </Button>
              </Box>
            )}

            {(isAdmin || isBaker) && (
              <Box mb="4">
                <Button
                  variant="soft"
                  color="red"
                  size="3"
                  onClick={handleDeleteProduct}
                  disabled={deleteLoading}
                  style={{ width: '100%' }}
                >
                  <TrashIcon />
                  {deleteLoading ? 'Removing...' : 'Remove Product'}
                </Button>
              </Box>
            )}

            <Button
              variant="soft"
              onClick={() => navigate('/productlist')}
              size="2"
            >
              <ArrowLeftIcon />
              Back to Products
            </Button>
          </Box>
        </Grid>
      </Card>
    </Container>
  );
}

export default ProductDetail;