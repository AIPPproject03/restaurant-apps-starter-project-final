// src/public/views/templates/template-creator.js
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail">
    <h2 class="restaurant-detail__name">${restaurant.name}</h2>
    <img class="restaurant-detail__image" src="${CONFIG.BASE_IMAGE_URL.LARGE}${
  restaurant.pictureId
}" alt="${restaurant.name}">
    <div class="restaurant-detail__info">
      <p class="restaurant-detail__city"><strong>City:</strong> ${
  restaurant.city
}</p>
      <p class="restaurant-detail__address"><strong>Address:</strong> ${
  restaurant.address
}</p>
      <p class="restaurant-detail__description">${restaurant.description}</p>
    </div>
    
    <div class="restaurant-detail__menu">
      <h3>Food Menu</h3>
      <ul class="restaurant-detail__menu-list">
        ${restaurant.menus.foods
    .map((food) => `<li>${food.name}</li>`)
    .join('')}
      </ul>

      <h3>Drink Menu</h3>
      <ul class="restaurant-detail__menu-list">
        ${restaurant.menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('')}
      </ul>
    </div>

    <div class="restaurant-detail__reviews">
      <h3>Customer Reviews</h3>
      <div id="reviewsContainer">
        ${restaurant.customerReviews
    .map(
      (review) => `
          <div class="review">
            <p><strong>${review.name}</strong> (${review.date})</p>
            <p>${review.review}</p>
          </div>
        `
    )
    .join('')}
      </div>
    </div>

    <h3>Add Review</h3>
    <form id="reviewForm">
      <input type="text" id="reviewName" placeholder="Your Name" required>
      <textarea id="reviewText" placeholder="Write your review" required></textarea>
      <button type="submit">Submit Review</button>
    </form>

    <button id="favoriteButton" aria-label="Add to favorites" class="favorite-button">
      <span class="favorite-button__icon">☆</span>
    </button>
  </div>
`;

const createFavoriteRestaurantItemTemplate = (restaurant) => `
  <div class="favorite-restaurant-card">
    <img class="favorite-restaurant-card__image" src="${
  CONFIG.BASE_IMAGE_URL.LARGE
}${restaurant.pictureId}" alt="${restaurant.name}">
    
    <div class="favorite-restaurant-card__content">
      <h3 class="favorite-restaurant-card__name">${restaurant.name}</h3>
      <p class="favorite-restaurant-card__city">${restaurant.city}</p>
      <div class="favorite-restaurant-card__rating">
        ${getStars(restaurant.rating)}<br>
        <span class="rating-number">${restaurant.rating}</span>
      </div>
      
      <div class="favorite-restaurant-card__buttons">
        <a href="#/detail/${
  restaurant.id
}" class="detail-button" aria-label="View Details">
          <span class="material-icons">info</span>
        </a>
        <button class="unfavorite-button" aria-label="Remove from favorites" data-id="${
  restaurant.id
}">
          <span class="material-icons">delete</span>
        </button>
      </div>
    </div>
  </div>
`;

// Helper function to generate star ratings
const getStars = (rating) => {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="material-icons star">star</span>';
    } else {
      stars += '<span class="material-icons star">star_border</span>';
    }
  }
  return stars;
};

export { createRestaurantDetailTemplate, createFavoriteRestaurantItemTemplate };
