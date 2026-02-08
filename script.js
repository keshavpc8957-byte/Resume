// script.js - Best JavaScript for the Portfolio Website
// This script handles mobile menu toggle, smooth scrolling, active navbar links, scroll-based animations, progress bar animations, and basic form validation.

// DOM Element Selections
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.navbar-menu a');
const sections = document.querySelectorAll('.section');
const progressBars = document.querySelectorAll('.progress');
const contactForm = document.querySelector('.contact-form');

// Mobile Hamburger Menu Toggle
// Toggles the navbar menu visibility on mobile and animates the hamburger icon
navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active'); // Optional: Add class for icon animation if needed in CSS
});

// Smooth Scrolling for Navbar Links
// Adds smooth scroll behavior to all navbar links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu after clicking a link
        if (navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    });
});

// Active Navbar Link on Scroll
// Highlights the current section in the navbar based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for navbar height
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll-Based Reveal Animations
// Uses Intersection Observer to reveal sections with fade-in and slide effects
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the section is visible
    rootMargin: '0px 0px -50px 0px' // Slight offset for better timing
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Animate Progress Bars on Scroll
// Animates skill progress bars when the skills section comes into view
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressBars.forEach(bar => {
                const width = bar.style.width; // Get the width from inline style
                bar.style.width = '0%'; // Reset to 0
                setTimeout(() => {
                    bar.style.width = width; // Animate to target width
                }, 100);
            });
            skillsObserver.unobserve(skillsSection); // Animate only once
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contact Form Validation and Submission
// Handles form submission with basic validation and feedback
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Simulate form submission (replace with actual backend call)
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset(); // Clear the form
});

// Optional: Add a subtle scroll effect to the profile image (already handled in CSS, but can enhance with JS if needed)
// No additional JS needed here as CSS handles the float animation.

// Ensure the script runs after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Any initialization code can go here if needed
    console.log('Portfolio website loaded successfully.');
});
