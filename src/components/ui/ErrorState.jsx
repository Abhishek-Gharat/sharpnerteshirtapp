import React from 'react';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className='error-state'>
      <h2 className='error-title'>Something Exceptional is Missing</h2>
      <p className='error-message'>{error}</p>
      <div className='error-action'>
        <button className='error-btn' onClick={onRetry}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;