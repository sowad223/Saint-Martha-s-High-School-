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

// Admission Form - Generate PDF
const admissionForm = document.getElementById('admissionForm');
admissionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Check if jsPDF is loaded
  if (typeof jsPDF !== 'undefined') {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Form Data
    const studentName = document.getElementById('studentName').value;
    const parentName = document.getElementById('parentName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // Add School Name and Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("Saint Martha's Junior High School", 10, 20);
    doc.setFontSize(14);
    doc.text("Admission Form", 10, 30);

    // Form Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Student's Name: ${studentName}`, 10, 50);
    doc.text(`Parent's Name: ${parentName}`, 10, 60);
    doc.text(`Email: ${email}`, 10, 70);
    doc.text(`Phone: ${phone}`, 10, 80);
    doc.text(`Address: ${address}`, 10, 90);

    // Add a Border
    doc.rect(5, 5, 200, 287); // A4 size border

    // Save the PDF
    doc.save('admission_form.pdf');
  } else {
    alert('Error: jsPDF library not loaded. Please check your internet connection.');
  }
});