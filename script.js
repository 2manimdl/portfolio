/* ============================================
   PORTFOLIO — Farrel Vittorio Kuki
   script.js — GSAP Animations & Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── MOBILE MENU ───
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => navLinks.classList.remove('show'));
        });
    }

    // ─── ACTIVE LINK ON SCROLL ───
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.getAttribute('id') || '';
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href') || '';
            if (current && href.includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // ─── NAVBAR SCROLL EFFECT ───
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '12px 10%';
                navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
            } else {
                navbar.style.padding = '18px 10%';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ─── GSAP GUARD ───
    if (typeof gsap === 'undefined') {
        // GSAP not loaded — make all hidden elements visible as fallback
        document.querySelectorAll('.gs-reveal, .hero h1, .hero .role, .hero .desc, .hero .btn, .footer-content').forEach(el => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
        return;
    }

    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    if (hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    const defaultEase = 'power3.out';

    // ─── ANIMATED GRID BACKGROUND ───
    const gridBg = document.getElementById('grid-bg');
    if (gridBg) {
        gsap.to(gridBg, { x: -48, y: -48, duration: 12, repeat: -1, ease: 'none' });
        gsap.to(gridBg, { opacity: 0.6, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    // ─── HERO TIMELINE ───
    if (document.querySelector('.hero')) {
        const heroTl = gsap.timeline({ defaults: { ease: defaultEase } });
        heroTl
            .fromTo('.hero-photo-wrapper',
                { opacity: 0, scale: 0.85, visibility: 'hidden' },
                { opacity: 1, scale: 1, visibility: 'visible', duration: 0.9, delay: 0.3 }
            )
            .fromTo('.hero .role',
                { opacity: 0, x: -30, visibility: 'hidden' },
                { opacity: 1, x: 0, visibility: 'visible', duration: 0.7 }, '-=0.4'
            )
            .fromTo('.hero h1',
                { opacity: 0, y: 50, visibility: 'hidden' },
                { opacity: 1, y: 0, visibility: 'visible', duration: 0.9 }, '-=0.4'
            )
            .fromTo('.hero .desc',
                { opacity: 0, y: 25, visibility: 'hidden' },
                { opacity: 1, y: 0, visibility: 'visible', duration: 0.7 }, '-=0.3'
            )
            .fromTo('.hero .btn',
                { opacity: 0, y: 15, visibility: 'hidden' },
                { opacity: 1, y: 0, visibility: 'visible', duration: 0.5 }, '-=0.2'
            );
    }

    // ─── UTILITY: reveal on scroll ───
    function revealOnScroll(selector, fromVars, toVars, triggerOptions) {
        triggerOptions = triggerOptions || {};
        const elements = gsap.utils.toArray(selector);
        if (elements.length === 0) return;

        elements.forEach(function(el, i) {
            var toConfig = Object.assign({
                visibility: 'visible',
                opacity: 1,
                duration: toVars.duration || 0.7,
                delay: (toVars.stagger ? i * toVars.stagger : 0) + (toVars.delay || 0),
                ease: toVars.ease || defaultEase,
            }, toVars);

            if (hasScrollTrigger) {
                toConfig.scrollTrigger = {
                    trigger: triggerOptions.trigger || el,
                    start: triggerOptions.start || 'top 85%',
                    toggleActions: 'play none none none',
                };
            }

            gsap.fromTo(el, Object.assign({ visibility: 'hidden', opacity: 0 }, fromVars), toConfig);
        });
    }

    // ─── SECTION HEADERS ───
    revealOnScroll('section h2.gs-reveal', { y: 40, skewY: 2 }, { y: 0, skewY: 0, duration: 0.8 });

    // ─── SECTION SUB ───
    revealOnScroll('.section-sub.gs-reveal', { y: 20 }, { y: 0, duration: 0.6 });

    // ─── ABOUT ───
    revealOnScroll('.about-content > div.gs-reveal', { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.2)' }, { trigger: '.about-content' });

    // ─── SKILLS ───
    revealOnScroll('.skills-category h3.gs-reveal', { x: -20 }, { x: 0, duration: 0.5 });
    document.querySelectorAll('.skills-category').forEach(function(category) {
        var cards = category.querySelectorAll('.skill-card.gs-reveal');
        if (cards.length === 0) return;

        var toConfig = {
            opacity: 1, y: 0, scale: 1, visibility: 'visible',
            duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)',
        };
        if (hasScrollTrigger) {
            toConfig.scrollTrigger = { trigger: category, start: 'top 82%', toggleActions: 'play none none none' };
        }
        gsap.fromTo(cards, { opacity: 0, y: 30, scale: 0.92, visibility: 'hidden' }, toConfig);
    });

    // ─── JOURNEY ───
    var journeyItems = gsap.utils.toArray('.journey-item.gs-reveal');
    if (journeyItems.length > 0) {
        var jConfig = {
            opacity: 1, x: 0, visibility: 'visible',
            duration: 0.6, stagger: 0.15, ease: 'power2.out',
        };
        if (hasScrollTrigger) {
            jConfig.scrollTrigger = { trigger: '.journey-list', start: 'top 82%', toggleActions: 'play none none none' };
        }
        gsap.fromTo(journeyItems, { opacity: 0, x: -30, visibility: 'hidden' }, jConfig);
    }

    // ─── PROJECTS GRID ───
    var projectCards = gsap.utils.toArray('.project-card.gs-reveal');
    if (projectCards.length > 0) {
        var pConfig = {
            opacity: 1, y: 0, scale: 1, visibility: 'visible',
            duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)',
        };
        if (hasScrollTrigger) {
            pConfig.scrollTrigger = { trigger: '.projects-grid', start: 'top 82%', toggleActions: 'play none none none' };
        }
        gsap.fromTo(projectCards, { opacity: 0, y: 50, scale: 0.85, visibility: 'hidden' }, pConfig);
    }
    revealOnScroll('.projects-footer.gs-reveal', { y: 20 }, { y: 0, duration: 0.6 }, { trigger: '.projects-footer' });

    // ─── COURSES ───
    var courseCards = gsap.utils.toArray('.course-card.gs-reveal');
    if (courseCards.length > 0) {
        var cConfig = {
            opacity: 1, y: 0, scale: 1, visibility: 'visible',
            duration: 0.8, stagger: 0.15, ease: 'power3.out',
        };
        if (hasScrollTrigger) {
            cConfig.scrollTrigger = { trigger: '.courses-grid', start: 'top 82%', toggleActions: 'play none none none' };
        }
        gsap.fromTo(courseCards, { opacity: 0, x: -30, scale: 0.9, visibility: 'hidden' }, cConfig);
    }

    // ─── PRODUCTS ───
    var productCards = gsap.utils.toArray('.product-card.gs-reveal');
    if (productCards.length > 0) {
        var prConfig = {
            opacity: 1, y: 0, scale: 1, visibility: 'visible',
            duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)',
        };
        if (hasScrollTrigger) {
            prConfig.scrollTrigger = { trigger: '.products-grid', start: 'top 82%', toggleActions: 'play none none none' };
        }
        gsap.fromTo(productCards, { opacity: 0, y: 50, scale: 0.9, visibility: 'hidden' }, prConfig);
    }

    // ─── FOOTER ANIMATION ───
    var footerContent = document.querySelector('.footer-content');
    if (footerContent) {
        var fConfig = {
            opacity: 1, y: 0, visibility: 'visible',
            duration: 0.7, ease: 'power3.out',
        };
        if (hasScrollTrigger) {
            fConfig.scrollTrigger = { trigger: 'footer', start: 'top 85%', toggleActions: 'play none none none' };
        }
        gsap.fromTo(footerContent, { opacity: 0, y: 25, visibility: 'hidden' }, fConfig);
    }

});