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
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './pages/NotFoundPage';
import TestPage from './pages/TestPage';
import SimplePage from './pages/SimplePage';
import RadixDemoPage from './pages/RadixDemoPage';
import SimpleProductsPage from './pages/SimpleProductsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductList from './components/products/ProductList.jsx';

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
      <main className="container" style={{ minHeight: 'calc(100vh - 200px)' }}>
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
        path: '/productlist',
        element: <ProductList />
      },
      {
        path: '/productlist/:id',
        element: <ProductDetailPage />
      },
      {
        path: '/products/create',
        element: (
          <ProtectedRoute requiredRoles={['Admin', 'Baker']}>
            <CreateProductPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/products/edit/:id',
        element: (
          <ProtectedRoute requiredRoles={['Admin', 'Baker']}>
            <EditProductPage />
          </ProtectedRoute>
        )
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
        path: '/orderlist',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/simple',
        element: <SimplePage />
      },
      {
        path: '/admin/users',
        element: (
          <ProtectedRoute requiredRoles={['Admin']}>
            <AdminUsersPage />
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