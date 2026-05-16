import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotal, 
  removeFromCart, 
  updateQuantity 
} from '../../redux/cartSlice';

const CartSection = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  return (
    <section className='cart-section'>
      <div className='cart-header'>
        <div>
          <p className='cart-subtitle'>Shopping Cart</p>
          <h2 className='cart-title'>Your Collection</h2>
        </div>
        <span className='cart-items-count'>{totalItems} Items</span>
      </div>

      {cartItems.length === 0 ? (
        <div className='empty-cart-state'>
          <div className='empty-cart-icon'>🛍️</div>
          <h2 className='empty-cart-title'>Your cart is empty</h2>
          <p className='empty-cart-message'>
            Explore timeless essentials and curate your premium wardrobe.
          </p>
          <button
            className='primary-btn'
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <>
          <ul className='cart-items'>
            {cartItems.map((item) => (
              <li key={item.id} className='cart-item'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='cart-item-image'
                />
                <div className='cart-item-info'>
                  <div className='cart-item-top'>
                    <div>
                      <h3 className='cart-item-title'>{item.name}</h3>
                      <p className='cart-item-category'>Premium Essential</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className='remove-item-btn'
                    >
                      Remove
                    </button>
                  </div>
                  <div className='cart-item-bottom'>
                    <div className='cart-quantity-controls'>
                      <button
                        className='quantity-btn'
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>
                      <span className='quantity-display'>{item.quantity}</span>
                      <button
                        className='quantity-btn'
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className='cart-price-group'>
                      <p className='cart-item-price'>${item.price.toFixed(2)}</p>
                      <p className='cart-item-total'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className='cart-actions'>
            <div className='cart-summary-box'>
              <div>
                <p className='summary-label'>Subtotal</p>
                <h2 className='cart-summary'>${cartTotal.toFixed(2)}</h2>
              </div>
              <div className='cart-total-row'>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className='cart-grand'>
                <span>Total</span>
                <strong>${(cartTotal + shipping).toFixed(2)}</strong>
              </div>
              <p className='summary-note'>Shipping and taxes calculated at checkout.</p>
            </div>
            <button className='primary-btn'>Secure Checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartSection;
