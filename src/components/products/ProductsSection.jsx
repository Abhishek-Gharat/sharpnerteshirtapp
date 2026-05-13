import React from 'react';
import ProductCard from '../products/ProductCard';

const ProductsSection = ({ products }) => {
  return (
    <section className='products-section'>
      <div className='section-header'>
        <p className='section-label'>
          Curated Essentials
        </p>

        <h2 className='section-title'>
          The Collection
        </h2>

        <p className='section-subtitle'>
          Timeless essentials crafted with
          premium materials and minimalist
          design philosophy.
        </p>
      </div>

      <div className='products-grid'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;