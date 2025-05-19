import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { orderService } from '../../services/api';
import CartItem from './CartItem';
import { Heading, Text, Button, Flex, Box, Card, Separator, Container, AlertDialog } from '@radix-ui/themes';
import { ExclamationTriangleIcon, TrashIcon, ReloadIcon, BackpackIcon } from '@radix-ui/react-icons';

function ShoppingCart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Create order data from cart items
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      // Submit order to API
      await orderService.createOrder(orderData);

      // Clear cart after successful order
      clearCart();

      // Navigate to orders page
      navigate('/orderlist');
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to place order. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container size="2">
        <Card size="3" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <Heading size="6" mb="2">Your Cart is Empty</Heading>
          <Text as="p" size="3" color="gray" mb="6">
            Looks like you haven't added any products to your cart yet.
          </Text>
          <Button asChild size="3">
            <Link to="/productlist">Browse Products</Link>
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Box className="shopping-cart">
      {error && (
        <Flex mb="4" align="center" gap="2" style={{
          padding: '10px',
          backgroundColor: 'var(--pink-2)',
          borderRadius: 'var(--radius-3)',
          color: 'var(--pink-11)'
        }}>
          <ExclamationTriangleIcon />
          <Text size="2">{error}</Text>
        </Flex>
      )}

      <Box className="cart-items" mb="6">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </Box>

      <Card className="cart-summary" size="2">
        <Flex justify="between" align="center" mb="4">
          <Text size="4" weight="bold">Total:</Text>
          <Text size="5" weight="bold" color="pink">${getTotalPrice().toFixed(2)}</Text>
        </Flex>

        <Separator size="4" mb="4" />

        <Flex className="cart-actions" justify="between" gap="3">
          <AlertDialog.Root open={showClearDialog} onOpenChange={setShowClearDialog}>
            <AlertDialog.Trigger>
              <Button variant="soft" color="gray">
                <TrashIcon />
                Clear Cart
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Title>Clear Shopping Cart</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure you want to remove all items from your cart? This action cannot be undone.
              </AlertDialog.Description>
              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button
                    variant="solid"
                    color="red"
                    onClick={() => clearCart()}
                  >
                    Yes, Clear Cart
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>

          <Button
            size="3"
            onClick={handleCheckout}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ReloadIcon className="spinning" />
                Processing...
              </>
            ) : 'Checkout'}
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}

export default ShoppingCart;