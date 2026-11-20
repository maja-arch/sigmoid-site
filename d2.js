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
    { photo: 'images/solve/new-products.jpg', proof: ['4', '', 'core disciplines working as one delivery team'], label: 'Sigmoid', kicker: 'Engineering partner', icon: 'sigmoid', lines: ['Engineering', 'shaped [img] around', 'the challenge.'], mlines: ['Engineering', 'shaped [img]', 'around the', 'challenge.'],
      text: 'We help companies develop software, products and systems with the engineering expertise, technical contribution and responsibility each project requires.',
      cta: 'View success stories', href: 'success-stories.html' },
    { photo: 'images/solve/long-term.jpg', proof: ['80', '%', 'engineering capacity in multi-year product partnerships'], label: 'Software Development', icon: 'software', lines: ['Software built [img]', 'for products that run', 'in the real world.'], mlines: ['Software [img]', 'built for products', 'that run in the', 'real world.'],
      text: 'Software built and evolved with engineering experience applied from day one, and deepened over time through knowledge of your product and domain.',
      cta: 'See expertise', href: 'expertise.html#expertise-software' },
    { photo: 'images/bottleneck-detector.jpg', proof: ['4', '', 'industries: data centers, logistics, manufacturing and energy'], label: 'Embedded', icon: 'embedded', lines: ['Electronics', 'and code [img] that', 'make hardware work.'], mlines: ['Electronics', 'and code [img]', 'that make', 'hardware work.'],
      text: 'Code and electronics designed together with the software and mechanics around them.',
      cta: 'See expertise', href: 'expertise.html#expertise-embedded' },
    { photo: 'images/insights/robotic-hand-black.jpg', proof: ['15', '+', 'mechatronic and robotic systems taken from architecture to the field'], label: 'Robotics', icon: 'robotics', lines: ['Robotic hand [img]', 'for automated', 'grocery handling.'], mlines: ['Robotic hand [img]', 'for automated', 'grocery handling.'],
      text: 'Picking fragile, irregular products reliably, so grocery orders can be automated end to end.',
      cta: 'Read the story', href: 'success-stories.html#story-grocery-robotic-hand' },
    { photo: 'images/lyra.jpg', proof: ['3', '', 'disciplines in one design: mechanics, electronics and software'], label: 'Mechatronics', icon: 'mechatronics', lines: ['Mechanics [img] designed', 'as part of the', 'whole system.'], mlines: ['Mechanics [img]', 'designed as part', 'of the whole', 'system.'],
      text: 'Mechanical design and 3D modelling, developed together with the electronics and software of the same system.',
      cta: 'See expertise', href: 'expertise.html#expertise-mechanical' }
  ];
  const DURATION = 7000;
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const phone = matchMedia('(max-width: 800px)');
  const linesOf = (s) => (phone.matches && s.mlines) || s.lines;
  const plain = (l) => l.replace('[img] ', '').replace(' [img]', '').replace(/[{}]/g, '');
  const lineHTML = (l) => `<span class="ln"><span>${esc(l)
    .replace(/(\S+) \[img\]/, '<span class="nw">$1 [img]</span>').replace(/\[img\] (\S+)/, '<span class="nw">[img] $1</span>')
    .replace('[img]', `<span class="hw" aria-hidden="true"><img src="${SLIDES[active].photo}" alt=""></span>`)
    .replace(/\{(.+?)\}/, '<span class="scramble" data-scramble>$1</span>')}</span></span>`;
  const title = $('.hero-title');
  const lede = $('.hero-lede');
  const primary = $('.hero-primary');
  const tabsEl = $('.hero-tabs');
  let active = 0, busy = false;
  if (hero && title && tabsEl) {
    title.innerHTML = linesOf(SLIDES[0]).map(lineHTML).join('');
    // phone: the widest line of each title runs edge to edge; shrink only if the text strip would leave the screen
    const fitTitle = () => {
      title.style.removeProperty('font-size');
      if (!phone.matches) return;
      const spans = [...title.querySelectorAll('.ln>span')];
      if (!spans.length) return;
      const base = parseFloat(getComputedStyle(title).fontSize);
      spans.forEach((s) => { s.style.display = 'inline-block'; s.style.whiteSpace = 'nowrap'; });
      const widest = Math.max(...spans.map((s) => s.getBoundingClientRect().width));
      spans.forEach((s) => { s.style.display = ''; });
      const avail = title.clientWidth;
      let fs = Math.min(base * avail / widest * 0.85, 60); // about 85% of the screen width
      const tkh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tkh')) || 46;
      const limit = Math.round(innerHeight - tkh) + 1;
      for (let i = 0; i < 40; i++) {
        title.style.setProperty('font-size', `${fs.toFixed(2)}px`, 'important');
        if (hero.offsetHeight <= limit || fs <= base * 0.8) break;
        fs *= 0.97;
      }
    };
    title.setAttribute('aria-label', SLIDES[0].lines.map(plain).join(' '));
    hero.style.setProperty('--slide-dur', `${DURATION}ms`);
    SLIDES.forEach((x) => { const im = new Image(); im.src = x.photo; });
    const tick = (cls) => { const t = document.querySelector(`.ticker-set .${cls}`); if (!t) return ''; const c = t.cloneNode(true); c.removeAttribute('class'); c.setAttribute('class', `ticon ${cls} tab-ticon`); c.setAttribute('aria-hidden', 'true'); return c.outerHTML; };
    const tabIcon = (k) => ({ software: tick('ti-sw'), embedded: tick('ti-em'), robotics: tick('ti-rb'), mechatronics: tick('ti-mx') }[k] || `<svg aria-hidden="true"><use href="#i-${k}"/></svg>`);
    tabsEl.innerHTML = SLIDES.map((s, i) => `<button class="hero-tab" type="button" role="tab" aria-selected="${i === 0}" aria-label="Slide ${i + 1}: ${s.label}" data-i="${i}"><span class="hero-tab-bar"><i></i></span>${tabIcon(s.icon)}<span class="hero-tab-text"><span class="hero-tab-num">0${i + 1}</span><span class="hero-tab-label">${s.label}</span></span></button>`).join('');
    const tabs = $$('.hero-tab', tabsEl);
    // v2: big animated icon of each slide on the stage, "up next" card, kicker
    const stage = $('.hero-stage');
    if (stage) stage.innerHTML = SLIDES.map((s, i) => `<div class="stage-layer${i ? '' : ' is-on'}" data-i="${i}"><img src="${s.photo}" alt="" ${i ? 'loading="lazy"' : ''}></div>`).join('');
    const layers = stage ? $$('.stage-layer', stage) : [];
    const card = $('.hero-card');
    const kNum = $('.hk-num'), kLabel = $('.hk-label');
    const setV2 = () => {
      layers.forEach((l, i) => l.classList.toggle('is-on', i === active));
      hero.classList.toggle('on-first', active === 0);
      const pf = document.querySelector('.hcr-proof'), pr = SLIDES[active].proof;
      if (pf && pr) {
        const fill = () => { pf.querySelector('.hcr-num').innerHTML = `${pr[0]}${pr[1] ? `<sup>${pr[1]}</sup>` : ''}`; pf.querySelector('.hcr-text').textContent = pr[2]; };
        if (reduce || !pf.dataset.ready) { fill(); pf.dataset.ready = '1'; }
        else { pf.classList.add('is-swap'); setTimeout(() => { fill(); pf.classList.remove('is-swap'); }, 320); }
      }
      if (kNum) { kNum.textContent = String(active + 1).padStart(2, '0'); kLabel.textContent = SLIDES[active].kicker || SLIDES[active].label; }
      if (card) {
        const n = (active + 1) % SLIDES.length, ns = SLIDES[n];
        card.querySelector('.hc-count b').textContent = String(n + 1).padStart(2, '0');
        card.querySelector('.hc-title').textContent = ns.label;
        card.querySelector('.hc-media').innerHTML = tabIcon(ns.icon).replace('tab-ticon', 'card-ticon');
        card.setAttribute('aria-label', `Next slide: ${ns.label}`);
        const bar = card.querySelector('.hc-bar i'); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
      }
    };
    if (card) card.addEventListener('click', () => go(active + 1));
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
      title.setAttribute('aria-label', s.lines.map(plain).join(' '));
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
      // phone: the tab row scrolls sideways; keep the active tab in view
      if (tabsEl.scrollWidth > tabsEl.clientWidth + 2) {
        const t = tabs[active], tr = t.getBoundingClientRect(), rr = tabsEl.getBoundingClientRect();
        tabsEl.scrollTo({ left: Math.max(0, tabsEl.scrollLeft + (tr.left - rr.left) - (rr.width - tr.width) / 2), behavior: reduce ? 'auto' : 'smooth' });
      }
    };
    const go = (index) => {
      const next = (index + SLIDES.length) % SLIDES.length;
      if (next === active || busy) return;
      active = next; busy = true;
      const s = SLIDES[active];
      setTabs(); setV2();
      if (reduce) { title.innerHTML = linesOf(s).map(lineHTML).join(''); setText(s); busy = false; return; }
      title.classList.add('is-out'); title.classList.remove('is-in');
      setTimeout(() => {
        title.classList.remove('is-out');
        title.innerHTML = linesOf(s).map(lineHTML).join('');
        fitTitle();
        if (window.sigmoidScramble) title.querySelectorAll('[data-scramble]').forEach(window.sigmoidScramble);
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
    fitTitle(); if (document.fonts) document.fonts.ready.then(fitTitle);
    let ft; addEventListener('resize', () => { clearTimeout(ft); ft = setTimeout(fitTitle, 150); });
    phone.addEventListener('change', () => { title.innerHTML = linesOf(SLIDES[active]).map(lineHTML).join(''); fitTitle(); title.classList.add('is-in'); });
    setV2();
    $('.hero-next').addEventListener('click', () => go(active + 1));
    const pause = (on) => hero.classList.toggle('is-paused', on);
    title.addEventListener('mouseenter', () => pause(true));
    title.addEventListener('mouseleave', () => pause(false));
    // pause only for keyboard focus; a mouse click on a tab or arrow must not stop the progress line
    hero.addEventListener('focusin', (e) => { if (e.target.matches(':focus-visible')) pause(true); });
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
      const speed = 70; // px per second, same on desktop and phone
      track.style.setProperty('--ticker-dur', `${(setW * perHalf) / speed}s`);
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
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('menu-open'))); else document.documentElement.classList.remove('menu-open');
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
        else { el.textContent = word; el.classList.remove('is-run'); if (!('once' in el.dataset)) setTimeout(run, 2600); }
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
  // per-field error state: message under the field, coral line, cleared while typing
  const fields = [...form.querySelectorAll('input[required], textarea[required]')];
  const MSG = {
    name: { missing: 'Please enter your name.' },
    email: { missing: 'Please enter your work email.', invalid: 'Please enter a valid email, like name@company.com.' },
    challenge: { missing: 'Please tell us briefly what you are trying to develop or solve.' }
  };
  const check = (f) => {
    const v = f.value.trim();
    let msg = '';
    if (!v) msg = MSG[f.name].missing;
    else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = MSG[f.name].invalid;
    const field = f.closest('.big-field');
    field.classList.toggle('is-invalid', !!msg);
    f.setAttribute('aria-invalid', msg ? 'true' : 'false');
    field.querySelector('.field-err').textContent = msg;
    return !msg;
  };
  fields.forEach((f) => {
    f.addEventListener('input', () => { if (f.closest('.big-field').classList.contains('is-invalid')) check(f); if (!form.querySelector('.is-invalid')) note.textContent = ''; });
    f.addEventListener('blur', () => { if (f.closest('.big-field').classList.contains('is-invalid')) check(f); });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = fields.filter((f) => !check(f));
    if (bad.length) {
      note.textContent = bad.length > 1 ? 'Please fill in the highlighted fields.' : '';
      bad[0].focus();
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
    form.reset(); fields.forEach((f) => { f.closest('.big-field').classList.remove('is-invalid'); f.removeAttribute('aria-invalid'); f.closest('.big-field').querySelector('.field-err').textContent = ''; }); sent.hidden = true; form.hidden = false; form.querySelector('input').focus();
  });
})();

/* footer character: leans and looks toward the mouse */
(() => {
  const buddy = document.querySelector('.buddy');
  if (!buddy || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const body = buddy.querySelector('.buddy-body');
  const pupils = [...buddy.querySelectorAll('.pupil')];
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const step = () => {
    cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
    body.style.transform = `rotate(${cx * 6}deg) translate(${cx * 10}px, ${cy * 4}px)`;
    pupils.forEach((pu) => { pu.style.transform = `translate(${cx * 9}px, ${cy * 6}px)`; });
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(step) : 0;
  };
  addEventListener('pointermove', (e) => {
    const r = buddy.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2)));
    ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2)));
    if (!raf) raf = requestAnimationFrame(step);
  }, { passive: true });
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
  // industries move on by themselves; a click jumps there and restarts the timer; hovering the module holds it
  const mod = panel.closest('.module') || panel.parentElement;
  let itimer = 0, ihold = false;
  const iauto = () => { clearInterval(itimer); if (!reduce) itimer = setInterval(() => { if (!ihold && !document.hidden) show((active + 1) % tabs.length); }, 7000); };
  mod.addEventListener('mouseenter', () => { ihold = true; });
  mod.addEventListener('mouseleave', () => { ihold = false; });
  mod.addEventListener('focusin', () => { ihold = true; });
  mod.addEventListener('focusout', () => { ihold = false; });
  tabs.forEach((t, i) => t.addEventListener('click', () => {
    show(i); iauto();
    // phone: the panel sits above the list, bring it into view so the change is seen
    if (matchMedia('(max-width: 800px)').matches) {
      const top = panel.getBoundingClientRect().top;
      if (top < 0 || top > innerHeight * 0.35) scrollTo({ top: scrollY + top - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hd')) || 56) - 12, behavior: reduce ? 'auto' : 'smooth' });
    }
  }));
  iauto();
  // active card: soft liquid light that follows the mouse
  tabs.forEach((t) => {
    let tx = 70, ty = 30, cx = 70, cy = 30, raf = 0;
    const loop = () => { cx += (tx - cx) * .08; cy += (ty - cy) * .08; t.style.setProperty('--mx', cx.toFixed(2) + '%'); t.style.setProperty('--my', cy.toFixed(2) + '%'); raf = Math.abs(tx - cx) + Math.abs(ty - cy) > .1 ? requestAnimationFrame(loop) : 0; };
    t.addEventListener('mousemove', (e) => { const r = t.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 100; ty = (e.clientY - r.top) / r.height * 100; if (!raf && !reduce) raf = requestAnimationFrame(loop); });
    t.addEventListener('mouseleave', () => { tx = 70; ty = 30; if (!raf && !reduce) raf = requestAnimationFrame(loop); });
  });
  // arrow keys move between the industry tabs
  tabs.forEach((t, i) => t.addEventListener('keydown', (e) => {
    const k = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!k) return;
    e.preventDefault();
    const n = (i + k + tabs.length) % tabs.length;
    tabs[n].focus(); show(n);
  }));
})();

/* client testimonials: small fade slider with the hero arrows */
(() => {
  const card = document.querySelector('.quote-card');
  const slides = card ? [...card.querySelectorAll('.q-slide')] : [];
  if (slides.length < 2) return;
  const wrap = card.querySelector('.q-slides');
  let i = 0, timer = 0;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fit = () => { wrap.style.minHeight = `${Math.max(...slides.map((s) => s.scrollHeight))}px`; };
  const show = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.setAttribute('aria-hidden', String(k !== i)); });
  };
  const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show(i + 1), 8000); };
  card.querySelector('.q-prev').addEventListener('click', () => { show(i - 1); auto(); });
  card.querySelector('.q-next').addEventListener('click', () => { show(i + 1); auto(); });
  card.addEventListener('mouseenter', () => clearInterval(timer));
  card.addEventListener('mouseleave', auto);
  fit(); if (document.fonts) document.fonts.ready.then(fit); addEventListener('resize', fit);
  auto();
})();

/* back to top: scroll to the very start of the page */
document.querySelectorAll('[data-to-top]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}));

/* hero clock: local time in Novi Sad */
(() => {
  const ts = [...document.querySelectorAll('.hero-clock time, .menu-clock time')]; if (!ts.length) return;
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Belgrade', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const tick = () => { const v = f.format(new Date()).replace(/:/g, ' : '); ts.forEach((t) => { t.textContent = v; }); };
  tick(); setInterval(tick, 1000);
})();

/* hero box: success stories that change on their own */
(() => {
  const box = document.querySelector('.hero-news.hs'); if (!box) return;
  const ST = [
    { t: 'Robotic hand for automated grocery handling', tag: 'Logistics', img: 'images/robotic-hand-sq.jpg', href: 'success-stories.html#story-grocery-robotic-hand' },
    { t: 'Automation in Intralogistics', tag: 'Logistics', img: 'images/automation-intralogistics.jpg', href: 'success-stories.html#story-automation-in-intralogistics' },
    { t: 'Bottleneck Detector', tag: 'Manufacturing', img: 'images/bottleneck-detector.jpg', href: 'success-stories.html#story-bottleneck-detector' },
    { t: 'Orox Spindle', tag: 'Manufacturing', img: 'images/orox-spindle.jpg', href: 'success-stories.html#story-orox-spindle' }
  ];
  // insights in between the stories
  const INS = [
    { t: 'The expensive decisions are made before development starts', tag: 'Insight', img: 'images/insights/code-laptop.jpg', href: 'insights.html#insight-expensive-decisions' },
    { t: 'How do you design a robotic hand that can handle both fragile and robust grocery items?', tag: 'Insight', img: 'images/insights/robotic-hand-black.jpg', href: 'insights.html#insight-grocery-hand' },
    { t: 'What accumulated engineering experience changes on day one', tag: 'Insight', img: 'images/insights/robot-pepper.jpg', href: 'insights.html#insight-experience-day-one' }
  ];
  ST.splice(1, 0, INS[0]); ST.splice(3, 0, INS[1]); ST.splice(5, 0, INS[2]);
  ST.forEach((x) => { const im = new Image(); im.src = x.img; });
  const lead = box.querySelector('.hn-lead'), small = box.querySelector('.hn-small'), n = box.querySelector('.hs-n');
  let i = 0, hold = false;
  const fill = (el, x) => { el.href = x.href; el.querySelector('img').src = x.img; el.querySelector('.hs-t').textContent = x.t; const tg = el.querySelector('.hs-tag'); if (tg) tg.textContent = x.tag; };
  const step = () => {
    if (hold || document.hidden) return;
    i = (i + 1) % ST.length;
    box.classList.remove('is-in'); box.classList.add('is-out');
    setTimeout(() => {
      fill(lead, ST[i]); fill(small, ST[(i + 1) % ST.length]);
      if (n) n.textContent = String(i + 1).padStart(2, '0');
      box.classList.remove('is-out'); void box.offsetWidth; box.classList.add('is-in');
    }, 520);
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  box.addEventListener('mouseenter', () => { hold = true; });
  box.addEventListener('mouseleave', () => { hold = false; });
  box.addEventListener('focusin', () => { hold = true; });
  box.addEventListener('focusout', () => { hold = false; });
  setInterval(step, 5200);
})();

/* favicon: the brand symbol animation (frames from the official animated symbol), drawn frame by frame */
(() => {
  let link = document.querySelector('link[rel~="icon"]');
  if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.append(link); }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sprite = new Image(); sprite.src = 'images/favicon-sprite.png';
  sprite.onload = () => {
    const N = Math.round(sprite.width / 64), cv = document.createElement('canvas'); cv.width = cv.height = 64;
    const ctx = cv.getContext('2d'); let i = 0;
    setInterval(() => { ctx.clearRect(0, 0, 64, 64); ctx.drawImage(sprite, i * 64, 0, 64, 64, 0, 0, 64, 64); link.type = 'image/png'; link.href = cv.toDataURL('image/png'); i = (i + 1) % N; }, 80);
  };
})();

/* mobile: clients & success stories under the hero buttons open on tap */
(() => {
  const btn = document.querySelector('.hero-more-btn'), box = document.getElementById('heroMore');
  if (!btn || !box) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    box.classList.toggle('is-open', open);
  });
})();

/* phone: hero height leaves room for the moving text strip at the bottom of the screen */
(() => {
  const tk = document.querySelector('.ticker'); if (!tk) return;
  const set = () => document.documentElement.style.setProperty('--tkh', `${tk.offsetHeight}px`);
  set(); addEventListener('resize', set); if (document.fonts) document.fonts.ready.then(set);
})();

/* phone: success stories box slides in from the right edge */
(() => {
  const hero = document.querySelector('.hero'), tg = document.querySelector('.hs-toggle'), x = document.querySelector('.hs-close');
  if (!hero || !tg) return;
  const set = (open) => { hero.classList.toggle('hs-open', open); tg.setAttribute('aria-expanded', String(open)); hero.scrollLeft = 0; };
  tg.addEventListener('click', () => set(!hero.classList.contains('hs-open')));
  if (x) x.addEventListener('click', (e) => { e.preventDefault(); set(false); tg.focus({ preventScroll: true }); hero.scrollLeft = 0; });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && hero.classList.contains('hs-open')) set(false); });
})();

/* phone: success stories show three, "Load more" reveals the rest */
(() => {
  const list = document.querySelector('.stories'), btn = document.querySelector('.load-more');
  if (!list || !btn) return;
  btn.addEventListener('click', () => {
    list.classList.add('is-all');
    btn.setAttribute('aria-expanded', 'true');
    btn.closest('.stories-more').hidden = true;
    const first = list.querySelectorAll('.story-card')[3];
    if (first) first.querySelector('a')?.focus({ preventScroll: true });
  });
})();

/* contact form: the message field grows with what is typed */
(() => {
  const ta = document.querySelector('.contact-band textarea'); if (!ta) return;
  const fit = () => { ta.style.height = 'auto'; ta.style.height = `${ta.scrollHeight}px`; };
  ta.addEventListener('input', fit); addEventListener('resize', fit);
})();

/* logo (header and footer) goes to the homepage; on the homepage itself it glides back to the top */
document.querySelectorAll('.hd-brand, .ft2-logo').forEach((a) => a.addEventListener('click', (e) => {
  const here = /(^|\/)(index\.html)?$/.test(location.pathname);
  if (!here) return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}));
