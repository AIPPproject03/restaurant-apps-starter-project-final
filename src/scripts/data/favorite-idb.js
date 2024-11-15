// favorite-idb.js
import { openDB } from 'idb';

const dbPromise = openDB('restaurant-db', 1, {
  upgrade(db) {
    db.createObjectStore('favorites', { keyPath: 'id' });
  },
});

const FavoriteIdb = {
  async getRestaurant(id) {
    const db = await dbPromise;
    const result = await db.get('favorites', id);
    console.log('Getting restaurant with id:', id, 'Result:', result);
    return result || null;
  },

  async getAllRestaurants() {
    const db = await dbPromise;
    const result = await db.getAll('favorites');
    console.log('Getting all restaurants:', result);
    return result;
  },

  async putRestaurant(restaurant) {
    if (!restaurant || !restaurant.id) {
      console.error('Invalid restaurant object');
      return;
    }
    const db = await dbPromise;
    await db.put('favorites', restaurant);
    console.log('Putting restaurant:', restaurant);
  },

  async deleteRestaurant(id) {
    const db = await dbPromise;
    await db.delete('favorites', id);
    console.log('Deleting restaurant with id:', id);
  },
};

export default FavoriteIdb;
