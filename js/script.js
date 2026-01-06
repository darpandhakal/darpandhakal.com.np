// Dark Mode Toggle with Local Storage for Persistence
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    toggleButton.textContent = '☀️';
} else {
    toggleButton.textContent = '🌙';
}

// Toggle theme on button click
toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    toggleButton.textContent = theme === 'light' ? '☀️' : '🌙';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple Contact Form Handling (Frontend Only)
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, send data to a backend (e.g., via fetch to an API). For now, just log and alert.
    const formData = new FormData(form);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Thank you for your message! (This is a frontend demo; no email sent. Add a backend like Node.js/Express for real functionality.)');
    form.reset();
});

// Optional: Add fade-in animations on scroll (enhances UX without libraries)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to sections for smooth reveal
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});