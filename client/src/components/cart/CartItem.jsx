import { Link } from 'react-router-dom';
import { Flex, Card, Text, Button, TextField, Box, Heading, Avatar } from '@radix-ui/themes';
import { Cross1Icon, MinusIcon, PlusIcon } from '@radix-ui/react-icons';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <Card className="cart-item" size="2" mb="3">
      <Flex gap="4" align="center">
        <Avatar
          size="5"
          src={item.imageUrl || '/placeholder-product.jpg'}
          fallback={item.name.charAt(0)}
          radius="medium"
        />

        <Box style={{ flex: 1 }}>
          <Heading as="h3" size="3" mb="1">
            <Link to={`/productlist/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {item.name}
            </Link>
          </Heading>

          <Text as="div" size="2" color="gray">
            ${item.price.toFixed(2)} each
          </Text>
        </Box>

        <Flex direction="column" align="end" gap="2">
          <Flex align="center" gap="1">
            <Button
              variant="soft"
              color="gray"
              size="1"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <MinusIcon />
            </Button>

            <TextField.Root
              type="number"
                id={`quantity-${item.id}`}
                min="1"
                value={item.quantity}
                onChange={handleQuantityChange}
                style={{ textAlign: 'center' }} />

            <Button
              variant="soft"
              color="gray"
              size="1"
              onClick={handleIncrement}
            >
              <PlusIcon />
            </Button>
          </Flex>

          <Text as="div" size="3" weight="bold" color="pink">
            ${(item.price * item.quantity).toFixed(2)}
          </Text>

          <Button
            variant="soft"
            color="red"
            size="1"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from cart`}
          >
            <Cross1Icon />
            <Text size="1">Remove</Text>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default CartItem;