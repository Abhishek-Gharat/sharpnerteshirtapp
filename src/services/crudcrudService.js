const CRUDCrudService = {
  API_ENDPOINT: 'https://crudcrud.com/api/349c8d078e4849b7b0847c5fb8d3b4a7/tshirts',

  fetchTShirts: async () => {
    try {
      const response = await fetch(CRUDCrudService.API_ENDPOINT);
      if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
      return await response.json();
    } catch (error) {
      console.error('Error fetching t-shirts:', error);
      return [
        { _id: '1', name: 'Classic White Tee', price: 19.99, description: 'A timeless classic white t-shirt made from 100% cotton.', image: 'https://placehold.co/300x300/f5f0eb/888?text=White+Tee', category: 'casual', colors: ['White'], sizes: ['S','M','L','XL'] },
        { _id: '2', name: 'Black V-Neck', price: 24.99, description: 'Stylish black v-neck t-shirt perfect for casual outings.', image: 'https://placehold.co/300x300/2c2c2a/ccc?text=Black+V-Neck', category: 'casual', colors: ['Black'], sizes: ['S','M','L','XL'] },
        { _id: '3', name: 'Blue Graphic Tee', price: 22.99, description: 'Blue t-shirt with cool graphic design.', image: 'https://placehold.co/300x300/b5d4f4/185fa5?text=Blue+Graphic', category: 'graphic', colors: ['Blue'], sizes: ['S','M','L','XL'] },
        { _id: '4', name: 'Red Polo Shirt', price: 27.99, description: 'Classic red polo shirt with collar.', image: 'https://placehold.co/300x300/f7c1c1/a32d2d?text=Red+Polo', category: 'polo', colors: ['Red'], sizes: ['S','M','L','XL'] }
      ];
    }
  },

  createTShirt: async (tShirtData) => {
    const response = await fetch(CRUDCrudService.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tShirtData),
    });
    if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
    return await response.json();
  },

  updateTShirt: async (tShirtId, tShirtData) => {
    const response = await fetch(`${CRUDCrudService.API_ENDPOINT}/${tShirtId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tShirtData),
    });
    if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
    return await response.json();
  },

  deleteTShirt: async (tShirtId) => {
    const response = await fetch(`${CRUDCrudService.API_ENDPOINT}/${tShirtId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
    return true;
  }
};

export default CRUDCrudService;