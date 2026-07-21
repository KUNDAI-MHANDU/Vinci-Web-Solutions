/* ==========================================================================
   APP.JS — Core interactions (nav scroll state, mobile menu, stat counters)
   ========================================================================== */

document.documentElement.classList.add('js-ready');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Header scroll state ---------- */
(function headerScrollState(){
  const header = document.getElementById('siteHeader');
  if(!header) return;

  const THRESHOLD = 24;

  function update(){
    if(window.scrollY > THRESHOLD){
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* ---------- Mobile menu ---------- */
(function mobileMenu(){
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  const overlay = document.getElementById('mobileMenuOverlay');
  const links = menu ? menu.querySelectorAll('.mobile-menu__link') : [];

  if(!btn || !menu || !overlay) return;

  let isOpen = false;

  function openMenu(){
    isOpen = true;
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';

    if(window.gsapMobileMenuOpen){
      window.gsapMobileMenuOpen();
    } else {
      menu.style.transform = 'translateX(0)';
    }
  }

  function closeMenu(){
    isOpen = false;
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';

    if(window.gsapMobileMenuClose){
      window.gsapMobileMenuClose();
    } else {
      menu.style.transform = 'translateX(100%)';
    }
  }

  btn.addEventListener('click', () => { isOpen ? closeMenu() : openMenu(); });
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && isOpen) closeMenu();
  });
})();

/* ---------- Animated stat counters ---------- */
(function statCounters(){
  const nums = document.querySelectorAll('.stat-card__num');
  if(!nums.length) return;

  function animateCount(el){
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if(prefersReducedMotion){
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();

    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if(progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(num => observer.observe(num));
})();

/* ---------- Smooth anchor scroll offset (accounts for fixed header) ---------- */
(function anchorOffsetScroll(){
  const header = document.getElementById('siteHeader');
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  links.forEach(link => {
    link.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
})();
