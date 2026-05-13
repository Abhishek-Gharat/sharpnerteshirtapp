import React from 'react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section className='cart-section'>
      <div className='cart-header'>
        <div>
          <p className='cart-subtitle'>
            Shopping Cart
          </p>

          <h2 className='cart-title'>
            Your Collection
          </h2>
        </div>

        <span className='cart-items-count'>
          {itemCount} Items
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className='empty-cart-state'>
          <div className='empty-cart-icon'>
            🛍️
          </div>

          <h2 className='empty-cart-title'>
            Your cart is empty
          </h2>

          <p className='empty-cart-message'>
            Explore timeless essentials and
            curate your premium wardrobe.
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
              <li
                key={item.id}
                className='cart-item'
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className='cart-item-image'
                />

                <div className='cart-item-info'>
                  <div className='cart-item-top'>
                    <div>
                      <h3 className='cart-item-title'>
                        {item.name}
                      </h3>

                      <p className='cart-item-category'>
                        Premium Essential
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
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
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        disabled={
                          item.quantity === 1
                        }
                      >
                        −
                      </button>

                      <span className='quantity-display'>
                        {item.quantity}
                      </span>

                      <button
                        className='quantity-btn'
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className='cart-price-group'>
                      <p className='cart-item-price'>
                        $
                        {item.price.toFixed(2)}
                      </p>

                      <p className='cart-item-total'>
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
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
                <p className='summary-label'>
                  Total Amount
                </p>

                <h2 className='cart-summary'>
                  $
                  {cartTotal.toFixed(2)}
                </h2>
              </div>

              <p className='summary-note'>
                Shipping and taxes calculated
                at checkout.
              </p>
            </div>

            <button className='primary-btn'>
              Secure Checkout
            </button>

            <button
              className='secondary-btn'
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;