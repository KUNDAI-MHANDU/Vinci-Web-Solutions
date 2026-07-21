(function () {
  const root = document.body.dataset.root || '';
  const pages = [
    ['Home', `${root}index.html`],
    ['Work', `${root}work.html`],
    ['Services', `${root}services.html`],
    ['About', `${root}about.html`],
    ['Contact', `${root}contact.html`]
  ];
  const current = document.body.dataset.page || 'Home';
  const mark = `<svg class="brand__mark" width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M2 4L14 34L20 20L26 34L38 4" stroke="currentColor" stroke-width="3.4"/></svg>`;
  const links = (mobile = false) => pages.map(([label, href]) =>
    `<li><a href="${href}" class="${mobile ? 'mobile-menu__link' : 'nav-link'}${label === current ? ' is-active' : ''}"${label === current ? ' aria-current="page"' : ''}>${label}</a></li>`
  ).join('');

  const header = `<header class="site-header" id="siteHeader"><div class="site-header__inner">
    <a href="${root}index.html" class="brand" aria-label="VINCI Digital Solutions home">${mark}<span class="brand__text"><span class="brand__name">VINCI</span><span class="brand__sub">DIGITAL SOLUTIONS</span></span></a>
    <nav class="main-nav" aria-label="Primary"><ul class="main-nav__list">${links()}</ul></nav>
    <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span><span></span></button>
  </div></header><div class="mobile-menu" id="mobileMenu" aria-hidden="true"><button class="mobile-menu__close" id="mobileMenuClose" aria-label="Close menu">&times;</button><ul class="mobile-menu__list">${links(true)}</ul></div><div class="mobile-menu__overlay" id="mobileMenuOverlay"></div>`;

  const footerLinks = pages.map(([label, href]) => `<a href="${href}" class="footer-nav__link${label === current ? ' is-active' : ''}"${label === current ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const footer = `<footer class="site-footer" aria-label="Footer"><div class="site-footer__inner">
    <div class="footer-col footer-col--brand"><a href="${root}index.html" class="brand brand--footer">${mark}<span class="brand__text"><span class="brand__name">VINCI</span><span class="brand__sub">DIGITAL SOLUTIONS</span></span></a><p class="footer-col__desc">We turn the gap between what is and what could be into clear, useful digital products.</p><nav class="footer-nav" aria-label="Footer navigation">${footerLinks}</nav></div>
    <div class="footer-col footer-col--connect"><h2 class="footer-col__heading">Let’s Connect</h2><p class="footer-col__desc">Have a problem worth solving?<br>Let’s start with a conversation.</p><a href="${root}contact.html" class="btn btn--outline"><span>Let’s Talk</span><span aria-hidden="true">→</span></a></div>
    <div class="footer-col footer-col--info"><ul class="footer-info-list"><li><span aria-hidden="true">✉</span><a href="mailto:luckymiya535@gmail.com">luckymiya535@gmail.com</a></li><li><span aria-hidden="true">◎</span><a href="https://www.vincidigital.co.za">www.vincidigital.co.za</a></li><li><span aria-hidden="true">⌖</span><span>Potchefstroom, South Africa</span></li></ul></div>
  </div><div class="site-footer__bottom"><p>© 2026 VINCI DIGITAL SOLUTIONS. All rights reserved.</p><div class="site-footer__legal"><a href="${root}legal/privacy-policy.html"${current === 'Privacy Policy' ? ' aria-current="page"' : ''}>Privacy Policy</a><a href="${root}legal/terms-and-conditions.html"${current === 'Terms & Conditions' ? ' aria-current="page"' : ''}>Terms &amp; Conditions</a></div></div></footer>`;

  const oldHeader = document.querySelector('.site-header');
  const oldMenu = document.querySelector('.mobile-menu');
  const oldOverlay = document.querySelector('.mobile-menu__overlay');
  if (oldHeader) {
    oldHeader.insertAdjacentHTML('beforebegin', header);
    oldHeader.remove();
    oldMenu?.remove();
    oldOverlay?.remove();
  } else {
    document.querySelector('[data-shared-header]')?.replaceWith(document.createRange().createContextualFragment(header));
  }

  const oldFooter = document.querySelector('.site-footer');
  if (oldFooter) {
    oldFooter.insertAdjacentHTML('beforebegin', footer);
    oldFooter.remove();
  } else {
    document.querySelector('[data-shared-footer]')?.replaceWith(document.createRange().createContextualFragment(footer));
  }
})();
