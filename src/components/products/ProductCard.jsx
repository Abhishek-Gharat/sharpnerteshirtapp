import React from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  let badge = '';

  if (product.price < 20) {
    badge = 'Essential';
  } else if (product.category === 'graphic') {
    badge = 'Limited';
  } else if (product.category === 'polo') {
    badge = 'Classic';
  }

  return (
    <article className='product-card'>
      <div className='product-image-container'>
        <img
          src={product.image}
          alt={product.name}
          className='product-image'
        />

        <div className='product-overlay'></div>

        {badge && (
          <span className='product-tag'>
            {badge}
          </span>
        )}
      </div>

      <div className='product-content'>
        <div>
          <h3 className='product-title'>
            {product.name}
          </h3>

          <p className='product-description'>
            {product.description}
          </p>
        </div>

        <div className='product-footer'>
          <div className='product-meta'>
            <span className='attribute-tag'>
              {product.category}
            </span>

            <span className='attribute-tag'>
              {product.colors?.[0]}
            </span>
          </div>

          <p className='product-price'>
            ${product.price.toFixed(2)}
          </p>

          <button
            className='add-to-cart-btn'
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;