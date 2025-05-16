import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layout components
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

// Page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected route component
function ProtectedRoute({ children, requiredRoles = [] }) {
  const { isAuthenticated, loading, hasRole } = useAuth();

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => hasRole(role));

    if (!hasRequiredRole) {
      return <Navigate to="/" />;
    }
  }

  return children;
}

// Layout component with NavBar and Footer
function Layout() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Create router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: '/products',
        element: <ProductsPage />
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/orders',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);