import React, { useEffect, useState, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import { fetchProducts } from './data/products';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/layout/HeroSection';
import ProductsSection from './components/products/ProductsSection';
import CartSection from './components/cart/CartSection';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorState from './components/ui/ErrorState';

function AppContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    fetchProducts()
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => { setError('Failed to load collection. Please try again.'); setLoading(false); });
  }, []);

  const handleCartClick = () => {
    setShowCart(prev => !prev);
    setTimeout(() => cartRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  if (loading) return (
    <div className='app'>
      <Header onCartClick={handleCartClick} />
      <main><HeroSection /><div className='loading-state'><LoadingSpinner /><p className='loading-message'>Curating your timeless collection...</p></div></main>
      <Footer />
    </div>
  );

  if (error) return (
    <div className='app'>
      <Header onCartClick={handleCartClick} />
      <main><ErrorState error={error} onRetry={() => window.location.reload()} /></main>
      <Footer />
    </div>
  );

  return (
    <div className='app'>
      <Header onCartClick={handleCartClick} />
      <main>
        <HeroSection />
        <ProductsSection products={products} />
        {showCart && <div ref={cartRef}><CartSection /></div>}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;