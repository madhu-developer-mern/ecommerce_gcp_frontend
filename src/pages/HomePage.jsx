import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }
        if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
          params.category = selectedCategory;
        }

        const response = await api.get('/products/', { params });
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products. Please check if backend is running.');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <div className="hero-banner">
        <h1>Shop Your Favorite Products</h1>
        <p>
          Discover premium essentials, tech gadgets, apparel, and books at great prices.
          Fast delivery and easy checkout guaranteed.
        </p>
      </div>

      <div className="controls-container">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {error ? (
        <div className="alert-error" style={{ textAlign: 'center' }}>
          {error}
        </div>
      ) : (
        <ProductGrid products={products} loading={loading} />
      )}
    </div>
  );
};

export default HomePage;
