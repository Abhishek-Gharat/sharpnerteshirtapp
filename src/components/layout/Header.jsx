import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartVisibility } from '../../redux/cartSlice';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const dispatch = useDispatch();
  const { cartCount } = useCart();

  const handleCartClick = () => {
    dispatch(toggleCartVisibility());
  };

  return (
    <header>
      <div className='header-brand'>
        <span className='header-logo'>LEVE</span>
        <span className='header-tagline'>Timeless Essentials</span>
      </div>

      <nav className='nav-menu'>
        <a className='nav-link' href='#'>Home</a>
        <a className='nav-link' href='#collection'>Collection</a>
        <a className='nav-link' href='#'>About</a>
        <a className='nav-link' href='#'>Journal</a>
        <a className='nav-link' href='#'>Contact</a>

        <button className='cart-link' onClick={handleCartClick} aria-label='Open cart'>
          🛒
          {cartCount > 0 && (
            <span className='cart-count'>{cartCount}</span>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
