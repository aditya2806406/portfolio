
import { siteData } from './data.js';
import { getActivePage, navigateTo } from './router.js';

let heroSection = null;
let heroNameEl = null;
let letterElements = [];
let flashlightContainer = null;
let marqueeInner = null;
let filmstripCards = [];

let marqueeOffset = 0;
let scrollVelocity = 0;
let lastScrollY = 0;
let marqueeAnimId = null;

export function initHome() {
  heroSection = document.querySelector('.hero-section');
  heroNameEl = document.getElementById('hero-name');
  flashlightContainer = document.getElementById('flashlight-container');
  marqueeInner = document.getElementById('marquee-inner');

  initHero();
  initFlashlight();
  initMarquee();
  initFilmstrip();

  lastScrollY = window.scrollY || window.pageYOffset || 0;
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initHero() {
  if (!heroNameEl || !siteData.site.name) return;

  const letters = siteData.site.name.split('');
  let letterIndex = 0;

  heroNameEl.innerHTML = letters
    .map((char) => {
      if (char === ' ') {
        return '<span class="letter-space" style="display:inline-block; width:0.25em;"> </span>';
      }
      const idx = letterIndex++;
      return (
        `<span class="letter-mask" style="display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:0.08em;">` +
        `<span class="letter-inner" style="transition-delay: ${idx * 55}ms;" data-idx="${idx}">${char}</span>` +
        `</span>`
      );
    })
    .join('');

  letterElements = Array.from(heroNameEl.querySelectorAll('.letter-inner'));

  const roleTextEl = document.getElementById('role-text');
  if (roleTextEl && siteData.site.roleLine) {
    roleTextEl.textContent = siteData.site.roleLine;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener(
      'pointermove',
      (e) => {
        if (getActivePage() !== 'home') return;

        letterElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const d = Math.hypot(e.clientX - cx, e.clientY - cy);
          const wght = Math.round(100 + 800 * Math.max(0, 1 - d / 260));
          el.style.fontVariationSettings = `'wght' ${wght}, 'opsz' 144`;
        });
      },
      { passive: true }
    );

    if (heroSection) {
      heroSection.addEventListener('pointerleave', () => {
        letterElements.forEach((el) => {
          el.style.fontVariationSettings = `'wght' 300, 'opsz' 144`;
        });
      });
    }

    document.addEventListener('pointerleave', () => {
      letterElements.forEach((el) => {
        el.style.fontVariationSettings = `'wght' 300, 'opsz' 144`;
      });
    });
  }
}

function initFlashlight() {
  if (!flashlightContainer) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) {

    flashlightContainer.style.setProperty('--mx', '50%');
    flashlightContainer.style.setProperty('--my', '50%');
    return;
  }

  flashlightContainer.addEventListener(
    'pointermove',
    (e) => {
      const rect = flashlightContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      flashlightContainer.style.setProperty('--mx', `${x}px`);
      flashlightContainer.style.setProperty('--my', `${y}px`);
    },
    { passive: true }
  );

  flashlightContainer.addEventListener('pointerleave', () => {
    flashlightContainer.style.setProperty('--mx', '-300px');
    flashlightContainer.style.setProperty('--my', '-300px');
  });
}

function initMarquee() {
  if (!marqueeInner || !siteData.marquee) return;

  const phrase = siteData.marquee
    .map((w) => `${w} <span class="star" aria-hidden="true">✦</span> `)
    .join('');
  marqueeInner.innerHTML = phrase.repeat(4);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function loop() {

    if (getActivePage() === 'home') {
      const quarterWidth = marqueeInner.scrollWidth / 4;

      marqueeOffset -= 1 + Math.abs(scrollVelocity) * 0.4;
      if (quarterWidth > 0 && marqueeOffset <= -quarterWidth) {
        marqueeOffset += quarterWidth;
      }

      const skew = Math.max(-12, Math.min(12, -scrollVelocity * 0.6));
      marqueeInner.style.transform = `translateX(${marqueeOffset}px) skewX(${skew}deg)`;

      scrollVelocity *= 0.85;
      if (Math.abs(scrollVelocity) < 0.01) {
        scrollVelocity = 0;
      }
    }

    marqueeAnimId = requestAnimationFrame(loop);
  }

  marqueeAnimId = requestAnimationFrame(loop);
}

function initFilmstrip() {
  const container = document.getElementById('filmstrip-wrap');
  if (!container || !siteData.projects) return;

  const topProjects = siteData.projects.slice(0, 3);

  container.innerHTML = topProjects
    .map((p, idx) => {
      const frameStr = String(idx + 1).padStart(2, '0');
      return `
      <div class="filmstrip-card"
           style="background: ${p.gradient};"
           data-go="work"
           data-c="Open"
           role="button"
           tabindex="0"
           aria-label="Open case study for ${p.name}">
        <div class="ghost-frame" aria-hidden="true">${frameStr}</div>
        <div class="card-spotlight" aria-hidden="true"></div>
        <div class="card-content">
          <h3>${p.name}</h3>
          <p>${p.tagline}</p>
        </div>
      </div>
    `;
    })
    .join('');

  filmstripCards = Array.from(container.querySelectorAll('.filmstrip-card'));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  filmstripCards.forEach((card) => {

    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
      card.addEventListener(
        'pointermove',
        (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const w = rect.width;
          const h = rect.height;

          card.style.setProperty('--px', `${x}px`);
          card.style.setProperty('--py', `${y}px`);

          const rotY = (x / w - 0.5) * 14;
          const rotX = -(y / h - 0.5) * 14;
          card.style.transform = `perspective(700px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        },
        { passive: true }
      );

      card.addEventListener('pointerleave', () => {
        card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg)';
        card.style.setProperty('--px', '-500px');
        card.style.setProperty('--py', '-500px');
      });
    }

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rect = card.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        navigateTo('work', true, originX, originY);
      }
    });
  });
}

function onScroll() {
  const currentY = window.scrollY || window.pageYOffset || 0;
  const delta = currentY - lastScrollY;
  lastScrollY = currentY;

  scrollVelocity += delta;
  scrollVelocity = Math.max(-50, Math.min(50, scrollVelocity));
}
