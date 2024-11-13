const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it("should return the restaurant that has been added", async () => {
    const testRestaurant1 = { id: 1, name: "Restaurant 1" };
    const testRestaurant2 = { id: 2, name: "Restaurant 2" };

    await favoriteRestaurant.putRestaurant(testRestaurant1);
    await favoriteRestaurant.putRestaurant(testRestaurant2);

    expect(await favoriteRestaurant.getRestaurant(1)).toEqual(testRestaurant1);
    expect(await favoriteRestaurant.getRestaurant(2)).toEqual(testRestaurant2);

    expect(await favoriteRestaurant.getRestaurant(3)).toBeNull();
  });

  it("should refuse a restaurant from being added if it does not have the correct property", async () => {
    const invalidRestaurant = { name: "Invalid Restaurant" };

    await favoriteRestaurant.putRestaurant(invalidRestaurant);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
  });

  it("can return all of the restaurants that have been added", async () => {
    const testRestaurant1 = { id: 1, name: "Restaurant 1" };
    const testRestaurant2 = { id: 2, name: "Restaurant 2" };

    await favoriteRestaurant.putRestaurant(testRestaurant1);
    await favoriteRestaurant.putRestaurant(testRestaurant2);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
      testRestaurant1,
      testRestaurant2,
    ]);
  });

  it("should remove favorite restaurant", async () => {
    const testRestaurant1 = { id: 1, name: "Restaurant 1" };
    const testRestaurant2 = { id: 2, name: "Restaurant 2" };
    const testRestaurant3 = { id: 3, name: "Restaurant 3" };

    await favoriteRestaurant.putRestaurant(testRestaurant1);
    await favoriteRestaurant.putRestaurant(testRestaurant2);
    await favoriteRestaurant.putRestaurant(testRestaurant3);

    await favoriteRestaurant.deleteRestaurant(1);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
      testRestaurant2,
      testRestaurant3,
    ]);
  });

  it("should handle request to remove a restaurant even though the restaurant has not been added", async () => {
    const testRestaurant1 = { id: 1, name: "Restaurant 1" };
    const testRestaurant2 = { id: 2, name: "Restaurant 2" };
    const testRestaurant3 = { id: 3, name: "Restaurant 3" };

    await favoriteRestaurant.putRestaurant(testRestaurant1);
    await favoriteRestaurant.putRestaurant(testRestaurant2);
    await favoriteRestaurant.putRestaurant(testRestaurant3);

    await favoriteRestaurant.deleteRestaurant(4);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
      testRestaurant1,
      testRestaurant2,
      testRestaurant3,
    ]);
  });
};

export { itActsAsFavoriteRestaurantModel };
