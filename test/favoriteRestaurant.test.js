import FavoriteIdb from "../src/scripts/data/favorite-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Liking and Unliking a Restaurant", () => {
  const restaurantData = { id: 1, name: "A Test Restaurant" };

  beforeEach(() => {
    TestFactories.addFavoriteButtonContainer();
  });

  afterEach(async () => {
    await FavoriteIdb.deleteRestaurant(1);
  });

  it("should show the favorite button when the restaurant has not been liked before", async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      restaurantData
    );

    expect(
      document.querySelector('[aria-label="favorite this restaurant"]')
    ).toBeTruthy();
  });

  it("should show the unfavorite button when the restaurant has been liked before", async () => {
    await FavoriteIdb.putRestaurant(restaurantData);

    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      restaurantData
    );

    expect(
      document.querySelector('[aria-label="unfavorite this restaurant"]')
    ).toBeTruthy();
  });

  it("should be able to like a restaurant", async () => {
    let restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toBeFalsy();

    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      restaurantData
    );

    const favoriteButton = document.querySelector(
      '[aria-label="favorite this restaurant"]'
    );
    favoriteButton.click();

    await new Promise((resolve) => setTimeout(resolve, 500));

    restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toEqual(restaurantData);

    console.log("Restaurant after liking:", restaurant);
  });

  it("should be able to unlike a restaurant", async () => {
    await FavoriteIdb.putRestaurant(restaurantData);

    let restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toEqual(restaurantData);

    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      restaurantData
    );

    const unfavoriteButton = document.querySelector(
      '[aria-label="unfavorite this restaurant"]'
    );
    unfavoriteButton.click();

    await new Promise((resolve) => setTimeout(resolve, 500));

    restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toBeFalsy();

    console.log("Restaurant after unliking:", restaurant);
  });
});
