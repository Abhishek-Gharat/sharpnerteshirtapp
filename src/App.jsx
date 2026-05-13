import React, { useEffect, useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { fetchProducts } from './data/products';
import './App.css';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/layout/HeroSection';
// Product components
import ProductsSection from './components/products/ProductsSection';
// Cart components
import CartSection from './components/cart/CartSection';
// UI components
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorState from './components/ui/ErrorState';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        setError('Failed to load collection. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <CartProvider>
        <div className='app'>
          <Header />
          <main>
            <HeroSection />
            <div className='loading-state'>
              <LoadingSpinner />
              <p className='loading-message'>Curating your timeless collection...</p>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider>
    );
  }

  if (error) {
    return (
      <CartProvider>
        <div className='app'>
          <Header />
          <main>
            <ErrorState error={error} onRetry={() => window.location.reload()} />
          </main>
          <Footer />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className='app'>
        <Header />
        <main>
          <ProductsSection products={products} />
          <CartSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;