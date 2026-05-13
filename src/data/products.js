
import CRUDCrudService from '../services/crudcrudService.js';

// This file will now export a function to fetch products instead of static data
export const fetchProducts = async () => {
  try {
    console.log('Attempting to fetch products from CRUDCrud...');
    const products = await CRUDCrudService.fetchTShirts();
    console.log('Products fetched from CRUDCrud:', products);
    // Convert CRUDCrud format to our expected format
    return products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category || 'casual',
      colors: product.colors || ['White'],
      sizes: product.sizes || ['S', 'M', 'L', 'XL']
    }));
  } catch (error) {
    console.error('Error fetching products from CRUDCrud:', error);
    console.log('Falling back to sample data');
    // Return sample data as fallback
    return [
  {
    id: '1',
    name: 'Classic White Tee',
    price: 19.99,
    description: 'A timeless classic white t-shirt made from 100% cotton.',
    image:
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
    category: 'casual',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Black V-Neck',
    price: 24.99,
    description: 'Stylish black v-neck t-shirt perfect for casual outings.',
    image:
      'https://images.pexels.com/photos/9558597/pexels-photo-9558597.jpeg',
    category: 'casual',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Blue Graphic Tee',
    price: 22.99,
    description: 'Blue t-shirt with cool graphic design.',
    image:
      'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
    category: 'graphic',
    colors: ['Blue'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    name: 'Red Polo Shirt',
    price: 27.99,
    description: 'Classic red polo shirt with collar.',
    image:
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
    category: 'polo',
    colors: ['Red'],
    sizes: ['S', 'M', 'L', 'XL']
  }
];
  }
};

