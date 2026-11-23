import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card">
      <div className="product-card-img-wrapper">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
        <span className="product-card-badge">{product.category}</span>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>

        <div className="product-card-price-row">
          <span className="product-card-price">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
          <span className={`stock-tag ${isOutOfStock ? 'stock-out' : 'stock-in'}`}>
            {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
          </span>
        </div>

        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="btn btn-primary btn-sm"
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
