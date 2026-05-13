import React from 'react';

const PrimaryButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`primary-btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;