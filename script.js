// Initialize AOS Animation Library
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Smooth Scrolling untuk Anchor Links di Navbar
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // ===== LIGHTBOX UNTUK GAMBAR THESIS =====
    const images = document.querySelectorAll('.thesis-img');
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const imgClone = document.createElement('img');
    overlay.appendChild(imgClone);
    document.body.appendChild(overlay);

    images.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const src = this.getAttribute('src');
            imgClone.setAttribute('src', src);
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    overlay.addEventListener('click', function(e) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});