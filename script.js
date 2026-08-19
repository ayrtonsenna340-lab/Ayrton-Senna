// Initialize page interactions
// DOMContentLoaded is kept independent from the optional AOS library so the thesis lightbox
// still works even if the animation CDN is slow or unavailable.
document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS Animation Library when available
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Smooth Scrolling untuk Anchor Links di Navbar
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ===== LIGHTBOX UNTUK GAMBAR THESIS =====
    const images = document.querySelectorAll('.thesis-img');
    if (!images.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const imgClone = document.createElement('img');
    imgClone.alt = 'Expanded thesis image';
    overlay.appendChild(imgClone);
    document.body.appendChild(overlay);

    images.forEach(img => {
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const src = this.getAttribute('src');
            if (!src) return;

            imgClone.setAttribute('src', src);
            imgClone.setAttribute('alt', this.getAttribute('alt') || 'Expanded thesis image');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        overlay.classList.remove('active');
        imgClone.removeAttribute('src');
        document.body.style.overflow = '';
    }

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target === imgClone) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
});