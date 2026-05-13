import React from 'react';

const Footer = () => {
  return (
    <footer className='footer-section'>
      <div className='footer-content'>
        <div>
          <h2 className='footer-logo'>�LEVE</h2>
          <p className='footer-description'>
            Elevating everyday essentials through considered design, 
            exceptional quality, and timeless appeal.
          </p>
        </div>
        <div>
          <h3 className='footer-heading'>Discover</h3>
          <ul className='footer-links'>
            <li><a href='#' className='footer-link'>New Arrivals</a></li>
            <li><a href='#' className='footer-link'>Best Sellers</a></li>
            <li><a href='#' className='footer-link'>The Journal</a></li>
            <li><a href='#' className='footer-link'>Care Guide</a></li>
          </ul>
        </div>
        <div>
          <h3 className='footer-heading'>Support</h3>
          <ul className='footer-links'>
            <li><a href='#' className='footer-link'>FAQ</a></li>
            <li><a href='#' className='footer-link'>Sizing</a></li>
            <li><a href='#' className='footer-link'>Shipping</a></li>
            <li><a href='#' className='footer-link'>Returns</a></li>
          </ul>
        </div>
        <div>
          <h3 className='footer-heading'>Connect</h3>
          <div className='footer-social'>
            <a href='#' className='footer-social-link' aria-label='Instagram'>??</a>
            <a href='#' className='footer-social-link' aria-label='Twitter'>??</a>
            <a href='#' className='footer-social-link' aria-label='Facebook'>??</a>
            <a href='#' className='footer-social-link' aria-label='Pinterest'>??</a>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2026 �LEVE. All rights reserved.</p>
        <p>Made with intention for those who appreciate the finer details.</p>
      </div>
    </footer>
  );
};

export default Footer;