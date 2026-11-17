/* Sigmoid homepage interactions */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- hero slider ---------- */
  const hero = $('.hero');
  const SLIDES = [
    { label: 'Sigmoid', icon: 'sigmoid', lines: ['Engineering', 'shaped around', 'the [challenge.]'],
      text: 'We help companies develop software, products and systems with the engineering expertise, technical contribution and responsibility each project requires.',
      cta: 'View success stories', href: 'success-stories.html' },
    { label: 'Software Development', icon: 'software', lines: ['Software', 'shaped around', 'your [product.]'],
      text: 'Software built and evolved with engineering experience applied from day one, and deepened over time through knowledge of your product and domain.',
      cta: 'See expertise', href: 'expertise.html#expertise-software' },
    { label: 'Embedded', icon: 'embedded', lines: ['Code and', 'electronics that', 'make [hardware] work.'],
      text: 'Embedded code and electronics, designed together with the software and mechanics around them.',
      cta: 'See expertise', href: 'expertise.html#expertise-embedded' },
    { label: 'Robotics', icon: 'robotics', lines: ['Robotic systems', 'that move,', 'sense and [act.]'],
      text: 'Robotic and mechatronic systems that move, sense and act, from concept to working prototype.',
      cta: 'Read the story', href: 'success-stories.html#story-grocery-robotic-hand' },
    { label: 'Mechatronics', icon: 'mechatronics', lines: ['Mechanics', 'designed as part', 'of the whole [system.]'],
      text: 'Mechanical design and 3D modelling, developed together with the electronics and software of the same system.',
      cta: 'See expertise', href: 'expertise.html#expertise-mechanical' }
  ];
  const DURATION = 7000;
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const lineHTML = (l) => `<span class="line"><span>${esc(l).replace(/\[(.+?)\]/, '<mark>$1</mark>')}</span></span>`;
  const title = $('.hero-title');
  const lede = $('.hero-lede');
  const primary = $('.hero-primary');
  const slideLabel = $('.hero-slide-label');
  const tabsEl = $('.hero-tabs');
  let active = 0, busy = false;

  if (hero && title && tabsEl) {
    hero.style.setProperty('--slide-dur', `${DURATION}ms`);
    tabsEl.innerHTML = SLIDES.map((s, i) => `<button class="hero-tab" type="button" role="tab" aria-selected="${i === 0}" aria-label="Slide ${i + 1}: ${s.label}" data-i="${i}"><span class="hero-tab-bar"><i></i></span><svg aria-hidden="true"><use href="#i-${s.icon}"/></svg><span class="hero-tab-text"><span class="hero-tab-num">0${i + 1}</span><span class="hero-tab-label">${s.label}</span></span></button>`).join('');
    const tabs = $$('.hero-tab', tabsEl);

    const setText = (s) => {
      title.setAttribute('aria-label', s.lines.join(' ').replace(/[[\]]/g, ''));
      lede.textContent = s.text;
      primary.href = s.href;
      primary.querySelector('.btn-text').innerHTML = `<span data-text="${s.cta}">${s.cta}</span>`;
      if (slideLabel) slideLabel.textContent = s.label;
    };
    const prevBtn = $('.hero-prev');
    const timerCur = $('.hero-timer-cur');
    const timerBar = $('.hero-timer-bar i');
    const setTabs = () => { prevBtn.disabled = active === 0;
      if (timerCur) timerCur.textContent = String(active + 1).padStart(2, '0');
      if (timerBar) { timerBar.style.animation = 'none'; void timerBar.offsetWidth; timerBar.style.animation = ''; }
      tabs.forEach((t, i) => {
      t.setAttribute('aria-selected', String(i === active));
      t.classList.toggle('is-done', i < active);
      const bar = t.querySelector('i'); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    }); };

    const go = (index) => {
      const next = (index + SLIDES.length) % SLIDES.length;
      if (next === active || busy) return;
      active = next; busy = true;
      const s = SLIDES[active];
      setTabs();
      if (reduce) {
        title.innerHTML = s.lines.map(lineHTML).join('');
        setText(s); busy = false; return;
      }
      hero.classList.add('is-changing');
      title.classList.add('is-out'); title.classList.remove('is-in');
      setTimeout(() => {
        title.classList.remove('is-out');
        title.innerHTML = s.lines.map(lineHTML).join('');
        void title.offsetWidth;
        title.classList.add('is-in');
        setText(s);
        hero.classList.remove('is-changing');
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
    $('.hero-body').addEventListener('mouseenter', () => pause(true));
    $('.hero-body').addEventListener('mouseleave', () => pause(false));
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
    if (!hero) return;
    hero.classList.add('is-ready');
    title && title.classList.add('is-in');
    setTimeout(() => hero.classList.add('intro-done'), 1600);
  }));

  /* ---------- header: border after scroll, hide on scroll down ---------- */
  const header = $('.site-header');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    const menuOpen = document.body.classList.contains('menu-open');
    header.classList.toggle('is-hidden', !menuOpen && y > 400 && y > lastY + 4);
    if (y < lastY - 4 || y < 400) header.classList.remove('is-hidden');
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggle = $('.menu-toggle');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    matchMedia('(min-width: 1021px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ---------- count-up ---------- */
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    const pad = Number(el.dataset.pad || 0);
    const fmt = (n) => String(n).padStart(pad, '0');
    if (reduce) { el.textContent = fmt(target); return; }
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1600, 1);
      el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = fmt(0);
    requestAnimationFrame(tick);
  };

  /* ---------- reveal on scroll (staggered inside lists/grids) ---------- */
  const targets = $$('.rv, .cta, .h2');
  targets.forEach((el) => {
    const parent = el.parentElement;
    if (el.classList.contains('rv') && parent && parent.children.length > 1 && /xp-list|ind-list|work-grid|counters|ways-grid/.test(parent.className)) {
      el.style.transitionDelay = `${[...parent.children].indexOf(el) * 0.08}s`;
    }
  });
  if (!('IntersectionObserver' in window) || reduce) {
    targets.forEach((el) => el.classList.add('in'));
    $$('[data-count]').forEach(countUp);
  } else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('[data-count]', e.target).forEach(countUp);
      io.unobserve(e.target);
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- ticker: repeat the set so the strip is always full ---------- */
  const track = $('.ticker-track');
  if (track) {
    const base = track.querySelector('.ticker-set');
    const fill = () => {
      track.querySelectorAll('.ticker-set:not(:first-child)').forEach((n) => n.remove());
      const setW = base.getBoundingClientRect().width || 1;
      const perHalf = Math.max(1, Math.ceil(innerWidth / setW));
      for (let i = 1; i < perHalf * 2; i++) track.append(base.cloneNode(true));
      track.style.setProperty('--ticker-dur', `${(setW * perHalf) / 60}s`); // ~60px per second
    };
    fill();
    document.fonts && document.fonts.ready.then(fill);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fill, 200); });
  }

  /* ---------- hover: characters roll through 0/1 and letters, then settle ---------- */
  const GLYPHS = '01010101ABCDEFGHKMNRSTXZ<>/{}#';
  const scramble = (root) => {
    if (reduce || !root || root.dataset.scrambling || !root.offsetWidth) return;
    root.dataset.scrambling = '1';
    // lock the box so swapped glyphs of other widths can't reflow the layout
    const box = root.getBoundingClientRect();
    Object.assign(root.style, { display: 'inline-block', width: `${box.width}px`, whiteSpace: 'nowrap', overflow: 'hidden', verticalAlign: 'bottom' });
    const nodes = [];
    const walk = (n) => n.nodeType === 3 ? n.nodeValue.trim() && nodes.push(n) : n.childNodes.forEach(walk);
    walk(root);
    const orig = nodes.map((n) => n.nodeValue);
    const total = orig.reduce((a, t) => a + t.length, 0);
    const t0 = performance.now(), dur = 900;
    const frame = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      let k = 0;
      nodes.forEach((n, ni) => {
        n.nodeValue = [...orig[ni]].map((ch) => {
          const pos = k++ / total;
          if (ch === ' ' || p >= 1 || pos < p * 1.15 - 0.15) return ch;
          return GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }).join('');
      });
      if (p < 1) requestAnimationFrame(frame);
      else { nodes.forEach((n, ni) => { n.nodeValue = orig[ni]; }); delete root.dataset.scrambling; ['display', 'width', 'whiteSpace', 'overflow', 'verticalAlign'].forEach((k) => { root.style[k] = ''; }); }
    };
    requestAnimationFrame(frame);
  };
  if (matchMedia('(hover: hover)').matches) {
    $$('.hero-tab').forEach((t) => t.addEventListener('mouseenter', () => scramble(t.querySelector('.hero-tab-label'))));
  }

  /* ---------- back to top: visible once the footer is on screen ---------- */
  const toTop = $('.to-top');
  const footer = $('.site-footer');
  if (toTop && footer) {
    const show = (on) => { toTop.classList.toggle('is-visible', on); toTop.tabIndex = on ? 0 : -1; };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => show(e.isIntersecting), { threshold: 0, rootMargin: '0px 0px -10% 0px' }).observe(footer);
    }
    toTop.addEventListener('click', () => {
      scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      header.classList.remove('is-hidden');
    });
  }

  /* ---------- page transition, same as inner pages ---------- */
  const curtain = document.createElement('div');
  curtain.className = 'page-transition';
  curtain.setAttribute('aria-hidden', 'true');
  document.body.append(curtain);
  const KEY = 'sigmoid-page-transition';
  try {
    if (sessionStorage.getItem(KEY) === '1' && !reduce) {
      curtain.classList.add('is-entering');
      setTimeout(() => curtain.classList.remove('is-entering'), 900);
    }
    sessionStorage.removeItem(KEY);
  } catch { /* storage unavailable */ }
  document.documentElement.classList.remove('pt-enter');

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target || reduce) return;
    let dest;
    try { dest = new URL(link.href, location.href); } catch { return; }
    if (dest.origin !== location.origin || dest.pathname === location.pathname || !/\.html$|\/[^.]*$/.test(dest.pathname)) return;
    e.preventDefault();
    try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ }
    curtain.classList.add('is-leaving');
    setTimeout(() => location.assign(dest.href), 420);
  });
})();

/* ---------- scroll moments (after appart.agency) ---------- */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v) => Math.max(0, Math.min(1, v));

  // 1. split text into word spans, keeping inner markup (.muted, .dot, .nowrap)
  const words = [];
  $$('[data-words]').forEach((root) => {
    const texts = [];
    const walk = (n) => (n.nodeType === 3 ? texts.push(n) : n.childNodes.forEach(walk));
    walk(root);
    const list = [];
    texts.forEach((t) => {
      const frag = document.createDocumentFragment();
      t.nodeValue.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(part); return; }
        const w = document.createElement('span');
        w.className = 'w';
        w.textContent = part;
        frag.append(w);
        list.push(w);
      });
      t.replaceWith(frag);
    });
    words.push({ root, list });
  });

  // 4. section labels: characters decode once when they come into view
  const CHARS = '!<>-_/[]{}=+*^?#01';
  const decode = (el) => {
    const to = el.textContent;
    el.style.width = `${el.getBoundingClientRect().width}px`;
    el.classList.add('is-decoding');
    const q = [...to].map((c) => {
      const s = (Math.random() * 18) | 0;
      return { c, s, e: s + 8 + ((Math.random() * 18) | 0) };
    });
    let f = 0;
    const tick = () => {
      let done = 0;
      el.textContent = q.map((o) => {
        if (f >= o.e || o.c === ' ') { done++; return o.c; }
        return f >= o.s ? CHARS[(Math.random() * CHARS.length) | 0] : o.c;
      }).join('');
      f++;
      if (done < q.length) requestAnimationFrame(tick);
      else { el.textContent = to; el.style.width = ''; el.classList.remove('is-decoding'); }
    };
    tick();
  };

  const panel = document.querySelector('[data-panel]');
  const draw = document.querySelector('[data-draw]');
  if (reduce) {
    words.forEach(({ list }) => list.forEach((w) => { w.style.opacity = 1; }));
    if (panel) { panel.style.setProperty('--p', 1); panel.classList.add('is-dark'); }
    if (draw) draw.style.setProperty('--p', 1);
    return;
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { decode(e.target); io.unobserve(e.target); }
    }), { threshold: 1 });
    $$('.sec-head .label').forEach((l) => io.observe(l));
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight;
    // 1. words light up while the block travels up through the viewport
    words.forEach(({ root, list }) => {
      const r = root.getBoundingClientRect();
      const p = clamp((vh * 0.88 - r.top) / (vh * 0.48 + r.height * 0.6));
      const n = list.length;
      const spread = 4;
      list.forEach((w, i) => {
        w.style.opacity = (0.14 + 0.86 * clamp((p * (n + spread) - i) / spread)).toFixed(3);
      });
    });
    // 2. quote panel opens as the section rises from the bottom edge
    if (panel) {
      const r = panel.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh * 0.75));
      panel.style.setProperty('--p', p.toFixed(3));
      panel.classList.toggle('is-dark', p > 0.4);
    }
    // 3. CTA line art draws in while the CTA scrolls into view
    if (draw) {
      const r = draw.parentElement.getBoundingClientRect();
      draw.style.setProperty('--p', clamp((vh - r.top) / (vh * 0.9)).toFixed(3));
    }
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  update();
})();
