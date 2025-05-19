import UserProfile from '../components/profile/UserProfile';
import { Heading, Container, Box } from '@radix-ui/themes';

function ProfilePage() {
  return (
    <Container size="3">
      <Box py="6">
        <Heading as="h1" size="7" align="center" mb="6">Your Profile</Heading>
        <UserProfile />
      </Box>
    </Container>
  );
}

export default ProfilePage;