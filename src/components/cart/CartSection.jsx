import React from 'react';
import { useCart } from '../../context/CartContext';

const CartSection = () => {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();
  const shipping = subtotal > 50 ? 0 : 4.99;

  return (
    <section className='cart-section'>
      <p className='cart-title'>Your Cart</p>

      {cartItems.length === 0 ? (
        <p className='cart-empty'>Your cart is empty</p>
      ) : (
        <>
          <div className='cart-items'>
            {cartItems.map(item => (
              <div className='cart-item' key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = 'https://placehold.co/50x50/e8e8e8/999?text=T'; }}
                />
                <div className='cart-item-info'>
                  <p className='cart-item-name'>{item.name}</p>
                  <p className='cart-item-price'>${item.price.toFixed(2)}</p>
                </div>
                <div className='cart-item-qty'>
                  <button className='qty-btn' onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className='qty-num'>{item.qty}</span>
                  <button className='qty-btn' onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <button className='remove-btn' onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <div className='cart-total-row'>
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='cart-total-row'>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className='cart-grand'>
              <span>Total</span>
              <strong>${(subtotal + shipping).toFixed(2)}</strong>
            </div>
            <button className='checkout-btn'>Proceed to Checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartSection;