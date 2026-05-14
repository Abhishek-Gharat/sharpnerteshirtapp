import React from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const getBadge = () => {
    if (product.price < 20) return 'Essential';
    if (product.category === 'graphic') return 'Limited';
    if (product.category === 'polo') return 'Classic';
    return '';
  };

  const badge = getBadge();

  return (
    <article className='product-card'>
      <div className='product-image-container'>
        <img
          src={product.image}
          alt={product.name}
          className='product-image'
          onError={(e) => {
            e.target.src = `https://placehold.co/300x300/e8e8e8/999?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <div className='product-overlay'></div>
        {badge && <span className='product-tag'>{badge}</span>}
      </div>

      <div className='product-content'>
        <div>
          <h3 className='product-title'>{product.name}</h3>
          <p className='product-description'>{product.description}</p>
        </div>
        <div className='product-footer'>
          <div className='product-meta'>
            <span className='attribute-tag'>{product.category}</span>
            <span className='attribute-tag'>{product.colors?.[0]}</span>
          </div>
          <p className='product-price'>${product.price.toFixed(2)}</p>
          <button className='add-to-cart-btn' onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;