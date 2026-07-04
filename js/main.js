/**
 * M Saif Ali - Portfolio
 * Smooth scroll, theme toggle, navbar scroll effect
 */

(function () {
    'use strict';

    // Current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Smooth scroll for anchor links
    document.querySelectorAll('.smooth-scroll').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile navbar if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Navbar scroll effect - add class when scrolled
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        function updateNavbar() {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', updateNavbar);
        updateNavbar();
    }

    // Dark / Light mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    function getPreferredTheme() {
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return localStorage.getItem('theme') || 'light';
    }

    function setTheme(theme) {
        html.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        const sunIcon = themeToggle?.querySelector('.sun-icon');
        const moonIcon = themeToggle?.querySelector('.moon-icon');
        if (theme === 'dark') {
            sunIcon?.classList.add('d-none');
            moonIcon?.classList.remove('d-none');
        } else {
            sunIcon?.classList.remove('d-none');
            moonIcon?.classList.add('d-none');
        }
    }

    if (themeToggle) {
        setTheme(getPreferredTheme());
        themeToggle.addEventListener('click', function () {
            const current = html.getAttribute('data-bs-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    // Scroll reveal – add .visible when element enters viewport
    const revealEls = document.querySelectorAll('.reveal-up, .scroll-reveal .section-header');
    const revealOptions = { rootMargin: '0px 0px -80px 0px', threshold: 0.1 };

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a section, reveal children with stagger
                const section = entry.target.closest('.scroll-reveal');
                if (section && entry.target.classList.contains('section-header')) {
                    section.querySelectorAll('.reveal-up[data-delay]').forEach(function (el) {
                        el.classList.add('visible');
                    });
                }
            }
        });
    }, revealOptions);

    revealEls.forEach(function (el) {
        revealObserver.observe(el);
    });

    // Staggered reveal for cards inside sections (observe section once)
    document.querySelectorAll('.scroll-reveal').forEach(function (section) {
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const children = section.querySelectorAll('.reveal-up[data-delay]');
                    children.forEach(function (child) {
                        child.classList.add('visible');
                    });
                }
            });
        }, { rootMargin: '0px 0px -60px 0px', threshold: 0 });
        sectionObserver.observe(section);
    });

    // Animate skill progress bars when visible
    const skillBars = document.querySelectorAll('.skill-bar[data-skill-value]');
    const skillBarObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const value = bar.getAttribute('data-skill-value') || '0';
                const card = bar.closest('.skill-card');
                if (card) {
                    card.classList.add('visible');
                    card.style.setProperty('--skill-width', value + '%');
                }
                skillBarObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(function (bar) {
        bar.style.width = '0%';
        skillBarObserver.observe(bar);
    });
})();
