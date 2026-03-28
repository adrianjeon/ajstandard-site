/* ============================================================
   AJ STANDARD — Main JS
   Scroll-triggered fade-in + Mobile menu toggle
   ============================================================ */

(function () {
  'use strict';

  /* --- Scroll Animation (IntersectionObserver) --- */
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeElements.forEach((el) => observer.observe(el));
  } else {
    /* Fallback: show everything immediately */
    fadeElements.forEach((el) => el.classList.add('visible'));
  }


  /* --- Mobile Menu Toggle --- */
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close menu on link click */
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }


  /* --- Active Nav Link on Scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a:not(.nav__cta)');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    let currentId = '';

    /* Find the last section whose top is above the scroll position */
    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach((a) => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + currentId) {
        a.style.color = 'var(--color-white)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });


  /* --- Smooth scroll offset for fixed nav --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 72; /* nav height */
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
