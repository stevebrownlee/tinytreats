import { useState, useEffect } from 'react';
import { Heading, Text, Box, Table, Button, Select, Flex, AlertDialog, Card } from '@radix-ui/themes';
import { authService } from '../../services/api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('add'); // 'add' or 'remove'

  // Fetch all users and available roles on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all available roles first
        const rolesData = await authService.getAllRoles();
        setRoles(rolesData);

        // Fetch all users
        const usersData = await authService.getAllUsers();

        // If usersData is an array, process it
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          console.error('Expected users data to be an array, got:', typeof usersData);
          setError('Received invalid user data format from server.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load users and roles. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle role change confirmation
  const handleRoleChange = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      setLoading(true);

      if (actionType === 'add') {
        // Add role to user
        await authService.addRoleToUser(selectedUser.email, selectedRole);
      } else {
        // Remove role from user
        await authService.removeRoleFromUser(selectedUser.email, selectedRole);
      }

      // Refresh user data
      const updatedUsers = await authService.getAllUsers();
      setUsers(updatedUsers);

      // Close dialog
      setDialogOpen(false);
      setSelectedUser(null);
      setSelectedRole('');
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Failed to update user role. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Open dialog to add a role
  const openAddRoleDialog = (user) => {
    setSelectedUser(user);
    setActionType('add');
    setDialogOpen(true);
  };

  // Open dialog to remove a role
  const openRemoveRoleDialog = (user, role) => {
    setSelectedUser(user);
    setSelectedRole(role);
    setActionType('remove');
    setDialogOpen(true);
  };

  if (loading && users.length === 0) {
    return (
      <Box className="loading-state" p="4">
        <Text size="3">Loading users and roles...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Card color="red" p="4">
        <Heading size="4" mb="2">Error</Heading>
        <Text>{error}</Text>
      </Card>
    );
  }

  return (
    <Box className="user-management">
      <Heading size="6" mb="4">User Management</Heading>

      {loading && users.length > 0 && (
        <Box mb="4">
          <Text size="2" color="gray">Refreshing user data...</Text>
        </Box>
      )}

      {users.length === 0 && !loading ? (
        <Text>No users found.</Text>
      ) : (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Roles</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map(user => (
              <Table.Row key={user.email}>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                <Table.Cell>
                  <Flex gap="2" wrap="wrap">
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map(role => (
                        <Flex key={role} align="center" gap="1">
                          <Text size="2">{role}</Text>
                          <Button
                            size="1"
                            variant="soft"
                            color="red"
                            onClick={() => openRemoveRoleDialog(user, role)}
                          >
                            ×
                          </Button>
                        </Flex>
                      ))
                    ) : (
                      <Text size="2" color="gray">No roles assigned</Text>
                    )}
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="2"
                    variant="soft"
                    onClick={() => openAddRoleDialog(user)}
                  >
                    Add Role
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}

      {/* Role Change Dialog */}
      <AlertDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            {actionType === 'add' ? 'Add Role' : 'Remove Role'}
          </AlertDialog.Title>
          <AlertDialog.Description>
            {actionType === 'add'
              ? `Select a role to add to ${selectedUser?.email}`
              : `Are you sure you want to remove the role "${selectedRole}" from ${selectedUser?.email}?`
            }
          </AlertDialog.Description>

          {actionType === 'add' && (
            <Box my="4">
              <Select.Root value={selectedRole} onValueChange={setSelectedRole}>
                <Select.Trigger placeholder="Select a role" />
                <Select.Content>
                  {roles.map(role => (
                    <Select.Item key={role} value={role}>{role}</Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Box>
          )}

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                disabled={actionType === 'add' && !selectedRole}
                onClick={handleRoleChange}
              >
                {actionType === 'add' ? 'Add Role' : 'Remove Role'}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
}

export default UserManagement;