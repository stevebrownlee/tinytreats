import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

function UserProfile() {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize form data when user data is loaded
  useState(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        address: user.address || ''
      });
    }
  }, [user]);

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

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    // Address validation
    if (!formData.address) {
      newErrors.address = 'Address is required';
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
      setSuccessMessage('');

      // This would be replaced with an actual API call to update the profile
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setSubmitError(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {submitError && (
        <div className="error-message">{submitError}</div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.firstName && <div className="error">{errors.firstName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.address && <div className="error">{errors.address}</div>}
          </div>

          <div className="button-group">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-field">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="profile-field">
            <strong>First Name:</strong> {user.firstName}
          </div>
          <div className="profile-field">
            <strong>Last Name:</strong> {user.lastName}
          </div>
          <div className="profile-field">
            <strong>Address:</strong> {user.address}
          </div>

          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;