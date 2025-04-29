document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Back to top button functionality
    const backToTop = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Initial check for scroll position
    toggleBackToTop();

    // Handle scroll event with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Handle click on back to top button
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Optimized navbar transparency on scroll
    let navbar = document.querySelector('.navbar');
    let ticking2 = false;
    let lastScrollY = window.scrollY;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
        }
        ticking2 = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking2) {
            window.requestAnimationFrame(function() {
                updateNavbar();
                ticking2 = false;
            });
            ticking2 = true;
        }
    }, { passive: true });


    // Add loading animation for images with optimized performance
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (!img.style.opacity) {
                    requestAnimationFrame(() => {
                        img.style.opacity = '1';
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});