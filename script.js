/* ============================================
   AMETCHON DJAKPATA - Spiritual & Herbal Center
   Vanilla JavaScript - Interactive Features
   
   Features:
   - Smooth navigation scroll
   - Active link highlighting
   - Mobile menu toggle
   - Scroll-based navbar styling
   - Back to top button
   - Fade-in animations on scroll
============================================ */

(function () {
    'use strict';

    /* ============================================
       DOM ELEMENTS
    ============================================= */
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');

    /* ============================================
       NAVBAR SCROLL EFFECT
       Adds a background and shadow when user scrolls
    ============================================= */
    function handleNavbarScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ============================================
       BACK TO TOP BUTTON VISIBILITY
    ============================================= */
    function handleBackToTopVisibility() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    /* ============================================
       ACTIVE NAVIGATION LINK HIGHLIGHTING
       Highlights the nav link matching current section
    ============================================= */
    function updateActiveLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ============================================
       MOBILE MENU TOGGLE
    ============================================= */
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    /* ============================================
       SCROLL ANIMATION - FADE IN ELEMENTS
       Elements with .fade-in class will appear 
       with a smooth animation when scrolled into view
    ============================================= */
    function initScrollAnimations() {
        // Add fade-in class to service cards, testimonial cards, why cards
        const animatableElements = document.querySelectorAll(
            '.service-card, .testimonial-card, .why-card, .gallery-item, .contact-item, .about-feature'
        );

        animatableElements.forEach(function (el) {
            el.classList.add('fade-in-element');
        });

        // Create intersection observer
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatableElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers
            animatableElements.forEach(function (el) {
                el.classList.add('visible');
            });
        }
    }

    /* ============================================
       SMOOTH SCROLL FOR NAVIGATION LINKS
    ============================================= */
    function handleNavClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        closeMobileMenu();
    }

    /* ============================================
       BACK TO TOP CLICK HANDLER
    ============================================= */
    function handleBackToTopClick() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /* ============================================
       EVENT LISTENERS
    ============================================= */
    
    // Scroll events (throttled for performance)
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function () {
            handleNavbarScroll();
            handleBackToTopVisibility();
            updateActiveLink();
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Navigation link clicks
    navLinks.forEach(function (link) {
        link.addEventListener('click', handleNavClick);
    });

    // Footer link clicks
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(function (link) {
        link.addEventListener('click', handleNavClick);
    });

    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', handleBackToTopClick);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    /* ============================================
       INITIALIZATION
    ============================================= */
    document.addEventListener('DOMContentLoaded', function () {
        handleNavbarScroll();
        handleBackToTopVisibility();
        updateActiveLink();
        initScrollAnimations();
    });

    /* ============================================
       DYNAMIC STYLES FOR SCROLL ANIMATIONS
       Injected via JS to avoid extra CSS rules
    ============================================= */
    var style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in-element.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .fade-in-element:nth-child(2) { transition-delay: 0.1s; }
        .fade-in-element:nth-child(3) { transition-delay: 0.2s; }
        .fade-in-element:nth-child(4) { transition-delay: 0.3s; }
        .fade-in-element:nth-child(5) { transition-delay: 0.4s; }
        .fade-in-element:nth-child(6) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);

})();
