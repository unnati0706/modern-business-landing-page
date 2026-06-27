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

// ============================================
// STATISTICS COUNTER MODULE
// ============================================

(function () {
    'use strict';

    // DOM Elements
    const statsSection = document.getElementById('statistics');
    const statNumbers = document.querySelectorAll('.stat-card__number');

    // State
    let hasAnimated = false;

    // ============================================
    // COUNTER ANIMATION
    // ============================================

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function: ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(easeOut * target);
            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    function animateAllStats() {
        statNumbers.forEach(function (statNumber) {
            animateCounter(statNumber);
        });
    }

    // ============================================
    // INTERSECTION OBSERVER
    // ============================================

    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateAllStats();
                observer.disconnect();
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.3
    });

    // Observe the stats section
    if (statsSection) {
        observer.observe(statsSection);
    }
})();

// ============================================
// FAQ ACCORDION MODULE
// ============================================

(function () {
    'use strict';

    // DOM Elements
    const faqSection = document.getElementById('faq');

    // Guard: exit if FAQ section doesn't exist
    if (!faqSection) return;

    const toggleButtons = faqSection.querySelectorAll('.faq-item__toggle');
    const faqItems = faqSection.querySelectorAll('.faq-item');

    // ============================================
    // TOGGLE INDIVIDUAL ITEM
    // ============================================

    function toggleItem(button) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const targetId = button.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetId);
        const faqItem = button.closest('.faq-item');

        if (isExpanded) {
            // Collapse
            button.setAttribute('aria-expanded', 'false');
            faqItem.classList.remove('faq-item--active');
        } else {
            // Expand
            button.setAttribute('aria-expanded', 'true');
            faqItem.classList.add('faq-item--active');
        }
    }

    // ============================================
    // CLOSE ALL ITEMS
    // ============================================

    function closeAllItems() {
        toggleButtons.forEach(function (button) {
            const faqItem = button.closest('.faq-item');
            button.setAttribute('aria-expanded', 'false');
            faqItem.classList.remove('faq-item--active');
        });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================

    toggleButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const isCurrentlyExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all items first (accordion behavior: only one open at a time)
            closeAllItems();

            // If the clicked item was not already open, open it
            if (!isCurrentlyExpanded) {
                toggleItem(this);
            }
        });
    });

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================

    faqSection.addEventListener('keydown', function (event) {
        const target = event.target;
        if (!target.classList.contains('faq-item__toggle')) return;

        const buttonsArray = Array.from(toggleButtons);
        const currentIndex = buttonsArray.indexOf(target);
        let nextIndex;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                nextIndex = (currentIndex + 1) % buttonsArray.length;
                buttonsArray[nextIndex].focus();
                break;

            case 'ArrowUp':
                event.preventDefault();
                nextIndex = (currentIndex - 1 + buttonsArray.length) % buttonsArray.length;
                buttonsArray[nextIndex].focus();
                break;

            case 'Home':
                event.preventDefault();
                buttonsArray[0].focus();
                break;

            case 'End':
                event.preventDefault();
                buttonsArray[buttonsArray.length - 1].focus();
                break;
        }
    });
})();

// ============================================
// CONTACT FORM VALIDATION MODULE
// ============================================

(function () {
    'use strict';

    // DOM Elements
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Guard: exit if form doesn't exist
    if (!form) return;

    // ============================================
    // VALIDATION RULES
    // ============================================

    const validators = {
        'contact-name': {
            validate: function (value) {
                if (!value.trim()) return 'Please enter your full name.';
                if (value.trim().length < 2) return 'Name must be at least 2 characters.';
                return '';
            }
        },
        'contact-email': {
            validate: function (value) {
                if (!value.trim()) return 'Please enter your email address.';
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address.';
                return '';
            }
        },
        'contact-phone': {
            validate: function (value) {
                if (!value.trim()) return ''; // Optional field
                var phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number.';
                return '';
            }
        },
        'contact-service': {
            validate: function (value) {
                if (!value) return 'Please select a service.';
                return '';
            }
        },
        'contact-message': {
            validate: function (value) {
                if (!value.trim()) return 'Please enter your message.';
                if (value.trim().length < 10) return 'Message must be at least 10 characters.';
                return '';
            }
        }
    };

    // ============================================
    // SHOW ERROR
    // ============================================

    function showError(fieldId, message) {
        var field = document.getElementById(fieldId);
        var errorSpan = field.parentElement.querySelector('.form-error');

        if (field && errorSpan && message) {
            field.classList.add('form-input--error');
            errorSpan.textContent = message;
            errorSpan.classList.add('form-error--visible');
            field.setAttribute('aria-invalid', 'true');
        }
    }

    // ============================================
    // CLEAR ERROR
    // ============================================

    function clearError(fieldId) {
        var field = document.getElementById(fieldId);
        var errorSpan = field.parentElement.querySelector('.form-error');

        if (field && errorSpan) {
            field.classList.remove('form-input--error');
            errorSpan.textContent = '';
            errorSpan.classList.remove('form-error--visible');
            field.removeAttribute('aria-invalid');
        }
    }

    // ============================================
    // VALIDATE SINGLE FIELD
    // ============================================

    function validateField(fieldId) {
        var field = document.getElementById(fieldId);
        var validator = validators[fieldId];

        if (!field || !validator) return true;

        var errorMessage = validator.validate(field.value);

        if (errorMessage) {
            showError(fieldId, errorMessage);
            return false;
        } else {
            clearError(fieldId);
            return true;
        }
    }

    // ============================================
    // VALIDATE ALL FIELDS
    // ============================================

    function validateAll() {
        var isValid = true;

        Object.keys(validators).forEach(function (fieldId) {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // ============================================
    // SHOW STATUS MESSAGE
    // ============================================

    function showStatus(type, message) {
        formStatus.textContent = message;
        formStatus.className = 'contact__status contact__status--visible contact__status--' + type;

        // Auto-hide after 5 seconds
        setTimeout(function () {
            formStatus.classList.remove('contact__status--visible');
        }, 5000);
    }

    // ============================================
    // RESET FORM
    // ============================================

    function resetForm() {
        form.reset();
        Object.keys(validators).forEach(function (fieldId) {
            clearError(fieldId);
        });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================

    // Real-time validation on blur
    Object.keys(validators).forEach(function (fieldId) {
        var field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function () {
                validateField(fieldId);
            });

            // Clear error on input (when user starts typing)
            field.addEventListener('input', function () {
                var errorSpan = this.parentElement.querySelector('.form-error');
                if (errorSpan && errorSpan.classList.contains('form-error--visible')) {
                    validateField(fieldId);
                }
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate all fields
        var isValid = validateAll();

        if (isValid) {
            // Simulate form submission (replace with actual API call)
            var submitButton = form.querySelector('.contact__submit');
            var originalText = submitButton.querySelector('.contact__submit-text').textContent;

            // Show loading state
            submitButton.disabled = true;
            submitButton.querySelector('.contact__submit-text').textContent = 'Sending...';

            // Simulate API delay
            setTimeout(function () {
                showStatus('success', 'Thank you! Your message has been sent. We\'ll get back to you within 24 hours.');
                resetForm();

                // Restore button
                submitButton.disabled = false;
                submitButton.querySelector('.contact__submit-text').textContent = originalText;
            }, 1500);
        } else {
            showStatus('error', 'Please fix the errors above and try again.');

            // Focus first error field
            var firstError = form.querySelector('.form-input--error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
})();

// ============================================
// NEWSLETTER VALIDATION MODULE
// ============================================

(function () {
    'use strict';

    // DOM Elements
    var form = document.getElementById('newsletter-form');
    var emailInput = document.getElementById('newsletter-email');
    var errorSpan = document.getElementById('newsletter-error');
    var successSpan = document.getElementById('newsletter-success');

    // Guard: exit if form doesn't exist
    if (!form || !emailInput) return;

    // ============================================
    // VALIDATE EMAIL
    // ============================================

    function validateEmail(value) {
        if (!value.trim()) {
            return 'Please enter your email address.';
        }
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address.';
        }
        return '';
    }

    // ============================================
    // SHOW ERROR
    // ============================================

    function showError(message) {
        errorSpan.textContent = message;
        errorSpan.classList.add('footer__newsletter-error--visible');
        successSpan.classList.remove('footer__newsletter-success--visible');
        emailInput.setAttribute('aria-invalid', 'true');
    }

    // ============================================
    // SHOW SUCCESS
    // ============================================

    function showSuccess(message) {
        successSpan.textContent = message;
        successSpan.classList.add('footer__newsletter-success--visible');
        errorSpan.classList.remove('footer__newsletter-error--visible');
        emailInput.removeAttribute('aria-invalid');
    }

    // ============================================
    // CLEAR MESSAGES
    // ============================================

    function clearMessages() {
        errorSpan.textContent = '';
        errorSpan.classList.remove('footer__newsletter-error--visible');
        successSpan.textContent = '';
        successSpan.classList.remove('footer__newsletter-success--visible');
        emailInput.removeAttribute('aria-invalid');
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================

    // Clear error on input
    emailInput.addEventListener('input', function () {
        if (errorSpan.classList.contains('footer__newsletter-error--visible')) {
            var errorMessage = validateEmail(this.value);
            if (!errorMessage) {
                clearMessages();
            }
        }
    });

    // Validate on blur
    emailInput.addEventListener('blur', function () {
        if (this.value.trim()) {
            var errorMessage = validateEmail(this.value);
            if (errorMessage) {
                showError(errorMessage);
            }
        }
    });

    // Form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate email
        var errorMessage = validateEmail(emailInput.value);

        if (errorMessage) {
            showError(errorMessage);
            emailInput.focus();
            return;
        }

        // Simulate subscription (replace with actual API call)
        var submitBtn = form.querySelector('.footer__newsletter-btn');
        var originalText = submitBtn.querySelector('.footer__newsletter-btn-text').textContent;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.footer__newsletter-btn-text').textContent = 'Subscribing...';

        // Simulate API delay
        setTimeout(function () {
            showSuccess('Thank you! You\'ve been subscribed to our newsletter.');
            emailInput.value = '';

            // Restore button
            submitBtn.disabled = false;
            submitBtn.querySelector('.footer__newsletter-btn-text').textContent = originalText;

            // Auto-hide success after 5 seconds
            setTimeout(function () {
                successSpan.classList.remove('footer__newsletter-success--visible');
            }, 5000);
        }, 1200);
    });
})();

// ============================================
// LOADING SCREEN MODULE
// ============================================

(function () {
    'use strict';

    var loader = document.getElementById('loader');

    function hideLoader() {
        if (loader) {
            loader.classList.add('loader--hidden');
            document.body.classList.remove('loading');
        }
    }

    // Hide loader when page is fully loaded
    window.addEventListener('load', function () {
        setTimeout(hideLoader, 1500);
    });

    // Fallback: hide loader after 3 seconds even if load event doesn't fire
    setTimeout(hideLoader, 3000);
})();

// ============================================
// DARK MODE MODULE
// ============================================

(function () {
    'use strict';

    var themeToggle = document.getElementById('theme-toggle');
    var htmlElement = document.documentElement;

    // Guard: exit if toggle doesn't exist
    if (!themeToggle) return;

    // Check for saved theme preference or default to light
    var savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Toggle theme
    function toggleTheme() {
        var currentTheme = htmlElement.getAttribute('data-theme');
        var newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Event listener
    themeToggle.addEventListener('click', toggleTheme);

    // Keyboard accessibility
    themeToggle.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleTheme();
        }
    });
})();

// ============================================
// BACK TO TOP MODULE
// ============================================

(function () {
    'use strict';

    var backToTopBtn = document.getElementById('back-to-top');
    var SCROLL_THRESHOLD = 400;

    // Guard: exit if button doesn't exist
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    function handleScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            backToTopBtn.classList.add('back-to-top--visible');
        } else {
            backToTopBtn.classList.remove('back-to-top--visible');
        }
    }

    // Scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    backToTopBtn.addEventListener('click', scrollToTop);

    // Keyboard accessibility
    backToTopBtn.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            scrollToTop();
        }
    });

    // Initialize
    handleScroll();
})();

// ============================================
// SCROLL REVEAL MODULE
// ============================================

(function () {
    'use strict';

    var revealElements = document.querySelectorAll('[data-reveal]');

    // Guard: exit if no elements
    if (revealElements.length === 0) return;

    // Intersection Observer for scroll reveal
    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target);
            }
        });
    }

    var observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    revealElements.forEach(function (element) {
        observer.observe(element);
    });
})();

// ============================================
// RIPPLE EFFECT MODULE
// ============================================

(function () {
    'use strict';

    var buttons = document.querySelectorAll('.btn');

    // Guard: exit if no buttons
    if (buttons.length === 0) return;

    function createRipple(event) {
        var button = event.currentTarget;
        var ripple = document.createElement('span');
        var rect = button.getBoundingClientRect();

        // Calculate ripple position
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        // Calculate ripple size
        var size = Math.max(rect.width, rect.height);

        // Set ripple styles
        ripple.className = 'ripple';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x - size / 2 + 'px';
        ripple.style.top = y - size / 2 + 'px';

        // Add ripple to button
        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(function () {
            ripple.remove();
        }, 600);
    }

    // Add click event listener to all buttons
    buttons.forEach(function (button) {
        button.addEventListener('click', createRipple);
    });
})();

// ============================================
// LAZY LOADING MODULE
// ============================================

(function () {
    'use strict';

    var lazyImages = document.querySelectorAll('img[data-lazy]');

    // Guard: exit if no lazy images
    if (lazyImages.length === 0) return;

    // Intersection Observer for lazy loading
    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                img.src = img.dataset.lazy;
                img.removeAttribute('data-lazy');
                img.classList.add('img--loaded');
                lazyObserver.unobserve(img);
            }
        });
    }

    var lazyObserver = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0,
        rootMargin: '100px'
    });

    // Observe all lazy images
    lazyImages.forEach(function (img) {
        lazyObserver.observe(img);
    });
})();
