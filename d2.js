/* Sigmoid · Design 2 interactions */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v) => Math.max(0, Math.min(1, v));
  document.documentElement.classList.remove('pt-enter');

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* hero lines rise in */
  requestAnimationFrame(() => document.body.classList.add('is-ready'));

  /* mobile menu */
  const menuBtn = $('.hd-menu');
  const menu = $('#menu');
  if (menuBtn && menu) {
    const set = (open) => {
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? 'Close' : 'Menu';
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => set(menu.hidden));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); menuBtn.focus(); } });
  }

  /* count-up */
  const countUp = (el) => {
    const end = +el.dataset.count;
    const pad = +(el.dataset.pad || 0);
    const fmt = (n) => String(n).padStart(pad, '0');
    if (reduce) { el.textContent = fmt(end); return; }
    const t0 = performance.now();
    const step = (t) => {
      const p = clamp((t - t0) / 1400);
      el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* glitch: short slice jitter when a heading arrives, and on hover */
  const glitch = (el) => {
    if (reduce) return;
    el.classList.remove('g-on'); void el.offsetWidth; el.classList.add('g-on');
    setTimeout(() => el.classList.remove('g-on'), 750);
  };
  $$('.glitch').forEach((g) => g.addEventListener('mouseenter', () => glitch(g)));

  /* reveal */
  const targets = $$('.up, .block-head, .dec-link, .side-card');
  // stagger siblings inside grids
  $$('.bento, .ways, .inds, .pill-list').forEach((grid) => {
    [...grid.children].forEach((c, i) => { c.style.transitionDelay = `${i * 0.07}s`; });
  });
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('in'));
    $$('[data-count]').forEach(countUp);
  } else {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const t = e.target;
      t.classList.add('in');
      $$('[data-count]', t).forEach(countUp);
      $$('.glitch', t).forEach((g) => setTimeout(() => glitch(g), 250));
      if (t.classList.contains('glitch')) glitch(t);
      io.unobserve(t);
    }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((t) => io.observe(t));
    const qio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); glitch(e.target); qio.unobserve(e.target); }
    }), { threshold: 0.6 });
    $$('.quote .glitch').forEach((q) => qio.observe(q));
  }
  // the transition-delay used for staggering must not slow down hover later
  $$('.bento > *, .ways > *, .inds > *').forEach((c) => c.addEventListener('transitionend', () => { c.style.transitionDelay = ''; }, { once: true }));

  /* header: hide on scroll down, show on scroll up */
  const hd = $('.hd');
  let lastY = scrollY;

  /* scroll-linked: hero mark, project visuals */
  const hero = $('.hero');
  const visuals = $$('.visual');
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY;
    const vh = innerHeight;
    if (hd && (!menu || menu.hidden)) {
      hd.classList.toggle('is-hidden', y > lastY && y > vh * 0.6);
    }
    lastY = y;
    if (reduce) return;
    if (hero) hero.style.setProperty('--p', clamp(y / vh).toFixed(3));
    visuals.forEach((v) => {
      const r = v.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      v.style.setProperty('--p', clamp((vh - r.top) / (vh + r.height)).toFixed(3));
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
})();
