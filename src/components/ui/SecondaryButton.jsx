import React from 'react';

const SecondaryButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`secondary-btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;