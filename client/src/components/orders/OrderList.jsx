import { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import OrderItem from './OrderItem';

function OrderList() {
  const { isAdmin, isBaker } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

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

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter orders based on status
  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter);

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
        <h2>{isAdmin ? 'All Orders' : 'Your Orders'}</h2>

        <div className="filter-container">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="orders">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            No orders with status "{statusFilter}".
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderItem
              key={order.id}
              order={order}
              canUpdateStatus={isAdmin || isBaker}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default OrderList;