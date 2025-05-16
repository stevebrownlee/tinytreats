import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretDownIcon, ExitIcon, PersonIcon, BackpackIcon } from '@radix-ui/react-icons';
import { Flex, Button, Text, Box } from '@radix-ui/themes';

function NavBar() {
  const { isAuthenticated, isAdmin, isBaker, user, logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <Box asChild style={{ backgroundColor: 'white', boxShadow: 'var(--shadow-2)', marginBottom: '30px' }}>
      <nav>
        <Flex className="container" justify="between" align="center" py="4">
          <Text className="logo" size="5" weight="bold" asChild>
            <Link to="/">TinyTreats</Link>
          </Text>

          <NavigationMenu.Root className="nav-links">
            <NavigationMenu.List style={{ display: 'flex', gap: '20px', alignItems: 'center', listStyle: 'none' }}>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link to="/products">Products</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              {isAuthenticated ? (
                <>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link to="/profile">
                        <Flex align="center" gap="1">
                          <PersonIcon />
                          Profile
                        </Flex>
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>

                  {/* Only show cart to non-admin users */}
                  {!isAdmin && (
                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild>
                        <Link to="/cart">
                          <Flex align="center" gap="1">
                            <BackpackIcon />
                            Cart
                          </Flex>
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  )}

                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link to="/orders">Orders</Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="soft" color="gray">
                        <Flex align="center" gap="1">
                          {user?.firstName || 'Account'}
                          <CaretDownIcon />
                        </Flex>
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content sideOffset={5} align="end">
                        <DropdownMenu.Item onSelect={handleLogout}>
                          <Flex align="center" gap="1">
                            <ExitIcon />
                            Logout
                          </Flex>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </>
              ) : (
                <>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link to="/login">Login</Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <Button asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </NavigationMenu.Item>
                </>
              )}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </Flex>
      </nav>
    </Box>
  );
}

export default NavBar;