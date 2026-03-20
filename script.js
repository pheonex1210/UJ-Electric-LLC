const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

// 1. Function to set the theme and update UI
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save preference

    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark Mode';
    }
}

// 2. Check for saved theme on load, default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// 3. Toggle button logic
toggleButton.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

/* --- Form Submission Logic --- */
const estimateForm = document.getElementById('estimate-form');
const successMsg = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');

if (estimateForm) {
    estimateForm.addEventListener('submit', function(e) {
        e.preventDefault(); // STOP the page from reloading/redirecting

        // Change button to show progress
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true; // Prevent multiple clicks

        // Prepare data for FormBold
        const formData = new FormData(estimateForm);

        // Send data in the background
        fetch(estimateForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success! Hide form and show your message
                estimateForm.style.display = 'none';
                successMsg.style.display = 'block';
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Oops! There was a problem. Please call us directly.");
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
            submitBtn.disabled = false;
        });
    });
}


const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Show button after scrolling 400px (standard distance)
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Smooth scroll function
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});