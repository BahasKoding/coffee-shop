document.addEventListener('DOMContentLoaded', () => {
    // Navbar functionality
    const navbar = document.querySelector('nav');
    const navLinks = navbar.querySelectorAll('a');
    const menuToggle = document.querySelector('#menu-toggle');
    const mobileMenu = document.querySelector('#mobile-menu');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow-md');
            navbar.classList.remove('bg-transparent');
            navLinks.forEach(link => {
                link.classList.add('text-primary', 'hover:text-opacity-70');
                link.classList.remove('text-white', 'hover:text-gray-200');
            });
            menuToggle.classList.add('text-primary');
            menuToggle.classList.remove('text-white');
            mobileMenu.classList.add('bg-white');
            mobileMenu.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white', 'shadow-md');
            navbar.classList.add('bg-transparent');
            navLinks.forEach(link => {
                link.classList.remove('text-primary', 'hover:text-opacity-70');
                link.classList.add('text-white', 'hover:text-gray-200');
            });
            menuToggle.classList.remove('text-primary');
            menuToggle.classList.add('text-white');
            mobileMenu.classList.remove('bg-white');
            mobileMenu.classList.add('bg-transparent');
        }
    }

    // Initial navbar state
    updateNavbar();

    // Update navbar on scroll
    window.addEventListener('scroll', updateNavbar);

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0');
            backToTopBtn.classList.add('opacity-100');
        } else {
            backToTopBtn.classList.remove('opacity-100');
            backToTopBtn.classList.add('opacity-0');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add base animation styles
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .fade-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .fade-up.show {
            opacity: 1;
            transform: translateY(0);
        }
        .fade-in.active {
            opacity: 1;
            transform: translateY(0);
        }

        .slide-in-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .slide-in-right {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .slide-in-left.active, .slide-in-right.active {
            opacity: 1;
            transform: translateX(0);
        }

        .scale-in {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }

        .scale-in.active {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);

    // Animation function
    function animateElement(element, animationType, delay = 0) {
        if (!element) return;
        
        element.classList.add(animationType);
        setTimeout(() => {
            element.classList.add('active');
        }, delay);
    }

    // Header animations
    const headerElements = {
        title: document.getElementById('header-title'),
        subtitle: document.getElementById('header-subtitle'),
        cta: document.getElementById('header-cta')
    };

    Object.entries(headerElements).forEach(([key, element], index) => {
        if (element) {
            animateElement(element, 'fade-in', index * 200);
        }
    });

    // About section animations
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.id === 'about-text') {
                    animateElement(element, 'slide-in-left');
                } else if (element.id === 'about-image') {
                    animateElement(element, 'slide-in-right');
                } else {
                    animateElement(element, 'fade-in');
                }
                aboutObserver.unobserve(element);
            }
        });
    }, { threshold: 0.1 });

    ['about-title', 'about-text', 'about-image'].forEach(id => {
        const element = document.getElementById(id);
        if (element) aboutObserver.observe(element);
    });


    // Experience section
    const experiences = [
        {
            title: "Japanese-Inspired Tranquility",
            description: "Step into a world where traditional Japanese aesthetics meet modern coffee culture. Our carefully curated space offers a peaceful retreat from the bustling city life, where every detail is designed to enhance your coffee experience.",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            quote: "A truly serene experience. The attention to detail in both the coffee and the ambiance is remarkable.",
            author: "Sarah L.",
            role: "Coffee Enthusiast"
        },
        {
            title: "Artisanal Coffee Crafting",
            description: "Watch our skilled baristas craft your perfect cup using traditional Japanese brewing methods combined with modern techniques. Every cup is prepared with precision and care to bring out the unique flavors of our carefully selected beans.",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            quote: "The attention to detail in their brewing process is unmatched. Every cup is a masterpiece.",
            author: "Michael R.",
            role: "Coffee Connoisseur"
        },
        {
            title: "Zen Garden Atmosphere",
            description: "Our space is designed to create a peaceful atmosphere inspired by traditional Japanese zen gardens. The minimalist design, natural materials, and subtle lighting create the perfect environment for enjoying your coffee moment.",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            quote: "It's more than just a coffee shop - it's a sanctuary in the heart of the city.",
            author: "Emily W.",
            role: "Regular Customer"
        }
    ];

    let currentIndex = 0;

    // Create dynamic indicators
    const indicatorsContainer = document.querySelector('#experience .flex.justify-center.space-x-2');
    if (indicatorsContainer) {
        // Clear existing indicators
        indicatorsContainer.innerHTML = '';
        
        // Create new indicators based on experiences length
        experiences.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = `w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-300'}`;
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateExperience();
            });
            indicatorsContainer.appendChild(indicator);
        });
    }

    function updateExperience() {
        const experience = experiences[currentIndex];
        const elements = document.querySelectorAll('#experience-image, #experience-title, #experience-description, #experience-quote');
        
        // Fade out
        elements.forEach(el => {
            if (el) el.classList.remove('active');
        });

        setTimeout(() => {
            // Update content
            const experienceImage = document.getElementById('experience-image');
            const experienceTitle = document.getElementById('experience-title');
            const experienceDescription = document.getElementById('experience-description');
            const experienceQuote = document.getElementById('experience-quote');
          
            if (experienceImage) experienceImage.src = experience.image;
            if (experienceTitle) experienceTitle.textContent = experience.title;
            if (experienceDescription) experienceDescription.textContent = experience.description;
            if (experienceQuote) {
                experienceQuote.innerHTML = `
                   <div class="absolute -top-4 left-6 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <p class="italic text-gray-700 mb-4">"${experience.quote}"</p>
                    <footer class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <i class="fas fa-user text-gray-400"></i>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800">${experience.author}</p>
                            <p class="text-sm text-gray-500">${experience.role}</p>
                        </div>
                    </footer>
                `;
            }

            // Update indicators
            const indicators = document.querySelectorAll('#experience .rounded-full');
            indicators.forEach((indicator, index) => {
                if (indicator) {
                    indicator.classList.toggle('bg-primary', index === currentIndex);
                    indicator.classList.toggle('bg-gray-300', index !== currentIndex);
                }
            });
            // Fade in
            elements.forEach(el => {
                if (el) {
                    el.classList.add('fade-in');
                    setTimeout(() => el.classList.add('active'), 50);
                }
            });
        }, 300);
    }

    // Update indicators
    const indicators = document.querySelectorAll('#experience .rounded-full');
    indicators.forEach((indicator, index) => {
        if (indicator) {
            indicator.classList.toggle('bg-primary', index === currentIndex);
            indicator.classList.toggle('bg-gray-300', index !== currentIndex);
        }
    });
 
    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + experiences.length) % experiences.length;
            updateExperience();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % experiences.length;
            updateExperience();
        });
    }

    // Initialize experience section
    updateExperience();
    
  
     // Initialize Swiper
     const experienceSwiper = new Swiper('.experienceSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
});