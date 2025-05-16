import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function HomePage() {
  const { isAuthenticated, user, isAdmin, isBaker } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to TinyTreats Bakery</h1>
        <p className="hero-subtitle">Delicious treats made with love</p>

        {isAuthenticated ? (
          <div className="welcome-message">
            <h2>Welcome back, {user?.firstName || 'Valued Customer'}!</h2>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <div className="feature">
          <h3>Fresh Baked Goods</h3>
          <p>Our products are baked fresh daily using only the finest ingredients.</p>
        </div>

        <div className="feature">
          <h3>Custom Orders</h3>
          <p>Need something special? We can create custom treats for any occasion.</p>
        </div>

        <div className="feature">
          <h3>Fast Delivery</h3>
          <p>Get your favorite treats delivered right to your door.</p>
        </div>
      </div>

      {isAuthenticated && (isAdmin || isBaker) && (
        <div className="staff-section">
          <h2>Staff Dashboard</h2>
          <p>As a {isAdmin ? 'administrator' : 'baker'}, you have access to:</p>

          <div className="staff-features">
            <div className="staff-feature">
              <h3>Order Management</h3>
              <p>View and manage all customer orders.</p>
              <Link to="/orders" className="btn-secondary">Manage Orders</Link>
            </div>

            {isAdmin && (
              <div className="staff-feature">
                <h3>User Management</h3>
                <p>Manage user accounts and roles.</p>
                <Link to="/admin/users" className="btn-secondary">Manage Users</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;