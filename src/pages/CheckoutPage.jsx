import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, totalItems, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalAmount = calculateTotal();

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">🛒</span>
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart before proceeding to checkout.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pinCode.trim()
    ) {
      setError('Please fill in all shipping details.');
      return;
    }

    setLoading(true);

    const payload = {
      full_name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pin_code: formData.pinCode.trim(),
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await api.post('/orders/', payload);
      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error('Checkout error:', err);
      const apiError =
        err.response?.data?.items ||
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Failed to place order. A product stock may have changed.';
      setError(typeof apiError === 'object' ? JSON.stringify(apiError) : apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '1.75rem' }}>
        Checkout & Shipping
      </h1>

      {error && <div className="alert-error">{error}</div>}

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Shipping Address</h2>

          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                className="form-input"
                placeholder="e.g. Madhu B"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="form-input"
                placeholder="e.g. madhu@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                className="form-input"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Street Address</label>
              <textarea
                name="address"
                required
                rows={3}
                className="form-input"
                placeholder="e.g. 123 MG Road, Indiranagar"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                required
                className="form-input"
                placeholder="e.g. Bangalore"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                required
                className="form-input"
                placeholder="e.g. Karnataka"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">PIN Code</label>
              <input
                type="text"
                name="pinCode"
                required
                className="form-input"
                placeholder="e.g. 560001"
                value={formData.pinCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="payment-badge-box">
            <span style={{ fontSize: '1.5rem' }}>💵</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Payment Method: Cash on Delivery</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Pay seamlessly with cash or UPI upon delivery at your doorstep.
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block"
            style={{ marginTop: '1.75rem', padding: '0.9rem', fontSize: '1.05rem' }}
          >
            {loading ? 'Processing Order...' : `Place Order (₹${totalAmount.toLocaleString('en-IN')})`}
          </button>
        </form>

        <div className="cart-summary-card">
          <h3 className="cart-summary-title">Order Summary</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span>
                  {item.name} × <strong>{item.quantity}</strong>
                </span>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="summary-row" style={{ marginTop: '0.5rem' }}>
            <span>Total Items</span>
            <span style={{ fontWeight: 600 }}>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>FREE</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
