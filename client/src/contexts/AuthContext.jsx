import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

// Create the context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        setLoading(true);
        const userData = await authService.getCurrentUser();

        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);

          // Get user roles
          const roles = await authService.getUserRoles(userData.email);
          setUserRoles(roles || []);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Failed to authenticate user');
      } finally {
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      await authService.login(email, password);

      // After successful login, get user data
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);

      // Get user roles
      const roles = await authService.getUserRoles(userData.email);
      setUserRoles(roles || []);

      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      await authService.register(userData);

      // After successful registration, log the user in
      return login(userData.email, userData.password);
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setUserRoles([]);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Logout failed');
      return { success: false, error: err.message || 'Logout failed' };
    } finally {
      setLoading(false);
    }
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return userRoles.includes(role);
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isAdmin: hasRole('Admin'),
    isBaker: hasRole('Baker'),
    loading,
    error,
    login,
    register,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}