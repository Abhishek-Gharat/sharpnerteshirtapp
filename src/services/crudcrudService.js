const CRUDCrudService = {
  // Generate a new API endpoint - user should replace this with their own from crudcrud.com
  API_ENDPOINT: 'https://crudcrud.com/api/dacd659f75754c6f92765a0702d8bed8/tshirts',

  fetchTShirts: async () => {
    try {
      const response = await fetch(CRUDCrudService.API_ENDPOINT);
      if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
      return await response.json();
    } catch (error) {
      console.error('Error fetching t-shirts:', error);
      // Return fallback data when API fails
      return [
        { _id: '1', name: 'Classic White Tee', price: 19.99, description: 'A timeless classic white t-shirt made from 100% cotton.', image: 'https://placehold.co/300x300/f5f0eb/888?text=White+Tee', category: 'casual', colors: ['White'], sizes: ['S','M','L','XL'] },
        { _id: '2', name: 'Black V-Neck', price: 24.99, description: 'Stylish black v-neck t-shirt perfect for casual outings.', image: 'https://placehold.co/300x300/2c2c2a/ccc?text=Black+V-Neck', category: 'casual', colors: ['Black'], sizes: ['S','M','L','XL'] },
        { _id: '3', name: 'Blue Graphic Tee', price: 22.99, description: 'Blue t-shirt with cool graphic design.', image: 'https://placehold.co/300x300/b5d4f4/185fa5?text=Blue+Graphic', category: 'graphic', colors: ['Blue'], sizes: ['S','M','L','XL'] },
        { _id: '4', name: 'Red Polo Shirt', price: 27.99, description: 'Classic red polo shirt with collar.', image: 'https://placehold.co/300x300/f7c1c1/a32d2d?text=Red+Polo', category: 'polo', colors: ['Red'], sizes: ['S','M','L','XL'] }
      ];
    }
  },

  createTShirt: async (tShirtData) => {
    try {
      const response = await fetch(CRUDCrudService.API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tShirtData),
      });
      if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
      return await response.json();
    } catch (error) {
      console.error('Error creating t-shirt:', error);
      throw error;
    }
  },

  updateTShirt: async (tShirtId, tShirtData) => {
    try {
      const response = await fetch(`${CRUDCrudService.API_ENDPOINT}/${tShirtId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tShirtData),
      });
      if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
      return await response.json();
    } catch (error) {
      console.error('Error updating t-shirt:', error);
      throw error;
    }
  },

  deleteTShirt: async (tShirtId) => {
    try {
      const response = await fetch(`${CRUDCrudService.API_ENDPOINT}/${tShirtId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
      return true;
    } catch (error) {
      console.error('Error deleting t-shirt:', error);
      throw error;
    }
  }
};

export default CRUDCrudService;
