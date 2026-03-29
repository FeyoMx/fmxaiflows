// =============================================
// FMX AI Flows - Interactive JavaScript
// =============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initSmoothScroll();
    initDarkMode();
    initAnalyticsTracking();
});

// =============================================
// Navigation Menu Toggle
// =============================================

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.toggle('active');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', String(isExpanded));
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-wrapper')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// =============================================
// Scroll Effects
// =============================================

function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.solution-card, .pricing-card, .tech-card, .comparison-card'
    );

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// =============================================
// Animations
// =============================================

function initAnimations() {
    // Add animation class when element is visible
    const cards = document.querySelectorAll('.solution-card, .pricing-card, .tech-card');

    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Parallax effect for gradient orbs (throttled + cached NodeList)
    const parallaxOrbs = document.querySelectorAll('.gradient-orb');
    const handleParallax = throttle(function() {
        const scrolled = window.pageYOffset;
        parallaxOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16);
    window.addEventListener('scroll', handleParallax, { passive: true });

    // Pricing card hover effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Solution card tilt effect (only on pointer devices, not touch)
    const solutionCards = document.querySelectorAll('.solution-card');
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    if (!isTouchDevice) {
        solutionCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

// =============================================
// Smooth Scroll
// =============================================

function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// Stats Counter Animation
// =============================================

function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats and trigger counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('%')) {
                    const number = parseInt(text);
                    stat.textContent = '0%';
                    animateCounter(stat, number, 1000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// =============================================
// WhatsApp Link Handler
// =============================================
// WhatsApp click tracking is handled in initAnalyticsTracking()

// =============================================
// Form Validation (if you add a contact form)
// =============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// =============================================
// Loading Animation
// =============================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 100);
});

// =============================================
// Utility Functions
// =============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =============================================
// Console Easter Egg
// =============================================

console.log('%c¡Hola! 👋', 'color: #0066FF; font-size: 24px; font-weight: bold;');
console.log('%c¿Interesado en automatización? Contáctanos en fmxaiflows@gmail.com', 'color: #6B2DB8; font-size: 14px;');
console.log('%c🚀 Automatización Creada para Crecer Contigo', 'color: #0066FF; font-size: 12px;');

// =============================================
// Dark Mode Implementation
// =============================================

function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;

    // Check for saved theme preference or use system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    };

    // Set theme
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
        updateThemeColorMeta(theme);
    };

    // Update icon based on current theme
    const updateThemeIcon = (theme) => {
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    };

    // Update meta theme-color dynamically
    const updateThemeColorMeta = (theme) => {
        const themeColorLight = document.querySelector('meta[name="theme-color"][media*="light"]');
        const themeColorDark = document.querySelector('meta[name="theme-color"][media*="dark"]');

        // Also set a general theme-color for browsers that don't support media queries
        let generalThemeColor = document.querySelector('meta[name="theme-color"]:not([media])');
        if (!generalThemeColor) {
            generalThemeColor = document.createElement('meta');
            generalThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(generalThemeColor);
        }

        generalThemeColor.setAttribute('content', theme === 'dark' ? '#0A0E27' : '#FFFFFF');
    };

    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        // Track theme change in Analytics
        if (typeof trackThemeChange === 'function') {
            trackThemeChange(newTheme);
        }
    };

    // Initialize theme on page load
    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);

    // Add click event to toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}


// =============================================
// Google Analytics Event Tracking
// =============================================

function trackEvent(eventName, eventParams = {}) {
    // Check if gtag is available
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
}

function initAnalyticsTracking() {
    // Track WhatsApp button clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a.social-link.whatsapp');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackEvent('contact_whatsapp', {
                event_category: 'Conversión',
                event_label: 'Click WhatsApp',
                value: this.href
            });

            // Meta Pixel 'Contact' tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    method: 'WhatsApp'
                });
            }
        });
    });

    // Track Email button clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"], a.social-link.email');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackEvent('contact_email', {
                event_category: 'Conversión',
                event_label: 'Click Email',
                value: this.href
            });

            // Meta Pixel 'Contact' tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    method: 'Email'
                });
            }
        });
    });

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            trackEvent('cta_click', {
                event_category: 'Engagement',
                event_label: buttonText,
                value: this.href || 'button'
            });
        });
    });

    // Track pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const packageName = this.querySelector('.pricing-title')?.textContent || 'Unknown';
            trackEvent('pricing_click', {
                event_category: 'Engagement',
                event_label: packageName
            });
        });
    });

    // Track navigation clicks
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const section = this.getAttribute('href');
            trackEvent('navigation_click', {
                event_category: 'Navigation',
                event_label: section
            });
        });
    });

    // Track scroll depth
    let scrollTracked = {
        25: false,
        50: false,
        75: false,
        100: false
    };

    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

        for (let threshold in scrollTracked) {
            if (scrollPercent >= threshold && !scrollTracked[threshold]) {
                scrollTracked[threshold] = true;
                trackEvent('scroll_depth', {
                    event_category: 'Engagement',
                    event_label: `${threshold}%`,
                    value: threshold
                });
            }
        }
    }, 1000), { passive: true });

    // Track social media clicks
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            let platform = 'Unknown';
            if (this.classList.contains('whatsapp')) platform = 'WhatsApp';
            if (this.classList.contains('facebook')) platform = 'Facebook';
            if (this.classList.contains('email')) platform = 'Email';

            trackEvent('social_click', {
                event_category: 'Social',
                event_label: platform
            });
        });
    });
}

// Track theme changes
function trackThemeChange(theme) {
    trackEvent('theme_change', {
        event_category: 'User Preference',
        event_label: theme,
        value: theme === 'dark' ? 1 : 0
    });
}

