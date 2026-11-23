import React from 'react';

const CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Home',
  'Accessories',
  'Books',
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`category-pill ${selectedCategory.toLowerCase() === category.toLowerCase() ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
