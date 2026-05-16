// Mock service using localStorage for persistence
// This avoids CORS issues and API expiration problems

const FALLBACK_PRODUCTS = [
  { _id: '1', name: 'Classic White Tee', price: 19.99, description: 'A timeless classic white t-shirt made from 100% cotton.', image: 'https://placehold.co/300x300/f5f0eb/888?text=White+Tee', category: 'casual', colors: ['White'], sizes: ['S','M','L','XL'] },
  { _id: '2', name: 'Black V-Neck', price: 24.99, description: 'Stylish black v-neck t-shirt perfect for casual outings.', image: 'https://placehold.co/300x300/2c2c2a/ccc?text=Black+V-Neck', category: 'casual', colors: ['Black'], sizes: ['S','M','L','XL'] },
  { _id: '3', name: 'Blue Graphic Tee', price: 22.99, description: 'Blue t-shirt with cool graphic design.', image: 'https://placehold.co/300x300/b5d4f4/185fa5?text=Blue+Graphic', category: 'graphic', colors: ['Blue'], sizes: ['S','M','L','XL'] },
  { _id: '4', name: 'Red Polo Shirt', price: 27.99, description: 'Classic red polo shirt with collar.', image: 'https://placehold.co/300x300/f7c1c1/a32d2d?text=Red+Polo', category: 'polo', colors: ['Red'], sizes: ['S','M','L','XL'] }
];

const STORAGE_KEY = 'tshirt_products';
const CART_STORAGE_KEY = 'tshirt_cart';

const CRUDCrudService = {
  fetchTShirts: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if we have products in localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Initialize with fallback products
    localStorage.setItem(STORAGE_KEY, JSON.stringify(FALLBACK_PRODUCTS));
    return FALLBACK_PRODUCTS;
  },

  createTShirt: async (tShirtData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const stored = localStorage.getItem(STORAGE_KEY);
    const products = stored ? JSON.parse(stored) : FALLBACK_PRODUCTS;
    
    const newProduct = {
      ...tShirtData,
      _id: Date.now().toString(),
    };
    
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    
    return newProduct;
  },

  updateTShirt: async (tShirtId, tShirtData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const stored = localStorage.getItem(STORAGE_KEY);
    const products = stored ? JSON.parse(stored) : FALLBACK_PRODUCTS;
    
    const index = products.findIndex(p => p._id === tShirtId);
    if (index === -1) throw new Error('Product not found');
    
    products[index] = { ...products[index], ...tShirtData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    
    return products[index];
  },

  deleteTShirt: async (tShirtId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const stored = localStorage.getItem(STORAGE_KEY);
    const products = stored ? JSON.parse(stored) : FALLBACK_PRODUCTS;
    
    const filtered = products.filter(p => p._id !== tShirtId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    
    return true;
  },

  // Cart operations
  saveCart: async (cartData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    return { success: true };
  },

  loadCart: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [], totalQuantity: 0 };
  },

  clearCart: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem(CART_STORAGE_KEY);
    return { success: true };
  }
};

export default CRUDCrudService;
