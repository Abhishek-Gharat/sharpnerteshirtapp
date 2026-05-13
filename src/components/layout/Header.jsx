import React from 'react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <div className='header-brand'>
        <h1 className='header-logo'>LEVE</h1>
        <div className='header-tagline'>Timeless Essentials</div>
      </div>
      <nav className='nav-menu'>
        <a href='#' className='nav-link'>Home</a>
        <a href='#' className='nav-link'>Collection</a>
        <a href='#' className='nav-link'>About</a>
        <a href='#' className='nav-link'>Journal</a>
        <a href='#' className='nav-link'>Contact</a>
        <a href='#' className='nav-link cart-link'>
          🛒 <span className='cart-count'>{itemCount}</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;