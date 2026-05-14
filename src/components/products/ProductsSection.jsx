import React, { useState } from 'react';
import ProductCard from './ProductCard';

const FILTERS = ['all', 'casual', 'graphic', 'polo'];

const ProductsSection = ({ products }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <section className='products-section' id='collection'>
      <div className='section-header'>
        <span className='section-label'>Our Collection</span>
        <h2 className='section-title'>Timeless Essentials</h2>
        <p className='section-subtitle'>Four styles. Endless ways to wear them.</p>

        <div className='filters'>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className='products-grid'>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;