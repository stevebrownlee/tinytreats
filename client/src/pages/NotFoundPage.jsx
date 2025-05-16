import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button, Flex, Container } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

function NotFoundPage() {
  return (
    <Container size="2">
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="4"
        style={{
          minHeight: '60vh',
          textAlign: 'center',
          padding: '40px 20px'
        }}
      >
        <ExclamationTriangleIcon width="64" height="64" color="var(--pink-9)" />

        <Heading size="9" weight="bold" color="pink">
          404
        </Heading>

        <Heading size="6" mb="2">
          Page Not Found
        </Heading>

        <Text size="3" color="gray" mb="6">
          The page you are looking for does not exist or has been moved.
        </Text>

        <Button asChild size="3">
          <Link to="/">Return to Home</Link>
        </Button>
      </Flex>
    </Container>
  );
}

export default NotFoundPage;