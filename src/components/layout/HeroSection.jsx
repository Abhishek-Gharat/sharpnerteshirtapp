import React from 'react';

const HeroSection = () => (
  <section className='hero-section'>
    <h1 className='hero-title'>The Essentials <em>Collection</em></h1>
    <p className='hero-subtitle'>
      Timeless pieces crafted for everyday life. Quality that endures.
    </p>
    <button className='hero-accent' onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}>
      Shop Now
    </button>
  </section>
);

export default HeroSection;