import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cartItems, totalItems, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = calculateTotal();

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">🛒</span>
        <h2>Your Shopping Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Shopping Cart ({totalItems} items)</h1>
        <button onClick={clearCart} className="btn btn-outline btn-sm">
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-card">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary-card">
          <h3 className="cart-summary-title">Order Summary</h3>

          <div className="summary-row">
            <span>Total Items</span>
            <span style={{ fontWeight: 600 }}>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>FREE</span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-block"
            style={{ padding: '0.85rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
          >
            Proceed to Checkout
          </button>

          <Link to="/" className="btn btn-outline btn-block btn-sm" style={{ marginTop: '0.25rem' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
