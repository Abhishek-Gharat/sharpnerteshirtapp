import CRUDCrudService from '../services/crudcrudService.js';

const FALLBACK_PRODUCTS = [
  { id: '1', name: 'Classic White Tee', price: 19.99, description: 'A timeless classic white t-shirt made from 100% cotton.', image: 'https://placehold.co/300x300/f5f0eb/888?text=White+Tee', category: 'casual', colors: ['White'], sizes: ['S','M','L','XL'] },
  { id: '2', name: 'Black V-Neck', price: 24.99, description: 'Stylish black v-neck t-shirt perfect for casual outings.', image: 'https://placehold.co/300x300/2c2c2a/ccc?text=Black+V-Neck', category: 'casual', colors: ['Black'], sizes: ['S','M','L','XL'] },
  { id: '3', name: 'Blue Graphic Tee', price: 22.99, description: 'Blue t-shirt with cool graphic design.', image: 'https://placehold.co/300x300/b5d4f4/185fa5?text=Blue+Graphic', category: 'graphic', colors: ['Blue'], sizes: ['S','M','L','XL'] },
  { id: '4', name: 'Red Polo Shirt', price: 27.99, description: 'Classic red polo shirt with collar.', image: 'https://placehold.co/300x300/f7c1c1/a32d2d?text=Red+Polo', category: 'polo', colors: ['Red'], sizes: ['S','M','L','XL'] }
];

export const fetchProducts = async () => {
  try {
    const products = await CRUDCrudService.fetchTShirts();
    return products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category || 'casual',
      colors: product.colors || ['White'],
      sizes: product.sizes || ['S','M','L','XL']
    }));
  } catch (error) {
    console.error('Error fetching products, using fallback:', error);
    return FALLBACK_PRODUCTS;
  }
};