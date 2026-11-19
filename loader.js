/* Sigmoid loader: the four discipline icons, a counter, then on scroll the icons fly
   into the hero slider tabs while the loader lifts away like a curtain. */
(() => {
  const ld = document.getElementById('loader');
  if (!ld) return;
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const done = () => { root.classList.remove('ld-on'); ld.remove(); };
  if (reduce) { done(); return; }

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);

  const num = ld.querySelector('.ld-count b');
  const bar = ld.querySelector('.ld-bar i');
  const enter = ld.querySelector('.ld-enter');
  const icons = [...ld.querySelectorAll('.ld-item svg')];

  /* counter: at least ~1.8 s, and never 100 before the page has loaded */
  let loaded = document.readyState === 'complete';
  addEventListener('load', () => { loaded = true; });
  const t0 = performance.now(), MIN = 1800;
  let shown = 0, ready = false, wantExit = false;
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / MIN);
    const target = loaded ? ease(p) * 100 : Math.min(92, ease(p) * 100);
    shown += (target - shown) * 0.18;
    if (target >= 100 && shown > 99.5) shown = 100;
    num.textContent = String(Math.round(shown)).padStart(3, '0');
    bar.style.transform = `scaleX(${shown / 100})`;
    if (shown < 100) requestAnimationFrame(tick);
    else { ready = true; ld.classList.add('is-ready'); enter.hidden = false; if (wantExit) exit(); }
  };
  requestAnimationFrame(tick);

  /* exit: icons fly to the matching slider tabs (02–05), the panel lifts away */
  let leaving = false;
  const exit = () => {
    if (!ready) { wantExit = true; return; }
    if (leaving) return;
    leaving = true;
    detach();
    ld.classList.add('is-leaving');
    const tabs = [...document.querySelectorAll('.hero-tab')];
    icons.forEach((svg, i) => {
      const from = svg.getBoundingClientRect();
      const tIcon = tabs[i + 1] && tabs[i + 1].querySelector('.tab-ticon');
      const to = tIcon ? tIcon.getBoundingClientRect() : null;
      const visible = to && to.width && to.right > 0 && to.left < innerWidth && to.bottom > 0 && to.top < innerHeight;
      svg.style.transitionDelay = `${i * 70}ms`;
      if (visible) {
        const s = to.width / from.width;
        const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
        const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
        svg.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
      } else {
        svg.style.transform = 'translateY(-40vh) scale(.4)';
        svg.style.opacity = '0';
      }
    });
    // the page underneath starts its own entrance (hero title lines, photo, slider)
    setTimeout(() => root.classList.remove('ld-on'), 350);
    setTimeout(() => { ld.classList.add('is-gone'); }, 1250);
    setTimeout(done, 1700);
  };

  const onWheel = (e) => { if (e.deltaY > 0) { e.preventDefault(); exit(); } };
  let ty = null;
  const onTouchStart = (e) => { ty = e.touches[0].clientY; };
  const onTouchMove = (e) => { if (ty !== null && ty - e.touches[0].clientY > 24) { e.preventDefault(); exit(); } };
  const onKey = (e) => { if (['ArrowDown', 'PageDown', ' ', 'Enter', 'Spacebar'].includes(e.key)) { e.preventDefault(); exit(); } };
  addEventListener('wheel', onWheel, { passive: false });
  addEventListener('touchstart', onTouchStart, { passive: true });
  addEventListener('touchmove', onTouchMove, { passive: false });
  addEventListener('keydown', onKey);
  enter.addEventListener('click', exit);
  const detach = () => {
    removeEventListener('wheel', onWheel); removeEventListener('touchstart', onTouchStart);
    removeEventListener('touchmove', onTouchMove); removeEventListener('keydown', onKey);
  };
})();
