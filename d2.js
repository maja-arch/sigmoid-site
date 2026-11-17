/* Sigmoid · Design 2 interactions */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v) => Math.max(0, Math.min(1, v));
  document.documentElement.classList.remove('pt-enter');

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- hero slider (all five slides from Design 1) ---------- */
  const hero = $('.hero');
  const SLIDES = [
    { label: 'Sigmoid', icon: 'sigmoid', lines: ['Engineering', 'shaped around', 'the challenge.'],
      text: 'We help companies develop software, products and systems with the engineering expertise, technical contribution and responsibility each project requires.',
      cta: 'View success stories', href: 'success-stories.html' },
    { label: 'Software Development', icon: 'software', lines: ['Software', 'shaped around', 'your product.'],
      text: 'Software built and evolved with engineering experience applied from day one, and deepened over time through knowledge of your product and domain.',
      cta: 'See expertise', href: 'expertise.html#expertise-software' },
    { label: 'Embedded', icon: 'embedded', lines: ['Code and', 'electronics that', 'make hardware work.'],
      text: 'Embedded code and electronics, designed together with the software and mechanics around them.',
      cta: 'See expertise', href: 'expertise.html#expertise-embedded' },
    { label: 'Robotics', icon: 'robotics', lines: ['Robotic systems', 'that move,', 'sense and act.'],
      text: 'Robotic and mechatronic systems that move, sense and act, from concept to working prototype.',
      cta: 'Read the story', href: 'success-stories.html#story-grocery-robotic-hand' },
    { label: 'Mechatronics', icon: 'mechatronics', lines: ['Mechanics', 'designed as part', 'of the whole system.'],
      text: 'Mechanical design and 3D modelling, developed together with the electronics and software of the same system.',
      cta: 'See expertise', href: 'expertise.html#expertise-mechanical' }
  ];
  const DURATION = 7000;
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const lineHTML = (l) => `<span class="ln"><span>${esc(l)}</span></span>`;
  const title = $('.hero-title');
  const lede = $('.hero-lede');
  const primary = $('.hero-primary');
  const tabsEl = $('.hero-tabs');
  let active = 0, busy = false;
  if (hero && title && tabsEl) {
    hero.style.setProperty('--slide-dur', `${DURATION}ms`);
    tabsEl.innerHTML = SLIDES.map((s, i) => `<button class="hero-tab" type="button" role="tab" aria-selected="${i === 0}" aria-label="Slide ${i + 1}: ${s.label}" data-i="${i}"><span class="hero-tab-bar"><i></i></span><svg aria-hidden="true"><use href="#i-${s.icon}"/></svg><span class="hero-tab-text"><span class="hero-tab-num">0${i + 1}</span><span class="hero-tab-label">${s.label}</span></span></button>`).join('');
    const tabs = $$('.hero-tab', tabsEl);
    const prevBtn = $('.hero-prev');
    const timerCur = $('.hero-timer-cur');
    const timerBar = $('.hero-timer-bar i');
    const restart = (el) => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; };
    const setText = (s) => {
      title.setAttribute('aria-label', s.lines.join(' '));
      lede.textContent = s.text;
      primary.href = s.href;
      primary.querySelector('.pill-txt').textContent = s.cta;
    };
    const setTabs = () => {
      prevBtn.disabled = active === 0;
      if (timerCur) timerCur.textContent = String(active + 1).padStart(2, '0');
      if (timerBar) restart(timerBar);
      tabs.forEach((t, i) => {
        t.setAttribute('aria-selected', String(i === active));
        t.classList.toggle('is-done', i < active);
        restart(t.querySelector('i'));
      });
    };
    const go = (index) => {
      const next = (index + SLIDES.length) % SLIDES.length;
      if (next === active || busy) return;
      active = next; busy = true;
      const s = SLIDES[active];
      setTabs();
      if (reduce) { title.innerHTML = s.lines.map(lineHTML).join(''); setText(s); busy = false; return; }
      title.classList.add('is-out'); title.classList.remove('is-in');
      setTimeout(() => {
        title.classList.remove('is-out');
        title.innerHTML = s.lines.map(lineHTML).join('');
        void title.offsetWidth;
        title.classList.add('is-in');
        setText(s);
        setTimeout(() => { busy = false; }, 300);
      }, 480);
    };
    if (!reduce) {
      hero.classList.add('is-autoplay');
      tabs.forEach((t) => t.querySelector('i').addEventListener('animationend', () => {
        if (t.getAttribute('aria-selected') === 'true') go(active + 1);
      }));
    }
    tabs.forEach((t) => t.addEventListener('click', () => go(Number(t.dataset.i))));
    prevBtn.addEventListener('click', () => { if (active > 0) go(active - 1); });
    prevBtn.disabled = true;
    $('.hero-next').addEventListener('click', () => go(active + 1));
    const pause = (on) => hero.classList.toggle('is-paused', on);
    title.addEventListener('mouseenter', () => pause(true));
    title.addEventListener('mouseleave', () => pause(false));
    hero.addEventListener('focusin', () => pause(true));
    hero.addEventListener('focusout', () => pause(false));
    document.addEventListener('visibilitychange', () => pause(document.hidden));
    hero.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' && active > 0) go(active - 1); if (e.key === 'ArrowRight') go(active + 1); });
    let tx = null;
    hero.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50 && (dx < 0 || active > 0)) go(active + (dx < 0 ? 1 : -1));
      tx = null;
    });
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.classList.add('is-ready');
    if (title) title.classList.add('is-in');
  }));

  /* ---------- ticker: repeat the set so the strip is always full ---------- */
  const track = $('.ticker-track');
  if (track) {
    const base = track.querySelector('.ticker-set');
    const fill = () => {
      [...track.children].slice(1).forEach((n) => track.removeChild(n));
      const setW = base.getBoundingClientRect().width || 1;
      const perHalf = Math.max(1, Math.ceil(innerWidth / setW));
      for (let i = 1; i < perHalf * 2; i++) track.append(base.cloneNode(true));
      track.style.setProperty('--ticker-dur', `${(setW * perHalf) / 60}s`);
    };
    fill();
    if (document.fonts) document.fonts.ready.then(fill);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fill, 200); });
  }

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
  const heroEl = hero;
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
