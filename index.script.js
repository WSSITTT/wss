document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const menuBackdrop = document.getElementById('menuBackdrop');

    if (menuToggle && mobileNav && menuBackdrop) {
        function openMenu() {
            mobileNav.classList.add('active');
            menuToggle.classList.add('active');
            menuBackdrop.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuBackdrop.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }

        menuToggle.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        menuBackdrop.addEventListener('click', closeMenu);

        window.addEventListener('resize', () => {
            if (mobileNav.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    let slideIndex = 1;
    showSlides(slideIndex);

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            plusSlides(-1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            plusSlides(1);
        });
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentSlide(index + 1);
        });
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        const slides = document.querySelectorAll('.slide');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        
        slides.forEach(slide => slide.style.display = 'none');
        thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));

        slides[slideIndex - 1].style.display = 'block';
        thumbnails[slideIndex - 1].classList.add('active');
    }
});
