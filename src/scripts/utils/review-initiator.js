import CONFIG from '../globals/config';

const ReviewInitiator = {
  async submitReview(restaurantId, name, review) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: restaurantId, name, review }),
      });

      const result = await response.json();
      if (!result.error) {
        this.addReviewToContainer(result.customerReviews);
      } else {
        alert('Failed to add review. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  },

  addReviewToContainer(reviews) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = reviews
      .map(
        (review) => `
        <div class="review">
          <p><strong>${review.name}</strong> (${review.date})</p>
          <p>${review.review}</p>
        </div>
      `
      )
      .join('');
  },
};

export default ReviewInitiator;
