import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../services/api';
import {
  Box,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
  TextArea,
  Button,
  Switch,
  Separator
} from '@radix-ui/themes';

function EditProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    isAvailable: true,
    imageUrl: ''
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        setFetchLoading(true);
        const product = await productService.getProductById(id);
        setFormData({
          name: product.name,
          description: product.description || '',
          price: product.price.toString(),
          isAvailable: product.isAvailable,
          imageUrl: product.imageUrl || ''
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setFetchLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSwitchChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      isAvailable: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert price to decimal
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      // Validate price is a number
      if (isNaN(productData.price)) {
        throw new Error('Price must be a valid number');
      }

      await productService.updateProduct(id, productData);
      navigate(`/productlist/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Card size="3" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Text>Loading product details...</Text>
      </Card>
    );
  }

  return (
    <Card size="3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Heading size="5" mb="4">Edit Product</Heading>
      <Separator size="4" mb="4" />

      {error && (
        <Box mb="4" p="3" style={{ backgroundColor: 'var(--red-3)', borderRadius: 'var(--radius-3)' }}>
          <Text color="red" size="2">{error}</Text>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Box>
            <Text as="label" size="2" mb="1" weight="bold">
              Product Name *
            </Text>
            <TextField.Root
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </Box>

          <Box>
            <Text as="label" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
            />
          </Box>

          <Box>
            <Text as="label" size="2" mb="1" weight="bold">
              Price ($) *
            </Text>
            <TextField.Root
              name="price"
              type="number"
              step="0.01"
              min="0.01"
              max="1000.00"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </Box>

          <Box>
            <Text as="label" size="2" mb="1" weight="bold">
              Image URL
            </Text>
            <TextField.Root
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </Box>

          <Flex align="center" gap="2">
            <Switch
              checked={formData.isAvailable}
              onCheckedChange={handleSwitchChange}
              id="isAvailable"
            />
            <Text as="label" size="2" htmlFor="isAvailable">
              Available for purchase
            </Text>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button
              type="button"
              variant="soft"
              onClick={() => navigate(`/productlist/${id}`)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
}

export default EditProductForm;