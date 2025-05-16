import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Heading, Text, Flex, Box, Grid, Card, Button, Container } from '@radix-ui/themes';

function HomePage() {
  const { isAuthenticated, user, isAdmin, isBaker } = useAuth();

  return (
    <Box className="home-page">
      <Box className="hero-section" style={{ textAlign: 'center', padding: '60px 0' }}>
        <Heading size="8" mb="2">Welcome to TinyTreats Bakery</Heading>
        <Text className="hero-subtitle" size="5" color="gray" mb="6">Delicious treats made with love</Text>

        {isAuthenticated ? (
          <Box className="welcome-message">
            <Heading size="6" mb="4">Welcome back, {user?.firstName || 'Valued Customer'}!</Heading>
          </Box>
        ) : (
          <Flex className="auth-buttons" justify="center" gap="4">
            <Button asChild size="3">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="soft" size="3">
              <Link to="/register">Register</Link>
            </Button>
          </Flex>
        )}
      </Box>

      <Container size="3">
        <Grid className="features-section" columns={{ initial: '1', sm: '3' }} gap="6" my="8">
          <Card>
            <Heading size="4" mb="2">Fresh Baked Goods</Heading>
            <Text as="p">Our products are baked fresh daily using only the finest ingredients.</Text>
          </Card>

          <Card>
            <Heading size="4" mb="2">Custom Orders</Heading>
            <Text as="p">Need something special? We can create custom treats for any occasion.</Text>
          </Card>

          <Card>
            <Heading size="4" mb="2">Fast Delivery</Heading>
            <Text as="p">Get your favorite treats delivered right to your door.</Text>
          </Card>
        </Grid>

        {isAuthenticated && (isAdmin || isBaker) && (
          <Box className="staff-section" my="8">
            <Heading size="6" mb="2">Staff Dashboard</Heading>
            <Text as="p" mb="4">As a {isAdmin ? 'administrator' : 'baker'}, you have access to:</Text>

            <Grid className="staff-features" columns={{ initial: '1', sm: '2' }} gap="4">
              <Card>
                <Heading size="4" mb="2">Order Management</Heading>
                <Text as="p" mb="3">View and manage all customer orders.</Text>
                <Button asChild variant="soft">
                  <Link to="/orders">Manage Orders</Link>
                </Button>
              </Card>

              {isAdmin && (
                <Card>
                  <Heading size="4" mb="2">User Management</Heading>
                  <Text as="p" mb="3">Manage user accounts and roles.</Text>
                  <Button asChild variant="soft">
                    <Link to="/admin/users">Manage Users</Link>
                  </Button>
                </Card>
              )}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default HomePage;