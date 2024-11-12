import FavoriteButtonInitiator from "../src/scripts/utils/favorite-button-initiator";
import FavoriteIdb from "../src/scripts/data/favorite-idb";

describe("Favorite Button Integration Test", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  });

  it("should add a restaurant to favorites when button is clicked", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.getElementById(
        "favoriteButtonContainer"
      ),
      restaurant: { id: 1, name: "Restaurant A" },
    });

    document.querySelector("#favoriteButtonContainer").click();
    const restaurant = await FavoriteIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1, name: "Restaurant A" });
  });

  it("should remove a restaurant from favorites when button is clicked again", async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.getElementById(
        "favoriteButtonContainer"
      ),
      restaurant: { id: 1, name: "Restaurant A" },
    });

    document.querySelector("#favoriteButtonContainer").click();
    document.querySelector("#favoriteButtonContainer").click();

    const restaurant = await FavoriteIdb.getRestaurant(1);
    expect(restaurant).toBeNull();
  });
});
