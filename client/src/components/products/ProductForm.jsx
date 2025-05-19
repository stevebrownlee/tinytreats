import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function ProductForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    isAvailable: true,
    imageUrl: ''
  });

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

      await productService.createProduct(productData);
      navigate('/productlist');
    } catch (err) {
      setError(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card size="3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Heading size="5" mb="4">Create New Product</Heading>
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
              onClick={() => navigate('/productlist')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
}

export default ProductForm;