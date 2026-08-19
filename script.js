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

    // ===== LIGHTBOX UNTUK SEMUA GAMBAR (UNIVERSAL) =====
    // Buat elemen overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const imgClone = document.createElement('img');
    overlay.appendChild(imgClone);
    document.body.appendChild(overlay);

    // Pilih SEMUA tag img yang ada di halaman
    const allImages = document.querySelectorAll('img');

    allImages.forEach(img => {
        // Abaikan gambar yang berada di dalam overlay (untuk menghindari error)
        if (img.closest('.lightbox-overlay')) return;

        // Ubah kursor menjadi pointer agar terlihat bisa diklik
        img.style.cursor = 'pointer';

        // Saat gambar diklik
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const src = this.getAttribute('src');
            if (src) {
                imgClone.setAttribute('src', src);
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Nonaktifkan scroll
            }
        });
    });

    // Tutup overlay ketika diklik di area luar gambar
    overlay.addEventListener('click', function(e) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Tutup dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});