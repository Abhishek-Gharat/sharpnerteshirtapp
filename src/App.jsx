import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectIsCartVisible, 
  selectCartItems, 
  selectCartCount,
  selectIsInitialLoad,
  selectCartLoading,
  sendCartData,
  loadCartData
} from './redux/cartSlice';
import { showNotification, hideNotification } from './redux/uiSlice';
import { fetchProducts } from './data/products';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/layout/HeroSection';
import ProductsSection from './components/products/ProductsSection';
import CartSection from './components/cart/CartSection';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorState from './components/ui/ErrorState';
import Notification from './components/ui/Notification';

function App() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showCart = useSelector(selectIsCartVisible);
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const isInitialLoad = useSelector(selectIsInitialLoad);
  const cartLoading = useSelector(selectCartLoading);
  const cartRef = useRef(null);

  // Load cart from localStorage on mount with notifications
  useEffect(() => {
    const loadCart = async () => {
      // Show loading notification
      dispatch(showNotification({
        status: 'pending',
        title: 'Loading...',
        message: 'Fetching cart data!'
      }));

      try {
        const result = await dispatch(loadCartData()).unwrap();
        
        // Show success notification
        dispatch(showNotification({
          status: 'success',
          title: 'Success!',
          message: result.items?.length > 0 
            ? `Loaded ${result.items.length} items from cart!` 
            : 'Cart is empty!'
        }));

        // Auto-hide after 3 seconds
        setTimeout(() => {
          dispatch(hideNotification());
        }, 3000);
      } catch (error) {
        // Show error notification
        dispatch(showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Failed to fetch cart data!'
        }));

        // Auto-hide after 3 seconds
        setTimeout(() => {
          dispatch(hideNotification());
        }, 3000);
      }
    };

    loadCart();
  }, [dispatch]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => { setError('Failed to load collection. Please try again.'); setLoading(false); });
  }, []);

  // Scroll to cart when it becomes visible
  useEffect(() => {
    if (showCart && cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCart]);

  // Send cart data to backend whenever cart changes (after initial load)
  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    const sendCart = async () => {
      // Show pending notification
      dispatch(showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));

      try {
        await dispatch(sendCartData({
          items: cartItems,
          totalQuantity: cartCount
        })).unwrap();

        // Show success notification
        dispatch(showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Cart data saved successfully!'
        }));

        // Auto-hide after 3 seconds
        setTimeout(() => {
          dispatch(hideNotification());
        }, 3000);
      } catch (error) {
        // Show error notification
        dispatch(showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Failed to save cart data!'
        }));

        // Auto-hide after 3 seconds
        setTimeout(() => {
          dispatch(hideNotification());
        }, 3000);
      }
    };

    sendCart();
  }, [cartItems, cartCount, dispatch, isInitialLoad]);

  if (loading) return (
    <div className='app'>
      <Header />
      <main><HeroSection /><div className='loading-state'><LoadingSpinner /><p className='loading-message'>Curating your timeless collection...</p></div></main>
      <Footer />
    </div>
  );

  if (error) return (
    <div className='app'>
      <Header />
      <main><ErrorState error={error} onRetry={() => window.location.reload()} /></main>
      <Footer />
    </div>
  );

  return (
    <div className='app'>
      <Notification />
      <Header />
      <main>
        <HeroSection />
        <ProductsSection products={products} />
        {showCart && <div ref={cartRef}><CartSection /></div>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
