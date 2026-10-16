/**
 * FILM LAB PORTFOLIO — HOME SHOWCASE ENGINE ("THE REEL")
 * Section 9 of master specification:
 * 9.1 Hero (split-letter entrance, cursor-proximity variable weight, role line, flashlight sentence)
 * 9.2 Marquee strip (scroll-velocity acceleration & skew)
 * 9.3 Stats (scroll-scrubbed counters up and down)
 * 9.4 "Now showing" filmstrip (sprocket rails, 3D tilt, ghost frame numbers, cursor spotlight)
 */

import { siteData } from './data.js';
import { getActivePage, navigateTo } from './router.js';

let heroSection = null;
let heroNameEl = null;
let letterElements = [];
let flashlightContainer = null;
let marqueeInner = null;
let statItems = [];
let filmstripCards = [];

// Marquee physics state
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
  initStats();
  initFilmstrip();

  // Scroll monitoring for velocity and stats scrubbing
  lastScrollY = window.scrollY || window.pageYOffset || 0;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('filmlab:pagechange', (e) => {
    if (e.detail && e.detail.page === 'home') {
      setTimeout(() => {
        updateStats();
      }, 50);
    }
  });

  // Run initial stats check
  updateStats();
}

/**
 * 9.1 HERO ENTRANCE & PROXIMITY TYPOGRAPHY
 */
function initHero() {
  if (!heroNameEl || !siteData.site.name) return;

  // Split name into letters with staggered transition delay
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

  // Pointer proximity font weight:
  // on pointer move, compute distance d to letter center; set font-variation-settings: "wght" round(100 + 800*max(0, 1 - d/260)), 'opsz' 144
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

/**
 * 9.1 FLASHLIGHT SENTENCE
 */
function initFlashlight() {
  if (!flashlightContainer) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) {
    // Show whole sentence on reduced motion or touch
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

/**
 * 9.2 MARQUEE STRIP
 */
function initMarquee() {
  if (!marqueeInner || !siteData.marquee) return;

  // 6 words, each followed by an amber ✦, repeated 4 times
  const phrase = siteData.marquee
    .map((w) => `${w} <span class="star" aria-hidden="true">✦</span> `)
    .join('');
  marqueeInner.innerHTML = phrase.repeat(4);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function loop() {
    // Animate only if active page is home
    if (getActivePage() === 'home') {
      const quarterWidth = marqueeInner.scrollWidth / 4;

      marqueeOffset -= 1 + Math.abs(scrollVelocity) * 0.4;
      if (quarterWidth > 0 && marqueeOffset <= -quarterWidth) {
        marqueeOffset += quarterWidth;
      }

      const skew = Math.max(-12, Math.min(12, -scrollVelocity * 0.6));
      marqueeInner.style.transform = `translateX(${marqueeOffset}px) skewX(${skew}deg)`;

      // Decay velocity
      scrollVelocity *= 0.85;
      if (Math.abs(scrollVelocity) < 0.01) {
        scrollVelocity = 0;
      }
    }

    marqueeAnimId = requestAnimationFrame(loop);
  }

  marqueeAnimId = requestAnimationFrame(loop);
}

/**
 * 9.3 STATS COUNTERS (SCROLL-SCRUBBED)
 */
function initStats() {
  const container = document.getElementById('stats-grid');
  if (!container || !siteData.stats) return;

  container.innerHTML = siteData.stats
    .map(
      (s, idx) => `
    <div class="stat-item" data-idx="${idx}" data-target="${s.value}" data-suffix="${s.suffix || ''}">
      <div class="stat-num" id="stat-num-${idx}">0${s.suffix || ''}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `
    )
    .join('');

  statItems = Array.from(container.querySelectorAll('.stat-item'));
}

function updateStats() {
  if (getActivePage() !== 'home') return;
  if (!statItems.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  statItems.forEach((item) => {
    const target = parseFloat(item.getAttribute('data-target')) || 0;
    const suffix = item.getAttribute('data-suffix') || '';
    const numEl = item.querySelector('.stat-num');
    if (!numEl) return;

    if (prefersReducedMotion) {
      numEl.textContent = `${target}${suffix}`;
      return;
    }

    // p = clamp((innerHeight*.95 - rect.top)/(innerHeight*.7), 0, 1)
    const rect = item.getBoundingClientRect();
    const p = Math.min(
      Math.max((window.innerHeight * 0.95 - rect.top) / (window.innerHeight * 0.7), 0),
      1
    );

    const currentVal = Math.round(target * p);
    numEl.textContent = `${currentVal}${suffix}`;
  });
}

/**
 * 9.4 "NOW SHOWING" FILMSTRIP
 */
function initFilmstrip() {
  const container = document.getElementById('filmstrip-wrap');
  if (!container || !siteData.projects) return;

  // First 3 projects
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
    // 3D tilt & cursor spotlight
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

          // transform: perspective(700px) rotateY(((x-left)/w-.5)*14deg) rotateX(-((y-top)/h-.5)*14deg)
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

    // Keyboard navigation (Enter / Space)
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

  // Update marquee velocity
  scrollVelocity += delta;
  scrollVelocity = Math.max(-50, Math.min(50, scrollVelocity));

  // Update stats counters
  updateStats();
}

function onResize() {
  updateStats();
}
