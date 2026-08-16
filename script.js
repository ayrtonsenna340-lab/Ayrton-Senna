// Initialize AOS Animation Library
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 800,       // durasi animasi
        easing: 'ease-in-out', // efek transisi
        once: true,          // animasi cuma jalan sekali pas di scroll
        offset: 100          // jarak offset dari viewport
    });

    // Smooth Scrolling untuk Anchor Links di Navbar
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // dikurang 80px biar gak ketutup navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll (Opsional untuk efek Glassmorphism yang lebih kuat)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});