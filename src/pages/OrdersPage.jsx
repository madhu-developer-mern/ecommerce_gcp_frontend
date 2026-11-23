import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import OrderCard from '../components/OrderCard';
import LoadingSpinner from '../components/LoadingSpinner';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/orders/my-orders/');
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your orders..." />;
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '1.75rem' }}>
        My Orders
      </h1>

      {error && <div className="alert-error">{error}</div>}

      {orders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">📦</span>
          <h2>No Orders Yet</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            You haven't placed any orders yet. Discover our latest products!
          </p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
