import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const subtotal = item.price * item.quantity;
  const isMaxStock = item.stock && item.quantity >= item.stock;

  return (
    <div className="cart-item-row">
      <img
        src={item.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'}
        alt={item.name}
        className="cart-item-img"
      />

      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>Unit Price: ₹{Number(item.price).toLocaleString('en-IN')}</p>
        {item.stock && item.stock <= 5 && (
          <p style={{ color: 'var(--warning)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
            Only {item.stock} left in stock
          </p>
        )}
      </div>

      <div className="qty-selector">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="qty-btn"
          title="Decrease quantity"
        >
          -
        </button>
        <span className="qty-display">{item.quantity}</span>
        <button
          onClick={() => increaseQuantity(item.id)}
          disabled={isMaxStock}
          className="qty-btn"
          title="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="cart-item-subtotal">
        ₹{subtotal.toLocaleString('en-IN')}
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="btn btn-danger-outline btn-sm"
        title="Remove item"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
