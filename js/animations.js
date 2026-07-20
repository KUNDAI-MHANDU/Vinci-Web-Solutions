/* ==========================================================================
   ANIMATIONS.JS — GSAP page load + ScrollTrigger reveals
   ========================================================================== */

(function(){
  if(typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(prefersReducedMotion){
    gsap.set('[data-anim]', { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'all' });
    gsap.set('.js-ready [data-anim="hero-heading"] .line', { opacity: 1, y: 0 });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const EASE = 'power3.out';

  /* ---------- Mobile menu slide (GSAP-driven, hooked from app.js) ---------- */
  const mobileMenu = document.getElementById('mobileMenu');
  if(mobileMenu){
    gsap.set(mobileMenu, { x: 0, xPercent: 100 });

    window.gsapMobileMenuOpen = function(){
      gsap.to(mobileMenu, { xPercent: 0, duration: 0.45, ease: EASE });
      gsap.fromTo('.mobile-menu__link',
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, delay: 0.15, ease: EASE }
      );
    };
    window.gsapMobileMenuClose = function(){
      gsap.to(mobileMenu, { xPercent: 100, duration: 0.4, ease: EASE });
    };
  }

  /* ---------- Page load sequence ---------- */
  const tl = gsap.timeline({ defaults: { ease: EASE } });

  tl.to('.site-header', { opacity: 1, y: 0, duration: 0.6 }, 0)
    .fromTo('.site-header', { y: -20 }, { y: 0, duration: 0.6 }, 0)

    .to('[data-anim="hero-eyebrow"]', { opacity: 1, duration: 0.5 }, 0.2)
    .to('[data-anim="hero-heading"] .line', {
        opacity: 1, y: '0%', duration: 0.8, stagger: 0.08
      }, 0.32)
    .to('[data-anim="hero-lede"]', { opacity: 1, duration: 0.6 }, 0.65)
    .to('[data-anim="hero-btn"]', { opacity: 1, duration: 0.5 }, 0.78)
    .to('[data-anim="hero-devices"]', { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 0.45);

  /* ---------- Continuous floating motion for devices ---------- */
  gsap.to('.device--laptop', {
    y: -10,
    duration: 3.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1.4
  });
  gsap.to('.device--phone', {
    y: -8,
    duration: 2.6,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1.6
  });

  /* ---------- Scroll-triggered reveals ---------- */
  const scrollAnimTargets = gsap.utils.toArray('[data-anim="up"]');

  scrollAnimTargets.forEach((el) => {
    // Stagger children of grids for a nicer cascade
    const isGrid = el.classList.contains('services__grid') || el.classList.contains('work__grid');

    gsap.set(el, { opacity: 0, y: 32 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: EASE });
      }
    });
  });

  /* Stagger service cards */
  gsap.set('.service-card', { opacity: 0, y: 28 });
  ScrollTrigger.create({
    trigger: '.services__grid',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to('.service-card', { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: EASE });
    }
  });

  /* Stagger work cards */
  gsap.set('.work-card', { opacity: 0, y: 34 });
  ScrollTrigger.create({
    trigger: '.work__grid',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to('.work-card', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: EASE });
    }
  });

})();
