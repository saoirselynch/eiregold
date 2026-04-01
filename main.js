// ================================
//   ÉIRE GOLD - Main JavaScript
// ================================

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
    });
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ---- SCROLL ANIMATION ----
// Animates elements into view as you scroll down the page
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// ---- ACTIVE NAV LINK ----
// Highlights the current page in the navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active-link');
    }
});

// ---- NAVBAR SCROLL EFFECT ----
// Adds a gold border to navbar when you scroll down
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.borderBottom = '2px solid #c9a84c';
        navbar.style.boxShadow = '0 2px 20px rgba(201, 168, 76, 0.2)';
    } else {
        navbar.style.borderBottom = 'none';
        navbar.style.boxShadow = 'none';
    }
});

// ---- SPARKLE EFFECT ON HERO ----
function createSparkle() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 8 + 4;
    const duration = Math.random() * 2 + 1;

    sparkle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #c9a84c, transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnim ${duration}s ease forwards;
        z-index: 2;
    `;

    hero.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), duration * 1000);
}

setInterval(createSparkle, 300);
// ---- CONTACT FORM VALIDATION ----
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Validate name
        const name = document.getElementById('fullName');
        if (!name.value.trim()) {
            document.getElementById('nameError').textContent = 'Please enter your full name';
            name.classList.add('error');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            document.getElementById('emailError').textContent = 'Please enter your email address';
            email.classList.add('error');
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            email.classList.add('error');
            isValid = false;
        }

        // Validate enquiry type
        const enquiry = document.getElementById('enquiryType');
        if (!enquiry.value) {
            document.getElementById('enquiryError').textContent = 'Please select an enquiry type';
            enquiry.classList.add('error');
            isValid = false;
        }

        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            document.getElementById('messageError').textContent = 'Please enter your message';
            message.classList.add('error');
            isValid = false;
        } else if (message.value.trim().length < 20) {
            document.getElementById('messageError').textContent = 'Message must be at least 20 characters';
            message.classList.add('error');
            isValid = false;
        }

        // If all valid show success
        if (isValid) {
            document.getElementById('successMsg').style.display = 'block';
            contactForm.reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Live validation on input
    document.getElementById('fullName').addEventListener('input', function() {
        if (this.value.trim()) {
            document.getElementById('nameError').textContent = '';
            this.classList.remove('error');
        }
    });

    document.getElementById('email').addEventListener('input', function() {
        if (this.value.trim()) {
            document.getElementById('emailError').textContent = '';
            this.classList.remove('error');
        }
    });

    document.getElementById('message').addEventListener('input', function() {
        if (this.value.trim().length >= 20) {
            document.getElementById('messageError').textContent = '';
            this.classList.remove('error');
        }
    });
}

// ---- ANIMATED COUNTERS (About Page) ----
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
}
// ---- COLLECTIONS FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const filterCount = document.getElementById('filterCount');
const noResults = document.getElementById('noResults');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        let visibleCount = 0;

        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeUp 0.4s ease forwards';
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (filterCount) {
            const label = filter === 'all' ? 'all' : filter;
            filterCount.textContent = `Showing ${visibleCount} ${label} piece${visibleCount !== 1 ? 's' : ''}`;
        }

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
});

function resetFilter() {
    filterBtns.forEach(b => b.classList.remove('active'));
    filterBtns[0].classList.add('active');
    productCards.forEach(card => card.classList.remove('hidden'));
    if (filterCount) filterCount.textContent = 'Showing all 6 pieces';
    if (noResults) noResults.style.display = 'none';
}

// ---- CURRENCY CONVERTER ----
const EXCHANGE_API_KEY = a8ab73a0d38c227cc2fe39d1 ;

function convertCurrency() {
    const amount = parseFloat(document.getElementById('eurAmount').value);
    const targetCurrency = document.getElementById('currencySelect').value;
    const resultDiv = document.getElementById('currencyResult');
    const errorDiv = document.getElementById('currencyError');
    const loadingDiv = document.getElementById('currencyLoading');

    // Hide previous results
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    loadingDiv.style.display = 'block';

    // Validate input
    if (!amount || amount <= 0) {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        document.querySelector('.currency-error p').textContent = '⚠️ Please enter a valid amount greater than 0';
        return;
    }

    // Fetch exchange rates
    fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/pair/EUR/${targetCurrency}`)
        .then(response => response.json())
        .then(data => {
            loadingDiv.style.display = 'none';

            if (data.result === 'success') {
                const rate = data.conversion_rate;
                const converted = (amount * rate).toFixed(2);
                const symbol = getCurrencySymbol(targetCurrency);

                document.getElementById('resultAmount').textContent = `${symbol}${converted} ${targetCurrency}`;
                document.getElementById('resultRate').textContent = `1 EUR = ${rate.toFixed(4)} ${targetCurrency}`;
                resultDiv.style.display = 'block';
            } else {
                errorDiv.style.display = 'block';
            }
        })
        .catch(error => {
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
            console.error('Currency API error:', error);
        });
}

function getCurrencySymbol(currency) {
    const symbols = {
        GBP: '£', USD: '$', AUD: 'A$',
        CAD: 'C$', JPY: '¥', CHF: 'CHF ',
        SEK: 'kr ', NOK: 'kr '
    };
    return symbols[currency] || '';
}

// Allow pressing Enter to convert
const eurInput = document.getElementById('eurAmount');
if (eurInput) {
    eurInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') convertCurrency();
    });

    // Live convert when amount changes
    eurInput.addEventListener('input', function() {
        if (document.getElementById('currencyResult').style.display === 'block') {
            convertCurrency();
        }
    });

    document.getElementById('currencySelect').addEventListener('change', function() {
        if (document.getElementById('currencyResult').style.display === 'block') {
            convertCurrency();
        }
    });
}
// ---- AUDIO PLAYER ----
function toggleAudio() {
    const audio = document.getElementById('celticAudio');
    const btn = document.getElementById('playPauseBtn');
    if (audio) {
        if (audio.paused) {
            audio.play();
            btn.textContent = '⏸ Pause Music';
        } else {
            audio.pause();
            btn.textContent = '▶ Play Music';
        }
    }
}