// ============================================
// NAVBAR MODULE
// ============================================

(function () {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav__link');

    // State
    const SCROLL_THRESHOLD = 50;
    let isMenuOpen = false;

    // ============================================
    // STICKY NAVBAR
    // ============================================

    function handleScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }

    // ============================================
    // MOBILE MENU
    // ============================================

    function openMenu() {
        isMenuOpen = true;
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('nav__links--open');
        document.body.classList.add('nav-open');
    }

    function closeMenu() {
        isMenuOpen = false;
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('nav__links--open');
        document.body.classList.remove('nav-open');
    }

    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // ============================================
    // ACTIVE LINK HIGHLIGHTING
    // ============================================

    function setActiveLink(targetId) {
        navLinkItems.forEach(function (link) {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === '#' + targetId) {
                link.classList.add('nav__link--active');
            }
        });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================

    // Scroll listener for sticky navbar
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when a nav link is clicked
    navLinkItems.forEach(function (link) {
        link.addEventListener('click', function () {
            var targetId = this.getAttribute('href').substring(1);
            setActiveLink(targetId);
            closeMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
            hamburger.focus();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (
            isMenuOpen &&
            !navLinks.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            closeMenu();
        }
    });

    // Handle resize - close mobile menu if viewport becomes desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMenu();
        }
    });

    // Initialize
    handleScroll();
})();
