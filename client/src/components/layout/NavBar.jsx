import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function NavBar() {
  const { isAuthenticated, isAdmin, isBaker, user, logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <nav>
      <div className="container nav-container">
        <div className="logo">
          <Link to="/">TinyTreats</Link>
        </div>

        <div className="nav-links">
          <Link to="/products">Products</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>

              {/* Only show cart to non-admin users */}
              {!isAdmin && (
                <Link to="/cart">Cart</Link>
              )}

              <Link to="/orders">Orders</Link>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;