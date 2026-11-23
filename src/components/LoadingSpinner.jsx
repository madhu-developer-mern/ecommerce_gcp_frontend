import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      {message && <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
