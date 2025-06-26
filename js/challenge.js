// Timer DOM Events Lab Implementation

// DOM Elements
const counter = document.getElementById('counter');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const submitBtn = document.getElementById('submit');

// State variables
let count = 0;
let likes = {};
let timerId;
let isPaused = false;

// Initialize timer
function startTimer() {
    timerId = setInterval(() => {
        if (!isPaused) {
            count++;
            counter.textContent = count;
        }
    }, 1000);
}

// Event Listeners
plusBtn.addEventListener('click', () => {
    if (!isPaused) {
        count++;
        counter.textContent = count;
    }
});

minusBtn.addEventListener('click', () => {
    if (!isPaused) {
        count--;
        counter.textContent = count;
    }
});

heartBtn.addEventListener('click', () => {
    if (!isPaused) {
        const numLikes = likes[count] || 0;
        likes[count] = numLikes + 1;
        
        // Update or create like element
        const existingLike = document.querySelector(`li[data-count="${count}"]`);
        if (existingLike) {
            existingLike.textContent = `${count} has been liked ${likes[count]} times`;
        } else {
            const likeElement = document.createElement('li');
            likeElement.textContent = `${count} has been liked ${likes[count]} times`;
            likeElement.dataset.count = count;
            likesList.appendChild(likeElement);
        }
    }
});

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'resume' : 'pause';
    
    // Toggle button states
    minusBtn.disabled = isPaused;
    plusBtn.disabled = isPaused;
    heartBtn.disabled = isPaused;
    submitBtn.disabled = isPaused;
});

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isPaused && commentInput.value.trim()) {
        const comment = document.createElement('p');
        comment.textContent = `${commentInput.value} ${new Date().toLocaleTimeString()}`;
        document.querySelector('.comments').appendChild(comment);
        commentInput.value = '';
    }
});

// Start the timer when the page loads
startTimer();

// Comment out the minified script in index.html
// Remove the following line from index.html:
// <script src="js/index.min.js"></script>
// Keep only:
// <script src="js/challenge.js"></script>