import React from 'react';

const ErrorState = ({ error, onRetry }) => (
  <div className='error-state'>
    <p>{error}</p>
    <button className='retry-btn' onClick={onRetry}>Try Again</button>
  </div>
);

export default ErrorState;