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

// Admission Form - Print to PDF
const admissionForm = document.getElementById('admissionForm');
admissionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Create a printable version of the form data
  const printContent = `
    <h2>Saint Martha's Junior High School</h2>
    <h3>Admission Form</h3>
    <p><strong>Student's Name:</strong> ${document.getElementById('studentName').value}</p>
    <p><strong>Parent's Name:</strong> ${document.getElementById('parentName').value}</p>
    <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
    <p><strong>Phone:</strong> ${document.getElementById('phone').value}</p>
    <p><strong>Address:</strong> ${document.getElementById('address').value}</p>
    <p><strong>Date of Birth:</strong> ${document.getElementById('dob').value}</p>
    <p><strong>Gender:</strong> ${document.getElementById('gender').value}</p>
    <p><strong>Class Applying For:</strong> ${document.getElementById('class').value}</p>
  `;

  // Open a new window with the printable content
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write(`
    <html>
      <head>
        <title>Admission Form</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2, h3 { color: #333; }
          p { margin: 10px 0; }
        </style>
      </head>
      <body>
        ${printContent}
        <script>
          window.onload = function() {
            window.print(); // Automatically trigger the print dialog
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
});