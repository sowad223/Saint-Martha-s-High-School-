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
      <div class="rating">Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <button onclick="deleteReview(${index})">Delete</button>
    `;
    reviewList.appendChild(reviewItem);
  });
}

// Submit Review
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const teacherName = document.getElementById('teacherName').value.trim();
  const reviewText = document.getElementById('reviewText').value.trim();
  const rating = document.getElementById('rating').value;

  if (!teacherName || !reviewText || !rating) {
    alert('Please fill out all fields before submitting.');
    return;
  }

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

  // Validate Form Fields
  const studentName = document.getElementById('studentName').value.trim();
  const parentName = document.getElementById('parentName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const classApplying = document.getElementById('class').value;

  if (!studentName || !parentName || !email || !phone || !address || !dob || !gender || !classApplying) {
    alert('Please fill out all fields before submitting.');
    return;
  }

  // Create a printable version of the form data
  const printContent = `
    <h2>Saint Martha's Junior High School</h2>
    <h3>Admission Form</h3>
    <p><strong>Student's Name:</strong> ${studentName}</p>
    <p><strong>Parent's Name:</strong> ${parentName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Date of Birth:</strong> ${dob}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Class Applying For:</strong> ${classApplying}</p>
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

// bKash Payment Form Submission
const bkashForm = document.getElementById('bkashForm');
bkashForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const bkashNumber = document.getElementById('bkashNumber').value.trim();
  const transactionId = document.getElementById('transactionId').value.trim();

  if (!bkashNumber || !transactionId) {
    alert('Please fill out all fields before submitting.');
    return;
  }

  // Simulate payment confirmation
  alert(`Payment confirmed! bKash Number: ${bkashNumber}, Transaction ID: ${transactionId}`);
  bkashForm.reset();
});

// Chatbot Functionality
const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotSendBtn = document.getElementById('chatbot-send-btn');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Toggle Chatbot Visibility
chatbotToggleBtn.addEventListener('click', () => {
  chatbotContainer.classList.toggle('active');
});

// Close Chatbot
chatbotCloseBtn.addEventListener('click', () => {
  chatbotContainer.classList.remove('active');
});

// Send Message
chatbotSendBtn.addEventListener('click', () => {
  sendMessage();
});

chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = chatbotInput.value.trim();
  if (!userMessage) return;

  // Add User Message to Chat
  const userMessageElement = document.createElement('div');
  userMessageElement.className = 'message user';
  userMessageElement.textContent = userMessage;
  chatbotMessages.appendChild(userMessageElement);

  // Clear Input
  chatbotInput.value = '';

  // Simulate Bot Response
  setTimeout(() => {
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'message bot';
    botMessageElement.textContent = `Thank you for your message: "${userMessage}". We will get back to you soon!`;
    chatbotMessages.appendChild(botMessageElement);

    // Scroll to Bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 1000);
}

// Gallery Image Lightbox
const galleryImages = document.querySelectorAll('.gallery-images img');
galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <img src="${image.src}" alt="${image.alt}">
      <span class="close-lightbox">&times;</span>
    `;
    document.body.appendChild(lightbox);

    // Close Lightbox
    lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
      lightbox.remove();
    });
  });
});

// Lightbox Styles (Dynamically Added)
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .lightbox img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
  }
  .close-lightbox {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }
`;
document.head.appendChild(lightboxStyles);