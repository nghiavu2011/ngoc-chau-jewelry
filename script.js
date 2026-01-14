// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const mobileOverlay = document.querySelector('.mobile-nav-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav .nav-links a');

menuToggle.addEventListener('click', () => {
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 50) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Check on load

// Cart Count Logic
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addCartButtons = document.querySelectorAll('.btn-add-cart');

addCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        cartCountElement.textContent = cartCount;

        // Simple feedback
        const originalText = btn.textContent;
        btn.textContent = 'Đã thêm!';
        btn.style.backgroundColor = '#27ae60';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
        }, 1000);
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button');
        const originalBtnText = submitBtn.textContent;

        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Cảm ơn bạn đã liên hệ! Ngọc Châu Jewelry sẽ phản hồi sớm nhất có thể.');
            contactForm.reset();
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });

            // Update active link
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Sidebar Filter Mobile Toggle (Optional)
const filterToggle = document.querySelector('.filter-toggle');
if (filterToggle) {
    filterToggle.addEventListener('click', () => {
        alert('Chức năng lọc đang được phát triển.');
    });
}
