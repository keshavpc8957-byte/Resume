// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const animatedName = document.getElementById('animated-name');
const progressBars = document.querySelectorAll('.progress');
const counters = document.querySelectorAll('.counter');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');

// Typing Effect for Animated Name
const nameText = "Keshav Kumar"; // Replace with your actual name
let index = 0;
function typeWriter() {
    if (index < nameText.length) {
        animatedName.innerHTML += nameText.charAt(index);
        index++;
        setTimeout(typeWriter, 150);
    }
}
typeWriter();

// Smooth Scrolling and Navbar Active Highlight
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Update Active Navbar Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll-Triggered Animations
const observerOptions = {
    threshold: 0.1
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
sections.forEach(section => observer.observe(section));

// Animate Progress Bars on Scroll
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.progress');
            const width = progress.getAttribute('data-width');
            progress.style.width = width;
        }
    });
}, { threshold: 0.5 });
progressBars.forEach(bar => progressObserver.observe(bar.parentElement));

// Animated Counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let count = 0;
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

// Project Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Form Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email.');
        return;
    }
    alert('Message sent successfully!');
    contactForm.reset();
});