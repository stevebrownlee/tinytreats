import OrderList from '../components/orders/OrderList';

function OrdersPage() {
  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Orders</h1>
      </div>

      <div className="orders-content">
        <OrderList />
      </div>
    </div>
  );
}

export default OrdersPage;