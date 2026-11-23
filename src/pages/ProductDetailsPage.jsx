import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/products/${id}/`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found or currently unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">⚠️</span>
        <h3>Product Not Found</h3>
        <p>{error || 'The requested product could not be loaded.'}</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const maxAvailable = product.stock || 1;

  const handleIncrement = () => {
    if (quantity < maxAvailable) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  };

  return (
    <div className="product-details-container">
      <Link to="/" className="back-link">
        ← Back to all products
      </Link>

      <div className="product-details-layout">
        <div className="product-details-img-box">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'}
            alt={product.name}
            className="product-details-img"
          />
        </div>

        <div className="product-details-info">
          <span className="product-details-category">{product.category}</span>
          <h1 className="product-details-title">{product.name}</h1>

          <div className="product-details-price">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </div>

          <p className="product-details-desc">{product.description}</p>

          <div>
            <span
              className={`stock-tag ${isOutOfStock ? 'stock-out' : 'stock-in'}`}
              style={{ fontSize: '0.9rem', padding: '0.35rem 0.75rem' }}
            >
              {isOutOfStock ? 'Out of Stock' : `Available Stock: ${product.stock} units`}
            </span>
          </div>

          {!isOutOfStock && (
            <div className="quantity-control-wrapper">
              <span style={{ fontWeight: 600 }}>Quantity:</span>
              <div className="qty-selector">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= maxAvailable}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {addedMessage && (
            <div className="alert-success">
              ✓ Added {quantity} item(s) to your cart!
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </button>
            <Link to="/cart" className="btn btn-outline" style={{ padding: '0.85rem 1.5rem' }}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
