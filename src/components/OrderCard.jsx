import React from 'react';

const OrderCard = ({ order }) => {
  const formattedDate = new Date(order.created_at).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <h3 className="order-id-title">Order #{order.id}</h3>
          <span className="order-date">Placed on {formattedDate}</span>
        </div>
        <span className={`status-badge status-${order.status}`}>{order.status}</span>
      </div>

      <div className="order-items-list">
        {order.items?.map((item) => (
          <div key={item.id} className="order-item-line">
            <span>
              {item.product_name} × <strong>{item.quantity}</strong>
            </span>
            <span style={{ fontWeight: 600 }}>
              ₹{Number(item.subtotal).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>

      <div className="order-card-footer">
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Deliver to: {order.full_name}, {order.city} ({order.pin_code})
          </span>
        </div>
        <div className="order-total-amount">
          Total: ₹{Number(order.total_amount).toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
