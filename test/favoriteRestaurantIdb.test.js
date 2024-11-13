import { itActsAsFavoriteRestaurantModel } from "./contracts/favoriteRestaurantContract";
import FavoriteIdb from "../src/scripts/data/favorite-idb";

describe("Favorite Restaurant Idb Contract Test Implementation", () => {
  afterEach(async () => {
    const allRestaurants = await FavoriteIdb.getAllRestaurants();
    await Promise.all(
      allRestaurants.map((restaurant) =>
        FavoriteIdb.deleteRestaurant(restaurant.id)
      )
    );
  });

  itActsAsFavoriteRestaurantModel(FavoriteIdb);
});
