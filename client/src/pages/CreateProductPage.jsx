import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm';
import { Box, Heading, Text } from '@radix-ui/themes';

function CreateProductPage() {
  const { isAuthenticated, isBaker, loading } = useAuth();

  if (loading) {
    return (
      <Box py="9" textAlign="center">
        <Text size="3">Loading...</Text>
      </Box>
    );
  }

  // Redirect if not authenticated or not a baker
  if (!isAuthenticated || !isBaker) {
    return <Navigate to="/" />;
  }

  return (
    <Box className="create-product-container" py="4">
      <Heading size="6" as="h1" mb="6" textAlign="center">Create New Product</Heading>
      <ProductForm />
    </Box>
  );
}

export default CreateProductPage;