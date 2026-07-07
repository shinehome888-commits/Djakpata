/* ============================================
   AMETCHON DJAKPATA - Spiritual & Herbal Center
   Multi-Page Navigation System (Vanilla JS)
   
   Features:
   - Only one section visible at a time
   - Menu clicks switch between "pages"
   - Smooth fade-in transitions
   - Mobile menu support
   - Navbar scroll effect
============================================ */

(function () {
    'use strict';

    /* ============================================
       DOM ELEMENTS
    ============================================= */
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('.page-section');
    const backToTop = document.getElementById('backToTop');

    /* ============================================
       PAGE SWITCHING FUNCTION
       Hides all sections, shows only the target
    ============================================= */
    function showPage(targetId) {
        // Hide all sections
        allSections.forEach(function (section) {
            section.classList.remove('active');
        });

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update active nav link
        allNavLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /* ============================================
       NAVBAR SCROLL EFFECT
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
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    /* ============================================
       MOBILE MENU TOGGLE
    ============================================= */
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
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
       HANDLE NAVIGATION CLICKS
       Prevents default scroll, switches page instead
    ============================================= */
    function handleNavClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        
        if (targetId) {
            showPage(targetId);
            closeMobileMenu();
        }
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
       HANDLE BROWSER BACK/FORWARD BUTTONS
       Uses hash to navigate between pages
    ============================================= */
    function handleHashChange() {
        const hash = window.location.hash.replace('#', '');
        const validSections = ['home', 'about', 'services', 'why-choose-us', 'gallery', 'testimonials', 'contact'];
        
        if (hash && validSections.includes(hash)) {
            showPage(hash);
        } else {
            showPage('home');
        }
    }

    /* ============================================
       EVENT LISTENERS
    ============================================= */
    
    // Scroll events (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function () {
            handleNavbarScroll();
            handleBackToTopVisibility();
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // All navigation links (menu, footer, service cards)
    allNavLinks.forEach(function (link) {
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

    // Browser back/forward buttons
    window.addEventListener('hashchange', handleHashChange);

    /* ============================================
       INITIALIZATION
    ============================================= */
    document.addEventListener('DOMContentLoaded', function () {
        // Check if there's a hash in the URL on load
        const initialHash = window.location.hash.replace('#', '');
        const validSections = ['home', 'about', 'services', 'why-choose-us', 'gallery', 'testimonials', 'contact'];
        
        if (initialHash && validSections.includes(initialHash)) {
            showPage(initialHash);
        } else {
            // Default: show home page only
            showPage('home');
        }

        handleNavbarScroll();
        handleBackToTopVisibility();
    });

})();
