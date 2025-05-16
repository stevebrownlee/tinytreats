import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';

function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;