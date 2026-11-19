/* Sigmoid cookie consent (EU: GDPR + ePrivacy)
   - Only strictly necessary storage runs before consent.
   - "Reject" is as easy as "Accept"; nothing is pre-ticked.
   - Choice is stored with a timestamp and asked again after 12 months
     or when CONSENT_VERSION changes.
   - Other scripts read window.sigmoidConsent or listen for the
     "sigmoid:consent" event before loading analytics/marketing tags.
   - Reopen anywhere with a link/button: [data-cookie-settings]
*/
(() => {
  const KEY = 'sigmoid-consent';
  const CONSENT_VERSION = 1;
  const MAX_AGE = 365 * 24 * 60 * 60 * 1000;
  const POLICY_URL = 'about.html#cookies';
  const PRIVACY_URL = 'about.html#privacy-policy';

  const read = () => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!c || c.version !== CONSENT_VERSION || Date.now() - c.timestamp > MAX_AGE) return null;
      return c;
    } catch { return null; }
  };
  const apply = (c) => {
    window.sigmoidConsent = c;
    document.dispatchEvent(new CustomEvent('sigmoid:consent', { detail: c }));
  };
  const save = (analytics, marketing) => {
    const c = { version: CONSENT_VERSION, necessary: true, analytics, marketing, timestamp: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* storage blocked: ask again next visit */ }
    apply(c);
  };

  const box = document.createElement('section');
  box.className = 'cookie';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'false');
  box.setAttribute('aria-labelledby', 'cookie-title');
  box.setAttribute('aria-describedby', 'cookie-text');
  box.hidden = true;
  box.innerHTML = `
    <div class="cookie-main">
      <h2 class="cookie-title" id="cookie-title">We value your privacy</h2>
      <p class="cookie-text" id="cookie-text">We use optional analytics and marketing cookies only with your consent. Read our <a href="${POLICY_URL}">Cookie policy</a>.</p>
    </div>
    <div class="cookie-actions">
      <button type="button" class="cookie-accept" data-act="accept">Accept</button>
      <button type="button" class="cookie-reject" data-act="reject">Reject</button>
    </div>`;
  document.body.append(box);
  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    box.hidden = false;
    lift();
    requestAnimationFrame(() => box.classList.add('is-open'));
  };
  const close = () => {
    box.classList.remove('is-open');
    setTimeout(() => { box.hidden = true; }, 350);
    if (lastFocus && lastFocus.focus && lastFocus !== document.body) lastFocus.focus();
  };

  // keep the banner above the footer bar (Back to top etc.) when it scrolls into view
  const bar = () => document.querySelector('.ft2-bottom, .ft-bar');
  const lift = () => {
    if (box.hidden) return;
    let over = 0;
    const b = bar();
    if (b) over = Math.max(over, innerHeight - b.getBoundingClientRect().top);
    // the moving text strip under the hero: while it sits at the bottom of the screen, stay above it
    const tk = document.querySelector('.ticker');
    if (tk) { const r = tk.getBoundingClientRect(); const zone = box.offsetHeight + 40; if (r.top < innerHeight && r.bottom > innerHeight - zone) over = Math.max(over, innerHeight - r.top); }
    box.style.bottom = over > 0 ? `${Math.round(over + 12)}px` : '';
  };
  addEventListener('scroll', lift, { passive: true });
  addEventListener('resize', lift);

  box.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (!act) return;
    if (act === 'accept') save(true, true);
    if (act === 'reject') save(false, false);
    close();
  });
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-cookie-settings]');
    if (!trigger) return;
    e.preventDefault();
    open();
  });

  const existing = read();
  if (existing) apply(existing);
  else setTimeout(open, 900);
})();
