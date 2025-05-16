import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Box, Card, Heading, Text, TextField, Button, Flex, Link as RadixLink } from '@radix-ui/themes';
import { EnvelopeClosedIcon, LockClosedIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');

      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate('/');
      } else {
        setSubmitError(result.error || 'Invalid email or password');
      }
    } catch (error) {
      setSubmitError(error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="auth-form-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Card size="2">
        <Heading size="5" mb="4" align="center">Login to Your Account</Heading>

        {submitError && (
          <Flex mb="4" align="center" gap="2" style={{
            padding: '10px',
            backgroundColor: 'var(--pink-2)',
            borderRadius: 'var(--radius-3)',
            color: 'var(--pink-11)'
          }}>
            <ExclamationTriangleIcon />
            <Text size="2">{submitError}</Text>
          </Flex>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb="4">
            <label htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <EnvelopeClosedIcon height="16" width="16" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Enter your email"
                style={{ width: '100%', padding: '8px 8px 8px 32px', borderRadius: 'var(--radius-2)', border: '1px solid var(--gray-7)' }}
              />
            </div>
            {errors.email && <Text size="1" style={{ color: 'var(--pink-11)' }}>{errors.email}</Text>}
          </Box>

          <Box mb="4">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <LockClosedIcon height="16" width="16" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Enter your password"
                style={{ width: '100%', padding: '8px 8px 8px 32px', borderRadius: 'var(--radius-2)', border: '1px solid var(--gray-7)' }}
              />
            </div>
            {errors.password && <Text size="1" style={{ color: 'var(--pink-11)' }}>{errors.password}</Text>}
          </Box>

          <Button type="submit" disabled={isSubmitting} size="3" style={{ width: '100%' }}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Box mt="4" style={{ textAlign: 'center' }}>
          <Text size="2">
            Don't have an account? <RadixLink asChild><Link to="/register">Register</Link></RadixLink>
          </Text>
        </Box>
      </Card>
    </Box>
  );
}

export default LoginForm;