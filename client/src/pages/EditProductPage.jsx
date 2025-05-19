import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import EditProductForm from '../components/products/EditProductForm';
import { Container } from '@radix-ui/themes';

function EditProductPage() {
  const { isAdmin, isBaker } = useAuth();

  // Only allow admins and bakers to edit products
  if (!isAdmin && !isBaker) {
    return <Navigate to="/" />;
  }

  return (
    <Container size="2" py="4">
      <EditProductForm />
    </Container>
  );
}

export default EditProductPage;