import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card, Heading, Text, Flex, Box, Button, TextField } from '@radix-ui/themes';
import { Pencil1Icon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

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
  useEffect(() => {
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
    <Card size="3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Heading as="h2" size="5" mb="4">User Profile</Heading>

      {successMessage && (
        <Box mb="4" p="3" style={{ backgroundColor: '#e6f7e6', borderRadius: '4px', color: '#2e7d32' }}>
          <Text>{successMessage}</Text>
        </Box>
      )}

      {submitError && (
        <Box mb="4" p="3" style={{ backgroundColor: '#ffebee', borderRadius: '4px', color: '#c62828' }}>
          <Text>{submitError}</Text>
        </Box>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <Box>
              <TextField.Root value={user.email}
                  disabled
                  style={{ backgroundColor: '#f5f5f5' }}>
                <TextField.Slot>
                  <Text size="2" weight="bold">Email:</Text>
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Box>
              <TextField.Root id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}>
                <TextField.Slot>
                  <Text size="2" weight="bold">First Name:</Text>
                </TextField.Slot>
              </TextField.Root>
              {errors.firstName && (
                <Text size="1" color="red" mt="1">{errors.firstName}</Text>
              )}
            </Box>

            <Box>
              <TextField.Root id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isSubmitting}>
                <TextField.Slot>
                  <Text size="2" weight="bold">Last Name:</Text>
                </TextField.Slot>
              </TextField.Root>
              {errors.lastName && (
                <Text size="1" color="red" mt="1">{errors.lastName}</Text>
              )}
            </Box>

            <Box>
              <TextField.Root id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isSubmitting}>
                <TextField.Slot>
                  <Text size="2" weight="bold">Address:</Text>
                </TextField.Slot>
              </TextField.Root>
              {errors.address && (
                <Text size="1" color="red" mt="1">{errors.address}</Text>
              )}
            </Box>

            <Flex gap="3" mt="3" justify="end">
              <Button
                type="submit"
                disabled={isSubmitting}
                color="green"
              >
                <CheckIcon />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
                variant="soft"
                color="gray"
              >
                <Cross2Icon />
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      ) : (
        <Box>
          <Flex direction="column" gap="3">
            <Flex>
              <Box width="150px">
                <Text weight="bold">Email:</Text>
              </Box>
              <Text>{user.email}</Text>
            </Flex>

            <Flex>
              <Box width="150px">
                <Text weight="bold">First Name:</Text>
              </Box>
              <Text>{user.firstName || 'Not provided'}</Text>
            </Flex>

            <Flex>
              <Box width="150px">
                <Text weight="bold">Last Name:</Text>
              </Box>
              <Text>{user.lastName || 'Not provided'}</Text>
            </Flex>

            <Flex>
              <Box width="150px">
                <Text weight="bold">Address:</Text>
              </Box>
              <Text>{user.address || 'Not provided'}</Text>
            </Flex>

            <Flex justify="end" mt="3">
              <Button onClick={() => setIsEditing(true)} color="blue">
                <Pencil1Icon />
                Edit Profile
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Card>
  );
}

export default UserProfile;