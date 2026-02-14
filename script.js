// script.js - Portfolio Website (Fully Integrated)
// Handles navbar, scrolling, animations, progress bars, and Google Sheet contact form

// ================================
// DOM Element Selections
// ================================
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.navbar-menu a');
const sections = document.querySelectorAll('.section');
const progressBars = document.querySelectorAll('.progress');
const contactForm = document.querySelector('.contact-form');
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");



// ================================
// Mobile Hamburger Menu Toggle
// ================================
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
// ================================
// Smooth Scrolling for Navbar Links
// ================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        if (navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    });
});

// ================================
// Active Navbar Link on Scroll
// ================================
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
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

// ================================
// Scroll-Based Reveal Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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

// ================================
// Animate Progress Bars on Scroll
// ================================
const skillsSection = document.querySelector('#skills');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressBars.forEach(bar => {
                const targetWidth = bar.dataset.progress || bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 150);
            });
            skillsObserver.unobserve(skillsSection);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ================================
// Contact Form → EmailJS
// ================================

// 🔴 EmailJS IDs (Dashboard se lo)
const EMAILJS_SERVICE_ID = "service_5olocuk";
const EMAILJS_TEMPLATE_ID = "template_iqle77a";

if (contactForm) {
    const statusText = document.createElement("p");
    statusText.className = "form-status";
    contactForm.appendChild(statusText);

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        // Validation
        if (!name || !email || !message) {
            statusText.innerText = "Please fill in all fields.";
            statusText.style.color = "red";
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            statusText.innerText = "Please enter a valid email address.";
            statusText.style.color = "red";
            return;
        }

        statusText.innerText = "Sending message...";
        statusText.style.color = "#aaa";

        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                name: name,
                email: email,
                message: message
            }
        )
        .then(() => {
            statusText.innerText = "Message sent successfully!";
            statusText.style.color = "lime";
            contactForm.reset();
        })
        .catch(() => {
            statusText.innerText = "Failed to send message. Try again.";
            statusText.style.color = "red";
        });
    });
}
