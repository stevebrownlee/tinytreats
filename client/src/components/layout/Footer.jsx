import { Box, Flex, Text, Link as RadixLink } from '@radix-ui/themes';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box asChild style={{ backgroundColor: 'white', marginTop: '40px', padding: '20px 0' }}>
      <footer className="footer">
        <Box className="container">
          <Flex className="footer-content" justify="between" align="center" wrap="wrap" gap="4">
            <Text color="gray" size="2">
              &copy; {currentYear} TinyTreats Bakery. All rights reserved.
            </Text>
            <Flex className="footer-links" gap="4">
              <RadixLink size="2" color="gray" href="#">Privacy Policy</RadixLink>
              <RadixLink size="2" color="gray" href="#">Terms of Service</RadixLink>
              <RadixLink size="2" color="gray" href="#">Contact Us</RadixLink>
            </Flex>
          </Flex>
        </Box>
      </footer>
    </Box>
  );
}

export default Footer;