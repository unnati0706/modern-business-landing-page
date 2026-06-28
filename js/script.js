// ============================================
// VIDEO MODAL MODULE
// ============================================

(function () {
    'use strict';

    var modal = document.getElementById('video-modal');
    var modalIframe = document.getElementById('video-modal-iframe');
    var modalVideo = document.getElementById('video-modal-mp4');
    var playBtn = document.querySelector('.about__play');
    var closeBtn = modal ? modal.querySelector('.video-modal__close') : null;
    var backdrop = modal ? modal.querySelector('.video-modal__backdrop') : null;

    var youtubeSrc = 'https://www.youtube.com/embed/7Vqomf4dHR0?autoplay=0&rel=0&modestbranding=1&playsinline=1';
    var localSrc = 'assets/videos/company-demo.mp4';
    var useLocalVideo = false;

    if (!modal || !playBtn) return;

    function openModal() {
        modal.classList.add('video-modal--open');
        document.body.style.overflow = 'hidden';

        if (useLocalVideo && modalVideo) {
            modalVideo.style.display = 'block';
            modalIframe.style.display = 'none';
            modalVideo.src = localSrc;
            modalVideo.play().catch(function () {});
        } else {
            modalIframe.style.display = 'block';
            if (modalVideo) modalVideo.style.display = 'none';
            modalIframe.src = youtubeSrc;
        }

        closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('video-modal--open');
        document.body.style.overflow = '';

        if (modalVideo) {
            modalVideo.pause();
            modalVideo.src = '';
        }
        modalIframe.src = '';

        playBtn.focus();
    }

    playBtn.addEventListener('click', openModal);

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('video-modal--open')) {
            closeModal();
        }
    });
})();

// ============================================
// ABOUT SECTION PARTICLES MODULE
// ============================================

(function () {
    'use strict';

    var canvas = document.querySelector('.about__particles');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animFrame;
    var isVisible = false;

    function resizeCanvas() {
        var wrap = canvas.parentElement;
        canvas.width = wrap.offsetWidth;
        canvas.height = wrap.offsetHeight;
    }

    function Particle() {
        this.reset();
    }

    Particle.prototype.reset = function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '99, 102, 241' : '139, 92, 246';
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
    };

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    };

    Particle.prototype.draw = function () {
        var currentOpacity = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + this.color + ', ' + currentOpacity + ')';
        ctx.fill();
    };

    function initParticles() {
        particles = [];
        var count = Math.min(25, Math.floor((canvas.width * canvas.height) / 8000));
        for (var i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!isVisible) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
            p.update();
            p.draw();
        });
        animFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!isVisible) {
            isVisible = true;
            animate();
        }
    }

    function stopAnimation() {
        isVisible = false;
        if (animFrame) cancelAnimationFrame(animFrame);
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                startAnimation();
            } else {
                stopAnimation();
            }
        });
    }, { threshold: 0.1 });

    resizeCanvas();
    initParticles();
    observer.observe(canvas.parentElement);

    window.addEventListener('resize', function () {
        resizeCanvas();
        initParticles();
    });
})();

// ============================================
// PARTICLES CANVAS MODULE
// ============================================

(function () {
    'use strict';

    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;
    var mouseX = 0;
    var mouseY = 0;
    var connectionDistance = 120;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, ' + this.opacity + ')';
        ctx.fill();
    };

    function initParticles() {
        particles = [];
        for (var i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    var opacity = (1 - dist / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(99, 102, 241, ' + opacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (p) {
            p.update();
            p.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', function () {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
})();

// ============================================
// NAVBAR MODULE
// ============================================

(function () {
    'use strict';

    // DOM Elements
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    var navLinkItems = document.querySelectorAll('.nav__link');

    // State
    var SCROLL_THRESHOLD = 50;
    var isMenuOpen = false;

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

    window.addEventListener('scroll', handleScroll, { passive: true });

    hamburger.addEventListener('click', toggleMenu);

    navLinkItems.forEach(function (link) {
        link.addEventListener('click', function () {
            var targetId = this.getAttribute('href').substring(1);
            setActiveLink(targetId);
            closeMenu();
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
            hamburger.focus();
        }
    });

    document.addEventListener('click', function (event) {
        if (
            isMenuOpen &&
            !navLinks.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            closeMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMenu();
        }
    });

    handleScroll();
})();

// ============================================
// STATISTICS COUNTER MODULE
// ============================================

(function () {
    'use strict';

    var statsSection = document.getElementById('statistics');
    var statNumbers = document.querySelectorAll('.stat-card__number');
    var hasAnimated = false;

    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-target'), 10);
        var suffix = element.getAttribute('data-suffix') || '';
        var duration = 2000;
        var startTime = performance.now();

        function updateCounter(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            var currentValue = Math.floor(easeOut * target);
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

    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateAllStats();
                observer.disconnect();
            }
        });
    }

    var observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.3
    });

    if (statsSection) {
        observer.observe(statsSection);
    }
})();

// ============================================
// FAQ ACCORDION MODULE
// ============================================

(function () {
    'use strict';

    var faqSection = document.getElementById('faq');
    if (!faqSection) return;

    var toggleButtons = faqSection.querySelectorAll('.faq-item__toggle');
    var faqItems = faqSection.querySelectorAll('.faq-item');

    function toggleItem(button) {
        var isExpanded = button.getAttribute('aria-expanded') === 'true';
        var faqItem = button.closest('.faq-item');

        if (isExpanded) {
            button.setAttribute('aria-expanded', 'false');
            faqItem.classList.remove('faq-item--active');
        } else {
            button.setAttribute('aria-expanded', 'true');
            faqItem.classList.add('faq-item--active');
        }
    }

    function closeAllItems() {
        toggleButtons.forEach(function (button) {
            var faqItem = button.closest('.faq-item');
            button.setAttribute('aria-expanded', 'false');
            faqItem.classList.remove('faq-item--active');
        });
    }

    toggleButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var isCurrentlyExpanded = this.getAttribute('aria-expanded') === 'true';
            closeAllItems();
            if (!isCurrentlyExpanded) {
                toggleItem(this);
            }
        });
    });

    faqSection.addEventListener('keydown', function (event) {
        var target = event.target;
        if (!target.classList.contains('faq-item__toggle')) return;

        var buttonsArray = Array.from(toggleButtons);
        var currentIndex = buttonsArray.indexOf(target);
        var nextIndex;

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

    var form = document.getElementById('contact-form');
    var formStatus = document.getElementById('form-status');

    if (!form) return;

    var validators = {
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
                if (!value.trim()) return '';
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

    function validateAll() {
        var isValid = true;
        Object.keys(validators).forEach(function (fieldId) {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function showStatus(type, message) {
        formStatus.textContent = message;
        formStatus.className = 'contact__status contact__status--visible contact__status--' + type;
        setTimeout(function () {
            formStatus.classList.remove('contact__status--visible');
        }, 5000);
    }

    function resetForm() {
        form.reset();
        Object.keys(validators).forEach(function (fieldId) {
            clearError(fieldId);
        });
    }

    Object.keys(validators).forEach(function (fieldId) {
        var field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function () {
                validateField(fieldId);
            });
            field.addEventListener('input', function () {
                var errorSpan = this.parentElement.querySelector('.form-error');
                if (errorSpan && errorSpan.classList.contains('form-error--visible')) {
                    validateField(fieldId);
                }
            });
        }
    });

    var PUBLIC_KEY = "X4ONsCQSBtFH4Q3Zt";
    var SERVICE_ID = "service_cr2qqj8";
    var TEMPLATE_ID = "template_brgx74g";

    emailjs.init({ publicKey: PUBLIC_KEY });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var isValid = validateAll();

        if (isValid) {
            var formData = {
                from_name: document.getElementById('contact-name').value.trim(),
                from_email: document.getElementById('contact-email').value.trim(),
                phone: document.getElementById('contact-phone').value.trim() || 'Not provided',
                company: document.getElementById('contact-company').value.trim() || 'Not provided',
                service: document.getElementById('contact-service').value,
                message: document.getElementById('contact-message').value.trim(),
                timestamp: new Date().toLocaleString()
            };

            var submitButton = form.querySelector('.contact__submit');
            var originalText = submitButton.querySelector('.contact__submit-text').textContent;

            submitButton.disabled = true;
            submitButton.querySelector('.contact__submit-text').textContent = 'Sending...';

            emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
                .then(function (response) {
                    console.log('EmailJS SUCCESS:', response.status, response.text);
                    showStatus('success', 'Thank you! Your message has been received. We\'ll get back to you within 24 hours.');
                    resetForm();
                })
                .catch(function (error) {
                    console.error('EmailJS ERROR:', error);
                    showStatus('error', 'Something went wrong. Please try again later or email us directly at unnati@velora.com.');
                })
                .finally(function () {
                    submitButton.disabled = false;
                    submitButton.querySelector('.contact__submit-text').textContent = originalText;
                });
        } else {
            showStatus('error', 'Please fix the errors above and try again.');
            var firstError = form.querySelector('.form-input--error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
})();

// ============================================
// NEWSLETTER EMAILJS MODULE
// ============================================

(function () {
    'use strict';

    var form = document.getElementById('newsletter-form');
    var emailInput = document.getElementById('newsletter-email');
    var errorSpan = document.getElementById('newsletter-error');
    var successSpan = document.getElementById('newsletter-success');

    if (!form || !emailInput) return;

    var NEWSLETTER_SERVICE_ID = 'service_cr2qqj8';
    var NEWSLETTER_TEMPLATE_ID = 'template_newsletter';

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

    function showError(message) {
        errorSpan.textContent = message;
        errorSpan.classList.add('footer__newsletter-error--visible');
        successSpan.classList.remove('footer__newsletter-success--visible');
        emailInput.setAttribute('aria-invalid', 'true');
    }

    function showSuccess(message) {
        successSpan.textContent = message;
        successSpan.classList.add('footer__newsletter-success--visible');
        errorSpan.classList.remove('footer__newsletter-error--visible');
        emailInput.removeAttribute('aria-invalid');
    }

    function clearMessages() {
        errorSpan.textContent = '';
        errorSpan.classList.remove('footer__newsletter-error--visible');
        successSpan.textContent = '';
        successSpan.classList.remove('footer__newsletter-success--visible');
        emailInput.removeAttribute('aria-invalid');
    }

    function setLoading(isLoading, btn) {
        var btnText = btn.querySelector('.footer__newsletter-btn-text');
        if (isLoading) {
            btn.disabled = true;
            if (btnText) btnText.textContent = 'Subscribing...';
            btn.classList.add('footer__newsletter-btn--loading');
        } else {
            btn.disabled = false;
            if (btnText) btnText.textContent = 'Subscribe';
            btn.classList.remove('footer__newsletter-btn--loading');
        }
    }

    emailInput.addEventListener('input', function () {
        if (errorSpan.classList.contains('footer__newsletter-error--visible')) {
            var errorMessage = validateEmail(this.value);
            if (!errorMessage) {
                clearMessages();
            }
        }
    });

    emailInput.addEventListener('blur', function () {
        if (this.value.trim()) {
            var errorMessage = validateEmail(this.value);
            if (errorMessage) {
                showError(errorMessage);
            }
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var errorMessage = validateEmail(emailInput.value);

        if (errorMessage) {
            showError(errorMessage);
            emailInput.focus();
            return;
        }

        var submitBtn = form.querySelector('.footer__newsletter-btn');
        var email = emailInput.value.trim();
        var now = new Date();
        var submissionDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        var submissionTime = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        setLoading(true, submitBtn);

        var templateParams = {
            subscriber_email: email,
            submission_date: submissionDate,
            submission_time: submissionTime,
            timestamp: now.toISOString()
        };

        emailjs.send(NEWSLETTER_SERVICE_ID, NEWSLETTER_TEMPLATE_ID, templateParams)
            .then(function (response) {
                console.log('Newsletter EmailJS SUCCESS:', response.status, response.text);
                showSuccess('Thanks for subscribing!');
                emailInput.value = '';
                setTimeout(function () {
                    successSpan.classList.remove('footer__newsletter-success--visible');
                }, 5000);
            })
            .catch(function (error) {
                console.error('Newsletter EmailJS ERROR:', error);
                showError('Something went wrong. Please try again later.');
            })
            .finally(function () {
                setLoading(false, submitBtn);
            });
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

    window.addEventListener('load', function () {
        setTimeout(hideLoader, 1500);
    });

    setTimeout(hideLoader, 3000);
})();

// ============================================
// BACK TO TOP MODULE
// ============================================

(function () {
    'use strict';

    var backToTopBtn = document.getElementById('back-to-top');
    var SCROLL_THRESHOLD = 400;

    if (!backToTopBtn) return;

    function handleScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            backToTopBtn.classList.add('back-to-top--visible');
        } else {
            backToTopBtn.classList.remove('back-to-top--visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    backToTopBtn.addEventListener('click', scrollToTop);

    backToTopBtn.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            scrollToTop();
        }
    });

    handleScroll();
})();

// ============================================
// SCROLL REVEAL MODULE
// ============================================

(function () {
    'use strict';

    var revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length === 0) return;

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

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
})();

// ============================================
// SCROLL PROGRESS BAR MODULE
// ============================================

(function () {
    'use strict';

    var progressBar = document.querySelector('.scroll-progress__bar');
    var progressContainer = document.getElementById('scroll-progress');

    if (!progressBar || !progressContainer) return;

    function updateProgress() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        progressBar.style.width = progress + '%';
        progressContainer.setAttribute('aria-valuenow', Math.round(progress));
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
})();

// ============================================
// ADVANCED DARK MODE MODULE (3 Themes)
// ============================================

(function () {
    'use strict';

    var themeToggle = document.getElementById('theme-toggle');
    var htmlElement = document.documentElement;

    if (!themeToggle) return;

    var themes = ['light', 'dark', 'system'];
    var currentThemeIndex = 0;

    var savedTheme = localStorage.getItem('theme') || 'dark';
    currentThemeIndex = themes.indexOf(savedTheme);
    if (currentThemeIndex === -1) currentThemeIndex = 1;

    function applyTheme(theme) {
        if (theme === 'system') {
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            themeToggle.classList.add('theme-toggle--system');
        } else {
            htmlElement.setAttribute('data-theme', theme);
            themeToggle.classList.remove('theme-toggle--system');
        }
    }

    function cycleTheme() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        var newTheme = themes[currentThemeIndex];
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    applyTheme(themes[currentThemeIndex]);

    themeToggle.addEventListener('click', cycleTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (themes[currentThemeIndex] === 'system') {
            applyTheme('system');
        }
    });
})();

// ============================================
// AI ASSISTANT MODULE
// ============================================

(function () {
    'use strict';

    var toggle = document.getElementById('ai-toggle');
    var chat = document.getElementById('ai-chat');
    var minimize = document.getElementById('ai-minimize');
    var messages = document.getElementById('ai-messages');
    var form = document.getElementById('ai-form');
    var input = document.getElementById('ai-input');
    var suggestions = document.querySelectorAll('.ai-assistant__suggestion');
    var assistantWidget = document.getElementById('ai-assistant');

    if (!toggle || !chat) return;

    chat.classList.add('ai-assistant__chat--closed');
    chat.classList.remove('ai-assistant__chat--open');
    toggle.setAttribute('aria-expanded', 'false');

    var responses = {
        'what services do you offer?': 'We offer Web Development, Mobile Apps, UI/UX Design, Digital Marketing, Cloud Solutions, and AI Integration. Each service is tailored to your business needs.',
        'how much does it cost?': 'Our plans start at $29/month for Starter, $79/month for Professional, and custom pricing for Enterprise. Would you like to see our pricing page?',
        'how can i contact you?': 'You can reach us at unnati@velora.com or call +91 98765 43210. We respond within 24 hours!',
        'default': 'Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our services or check out our FAQ.'
    };

    function openChat() {
        chat.classList.remove('ai-assistant__chat--closed');
        chat.classList.add('ai-assistant__chat--open');
        toggle.setAttribute('aria-expanded', 'true');
        input.focus();
    }

    function closeChat() {
        chat.classList.add('ai-assistant__chat--closed');
        chat.classList.remove('ai-assistant__chat--open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    function isChatOpen() {
        return chat.classList.contains('ai-assistant__chat--open');
    }

    function addMessage(text, isUser) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'ai-assistant__message ai-assistant__message--' + (isUser ? 'user' : 'bot');

        if (!isUser) {
            messageDiv.innerHTML = '<span class="ai-assistant__message-avatar" aria-hidden="true">&#129302;</span>';
        }

        var contentDiv = document.createElement('div');
        contentDiv.className = 'ai-assistant__message-content';
        contentDiv.innerHTML = '<p>' + text + '</p>';
        messageDiv.appendChild(contentDiv);

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
        var typingDiv = document.createElement('div');
        typingDiv.className = 'ai-assistant__message ai-assistant__message--bot ai-typing-wrapper';
        typingDiv.innerHTML = '<span class="ai-assistant__message-avatar" aria-hidden="true">&#129302;</span><div class="ai-typing"><span class="ai-typing__dot"></span><span class="ai-typing__dot"></span><span class="ai-typing__dot"></span></div>';
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
        return typingDiv;
    }

    function removeTyping(typingEl) {
        if (typingEl && typingEl.parentNode) {
            typingEl.parentNode.removeChild(typingEl);
        }
    }

    function getResponse(question) {
        var lower = question.toLowerCase();
        for (var key in responses) {
            if (key !== 'default' && lower.includes(key)) {
                return responses[key];
            }
        }
        return responses['default'];
    }

    function handleSend(text) {
        if (!text.trim()) return;

        addMessage(text, true);
        input.value = '';

        var typingEl = showTyping();

        setTimeout(function () {
            removeTyping(typingEl);
            addMessage(getResponse(text), false);
        }, 1200 + Math.random() * 800);
    }

    toggle.addEventListener('click', function () {
        if (isChatOpen()) {
            closeChat();
        } else {
            openChat();
        }
    });

    if (minimize) {
        minimize.addEventListener('click', function () {
            closeChat();
        });
    }

    document.addEventListener('click', function (event) {
        if (isChatOpen() && assistantWidget && !assistantWidget.contains(event.target)) {
            closeChat();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isChatOpen()) {
            closeChat();
            toggle.focus();
        }
    });

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            handleSend(input.value);
        });
    }

    suggestions.forEach(function (btn) {
        btn.addEventListener('click', function () {
            handleSend(this.dataset.question);
        });
    });
})();

// ============================================
// MICROINTERACTIONS MODULE
// ============================================

(function () {
    'use strict';

    // Magnetic button effect
    var magneticBtns = document.querySelectorAll('.btn--primary, .btn--glass');

    if (window.matchMedia('(pointer: fine)').matches) {
        magneticBtns.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                this.style.transform = 'translate(' + x * 0.2 + 'px, ' + y * 0.2 + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });
    }

    // Card tilt effect on hover
    if (window.matchMedia('(pointer: fine)').matches) {
        var tiltCards = document.querySelectorAll('.glass-card');

        tiltCards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = this.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width;
                var y = (e.clientY - rect.top) / rect.height;
                var tiltX = (y - 0.5) * 10;
                var tiltY = (x - 0.5) * -10;
                this.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-8px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });
    }
})();

// ============================================
// CTA SECTION PARTICLES MODULE
// ============================================

(function () {
    'use strict';

    var canvas = document.querySelector('.cta-section__particles');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animFrame;
    var isVisible = false;

    function resizeCanvas() {
        var wrap = canvas.parentElement;
        canvas.width = wrap.offsetWidth;
        canvas.height = wrap.offsetHeight;
    }

    function Particle() {
        this.reset();
    }

    Particle.prototype.reset = function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '99, 102, 241' : '139, 92, 246';
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.015 + 0.005;
    };

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    };

    Particle.prototype.draw = function () {
        var currentOpacity = this.opacity * (0.5 + Math.sin(this.pulse) * 0.5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + this.color + ', ' + currentOpacity + ')';
        ctx.fill();
    };

    function initParticles() {
        particles = [];
        var count = Math.min(20, Math.floor((canvas.width * canvas.height) / 12000));
        for (var i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!isVisible) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
            p.update();
            p.draw();
        });
        animFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!isVisible) {
            isVisible = true;
            animate();
        }
    }

    function stopAnimation() {
        isVisible = false;
        if (animFrame) cancelAnimationFrame(animFrame);
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                startAnimation();
            } else {
                stopAnimation();
            }
        });
    }, { threshold: 0.1 });

    resizeCanvas();
    initParticles();
    observer.observe(canvas.parentElement);

    window.addEventListener('resize', function () {
        resizeCanvas();
        initParticles();
    });
})();

// ============================================
// FOOTER PARTICLES MODULE
// ============================================

(function () {
    'use strict';

    var canvas = document.querySelector('.footer__particles');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animFrame;
    var isVisible = false;

    function resizeCanvas() {
        var wrap = canvas.parentElement;
        canvas.width = wrap.offsetWidth;
        canvas.height = wrap.offsetHeight;
    }

    function Particle() {
        this.reset();
    }

    Particle.prototype.reset = function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.25 + 0.05;
        this.color = Math.random() > 0.5 ? '99, 102, 241' : '139, 92, 246';
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
    };

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    };

    Particle.prototype.draw = function () {
        var currentOpacity = this.opacity * (0.5 + Math.sin(this.pulse) * 0.5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + this.color + ', ' + currentOpacity + ')';
        ctx.fill();
    };

    function initParticles() {
        particles = [];
        var count = Math.min(15, Math.floor((canvas.width * canvas.height) / 15000));
        for (var i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!isVisible) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
            p.update();
            p.draw();
        });
        animFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!isVisible) {
            isVisible = true;
            animate();
        }
    }

    function stopAnimation() {
        isVisible = false;
        if (animFrame) cancelAnimationFrame(animFrame);
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                startAnimation();
            } else {
                stopAnimation();
            }
        });
    }, { threshold: 0.05 });

    resizeCanvas();
    initParticles();
    observer.observe(canvas.parentElement);

    window.addEventListener('resize', function () {
        resizeCanvas();
        initParticles();
    });
})();
