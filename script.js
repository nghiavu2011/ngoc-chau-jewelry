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

// CMS Dynamic Content Loader
const loadCMSContent = async () => {
    try {
        // Load Settings
        const settingsRes = await fetch('data/settings.json');
        if (settingsRes.ok) {
            const settings = await settingsRes.json();
            document.querySelectorAll('.store-info .fa-phone + span, .store-info p:nth-child(2)').forEach(el => {
                if (el.innerHTML.includes('fa-phone')) el.innerHTML = `<i class="fa-solid fa-phone"></i> ${settings.phone}`;
            });
            // You can add more mapping for email, address here if IDs are added
        }

        // Load Products
        const productsRes = await fetch('data/products.json');
        if (productsRes.ok) {
            const data = await productsRes.json();
            const container = document.getElementById('products-container');
            if (container && data.items) {
                container.innerHTML = data.items.map(item => `
                    <div class="product-item reveal">
                        <div class="product-img">
                            ${item.tag ? `<span class="tag">${item.tag}</span>` : ''}
                            <img src="${item.image_front}" alt="${item.title}" class="img-front">
                            <img src="${item.image_back || item.image_front}" alt="${item.title}" class="img-back">
                            <button class="btn-wishlist"><i class="fa-regular fa-heart"></i></button>
                            <button class="btn-add-cart">Thêm vào giỏ</button>
                        </div>
                        <div class="product-info">
                            <h3 class="serif">${item.title}</h3>
                            <div class="rating">
                                ${Array(5).fill(0).map((_, i) => `<i class="${i < item.rating ? 'fa-solid' : 'fa-regular'} fa-star"></i>`).join('')}
                            </div>
                            <p class="price">${item.price}</p>
                        </div>
                    </div>
                `).join('');

                // Re-init reveal animations for new items
                initReveal();
                // Re-init Cart event listeners
                initCartLogic();
            }
        }

        // Load Testimonials
        const testimonialsRes = await fetch('data/testimonials.json');
        if (testimonialsRes.ok) {
            const data = await testimonialsRes.json();
            const container = document.getElementById('testimonials-container');
            if (container && data.items) {
                container.innerHTML = data.items.map(item => `
                    <div class="testimonial-card reveal">
                        <div class="quote-icon"><i class="fa-solid fa-quote-left"></i></div>
                        <p>"${item.content}"</p>
                        <div class="customer-mini">
                            <img src="${item.avatar}" alt="${item.name}">
                            <div>
                                <h5>${item.name}</h5>
                            </div>
                        </div>
                    </div>
                `).join('');
                initReveal();
            }
        }
    } catch (err) {
        console.error('Error loading CMS data:', err);
    }
};

// Re-usable Reveal Logic
const initReveal = () => {
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
    revealOnScroll();
};

// Re-usable Cart Logic
const initCartLogic = () => {
    const addCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartCountElement = document.querySelector('.cart-count');
    addCartButtons.forEach(btn => {
        btn.onclick = () => {
            let cartCount = parseInt(cartCountElement.textContent) || 0;
            cartCount++;
            cartCountElement.textContent = cartCount;
            const originalText = btn.textContent;
            btn.textContent = 'Đã thêm!';
            btn.style.backgroundColor = '#27ae60';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
            }, 1000);
        };
    });
};

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    loadCMSContent();
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
