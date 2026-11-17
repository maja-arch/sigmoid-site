const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    menu.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
    nav.classList.toggle('open', !expanded);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('open');
  }));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#message').textContent = 'Thanks for reaching out. This demo form is ready to connect to your inbox.';
  form.reset();
});

const rawPage = location.pathname.split('/').pop() || 'index.html';
// Vercel can serve pages without .html ("/about"), and the homepage as "/" or "/home.html"
const page = rawPage === 'home.html' ? 'index.html' : (rawPage.endsWith('.html') ? rawPage : `${rawPage}.html`);
document.body.id = 'top';
const pageHero = document.querySelector('.page-hero');
const setId = (element, id) => {
  if (element) element.id = id;
};

const storyTargets = {
  'Robotic hand for automated grocery handling': 'story-grocery-robotic-hand',
  'Automation in intralogistics': 'story-automation-in-intralogistics',
  'Bottleneck detector': 'story-bottleneck-detector',
  'Orox spindle': 'story-orox-spindle',
  'FBR-25L': 'story-fbr-25l',
  'RoboFryer': 'story-robofryer',
  'LyraScan': 'story-lyrascan',
  'Berrybot': 'story-berrybot',
  'HRC Hand': 'story-hrc-hand'
};

const storySummaries = [
  ['FBR-25L', 'story-fbr-25l'],
  ['RoboFryer', 'story-robofryer'],
  ['LyraScan', 'story-lyrascan'],
  ['Berrybot', 'story-berrybot'],
  ['HRC Hand', 'story-hrc-hand']
];

const articleTargets = {
  'The expensive decisions are made before development starts': 'insight-expensive-decisions',
  'How do you design a robotic hand for fragile and robust grocery items?': 'insight-grocery-hand',
  'What accumulated engineering experience changes on day one': 'insight-experience-day-one',
  'Software is a serious engineering capability': 'insight-software-serious',
  'The people behind the engineering': 'insight-people-behind',
  'How to choose an engineering partner: risks and criteria': 'insight-choose-partner'
};

const articleAliases = {
  'Designing a robotic hand for fragile and robust items': 'insight-grocery-hand'
};

const articleSummaries = [
  ['Software is a serious engineering capability', 'insight-software-serious'],
  ['The people behind the engineering', 'insight-people-behind'],
  ['How to choose an engineering partner: risks and criteria', 'insight-choose-partner']
];

if (page === 'index.html') {
  setId(document.querySelector('main'), 'home');
  setId(document.querySelector('.hero'), 'landing');
  const hero = document.querySelector('.hero');
  const ICONS = {"sigmoid": "<svg aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"594 0 164 164\" fill=\"currentColor\"><path d=\"M678.057 159.589L689.28 158.054L645.951 156.425L678.057 159.589Z\"/><path d=\"M735.989 131.298L726.327 146.448L756.21 107.555L735.985 131.295L735.989 131.298Z\"/><path d=\"M756.107 52.5276L726.014 13.6553L735.762 29.1486L756.107 52.5311V52.5276Z\"/><path d=\"M748.885 80.2717L756.946 105.235L756.85 54.8516L748.888 80.2717H748.885Z\"/><path d=\"M607.03 123.37L605.157 81.5327L595.007 81.251L607.03 123.37Z\"/><path d=\"M606.679 37.6714L595 79.8287L605.15 79.863L606.679 37.668V37.6714Z\"/><path d=\"M725.306 147.266L734.821 132.216L691.756 157.406L725.306 147.262V147.266Z\"/><path d=\"M724.987 12.8424L691.313 3.18359L734.587 28.2361L724.987 12.8424Z\"/><path d=\"M643.923 155.464L639.514 132.913L608.837 125.426L643.923 155.467V155.464Z\"/><path d=\"M643.387 5.26906L608.469 35.6096L639.133 28.2874L643.387 5.26562V5.26906Z\"/><path d=\"M736.392 130.172L756.634 106.487L748.5 81.6816L736.392 130.172Z\"/><path d=\"M748.493 78.8698L756.53 53.6078L736.168 30.2871L748.49 78.8698H748.493Z\"/><path d=\"M641.046 133.521L645.256 156.02L688.739 157.628L641.046 133.521Z\"/><path d=\"M644.716 4.70288L640.662 27.6731L688.286 2.98828L644.713 4.70288H644.716Z\"/><path d=\"M608.198 124.25L638.837 131.562L606.404 82.3711L608.198 124.247V124.25Z\"/><path d=\"M638.463 29.6553L607.837 36.7954L606.39 79.0317L638.463 29.6553Z\"/><path d=\"M700.921 115.753L691.228 156.982L734.491 131.665L700.917 115.756L700.921 115.753Z\"/><path d=\"M690.788 3.62988L700.729 45.2786L734.261 28.8095L690.788 3.62988Z\"/><path d=\"M701.983 114.306L735.468 130.39L747.59 81.6943L701.979 114.303L701.983 114.306Z\"/><path d=\"M701.796 46.7254L747.582 78.8734L735.24 30.0811L701.796 46.7254Z\"/><path d=\"M699.193 115.753L641.91 132.779L689.706 157.024L699.196 115.753H699.193Z\"/><path d=\"M689.258 3.59473L641.535 28.417L699 45.2881L689.258 3.59473Z\"/><path d=\"M639.62 130.905L649.358 81.6456L607.036 81.5391L639.62 130.902V130.905Z\"/><path d=\"M639.257 30.3145L607.03 79.8662L649.352 79.7871L639.257 30.3179V30.3145Z\"/><path d=\"M701.141 48.189L701.316 112.853L747.068 80.2854L701.138 48.1855L701.141 48.189Z\"/><path d=\"M651.032 82.2236L641.164 131.518L698.563 114.372L651.035 82.2236H651.032Z\"/><path d=\"M640.796 29.6973L651.022 79.2043L698.374 46.6887L640.796 29.6973Z\"/><path d=\"M652.062 80.7137L699.624 112.917L699.446 48.1396L652.062 80.7103V80.7137Z\"/></svg>", "software": "<svg aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 378 360\" fill=\"currentColor\"><path d=\"M341.075 68.4496L246.974 0H130.14L83.0889 34.2106L36.0382 68.4212L0 179.404L35.9816 290.471L130.253 359.034L247.002 358.977L341.132 290.414L377.085 179.432L341.075 68.4496ZM299.46 188.477H209.35L274.462 253.694L262.289 265.887L196.214 199.706V290.585H178.974V200.67L113.862 265.887L101.688 253.694L166.801 188.477H77.6535V171.209H167.763L102.651 105.992L114.824 93.7992L179.002 158.081V68.4496H196.243V159.045L261.355 93.8275L273.528 106.02L208.416 171.237H299.488V188.506L299.46 188.477Z\"/></svg>", "embedded": "<svg aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 371 355\" fill=\"currentColor\"><path d=\"M333.818 66.5885L240.132 0L125.781 1.1605L33.7735 69.7898L0 179.237L36.971 288.163L130.698 354.832L245.288 353.671L337.136 285.002L370.869 175.475L333.818 66.5885ZM162.553 225.656L145.526 241.863L81.0964 176.315L151.561 110.407L166.829 127.054L112.432 176.035C119.346 182.718 162.553 225.616 162.553 225.616V225.656ZM220.787 242.504L206.438 225.696C206.438 225.696 249.644 182.798 256.559 176.115L202.162 127.134L216.191 110.487L287.215 176.195L220.787 242.504Z\"/></svg>", "robotics": "<svg aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 329 346\" fill=\"currentColor\"><g transform=\"translate(0 346) rotate(-90)\"><path d=\"M33.0414 266.255L119.386 328.974H136.296V170.203C136.296 151.652 151.31 136.635 169.857 136.635C188.404 136.635 203.418 151.652 203.418 170.203V329H226.588L312.933 266.281L346 164.591L312.985 62.8226L226.485 0L119.36 0.0519624L32.9895 62.8745L0 164.591L33.0414 266.281V266.255Z\"/></g></svg>", "mechatronics": "<svg aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 369 355\" fill=\"currentColor\"><path d=\"M106.038 170.077C109.759 130.124 143.333 98.8403 184.226 98.8403C225.12 98.8403 258.735 130.124 262.415 170.077H368.453L335.247 67.761L241.928 0H126.362L33.1649 67.8428L0 170.077H106.038Z\"/><path d=\"M261.68 190.234C255.546 227.529 223.28 256.032 184.227 256.032C145.173 256.032 112.908 227.529 106.774 190.234H1.71788L33.247 287.193L126.403 354.832H144.642H217.065H242.051L335.207 287.193L366.736 190.193H261.68V190.234Z\"/></svg>"};
  const heroGrid = hero.querySelector('.hero-grid');
  const heroCopy = heroGrid.firstElementChild;
  const slides = [
    {
      label: 'Sigmoid',
      heading: 'Engineering\nshaped around the challenge.',
      icon: 'sigmoid',
      description: 'We help companies develop software, products and systems with the engineering expertise, technical contribution and responsibility each project requires.',
      primary: 'View success stories',
      primaryHref: 'success-stories.html',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Engineer working on a technical project'
    },
    {
      label: 'Software Development',
      icon: 'software',
      heading: 'Software shaped around your product.',
      description: 'Software built and evolved with engineering experience applied from day one, and deepened over time through knowledge of your product and domain.',
      primary: 'See expertise',
      primaryHref: 'expertise.html#expertise-software',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Engineer working on industrial software and equipment'
    },
    {
      label: 'Embedded',
      icon: 'embedded',
      heading: 'Code and electronics that make hardware work.',
      description: 'Embedded code and electronics, designed together with the software and mechanics around them.',
      primary: 'See expertise',
      primaryHref: 'expertise.html#expertise-embedded',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Close-up of an electronic circuit board'
    },
    {
      label: 'Robotics',
      icon: 'robotics',
      heading: 'Robotic systems that move, sense and act.',
      description: 'Robotic and mechatronic systems that move, sense and act, from concept to working prototype.',
      primary: 'Read the story',
      primaryHref: 'success-stories.html#story-grocery-robotic-hand',
      image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Robotic prototype in an engineering laboratory'
    },
    {
      label: 'Mechatronics',
      icon: 'mechatronics',
      heading: 'Mechanics designed as part of the whole system.',
      description: 'Mechanical design and 3D modelling, developed together with the electronics and software of the same system.',
      primary: 'See expertise',
      primaryHref: 'expertise.html#expertise-mechanical',
      image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Industrial machinery in a production facility'
    }
  ];
  /* ---------- Hero slider v2: autoplay with progress, faceted image wipe, text reveal ---------- */
  const DURATION = 7000;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  hero.classList.add('slider-v2');
  hero.style.setProperty('--slide-dur', `${DURATION}ms`);
  slides.forEach((slide) => { const img = new Image(); img.src = slide.image; });

  const decagon = (arrow) => `<span aria-hidden="true">${arrow}</span>`;
  const heroNav = `<div class="wrap hero-nav"><div class="hero-dots" role="tablist" aria-label="Hero slides">${slides.map((slide, index) => `<button class="hero-dot" type="button" role="tab" aria-label="Slide ${index + 1}: ${slide.label}" aria-current="${index === 0}" data-slide="${index}"><span class="hero-dot-bar"><i></i></span><span class="hero-dot-icon">${ICONS[slide.icon] || ''}</span><span class="hero-dot-text"><span class="hero-dot-number">0${index + 1}</span><span class="hero-dot-label">${slide.label}</span></span></button>`).join('')}</div><div class="hero-arrows"><button class="hero-arrow hero-prev" type="button" aria-label="Previous slide" title="Previous slide">${decagon('←')}</button><button class="hero-arrow hero-next" type="button" aria-label="Next slide" title="Next slide">${decagon('→')}</button></div></div>`;
  heroGrid.insertAdjacentHTML('afterend', heroNav);
  heroCopy.setAttribute('aria-live', 'polite');

  const photo = hero.querySelector('.hero-photo');
  photo.querySelector('img').classList.add('hero-layer', 'is-active');
  photo.insertAdjacentHTML('beforeend', `<div class="hero-counter" aria-hidden="true"><b>01</b><span>/ 0${slides.length}</span></div>`);
  const counter = photo.querySelector('.hero-counter b');
  const dots = [...hero.querySelectorAll('.hero-dot')];
  let activeSlide = 0;
  let animating = false;

  const swapImage = (slide, direction) => {
    const next = document.createElement('img');
    next.className = `hero-layer is-entering ${direction < 0 ? 'from-left' : 'from-right'}`;
    next.src = slide.image;
    next.alt = slide.imageAlt;
    photo.insertBefore(next, photo.querySelector('.hero-counter'));
    const old = [...photo.querySelectorAll('.hero-layer.is-active')];
    old.forEach((img) => { img.classList.add('is-leaving'); img.alt = ''; });
    void next.offsetWidth; // commit start state, then animate
    next.classList.add('is-active');
    setTimeout(() => { old.forEach((img) => img.remove()); next.classList.remove('is-entering', 'from-left', 'from-right'); }, reduceMotion ? 0 : 1000);
  };

  const fillCopy = (slide) => {
    heroCopy.querySelector('.eyebrow').textContent = slide.label;
    heroCopy.querySelector('h1').textContent = slide.heading;
    heroCopy.querySelector('.lede').textContent = slide.description;
    const primaryLink = heroCopy.querySelector('.buttons a:first-child');
    primaryLink.textContent = `${slide.primary} ↗`;
    primaryLink.href = slide.primaryHref;
  };

  const showSlide = (index, direction = 1, initial = false) => {
    const target = (index + slides.length) % slides.length;
    if (!initial && (target === activeSlide || animating)) return;
    activeSlide = target;
    const slide = slides[activeSlide];
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-current', String(dotIndex === activeSlide));
      dot.classList.toggle('is-done', dotIndex < activeSlide);
      const bar = dot.querySelector('.hero-dot-bar i');
      bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    });
    counter.textContent = `0${activeSlide + 1}`;
    if (initial || reduceMotion) { fillCopy(slide); if (!initial) swapImage(slide, direction); return; }
    animating = true;
    const parts = [...heroCopy.children];
    parts.forEach((el) => el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-14px)' }], { duration: 300, easing: 'ease-in', fill: 'forwards' }));
    swapImage(slide, direction);
    setTimeout(() => {
      fillCopy(slide);
      parts.forEach((el, i) => {
        el.getAnimations().forEach((a) => a.cancel());
        el.animate([{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }], { duration: 650, delay: i * 60, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'backwards' });
      });
      animating = false;
    }, 360);
  };

  // autoplay: the active tab's progress bar is a CSS animation; when it ends, go next
  if (!reduceMotion) {
    hero.classList.add('is-autoplay');
    dots.forEach((dot) => dot.querySelector('.hero-dot-bar i').addEventListener('animationend', () => {
      if (dot.getAttribute('aria-current') === 'true') showSlide(activeSlide + 1, 1);
    }));
  }
  const pause = (on) => hero.classList.toggle('is-paused', on);
  photo.addEventListener('mouseenter', () => pause(true));
  photo.addEventListener('mouseleave', () => pause(false));
  hero.addEventListener('focusin', () => pause(true));
  hero.addEventListener('focusout', () => pause(false));
  document.addEventListener('visibilitychange', () => pause(document.hidden));

  hero.querySelector('.hero-prev').addEventListener('click', () => showSlide(activeSlide - 1, -1));
  hero.querySelector('.hero-next').addEventListener('click', () => showSlide(activeSlide + 1, 1));
  dots.forEach((dot) => dot.addEventListener('click', () => { const i = Number(dot.dataset.slide); showSlide(i, i < activeSlide ? -1 : 1); }));
  hero.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showSlide(activeSlide - 1, -1);
    if (event.key === 'ArrowRight') showSlide(activeSlide + 1, 1);
  });
  // swipe on touch devices
  let touchX = null;
  photo.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  photo.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) showSlide(activeSlide + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    touchX = null;
  });
  showSlide(0, 1, true);
}
if (page === 'working-with-us.html') {
  setId(pageHero, 'what-we-do');
  const collaborationTypes = document.querySelectorAll('.split-card');
  setId(collaborationTypes[0], 'long-term-software-development');
  setId(collaborationTypes[1], 'new-products-systems-subsystems');
  const waysHeading = [...document.querySelectorAll('h2')].find((heading) => heading.textContent.includes('Start with what'));
  setId(waysHeading?.closest('section'), 'how-we-work');
}
if (page === 'expertise.html') {
  setId(pageHero, 'expertise');
  const ids = ['expertise-software', 'expertise-embedded', 'expertise-robotics', 'expertise-mechanical'];
  document.querySelectorAll('article.tile').forEach((tile, index) => setId(tile, ids[index]));
}
const expertiseCards = page === 'expertise.html'
  ? [...document.querySelectorAll('article.tile')]
  : page === 'index.html'
    ? [...document.querySelectorAll('.grid-4 > .tile')]
    : [];
if (expertiseCards.length) {
  let cardGrid = expertiseCards[0].parentElement;
  if (page === 'expertise.html') {
    cardGrid = document.createElement('div');
    cardGrid.className = 'expertise-windows';
    expertiseCards[0].before(cardGrid);
    expertiseCards.forEach((card) => cardGrid.append(card));
  } else {
    cardGrid.classList.add('expertise-windows');
  }
  expertiseCards.forEach((card) => {
    const title = card.querySelector('h3, h2')?.textContent.toLowerCase() || '';
    const type = title.includes('software') ? 'software'
      : title.includes('embedded') ? 'embedded'
        : title.includes('robotics') ? 'robotics'
          : 'mechatronics';
    card.classList.add('expertise-window', `expertise-window-${type}`);
    const chrome = document.createElement('div');
    chrome.className = 'window-chrome';
    chrome.setAttribute('aria-hidden', 'true');
    chrome.innerHTML = '<span class="window-circle"></span><span class="window-close">×</span>';
    card.prepend(chrome);
    const symbol = card.querySelector('.icon');
    symbol?.classList.add('window-symbol');
    if (type === 'embedded' && symbol) {
      symbol.textContent = '';
      symbol.innerHTML = '<span class="code-chevron code-chevron-left"></span><span class="code-chevron code-chevron-right"></span>';
    }
  });
}
if (page === 'industries.html') {
  setId(pageHero, 'industries');
  const ids = ['industry-data-centers', 'industry-logistics', 'industry-manufacturing', 'industry-energy'];
  document.querySelectorAll('.list-item').forEach((item, index) => setId(item, ids[index]));
}
if (page === 'success-stories.html') setId(document.querySelector('.story-grid'), 'success-stories');
if (page === 'insights.html') setId(pageHero, 'insights');
if (page === 'about.html') setId(pageHero, 'about-us');
if (page === 'contact.html') setId(pageHero, 'contact');

if (page === 'success-stories.html') {
  const storyGrid = document.querySelector('.story-grid');
  const image = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80';
  storySummaries.forEach(([title, id]) => {
    storyGrid.insertAdjacentHTML('beforeend', `<article class="story"><div class="story-photo"><img src="${image}" alt="Engineering project preview"></div><div class="story-copy"><p class="eyebrow">Project reference</p><h3>${title}</h3><p>Project summary to be confirmed from approved case-study content.</p><a class="text-link" href="success-stories.html#${id}">Read the story <span>↗</span></a></div></article>`);
  });
  const detailCards = Object.entries(storyTargets).map(([title, id]) => `<article class="rule-card" id="${id}"><p class="eyebrow">Success story</p><h3>${title}</h3><p>Full project details are not included in the available prototype.</p><a class="text-link" href="contact.html">Discuss a similar challenge <span>↗</span></a></article>`).join('');
  storyGrid.insertAdjacentHTML('afterend', `<section class="content" id="landing-work"><div class="wrap"><div class="heading"><div><p class="eyebrow">Project details</p><h2>More engineering work</h2></div></div><div class="grid-3">${detailCards}</div></div></section>`);
}

if (page === 'insights.html') {
  const insightGrid = document.querySelector('.grid-3');
  articleSummaries.forEach(([title, id]) => {
    insightGrid.insertAdjacentHTML('beforeend', `<article class="rule-card"><p class="eyebrow">Engineering insight</p><h3>${title}</h3><p>Article summary to be confirmed from approved editorial content.</p><a class="text-link" href="insights.html#${id}">Read the article <span>↗</span></a></article>`);
  });
  const articleDetails = Object.entries(articleTargets).map(([title, id]) => `<article class="rule-card" id="${id}"><p class="eyebrow">Insight</p><h3>${title}</h3><p>Full article content is not included in the available prototype.</p></article>`).join('');
  insightGrid.insertAdjacentHTML('afterend', `<section class="content"><div class="wrap"><div class="heading"><div><p class="eyebrow">Article details</p><h2>From the engineering work</h2></div></div><div class="grid-3">${articleDetails}</div></div></section>`);
}

if (page === 'about.html') {
  document.querySelector('main').insertAdjacentHTML('beforeend', '<section class="content" id="legal-information"><div class="wrap"><div class="heading"><div><p class="eyebrow">Legal information</p><h2>Policies</h2></div></div><div class="grid-3"><article class="rule-card" id="privacy-policy"><h3>Privacy policy</h3><p>Policy text must be supplied and approved by Sigmoid.</p></article><article class="rule-card" id="terms"><h3>Terms of use</h3><p>Terms text must be supplied and approved by Sigmoid.</p></article><article class="rule-card" id="cookies"><h3>Cookies</h3><p>Cookie information must be supplied and approved by Sigmoid.</p></article></div></div></section>');
}

document.querySelectorAll('.story').forEach((story) => {
  const title = story.querySelector('h3')?.textContent.trim();
  const id = storyTargets[title];
  if (!id) return;
  story.querySelectorAll('a').forEach((link) => {
    link.href = `success-stories.html#${id}`;
  });
  if (story.matches('a.story')) story.href = `success-stories.html#${id}`;
});

if (page === 'insights.html') {
  document.querySelectorAll('.grid-3 > .rule-card').forEach((card) => {
    const title = card.querySelector('h3')?.textContent.trim();
    const id = articleTargets[title] || articleAliases[title];
    if (!id) return;
    card.querySelectorAll('a').forEach((link) => {
      link.href = `insights.html#${id}`;
    });
  });
}

document.querySelectorAll('a').forEach((link) => {
  const label = link.textContent.trim().replace(/\s+/g, ' ').toLowerCase();
  if (label === 'privacy policy') link.href = 'about.html#privacy-policy';
  if (label === 'terms of use' || label === 'terms') link.href = 'about.html#terms';
  if (label === 'cookies') link.href = 'about.html#cookies';
  if (label === 'home' || link.classList.contains('logo')) link.href = 'index.html';
  if (label === 'how we start' || label === 'how we work') link.href = 'working-with-us.html#how-we-work';
  if (label === 'ways to work together') link.href = 'working-with-us.html#what-we-do';
  if (label === 'explore relevant work' || label === 'explore our work across sectors') link.href = 'success-stories.html#landing-work';
});

const footerLegalLinks = document.querySelector('.footer-bottom div');
if (footerLegalLinks && ![...footerLegalLinks.querySelectorAll('a')].some((link) => link.textContent.trim().toLowerCase() === 'cookies')) {
  footerLegalLinks.insertAdjacentHTML('beforeend', '<a href="about.html#cookies">Cookies</a>');
}

const transitionCurtain = document.createElement('div');
transitionCurtain.className = 'page-transition';
transitionCurtain.setAttribute('aria-hidden', 'true');
document.body.append(transitionCurtain);

const transitionStorageKey = 'sigmoid-page-transition';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
try {
  if (sessionStorage.getItem(transitionStorageKey) === '1' && !reducedMotion) {
    sessionStorage.removeItem(transitionStorageKey);
    transitionCurtain.classList.add('is-entering');
    document.documentElement.classList.remove('pt-enter');
    transitionCurtain.addEventListener('animationend', () => transitionCurtain.classList.remove('is-entering'), { once: true });
    window.setTimeout(() => transitionCurtain.classList.remove('is-entering'), 900);
  } else {
    sessionStorage.removeItem(transitionStorageKey);
    document.documentElement.classList.remove('pt-enter');
  }
} catch {
  document.documentElement.classList.remove('pt-enter');
  // Storage may be unavailable for local file URLs.
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download') || reducedMotion) return;

  let destination;
  try {
    destination = new URL(link.href, window.location.href);
  } catch {
    return;
  }
  if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;

  event.preventDefault();
  try {
    sessionStorage.setItem(transitionStorageKey, '1');
  } catch {
    // Continue with the navigation even if session storage is unavailable.
  }
  transitionCurtain.classList.remove('is-entering');
  transitionCurtain.classList.add('is-leaving');
  window.setTimeout(() => window.location.assign(destination.href), 420);
});

const sectionsToReveal = document.querySelectorAll('main > section:not(.hero)');
sectionsToReveal.forEach((section) => section.classList.add('section-reveal'));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('is-in-view');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
sectionsToReveal.forEach((section) => observer.observe(section));

// count-up for serif counters
const counters = document.querySelectorAll('.counter .count[data-count]');
if (counters.length && !reducedMotion) {
  const countObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
    setTimeout(() => { el.textContent = String(target); }, 1600);
    countObserver.unobserve(el);
  }), { threshold: 0.6 });
  counters.forEach((el) => countObserver.observe(el));
}
