import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectIsCartVisible } from './redux/cartSlice';
import { fetchProducts } from './data/products';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/layout/HeroSection';
import ProductsSection from './components/products/ProductsSection';
import CartSection from './components/cart/CartSection';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorState from './components/ui/ErrorState';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showCart = useSelector(selectIsCartVisible);
  const cartRef = useRef(null);

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
