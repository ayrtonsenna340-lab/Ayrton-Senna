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
            const targetId = this.getAttribute('href');
            
            // HANYA jalankan smooth scroll jika link berawalan '#' (anchor link)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar Background Change on Scroll
    // ===== MOBILE MENU TOGGLE (HAMBURGER) =====
    const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
        });
    }

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

    // ===== DOWNLOAD CV DENGAN JAVASCRIPT =====
    const cvBtn = document.getElementById('cv-download-btn');
    
    if (cvBtn) {
        cvBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah perilaku default navigasi biasa
            
            const fileName = 'CV-Ayrton-Senna.pdf';
            const fileUrl = fileName;
            
            // Mengambil file sebagai blob agar langsung terunduh
            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('File tidak ditemukan');
                    }
                    return response.blob();
                })
                .then(blob => {
                    // Buat URL objek dari blob
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    // Fallback: buka di tab baru jika fetch gagal (misal masalah CORS)
                    console.warn('Download gagal, membuka di tab baru:', error);
                    window.open(fileUrl, '_blank');
                });
        });
    }
}); // Penutup block DOMContentLoaded