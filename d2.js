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
    { label: 'Software Development', icon: 'software', lines: ['Software built', 'for products that run', 'in the real world.'],
      text: 'Software built and evolved with engineering experience applied from day one, and deepened over time through knowledge of your product and domain.',
      cta: 'See expertise', href: 'expertise.html#expertise-software' },
    { label: 'Embedded', icon: 'embedded', lines: ['Electronics and code', 'that make', 'hardware work.'],
      text: 'Code and electronics designed together with the software and mechanics around them.',
      cta: 'See expertise', href: 'expertise.html#expertise-embedded' },
    { label: 'Robotics', icon: 'robotics', lines: ['Robotic hand', 'for automated', 'grocery handling.'],
      text: 'Picking fragile, irregular products reliably, so grocery orders can be automated end to end.',
      cta: 'Read the story', href: 'success-stories.html#story-grocery-robotic-hand' },
    { label: 'Mechatronics', icon: 'mechatronics', lines: ['Mechanics designed', 'as part of the', 'whole system.'],
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
    // the primary button glides to the width of its new label (no jump, "Discuss a project" follows softly)
    const setCta = (label) => {
      const txt = primary.querySelector('.pill-txt');
      const from = primary.getBoundingClientRect().width;
      primary.style.width = '';
      txt.textContent = label;
      const to = primary.getBoundingClientRect().width;
      if (reduce || !from) return;
      primary.style.width = `${from}px`;
      void primary.offsetWidth;
      primary.style.width = `${to}px`;
      const done = () => { primary.style.width = ''; primary.removeEventListener('transitionend', done); };
      primary.addEventListener('transitionend', done);
    };
    const prevBtn = $('.hero-prev');
    const timerCur = $('.hero-timer-cur');
    const timerBar = $('.hero-timer-bar i');
    const restart = (el) => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; };
    const setText = (s) => {
      title.setAttribute('aria-label', s.lines.join(' '));
      lede.textContent = s.text;
      primary.href = s.href;
      setCta(s.cta);
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
      // one spare set on top of what the screen needs, so the strip never shows a gap
      const perHalf = Math.max(1, Math.ceil(innerWidth / setW)) + 1;
      for (let i = 1; i < perHalf * 2; i++) {
        const c = base.cloneNode(true);
        c.querySelectorAll('[data-scramble-on]').forEach((e) => { delete e.dataset.scrambleOn; e.style.width = ''; });
        track.append(c);
        if (window.sigmoidScramble) c.querySelectorAll('[data-scramble]').forEach(window.sigmoidScramble);
      }
      track.style.setProperty('--ticker-dur', `${(setW * perHalf) / 110}s`); // ~110px per second
      lastW = setW;
    };
    let lastW = 0;
    fill();
    if (document.fonts) document.fonts.ready.then(fill);
    // refill whenever the first set changes width (e.g. when Oswald finishes loading)
    if ('ResizeObserver' in window) new ResizeObserver(() => {
      const w = base.getBoundingClientRect().width;
      if (Math.abs(w - lastW) > 1) fill();
    }).observe(base);
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
    [...grid.children].forEach((c, i) => { c.style.transitionDelay = `${i * 0.04}s`; });
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
    }), { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
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

/* digital decode: words with [data-scramble] mix 0/1 and letters, settle, repeat */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { window.sigmoidScramble = () => {}; return; }
  const GLYPHS = '0101010110ABCDEFGHKMNOPRSTUXZ';
  const start = (el) => {
    if (el.dataset.scrambleOn) return;
    el.dataset.scrambleOn = '1';
    const word = el.textContent;
    el.setAttribute('aria-label', word);
    const lock = () => { if (!el.isConnected) return; el.style.width = ''; el.style.width = `${el.getBoundingClientRect().width}px`; };
    lock();
    if (document.fonts) document.fonts.ready.then(lock);
    addEventListener('resize', lock);
    const run = () => {
      if (!el.isConnected) return; // element was replaced (e.g. another industry selected): stop
      el.classList.add('is-run');
      const q = [...word].map((c, i) => ({ c, s: i * 2 + ((Math.random() * 6) | 0), e: 0 }));
      q.forEach((o) => { o.e = o.s + 10 + ((Math.random() * 14) | 0); });
      let f = 0;
      const tick = () => {
        if (!el.isConnected) return;
        let done = 0;
        el.innerHTML = q.map((o) => {
          if (f >= o.e || o.c === ' ') { done++; return o.c; }
          if (f < o.s) return o.c;
          const set = el.dataset.glyphs || GLYPHS;
          const g = set[(Math.random() * set.length) | 0];
          return /[01]/.test(g) ? `<span class="bit">${g}</span>` : g;
        }).join('');
        f++;
        if (done < q.length) setTimeout(() => requestAnimationFrame(tick), 40);
        else { el.textContent = word; el.classList.remove('is-run'); setTimeout(run, 2600); }
      };
      tick();
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); setTimeout(run, 600); } });
    io.observe(el);
  };
  window.sigmoidScramble = start;
  document.querySelectorAll('[data-scramble]').forEach(start);
})();

/* contact form: no mail backend yet, so sending is simulated and the success state is shown */
(() => {
  const form = document.querySelector('.big-form');
  if (!form) return;
  const sent = document.querySelector('.form-sent');
  const note = form.querySelector('.form-note');
  const btn = form.querySelector('.big-submit');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.textContent = 'Please fill in your name, a work email and a short description.';
      form.querySelector(':invalid').focus();
      return;
    }
    note.textContent = '';
    btn.disabled = true;
    btn.querySelector('.pill-txt, span') && (btn.firstChild.textContent = 'Sending… ');
    setTimeout(() => {
      const name = (new FormData(form).get('name') || '').split(',')[0].trim();
      sent.querySelector('.sent-name').textContent = name ? `, ${name}` : '';
      form.hidden = true;
      sent.hidden = false;
      sent.focus();
      btn.disabled = false;
      btn.firstChild.textContent = 'Send message ';
    }, 900);
  });
  sent.querySelector('.sent-again').addEventListener('click', () => {
    form.reset(); sent.hidden = true; form.hidden = false; form.querySelector('input').focus();
  });
})();

/* contact band: a field of dots that light up green around the mouse */
(() => {
  const band = document.querySelector('.contact-band');
  const cv = band && band.querySelector('.dot-field');
  if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d');
  const GAP = 26, R = 170;
  let w = 0, h = 0, dpr = 1, dots = [], mx = -9999, my = -9999, raf = 0, visible = false;
  const size = () => {
    dpr = Math.min(2, devicePixelRatio || 1);
    const r = band.getBoundingClientRect();
    w = r.width; h = r.height;
    cv.width = w * dpr; cv.height = h * dpr; cv.style.width = `${w}px`; cv.style.height = `${h}px`;
    dots = [];
    for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y, k: 0 });
    draw();
  };
  const draw = () => {
    raf = 0;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    let busy = false;
    for (const d of dots) {
      const dist = Math.hypot(d.x - mx, d.y - my);
      const target = dist < R ? 1 - dist / R : 0;
      d.k += (target - d.k) * 0.14;
      if (Math.abs(target - d.k) > 0.01) busy = true;
      const k = d.k;
      ctx.beginPath();
      ctx.fillStyle = k > 0.02 ? `rgba(152,191,90,${0.25 + k * 0.75})` : 'rgba(241,242,242,0.13)';
      ctx.arc(d.x, d.y, 1.1 + k * 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
    if (busy && visible) raf = requestAnimationFrame(draw);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
  band.addEventListener('pointermove', (e) => { const r = band.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; kick(); });
  band.addEventListener('pointerleave', () => { mx = my = -9999; kick(); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(band);
  addEventListener('resize', size);
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(band);
  size();
})();

/* footer character: leans and looks toward the mouse */
(() => {
  const buddy = document.querySelector('.buddy');
  if (!buddy || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const body = buddy.querySelector('.buddy-body');
  const pupils = [...buddy.querySelectorAll('.buddy-eye i')];
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const step = () => {
    cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
    body.style.transform = `rotateY(${cx * 22}deg) rotateX(${-cy * 16}deg) translate(${cx * 10}px, ${cy * 6}px)`;
    pupils.forEach((pu) => { pu.style.transform = `translate(${cx * 5}px, ${cy * 5}px)`; });
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(step) : 0;
  };
  addEventListener('pointermove', (e) => {
    const r = buddy.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2)));
    ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2)));
    if (!raf) raf = requestAnimationFrame(step);
  }, { passive: true });
  // blink now and then
  setInterval(() => { buddy.classList.add('blink'); setTimeout(() => buddy.classList.remove('blink'), 160); }, 3800);
})();

/* industries: the cards on the right switch the content on the left */
(() => {
  const tabs = [...document.querySelectorAll('.ind-tab')];
  const panel = document.getElementById('ind-panel');
  if (!tabs.length || !panel) return;
  const DATA = [{"n": "01", "name": "Data Centers / AI Infrastructure", "desc": "Keeping complex infrastructure observable, reliable and ready to scale.", "href": "industries.html#industry-data-centers", "cta": "Explore Data Centers / AI Infrastructure", "challenge": "Monitoring and control systems that cannot keep up as the infrastructure grows, leaving teams with too little insight and too much manual work."}, {"n": "02", "name": "Logistics", "desc": "Making material flow more visible, connected and adaptable.", "href": "industries.html#industry-logistics", "cta": "Explore Logistics", "challenge": "Machines, software and people working from different data, so material flow is hard to see and slow to adapt."}, {"n": "03", "name": "Manufacturing", "desc": "Connecting machines, systems and people on the production floor.", "href": "industries.html#industry-manufacturing", "cta": "Explore Manufacturing", "challenge": "Bottlenecks that everyone feels but no one can measure, because the right signals are not collected from the line."}, {"n": "04", "name": "Energy", "desc": "Dependable software and connected systems for demanding environments.", "href": "industries.html#industry-energy", "cta": "Explore Energy", "challenge": "Distributed equipment in the field that needs dependable embedded software, remote monitoring and safe updates."}];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const giant = panel.querySelector('.giant');
  const name = panel.querySelector('.ind-name');
  const desc = panel.querySelector('.ind-desc-main');
  const challenge = panel.querySelector('.ind-challenge-text');
  const cta = panel.querySelector('.ind-explore');
  const icons = [...panel.querySelectorAll('.ind-main-icon')];
  const GLYPHS = '0101010110ABCDEFGHKMNOPRSTUXZ';
  const decode = (el, word) => {
    if (reduce) { el.textContent = word; return; }
    const q = [...word].map((c, i) => ({ c, e: i + 6 + ((Math.random() * 10) | 0) }));
    let f = 0;
    const tick = () => {
      let done = 0;
      el.textContent = q.map((o) => (f >= o.e || o.c === ' ' ? (done++, o.c) : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
      f++;
      if (done < q.length) setTimeout(() => requestAnimationFrame(tick), 35); else el.textContent = word;
    };
    tick();
  };
  let active = 0;
  const show = (i) => {
    if (i === active) return;
    active = i;
    const d = DATA[i];
    tabs.forEach((t, k) => t.setAttribute('aria-selected', String(k === i)));
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.classList.add('is-swap');
    setTimeout(() => {
      giant.innerHTML = [...d.n].map((c) => `<span>${c}</span>`).join('');
      desc.textContent = d.desc;
      challenge.textContent = d.challenge;
      cta.href = d.href;
      cta.querySelector('.pill-txt').textContent = d.cta;
      icons.forEach((ic, k) => ic.classList.toggle('is-on', k === i));
      if (d.name.startsWith('Data Centers')) {
        name.innerHTML = '<span class="scramble" data-scramble>Data Centers</span> / AI Infrastructure';
        if (window.sigmoidScramble) window.sigmoidScramble(name.querySelector('[data-scramble]'));
      } else decode(name, d.name);
      panel.classList.remove('is-swap');
    }, reduce ? 0 : 260);
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => show(i)));
  // arrow keys move between the industry tabs
  tabs.forEach((t, i) => t.addEventListener('keydown', (e) => {
    const k = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!k) return;
    e.preventDefault();
    const n = (i + k + tabs.length) % tabs.length;
    tabs[n].focus(); show(n);
  }));
})();
