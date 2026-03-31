/* ============================================
   PORTFOLIO — Farrel Vittorio Kuki
   script.js — GSAP Animations & Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Register GSAP ScrollTrigger ───
    gsap.registerPlugin(ScrollTrigger);

    // ─── MOBILE MENU ───
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });

    // ─── ACTIVE LINK ON SCROLL ───
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // ─── NAVBAR SCROLL EFFECT ───
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '12px 10%';
            navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
        } else {
            navbar.style.padding = '18px 10%';
            navbar.style.boxShadow = 'none';
        }
    });

    // ═══════════════════════════════════
    //  ANIMATED GRID BACKGROUND
    // ═══════════════════════════════════

    const gridBg = document.getElementById('grid-bg');
    if (gridBg) {
        // Slow, endless diagonal drift
        gsap.to(gridBg, {
            x: -48,
            y: -48,
            duration: 12,
            repeat: -1,
            ease: 'none',
        });

        // Subtle opacity pulse  
        gsap.to(gridBg, {
            opacity: 0.6,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    }

    // ═══════════════════════════════════
    //  GSAP CONTENT ANIMATIONS
    //  using fromTo to prevent FOUC
    // ═══════════════════════════════════

    const defaultEase = 'power3.out';

    // ─── HERO TIMELINE ───
    const heroTl = gsap.timeline({ defaults: { ease: defaultEase } });

    heroTl
        .fromTo('.hero-photo-wrapper',
            { opacity: 0, scale: 0.85, visibility: 'hidden' },
            { opacity: 1, scale: 1, visibility: 'visible', duration: 0.9, delay: 0.3 }
        )
        .fromTo('.hero .role',
            { opacity: 0, x: -30, visibility: 'hidden' },
            { opacity: 1, x: 0, visibility: 'visible', duration: 0.7 },
            '-=0.4'
        )
        .fromTo('.hero h1',
            { opacity: 0, y: 50, visibility: 'hidden' },
            { opacity: 1, y: 0, visibility: 'visible', duration: 0.9 },
            '-=0.4'
        )
        .fromTo('.hero .desc',
            { opacity: 0, y: 25, visibility: 'hidden' },
            { opacity: 1, y: 0, visibility: 'visible', duration: 0.7 },
            '-=0.3'
        )
        .fromTo('.hero .btn',
            { opacity: 0, y: 15, visibility: 'hidden' },
            { opacity: 1, y: 0, visibility: 'visible', duration: 0.5 },
            '-=0.2'
        );

    // ─── UTILITY: Scroll-triggered fromTo ───
    function revealOnScroll(selector, fromVars, toVars, triggerOptions = {}) {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((el, i) => {
            gsap.fromTo(el,
                { visibility: 'hidden', opacity: 0, ...fromVars },
                {
                    visibility: 'visible',
                    opacity: 1,
                    ...toVars,
                    duration: toVars.duration || 0.7,
                    delay: (toVars.stagger ? i * toVars.stagger : 0) + (toVars.delay || 0),
                    ease: toVars.ease || defaultEase,
                    scrollTrigger: {
                        trigger: triggerOptions.trigger || el,
                        start: triggerOptions.start || 'top 85%',
                        toggleActions: 'play none none none',
                        ...triggerOptions,
                    },
                }
            );
        });
    }

    // ─── SECTION HEADERS — Reveal with skew ───
    revealOnScroll(
        'section h2.gs-reveal',
        { y: 40, skewY: 2 },
        { y: 0, skewY: 0, duration: 0.8 }
    );

    // ─── ABOUT CONTENT ───
    revealOnScroll(
        '.about-content > div.gs-reveal',
        { y: 30 },
        { y: 0, duration: 0.7 },
        { trigger: '.about-content' }
    );

    // ─── SKILL CATEGORY TITLES ───
    revealOnScroll(
        '.skills-category h3.gs-reveal',
        { x: -20 },
        { x: 0, duration: 0.5 }
    );

    // ─── SKILL CARDS — Stagger fade-in-up ───
    document.querySelectorAll('.skills-category').forEach(category => {
        const cards = category.querySelectorAll('.skill-card.gs-reveal');
        if (cards.length === 0) return;

        gsap.fromTo(cards,
            { opacity: 0, y: 30, scale: 0.92, visibility: 'hidden' },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                visibility: 'visible',
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: category,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ─── PROJECTS SHOWCASE ───
    revealOnScroll(
        '.projects-showcase.gs-reveal',
        { y: 35 },
        { y: 0, duration: 0.8 }
    );

    // ─── JOURNEY ITEMS — Stagger ───
    const journeyItems = gsap.utils.toArray('.journey-item.gs-reveal');
    if (journeyItems.length > 0) {
        gsap.fromTo(journeyItems,
            { opacity: 0, x: -30, visibility: 'hidden' },
            {
                opacity: 1,
                x: 0,
                visibility: 'visible',
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.journey-list',
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }

    // ─── FOOTER ───
    revealOnScroll(
        '.footer-content.gs-reveal',
        { y: 25 },
        { y: 0, duration: 0.7 },
        { trigger: 'footer' }
    );

});
