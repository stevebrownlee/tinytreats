import React from 'react';
import {
  Heading,
  Text,
  Box,
  Card,
  Flex,
  Button,
  Container,
  Grid,
  Separator,
  Badge
} from '@radix-ui/themes';

function RadixDemoPage() {
  return (
    <Container size="2">
      <Box py="6">
        <Heading size="8" mb="4">Radix UI Demo</Heading>
        <Text size="4" mb="6" color="gray">
          This page demonstrates various Radix UI components and styling.
        </Text>

        <Separator size="4" my="6" />

        <Heading size="6" mb="4">Typography</Heading>
        <Grid columns="1" gap="3" mb="6">
          <Card>
            <Heading size="5" mb="2">Headings</Heading>
            <Flex direction="column" gap="2">
              <Heading size="9">Heading 9</Heading>
              <Heading size="8">Heading 8</Heading>
              <Heading size="7">Heading 7</Heading>
              <Heading size="6">Heading 6</Heading>
              <Heading size="5">Heading 5</Heading>
              <Heading size="4">Heading 4</Heading>
              <Heading size="3">Heading 3</Heading>
              <Heading size="2">Heading 2</Heading>
              <Heading size="1">Heading 1</Heading>
            </Flex>
          </Card>

          <Card>
            <Heading size="5" mb="2">Text</Heading>
            <Flex direction="column" gap="2">
              <Text size="7">Text size 7</Text>
              <Text size="6">Text size 6</Text>
              <Text size="5">Text size 5</Text>
              <Text size="4">Text size 4</Text>
              <Text size="3">Text size 3</Text>
              <Text size="2">Text size 2</Text>
              <Text size="1">Text size 1</Text>
            </Flex>
          </Card>
        </Grid>

        <Heading size="6" mb="4">Colors</Heading>
        <Grid columns={{ initial: '1', sm: '2' }} gap="3" mb="6">
          <Card>
            <Heading size="5" mb="2">Text Colors</Heading>
            <Flex direction="column" gap="2">
              <Text color="pink">Pink (Primary)</Text>
              <Text color="purple">Purple (Secondary)</Text>
              <Text color="blue">Blue</Text>
              <Text color="green">Green</Text>
              <Text color="red">Red</Text>
              <Text color="gray">Gray</Text>
            </Flex>
          </Card>

          <Card>
            <Heading size="5" mb="2">Badges</Heading>
            <Flex gap="2" wrap="wrap">
              <Badge color="pink">Pink</Badge>
              <Badge color="purple">Purple</Badge>
              <Badge color="blue">Blue</Badge>
              <Badge color="green">Green</Badge>
              <Badge color="red">Red</Badge>
              <Badge color="gray">Gray</Badge>
            </Flex>
          </Card>
        </Grid>

        <Heading size="6" mb="4">Buttons</Heading>
        <Card mb="6">
          <Flex direction="column" gap="4">
            <Flex gap="2" wrap="wrap">
              <Button>Default</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </Flex>

            <Flex gap="2" wrap="wrap">
              <Button color="pink">Pink</Button>
              <Button color="purple">Purple</Button>
              <Button color="blue">Blue</Button>
              <Button color="green">Green</Button>
              <Button color="red">Red</Button>
            </Flex>

            <Flex gap="2" wrap="wrap">
              <Button size="1">Size 1</Button>
              <Button size="2">Size 2</Button>
              <Button size="3">Size 3</Button>
              <Button size="4">Size 4</Button>
            </Flex>
          </Flex>
        </Card>

        <Heading size="6" mb="4">Cards</Heading>
        <Grid columns={{ initial: '1', sm: '3' }} gap="3" mb="6">
          <Card>
            <Heading size="4" mb="2">Card 1</Heading>
            <Text size="2">This is a basic card with some content.</Text>
          </Card>

          <Card>
            <Heading size="4" mb="2">Card 2</Heading>
            <Text size="2">Cards can be used for various UI elements.</Text>
          </Card>

          <Card>
            <Heading size="4" mb="2">Card 3</Heading>
            <Text size="2">They provide a nice container for content.</Text>
          </Card>
        </Grid>

        <Flex justify="center" mt="8">
          <Button size="4" onClick={() => window.history.back()}>
            Back to Previous Page
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}

export default RadixDemoPage;