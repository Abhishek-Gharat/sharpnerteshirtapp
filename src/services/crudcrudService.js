// CRUDCrud Service for T-Shirt Store
// You'll need to create your own API endpoint at https://crudcrud.com/api/

const CRUDCrudService = {
  // Get your API endpoint from https://crudcrud.com/
  // Replace 'YOUR_API_ENDPOINT' with your actual endpoint
  API_ENDPOINT: 'https://crudcrud.com/api/YOUR_API_ENDPOINT/tshirts',

  // Fetch all t-shirts from CRUDCrud
  fetchTShirts: async () => {
    try {
      console.log('Fetching from API endpoint:', CRUDCrudService.API_ENDPOINT);
      const response = await fetch(CRUDCrudService.API_ENDPOINT);
      console.log('API response status:', response.status);
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      const data = await response.json();
      console.log('Data received from API:', data);
      return data;
    } catch (error) {
      console.error('Error fetching t-shirts:', error);
      // Return sample data as fallback
      return [
        {
          _id: '1',
          name: 'Classic White Tee',
          price: 19.99,
          description: 'A timeless classic white t-shirt made from 100% cotton.',
          image: 'https://via.placeholder.com/300x300?text=White+Tee',
          category: 'casual',
          colors: ['White'],
          sizes: ['S', 'M', 'L', 'XL']
        },
        {
          _id: '2',
          name: 'Black V-Neck',
          price: 24.99,
          description: 'Stylish black v-neck t-shirt perfect for casual outings.',
          image: 'https://via.placeholder.com/300x300?text=Black+V-Neck',
          category: 'casual',
          colors: ['Black'],
          sizes: ['S', 'M', 'L', 'XL']
        },
        {
          _id: '3',
          name: 'Blue Graphic Tee',
          price: 22.99,
          description: 'Blue t-shirt with cool graphic design.',
          image: 'https://via.placeholder.com/300x300?text=Blue+Graphic',
          category: 'graphic',
          colors: ['Blue'],
          sizes: ['S', 'M', 'L', 'XL']
        },
        {
          _id: '4',
          name: 'Red Polo Shirt',
          price: 27.99,
          description: 'Classic red polo shirt with collar.',
          image: 'https://via.placeholder.com/300x300?text=Red+Polo',
          category: 'polo',
          colors: ['Red'],
          sizes: ['S', 'M', 'L', 'XL']
        }
      ];
    }
  },

  // Create a new t-shirt in CRUDCrud
  createTShirt: async (tShirtData) => {
    try {
      const response = await fetch(CRUDCrudService.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tShirtData),
      });
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating t-shirt:', error);
      throw error;
    }
  },

  // Update an existing t-shirt in CRUDCrud
  updateTShirt: async (tShirtId, tShirtData) => {
    try {
      const response = await fetch(CRUDCrudService.API_ENDPOINT + '/' + tShirtId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tShirtData),
      });
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating t-shirt:', error);
      throw error;
    }
  },

  // Delete a t-shirt from CRUDCrud
  deleteTShirt: async (tShirtId) => {
    try {
      const response = await fetch(CRUDCrudService.API_ENDPOINT + '/' + tShirtId, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      return true;
    } catch (error) {
      console.error('Error deleting t-shirt:', error);
      throw error;
    }
  }
};

export default CRUDCrudService;
