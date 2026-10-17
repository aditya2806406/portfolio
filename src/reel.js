/**
 * FILM LAB PORTFOLIO — 3D DRUM REEL & PROJECT ACCORDION
 * Section 10 of master specification:
 * 10.1 Drag-to-spin 3D reel (cylindrical presentation, pointer drag, inertia, snapping, depth fade, keyboard arrow controls)
 * 10.2 Project list accordion (amber highlight, one-open-at-a-time, animated grid rows, floating poster preview)
 */

import { siteData } from './data.js';
import { getActivePage } from './router.js';

let reelContainer = null;
let reelDrum = null;
let reelCaption = null;
let floatingPreview = null;
let floatingPreviewTitle = null;

let paneElements = [];
let accordionRows = [];

// Reel geometry & physics
const N = (siteData.projects && siteData.projects.length) || 4;
const STEP = 360 / N; // 90 deg for N=4
let A = 0; // Current drum rotation in degrees
let V = 0; // Velocity
let snapT = null; // Target snap angle
let isDragging = false;
let startX = 0;
let lastX = 0;
let totalMove = 0;
let animId = null;

// Floating preview tracking
let mouseX = -1000;
let mouseY = -1000;
let previewX = -1000;
let previewY = -1000;
let previewVx = 0;
let isHoveringRow = false;
let activeRowIdx = -1;

export function initReel() {
  reelContainer = document.getElementById('reel-container');
  reelDrum = document.getElementById('reel-drum');
  reelCaption = document.getElementById('reel-caption');
  floatingPreview = document.getElementById('floating-preview');
  floatingPreviewTitle = document.getElementById('floating-preview-title');

  buildDrumPanes();
  buildAccordion();
  initReelInteractions();
  initFloatingPreview();
  startReelLoop();

  // Listen to page changes to awaken/sleep loop and sync state
  window.addEventListener('filmlab:pagechange', (e) => {
    if (e.detail && e.detail.page === 'work') {
      updatePanes();
      updateCaption();
    } else {
      hideFloatingPreview();
    }
  });
}

/**
 * 10.1 BUILD DRUM PANES
 */
function buildDrumPanes() {
  if (!reelDrum || !siteData.projects) return;

  reelDrum.innerHTML = siteData.projects
    .map((p, i) => {
      const frameStr = String(i + 1).padStart(2, '0');
      // Pane i transform: rotateY(i*STEP deg) translateZ(calc(var(--w)*.82))
      return `
      <div class="reel-pane" 
           id="reel-pane-${i}"
           data-idx="${i}"
           style="background: ${p.gradient}; transform: rotateY(${i * STEP}deg) translateZ(calc(var(--w) * 0.82));"
           role="button"
           tabindex="0"
           aria-label="View ${p.name}">
        <div class="ghost-frame" aria-hidden="true">${frameStr}</div>
        <div class="card-content">
          <h3>${p.name}</h3>
          <p>${p.tagline}</p>
        </div>
      </div>
    `;
    })
    .join('');

  paneElements = Array.from(reelDrum.querySelectorAll('.reel-pane'));
}

/**
 * 10.1 REEL PHYSICS & EVENT HANDLERS
 */
function initReelInteractions() {
  if (!reelContainer) return;

  // Pointer Down
  reelContainer.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return; // Left click only
    isDragging = true;
    startX = e.clientX;
    lastX = e.clientX;
    totalMove = 0;
    V = 0;
    snapT = null;

    try {
      reelContainer.setPointerCapture(e.pointerId);
    } catch (_) {}
  });

  // Pointer Move
  reelContainer.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    totalMove += Math.abs(dx);
    lastX = e.clientX;

    // While dragging: A += dx * 0.35, velocity V = dx * 0.35
    A += dx * 0.35;
    V = dx * 0.35;
  });

  // Pointer Up & Cancel
  function onPointerEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    try {
      reelContainer.releasePointerCapture(e.pointerId);
    } catch (_) {}
  }

  reelContainer.addEventListener('pointerup', onPointerEnd);
  reelContainer.addEventListener('pointercancel', onPointerEnd);

  // Click on Panes: if total movement < 6px
  paneElements.forEach((pane) => {
    pane.addEventListener('click', (e) => {
      if (totalMove >= 6) return; // Considered a drag, ignore click
      e.stopPropagation();

      const idx = parseInt(pane.getAttribute('data-idx'), 10);
      const activeIdx = getActiveIndex();

      if (idx === activeIdx) {
        // Front pane: open matching accordion row and scroll to it
        openProjectAccordion(idx, true);
      } else {
        // Rotate it to front: snapT = -i*STEP + 360*round((A + i*STEP)/360)
        snapT = -idx * STEP + 360 * Math.round((A + idx * STEP) / 360);
      }
    });
  });

  // Keyboard Arrow Controls
  reelContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      snapT = Math.round(A / STEP) * STEP - STEP;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      snapT = Math.round(A / STEP) * STEP + STEP;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const activeIdx = getActiveIndex();
      openProjectAccordion(activeIdx, true);
    }
  });
}

function getActiveIndex() {
  // n = ((-round(A/STEP)) % N + N) % N
  return ((-Math.round(A / STEP) % N) + N) % N;
}

function updateCaption() {
  if (!reelCaption || !siteData.projects) return;
  const n = getActiveIndex();
  const proj = siteData.projects[n];
  if (!proj) return;
  reelCaption.textContent = `DRAG TO SPIN — ${n + 1} / ${N}  ${proj.name}. CLICK THE FRONT FRAME TO OPEN IT`;
}

function updatePanes() {
  if (!paneElements.length) return;

  // Depth fade: for each pane rel = ((i*STEP + A) % 360 + 540) % 360 - 180; opacity = .2 + .8*max(0, cos(rel in radians))
  paneElements.forEach((pane, i) => {
    const rel = (((i * STEP + A) % 360) + 540) % 360 - 180;
    const rad = rel * (Math.PI / 180);
    const opacity = 0.2 + 0.8 * Math.max(0, Math.cos(rad));
    pane.style.opacity = opacity.toFixed(3);
    // Only allow clicking front-facing panes
    pane.style.pointerEvents = opacity > 0.65 ? 'auto' : 'none';
  });
}

function startReelLoop() {
  if (animId) cancelAnimationFrame(animId);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function loop() {
    if (getActivePage() === 'work') {
      // Physics calculation
      if (!isDragging) {
        if (prefersReducedMotion) {
          if (snapT !== null) {
            A = snapT;
            snapT = null;
          }
          V = 0;
        } else {
          // After release: A += V; V *= .93
          A += V;
          V *= 0.93;

          // When |V| < .2, snap: target = snapT ?? round(A/STEP)*STEP; A += (target - A)*.12; clear snapT when |target-A| < .05
          if (Math.abs(V) < 0.2) {
            const target = snapT !== null && snapT !== undefined ? snapT : Math.round(A / STEP) * STEP;
            A += (target - A) * 0.12;
            if (Math.abs(target - A) < 0.05) {
              A = target;
              snapT = null;
            }
          }
        }
      }

      // Drum transform each frame: translateZ(calc(var(--w)*-.82)) rotateY(A deg)
      if (reelDrum) {
        reelDrum.style.transform = `translateZ(calc(var(--w) * -0.82)) rotateY(${A}deg)`;
      }

      updatePanes();
      updateCaption();

      // Update floating preview position if visible
      if (isHoveringRow && floatingPreview) {
        if (prefersReducedMotion) {
          floatingPreview.style.transform = `translate(${mouseX + 30}px, ${mouseY - 150}px) scale(1)`;
        } else {
          previewX += (mouseX - previewX) * 0.12;
          previewY += (mouseY - previewY) * 0.12;
          previewVx = (mouseX - previewX) * 0.05;
          const rot = Math.max(-12, Math.min(12, previewVx));

          // Clamp previewX and previewY to keep preview inside viewport
          const clampedX = Math.min(Math.max(previewX + 30, 10), window.innerWidth - 260);
          const clampedY = Math.min(Math.max(previewY - 150, 10), window.innerHeight - 320);

          floatingPreview.style.transform = `translate(${clampedX}px, ${clampedY}px) rotate(${rot}deg) scale(1)`;
        }
      }
    }

    animId = requestAnimationFrame(loop);
  }

  animId = requestAnimationFrame(loop);
}

/**
 * 10.2 PROJECT LIST ACCORDION
 */
function buildAccordion() {
  const container = document.getElementById('project-accordion');
  if (!container || !siteData.projects) return;

  container.className = 'project-accordion projects-cards-grid';
  container.innerHTML = siteData.projects
    .map(
      (p, idx) => `
    <article class="project-card" id="project-card-${idx}" data-idx="${idx}" data-c="Read">
      <div class="project-card-ghost" aria-hidden="true">${String(idx + 1).padStart(2, '0')}</div>
      <div class="project-card-meta">
        <span class="project-card-kicker">SCENE 0${idx + 1}</span>
        <span class="project-card-year">${p.year}</span>
      </div>
      <h3 class="project-card-title">${p.name}</h3>
      <p class="project-card-tagline">${p.tagline}</p>
      <p class="project-card-desc">${p.description}</p>
      <div class="project-card-stack">
        <span class="project-stack-label">TECHNOLOGIES & ARCHITECTURE</span>
        <div class="project-tags">
          ${p.tags.map((t) => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-actions">
        ${
          p.demoUrl && p.demoUrl !== '#'
            ? `<a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-pill btn-primary-accent" data-c="Visit">Live demo ↗</a>`
            : ''
        }
        ${
          p.codeUrl
            ? `<a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn-pill" data-c="Code">Source code ↗</a>`
            : ''
        }
      </div>
    </article>
  `
    )
    .join('');

  accordionRows = Array.from(container.querySelectorAll('.project-card'));

  accordionRows.forEach((card) => {
    const idx = parseInt(card.getAttribute('data-idx'), 10);

    // Floating preview triggers on card hover/focus
    card.addEventListener('pointerenter', () => {
      showFloatingPreview(idx);
    });

    card.addEventListener('pointerleave', () => {
      if (activeRowIdx === idx) {
        hideFloatingPreview();
      }
    });

    card.addEventListener('focusin', () => {
      showFloatingPreview(idx);
    });

    card.addEventListener('focusout', () => {
      hideFloatingPreview();
    });
  });

  // Track global pointer for floating preview positioning
  window.addEventListener(
    'pointermove',
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isHoveringRow) {
        previewX = mouseX;
        previewY = mouseY;
      }
    },
    { passive: true }
  );

  container.addEventListener('pointerleave', () => {
    hideFloatingPreview();
  });
}

export function openProjectAccordion(idx, shouldScroll = false) {
  const card = document.getElementById(`project-card-${idx}`);
  if (!card) return;

  if (shouldScroll) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('highlight-card');
    setTimeout(() => {
      card.classList.remove('highlight-card');
    }, 1800);
  }
}

function toggleProjectAccordion(idx) {
  openProjectAccordion(idx, true);
}

/**
 * 10.2 FLOATING POSTER PREVIEW
 */
function initFloatingPreview() {
  if (!floatingPreview) return;
  floatingPreview.style.opacity = '0';
  floatingPreview.style.transform = 'scale(0.6)';
}

function showFloatingPreview(idx) {
  if (!floatingPreview || !siteData.projects) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const proj = siteData.projects[idx];
  if (!proj) return;

  activeRowIdx = idx;
  isHoveringRow = true;

  if (previewX === -1000) {
    previewX = mouseX;
    previewY = mouseY;
  }

  floatingPreview.style.background = proj.gradient;
  if (floatingPreviewTitle) {
    floatingPreviewTitle.textContent = proj.name;
  }

  floatingPreview.classList.add('visible');
}

function hideFloatingPreview() {
  isHoveringRow = false;
  activeRowIdx = -1;
  if (floatingPreview) {
    floatingPreview.classList.remove('visible');
  }
}
