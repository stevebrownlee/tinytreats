import { useState } from 'react';

function OrderItem({ order, canUpdateStatus, onStatusChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    if (newStatus === order.status) {
      return;
    }

    try {
      setIsUpdating(true);
      await onStatusChange(order.id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Preparing':
        return 'status-preparing';
      case 'Ready':
        return 'status-ready';
      case 'Delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  return (
    <div className="order-item">
      <div className="order-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="order-info">
          <div className="order-id">Order #{order.id}</div>
          <div className="order-date">{formatDate(order.orderDate)}</div>
        </div>

        <div className="order-summary">
          <div className={`order-status ${getStatusClass(order.status)}`}>
            {order.status}
          </div>

          <div className="order-total">${order.totalAmount.toFixed(2)}</div>

          <button
            className="expand-btn"
            aria-label={isExpanded ? "Collapse order details" : "Expand order details"}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="order-details">
          <div className="order-items">
            <h4>Items</h4>
            <ul>
              {order.orderItems.map(item => (
                <li key={item.id} className="order-product">
                  <span className="product-name">{item.product.name}</span>
                  <span className="product-quantity">x{item.quantity}</span>
                  <span className="product-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {canUpdateStatus && (
            <div className="order-actions">
              <label htmlFor={`status-${order.id}`}>Update Status:</label>
              <select
                id={`status-${order.id}`}
                value={order.status}
                onChange={handleStatusChange}
                disabled={isUpdating}
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Delivered">Delivered</option>
              </select>

              {isUpdating && <span className="updating-status">Updating...</span>}
            </div>
          )}

          {order.deliveryDate && (
            <div className="delivery-info">
              <strong>Delivered on:</strong> {formatDate(order.deliveryDate)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderItem;