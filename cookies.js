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
      <div class="cookie-head"><button type="button" class="cookie-back" data-act="back" aria-label="Back to summary" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6.5"/><path d="M11 6.5 5.5 12l5.5 5.5"/></svg></button><h2 class="cookie-title" id="cookie-title">We value your privacy</h2></div>
      <p class="cookie-text" id="cookie-text">We use optional analytics and marketing cookies only with your consent. Read our <a href="${POLICY_URL}">Cookie policy</a>.</p>
    </div>
    <div class="cookie-prefs" id="cookie-prefs" hidden>
      <div class="cookie-opt is-locked">
        <span><b>Strictly necessary</b><small>Required for the site to work, such as remembering your cookie choice. Always on.</small></span>
        <button type="button" class="cookie-switch" role="switch" aria-checked="true" aria-disabled="true" aria-label="Strictly necessary cookies, always on"></button>
      </div>
      <div class="cookie-opt" data-key="analytics">
        <span><b>Analytics</b><small>Help us understand how visitors use the site, using aggregated statistics.</small></span>
        <button type="button" class="cookie-switch" role="switch" aria-checked="false" aria-label="Analytics cookies"></button>
      </div>
      <div class="cookie-opt" data-key="marketing">
        <span><b>Marketing</b><small>Used to measure the effectiveness of our campaigns and content on other platforms.</small></span>
        <button type="button" class="cookie-switch" role="switch" aria-checked="false" aria-label="Marketing cookies"></button>
      </div>
    </div>
    <div class="cookie-actions">
      <button type="button" class="cookie-link" data-act="customize" aria-expanded="false" aria-controls="cookie-prefs">Customize</button>
      <div class="cookie-btns">
        <button type="button" class="btn btn-outline btn-xs" data-act="reject"><span class="btn-text"><span data-text="Reject">Reject</span></span></button>
        <button type="button" class="btn btn-outline btn-xs" data-act="save" hidden><span class="btn-text"><span data-text="Save choices">Save choices</span></span></button>
        <button type="button" class="btn btn-xs" data-act="accept"><span class="btn-text"><span data-text="Accept">Accept</span></span></button>
      </div>
    </div>`;
  document.body.append(box);

  const prefs = box.querySelector('#cookie-prefs');
  const custom = box.querySelector('[data-act="customize"]');
  const saveBtn = box.querySelector('[data-act="save"]');
  const sw = (key) => box.querySelector(`[data-key="${key}"] .cookie-switch`);
  const isOn = (key) => sw(key).getAttribute('aria-checked') === 'true';
  const setOn = (key, on) => sw(key).setAttribute('aria-checked', String(!!on));
  box.querySelectorAll('.cookie-opt[data-key]').forEach((row) => row.addEventListener('click', () => setOn(row.dataset.key, !isOn(row.dataset.key))));
  let lastFocus = null;

  const open = (withPrefs = false) => {
    const c = read();
    setOn('analytics', c && c.analytics);
    setOn('marketing', c && c.marketing);
    setPrefs(withPrefs);
    lastFocus = document.activeElement;
    box.hidden = false;
    requestAnimationFrame(() => box.classList.add('is-open'));
  };
  const close = () => {
    box.classList.remove('is-open');
    setTimeout(() => { box.hidden = true; }, 350);
    if (lastFocus && lastFocus.focus && lastFocus !== document.body) lastFocus.focus();
  };
  const setPrefs = (on) => {
    prefs.hidden = !on;
    custom.setAttribute('aria-expanded', String(on));
    custom.hidden = on;
    box.querySelector('.cookie-back').hidden = !on;
    saveBtn.hidden = !on;
    box.classList.toggle('has-prefs', on);
  };

  box.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (!act) return;
    if (act === 'customize') { setPrefs(true); box.querySelector('.cookie-back').focus(); return; }
    if (act === 'back') { setPrefs(false); custom.focus(); return; }
    if (act === 'accept') save(true, true);
    if (act === 'reject') save(false, false);
    if (act === 'save') save(isOn('analytics'), isOn('marketing'));
    close();
  });
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-cookie-settings]');
    if (!trigger) return;
    e.preventDefault();
    open(true);
  });

  const existing = read();
  if (existing) apply(existing);
  else setTimeout(() => open(false), 900);
})();
