import { Heading, Box, Container } from '@radix-ui/themes';
import UserManagement from '../components/admin/UserManagement';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function AdminUsersPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading state
  if (loading) {
    return <div className="container">Loading...</div>;
  }

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <Container size="3">
      <Box className="admin-users-page">
        <Heading size="7" mb="6">User Administration</Heading>
        <UserManagement />
      </Box>
    </Container>
  );
}

export default AdminUsersPage;