/* ============================================
   AMETCHON DJAKPATA - Spiritual & Herbal Center
   Multi-Page Navigation System (Vanilla JS)
============================================ */

(function () {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('.page-section');
    const backToTop = document.getElementById('backToTop');

    // Valid page sections (gallery removed)
    const validSections = ['home', 'about', 'services', 'why-choose-us', 'testimonials', 'contact'];

    function showPage(targetId) {
        allSections.forEach(function (section) {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        allNavLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function handleNavbarScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function handleBackToTopVisibility() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

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

    function handleNavClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        
        if (targetId) {
            showPage(targetId);
            closeMobileMenu();
        }
    }

    function handleBackToTopClick() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function handleHashChange() {
        const hash = window.location.hash.replace('#', '');
        
        if (hash && validSections.includes(hash)) {
            showPage(hash);
        } else {
            showPage('home');
        }
    }

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

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    allNavLinks.forEach(function (link) {
        link.addEventListener('click', handleNavClick);
    });

    if (backToTop) {
        backToTop.addEventListener('click', handleBackToTopClick);
    }

    document.addEventListener('click', function (e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    window.addEventListener('hashchange', handleHashChange);

    document.addEventListener('DOMContentLoaded', function () {
        const initialHash = window.location.hash.replace('#', '');
        
        if (initialHash && validSections.includes(initialHash)) {
            showPage(initialHash);
        } else {
            showPage('home');
        }

        handleNavbarScroll();
        handleBackToTopVisibility();
    });

})();
