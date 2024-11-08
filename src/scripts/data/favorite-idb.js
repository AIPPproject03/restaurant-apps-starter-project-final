import { openDB } from 'idb';

const dbPromise = openDB('restaurant-db', 1, {
  upgrade(db) {
    db.createObjectStore('favorites', { keyPath: 'id' });
  },
});

const FavoriteIdb = {
  async getRestaurant(id) {
    return (await dbPromise).get('favorites', id);
  },

  async getAllRestaurants() {
    return (await dbPromise).getAll('favorites');
  },

  async putRestaurant(restaurant) {
    return (await dbPromise).put('favorites', restaurant);
  },

  async deleteRestaurant(id) {
    return (await dbPromise).delete('favorites', id);
  },
};

export default FavoriteIdb;
