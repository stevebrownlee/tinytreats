import { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Card, Heading, Text, Flex, Box, Button, Badge } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

function OrderList() {
  const { isAdmin, isBaker, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const data = await orderService.getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);

      // Update local state after successful API call
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status. Please try again.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      setDeletingOrderId(orderId);
      await orderService.deleteOrder(orderId);

      // Remove the deleted order from state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order. Please try again.');
    } finally {
      setDeletingOrderId(null);
    }
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter orders based on status
  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'Preparing': return 'blue';
      case 'Ready': return 'green';
      case 'Delivered': return 'purple';
      default: return 'gray';
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="no-orders">No orders found.</div>;
  }

  return (
    <div className="order-list">
      <div className="order-list-header">
        <Heading as="h2" size="5" mb="4">{isAdmin ? 'All Orders' : 'Your Orders'}</Heading>

        <Flex mb="4" align="center">
          <Text as="label" htmlFor="status-filter" size="2" mr="2">Filter by Status:</Text>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleFilterChange}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
          </select>
        </Flex>
      </div>

      <div className="orders" style={{ display: 'grid', gap: '16px' }}>
        {filteredOrders.length === 0 ? (
          <Text>No orders with status "{statusFilter}".</Text>
        ) : (
          filteredOrders.map(order => (
            <Card key={order.id} style={{ overflow: 'visible' }}>
              <Flex justify="between" align="start" mb="2">
                <Box>
                  <Heading as="h3" size="3">Order #{order.id}</Heading>
                  <Text size="2" color="gray">{formatDate(order.orderDate)}</Text>
                </Box>
                <Flex align="center" gap="2">
                  <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
                  <Text weight="bold">${order.totalAmount.toFixed(2)}</Text>
                </Flex>
              </Flex>

              <Box my="3">
                <Text weight="medium" size="2" mb="1">Items:</Text>
                <Box style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {order.items.map(item => (
                    <Flex key={item.productId} justify="between" py="1">
                      <Text size="2">{item.productName} x{item.quantity}</Text>
                      <Text size="2">${(item.productPrice * item.quantity).toFixed(2)}</Text>
                    </Flex>
                  ))}
                </Box>
              </Box>

              <Flex justify="between" mt="3">
                {(isAdmin || isBaker) && (
                  <Flex align="center" gap="2">
                    <Text as="label" htmlFor={`status-${order.id}`} size="2">Update Status:</Text>
                    <select
                      id={`status-${order.id}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={deletingOrderId === order.id}
                      style={{ padding: '4px', borderRadius: '4px' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </Flex>
                )}

                {order.status === 'Pending' && (
                  <Button
                    color="red"
                    variant="soft"
                    onClick={() => handleDeleteOrder(order.id)}
                    disabled={deletingOrderId === order.id}
                  >
                    <TrashIcon />
                    {deletingOrderId === order.id ? 'Deleting...' : 'Cancel Order'}
                  </Button>
                )}
              </Flex>

              {order.deliveryDate && (
                <Text size="2" color="gray" mt="2">
                  <strong>Delivered on:</strong> {formatDate(order.deliveryDate)}
                </Text>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default OrderList;