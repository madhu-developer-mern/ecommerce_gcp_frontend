import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">🔍</span>
        <h3>No Products Found</h3>
        <p style={{ color: 'var(--text-muted)' }}>
          Try clearing your search query or selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
