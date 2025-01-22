// Smooth Scroll for Navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Teacher Review System using Local Storage
  const reviewForm = document.getElementById('reviewForm');
  const reviewList = document.getElementById('reviewList');
  
  // Load Reviews from Local Storage
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviewList.innerHTML = '<h3>Recent Reviews</h3>';
    reviews.forEach((review, index) => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      reviewItem.innerHTML = `
        <h4>${review.teacherName}</h4>
        <p>${review.reviewText}</p>
        <div class="rating">Rating: ${'★'.repeat(review.rating)}</div>
        <button onclick="deleteReview(${index})">Delete</button>
      `;
      reviewList.appendChild(reviewItem);
    });
  }
  
  // Submit Review
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const teacherName = document.getElementById('teacherName').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.getElementById('rating').value;
  
    const review = {
      teacherName,
      reviewText,
      rating,
    };
  
    // Save to Local Storage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
  
    // Clear Form and Reload Reviews
    reviewForm.reset();
    loadReviews();
  });
  
  // Delete Review
  function deleteReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.splice(index, 1); // Remove the review at the specified index
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews(); // Reload the reviews
  }
  
  // Load Reviews on Page Load
  loadReviews();