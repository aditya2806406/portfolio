/**
 * FILM LAB PORTFOLIO — 3D DRUM REEL & PROJECT ACCORDION
 * Section 10 of master specification:
 * 10.1 Drag-to-spin 3D reel (cylindrical presentation, pointer drag, inertia, snapping, depth fade, keyboard arrow controls)
 * 10.2 Project list accordion (amber highlight, one-open-at-a-time, animated grid rows, floating poster preview)
 */

import { siteData, PROJECT_CATEGORIES } from './data.js';
import { getActivePage, parseRoute } from './router.js';

let reelContainer = null;
let reelDrum = null;
let reelCaption = null;
let floatingPreview = null;
let floatingPreviewTitle = null;

let paneElements = [];
let accordionRows = [];

// Project category filter state
let activeProjectCategory = 'all';
let currentCaseStudySlug = null;

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

  renderProjectFilters();
  buildDrumPanes();
  buildAccordion();
  initReelInteractions();
  initFloatingPreview();
  startReelLoop();

  // If initial URL is already pointing to a case study, render it immediately
  const initialParsed = parseRoute(window.location.hash);
  if (initialParsed.page === 'work' && initialParsed.slug) {
    renderCaseStudy(initialParsed.slug);
  }

  // Listen to page changes to awaken/sleep loop and sync state
  window.addEventListener('filmlab:pagechange', (e) => {
    if (e.detail && e.detail.page === 'work') {
      if (e.detail.slug) {
        renderCaseStudy(e.detail.slug);
        hideFloatingPreview();
      } else {
        currentCaseStudySlug = null;
        updatePanes();
        updateCaption();
      }
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
    if (activeProjectCategory !== 'all') {
      const matchIdx = siteData.projects.findIndex((p) => p.filterCategory === activeProjectCategory);
      if (matchIdx !== -1) {
        snapT = -matchIdx * STEP + 360 * Math.round((A + matchIdx * STEP) / 360);
      }
    }
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
      if (activeProjectCategory !== 'all') {
        const matchIdx = siteData.projects.findIndex((p) => p.filterCategory === activeProjectCategory);
        if (idx !== matchIdx) return;
        openProjectAccordion(matchIdx, true);
        return;
      }

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
    if (activeProjectCategory !== 'all') {
      const matchIdx = siteData.projects.findIndex((p) => p.filterCategory === activeProjectCategory);
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (matchIdx !== -1) openProjectAccordion(matchIdx, true);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (matchIdx !== -1) {
          snapT = -matchIdx * STEP + 360 * Math.round((A + matchIdx * STEP) / 360);
        }
      }
      return;
    }

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
  if (activeProjectCategory !== 'all') {
    const matchIdx = siteData.projects.findIndex((p) => p.filterCategory === activeProjectCategory);
    const proj = siteData.projects[matchIdx];
    if (proj) {
      reelCaption.textContent = `FILTERED SYSTEM — ${proj.name} · ${proj.category}. CLICK THE FRONT FRAME TO INSPECT`;
      return;
    }
  }
  const n = getActiveIndex();
  const proj = siteData.projects[n];
  if (!proj) return;
  reelCaption.textContent = `DRAG TO SPIN — ${n + 1} / ${N}  ${proj.name}. CLICK THE FRONT FRAME TO OPEN IT`;
}

function updatePanes() {
  if (!paneElements.length) return;

  const matchIdx = activeProjectCategory !== 'all'
    ? siteData.projects.findIndex((p) => p.filterCategory === activeProjectCategory)
    : -1;

  // Depth fade: for each pane rel = ((i*STEP + A) % 360 + 540) % 360 - 180; opacity = .2 + .8*max(0, cos(rel in radians))
  paneElements.forEach((pane, i) => {
    if (activeProjectCategory !== 'all' && i !== matchIdx) {
      pane.style.visibility = 'hidden';
      pane.style.opacity = '0';
      pane.style.pointerEvents = 'none';
      pane.classList.add('reel-pane-hidden');
      return;
    }

    pane.style.visibility = 'visible';
    pane.classList.remove('reel-pane-hidden');
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
    const isWork = getActivePage() === 'work';
    const isOverviewVisible = document.getElementById('work-overview')?.style.display !== 'none';

    if (isWork && isOverviewVisible) {
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
    <article class="project-card" id="project-card-${idx}" data-idx="${idx}" data-cat="${p.filterCategory}" data-c="Read">
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
        <a href="#work/${p.id}" class="btn-pill btn-case-study" data-go="work/${p.id}" data-c="Inspect">
          INSPECT ARCHITECTURE & CASE STUDY ↗
        </a>
        ${
          p.demoUrl && p.demoUrl !== '#'
            ? `<a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-pill" data-c="Visit">Live demo ↗</a>`
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

/**
 * 10.3 PROJECT CATEGORY FILTERS (FEATURE B)
 */
export function renderProjectFilters() {
  const nav = document.getElementById('project-filters-nav');
  if (!nav || !PROJECT_CATEGORIES) return;

  nav.innerHTML = PROJECT_CATEGORIES.map((cat) => {
    const isSelected = cat.id === activeProjectCategory;
    return `
      <button type="button" 
              class="project-filter-btn ${isSelected ? 'active' : ''}" 
              data-cat="${cat.id}" 
              aria-pressed="${isSelected ? 'true' : 'false'}"
              data-c="Filter">
        ${cat.label}
      </button>
    `;
  }).join('');

  nav.querySelectorAll('.project-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-cat');
      if (catId === activeProjectCategory) return;
      setProjectCategory(catId);
    });
  });
}

export function setProjectCategory(catId) {
  activeProjectCategory = catId;

  // 1. Update filter button styles and aria-pressed
  const nav = document.getElementById('project-filters-nav');
  if (nav) {
    nav.querySelectorAll('.project-filter-btn').forEach((b) => {
      const active = b.getAttribute('data-cat') === activeProjectCategory;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  // 2. Hide floating preview to prevent stale hover card
  hideFloatingPreview();

  // 3. Filter project cards in accordion
  accordionRows.forEach((card) => {
    const idx = parseInt(card.getAttribute('data-idx'), 10);
    const proj = siteData.projects[idx];
    if (!proj) return;

    const matches = activeProjectCategory === 'all' || proj.filterCategory === activeProjectCategory;
    if (matches) {
      card.style.display = 'flex';
      card.classList.remove('project-card-hidden');
      card.classList.add('project-card-enter');
    } else {
      card.style.display = 'none';
      card.classList.add('project-card-hidden');
      card.classList.remove('project-card-enter');
    }
  });

  // 4. Update drum reel panes & rotate if single project matches
  if (activeProjectCategory === 'all') {
    paneElements.forEach((pane) => {
      pane.style.visibility = 'visible';
      pane.classList.remove('reel-pane-hidden');
    });
    updatePanes();
    updateCaption();
  } else {
    // Find matching project index
    const matchIdx = siteData.projects.findIndex((p) => p.filterCategory === activeProjectCategory);
    paneElements.forEach((pane, i) => {
      if (i === matchIdx) {
        pane.style.visibility = 'visible';
        pane.classList.remove('reel-pane-hidden');
      } else {
        pane.style.visibility = 'hidden';
        pane.classList.add('reel-pane-hidden');
        pane.style.pointerEvents = 'none';
        pane.style.opacity = '0';
      }
    });

    if (matchIdx !== -1) {
      // Rotate drum to face the matching pane
      snapT = -matchIdx * STEP + 360 * Math.round((A + matchIdx * STEP) / 360);
      const proj = siteData.projects[matchIdx];
      if (reelCaption && proj) {
        reelCaption.textContent = `FILTERED SYSTEM — ${proj.name} · ${proj.category}. CLICK THE FRONT FRAME TO INSPECT`;
      }
    }
  }
}

/**
 * 10.4 DEDICATED CINEMATIC CASE STUDY RENDERING (FEATURE D)
 */
export function renderCaseStudy(slug) {
  const container = document.getElementById('case-study-container');
  if (!container || !siteData.projects) return;

  const project = siteData.projects.find((p) => p.id === slug || p.caseStudy?.slug === slug) || siteData.projects[0];
  const cs = project.caseStudy || project;
  const projIdx = siteData.projects.findIndex((p) => p.id === project.id);
  const prevProj = siteData.projects[(projIdx - 1 + siteData.projects.length) % siteData.projects.length];
  const nextProj = siteData.projects[(projIdx + 1) % siteData.projects.length];

  currentCaseStudySlug = cs.slug || project.id;

  const diagramHtml = generateArchitectureDiagram(project.id);

  container.innerHTML = `
    <article class="case-study-wrap" aria-labelledby="cs-title">
      <!-- HEADER & TOP NAVIGATION -->
      <div class="case-study-nav-bar">
        <button type="button" class="btn-pill btn-back-scenes" data-go="work" data-c="Back">
          <span aria-hidden="true">←</span> BACK TO SELECTED SCENES
        </button>
        <span class="kicker">SCENE 0${projIdx + 1} · ARCHITECTURAL DOSSIER</span>
      </div>

      <header class="case-study-hero">
        <div class="case-study-meta-top">
          <span class="project-card-kicker">SCENE 0${projIdx + 1}</span>
          <span class="case-study-year">${cs.year || project.year}</span>
        </div>
        <h1 class="case-study-title" id="cs-title">${cs.title}</h1>
        <p class="case-study-tagline">${cs.tagline}</p>

        <div class="case-study-badge-row">
          <span class="tag-pill tag-discipline">${cs.category}</span>
          ${(cs.tags || project.tags).map((t) => `<span class="tag-pill">${t}</span>`).join('')}
        </div>

        <div class="case-study-actions-top">
          ${
            cs.codeUrl
              ? `<a href="${cs.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn-pill" data-c="Code">Source code ↗</a>`
              : ''
          }
          ${
            cs.demoUrl && cs.demoUrl !== '#'
              ? `<a href="${cs.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-pill btn-primary-accent" data-c="Visit">Live demo ↗</a>`
              : ''
          }
        </div>
      </header>

      <!-- SECTION B: PROJECT OVERVIEW -->
      <section class="cs-section" aria-labelledby="sec-overview">
        <span class="kicker">SYSTEM SYNOPSIS</span>
        <h2 id="sec-overview">Project <em>overview</em></h2>
        <p class="cs-body-text">${cs.overview}</p>
      </section>

      <!-- SECTION C: PROBLEM STATEMENT -->
      <section class="cs-section" aria-labelledby="sec-problem">
        <span class="kicker">OPERATIONAL CONTEXT</span>
        <h2 id="sec-problem">The <em>problem</em></h2>
        <p class="cs-body-text">${cs.problemStatement}</p>
      </section>

      <!-- SECTION D: GOALS & REQUIREMENTS -->
      <section class="cs-section" aria-labelledby="sec-goals">
        <span class="kicker">DESIGN TARGETS</span>
        <h2 id="sec-goals">Goals & <em>requirements</em></h2>
        <div class="goals-grid">
          ${cs.goals
            .map(
              (g, i) => `
            <div class="goal-card">
              <span class="goal-num">0${i + 1}</span>
              <p class="goal-desc">${g}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION E: SYSTEM ARCHITECTURE -->
      <section class="cs-section" aria-labelledby="sec-architecture">
        <span class="kicker">TOPOLOGY & BLUEPRINT</span>
        <h2 id="sec-architecture">System <em>architecture</em></h2>
        <p class="cs-body-text">${cs.architecture.summary}</p>

        <!-- VISUAL DIAGRAM -->
        <div class="architecture-diagram-container" role="figure" aria-label="Component architecture diagram for ${cs.title}">
          ${diagramHtml}
        </div>

        <!-- COMPONENT BREAKDOWN -->
        <div class="arch-components-grid">
          ${cs.architecture.components
            .map(
              (comp) => `
            <div class="arch-component-card">
              <div class="arch-comp-header">
                <span class="arch-comp-role">${comp.role}</span>
                <h3 class="arch-comp-name">${comp.name}</h3>
              </div>
              <p class="arch-comp-details">${comp.details}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION F: TECHNOLOGY STACK -->
      <section class="cs-section" aria-labelledby="sec-techstack">
        <span class="kicker">STACK SPECIFICATION</span>
        <h2 id="sec-techstack">Technology <em>stack</em></h2>
        <div class="tech-stack-grid">
          ${cs.techStack
            .map(
              (ts) => `
            <div class="tech-card">
              <div class="tech-card-header">
                <span class="tech-name">${ts.tech}</span>
                <span class="tech-role">${ts.role}</span>
              </div>
              <p class="tech-rationale">${ts.rationale}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION G: KEY FEATURES -->
      <section class="cs-section" aria-labelledby="sec-features">
        <span class="kicker">IMPLEMENTED CAPABILITIES</span>
        <h2 id="sec-features">Key <em>features</em></h2>
        <div class="features-grid">
          ${cs.keyFeatures
            .map(
              (kf) => `
            <div class="feature-card">
              <div class="feature-card-indicator" aria-hidden="true"></div>
              <h3 class="feature-title">${kf.title}</h3>
              <p class="feature-desc">${kf.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION H: IMPLEMENTATION DETAILS -->
      <section class="cs-section" aria-labelledby="sec-impl">
        <span class="kicker">ENGINEERING DEEP DIVE</span>
        <h2 id="sec-impl">Implementation <em>details</em></h2>
        <div class="implementation-grid">
          ${cs.implementationDetails
            .map(
              (imp) => `
            <div class="impl-card">
              <h3 class="impl-title">${imp.title}</h3>
              <p class="impl-desc">${imp.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION I: DATA FLOW -->
      <section class="cs-section" aria-labelledby="sec-dataflow">
        <span class="kicker">PIPELINE EXECUTION</span>
        <h2 id="sec-dataflow">Data <em>flow</em></h2>
        <div class="dataflow-track">
          ${cs.dataFlow
            .map(
              (df) => `
            <div class="dataflow-step">
              <div class="step-badge">${df.step}</div>
              <div class="step-content">
                <h3 class="step-title">${df.title}</h3>
                <p class="step-desc">${df.desc}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION J: CHALLENGES & DECISIONS -->
      <section class="cs-section" aria-labelledby="sec-challenges">
        <span class="kicker">TRIALS & RESOLUTIONS</span>
        <h2 id="sec-challenges">Challenges & <em>decisions</em></h2>
        <div class="challenges-grid">
          ${cs.challenges
            .map(
              (ch) => `
            <div class="challenge-card">
              <div class="challenge-block">
                <span class="challenge-label">CHALLENGE</span>
                <p class="challenge-text">${ch.challenge}</p>
              </div>
              <div class="decision-block">
                <span class="decision-label">ENGINEERING DECISION</span>
                <p class="decision-text">${ch.decision}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION K: RESULTS & LIMITATIONS -->
      <section class="cs-section" aria-labelledby="sec-results">
        <span class="kicker">VERIFICATION & CONSTRAINTS</span>
        <h2 id="sec-results">Results & <em>limitations</em></h2>
        <div class="results-limitations-grid">
          <div class="results-card">
            <h3 class="rl-title rl-results-title">Verified Achievements</h3>
            <ul class="rl-list">
              ${cs.resultsAndLimitations.results.map((r) => `<li>${r}</li>`).join('')}
            </ul>
          </div>
          <div class="limitations-card">
            <h3 class="rl-title rl-limitations-title">Known Constraints & Scope</h3>
            <ul class="rl-list">
              ${cs.resultsAndLimitations.limitations.map((l) => `<li>${l}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <!-- SECTION L: FUTURE IMPROVEMENTS -->
      <section class="cs-section" aria-labelledby="sec-future">
        <span class="kicker">ROADMAP HORIZON</span>
        <h2 id="sec-future">Future <em>improvements</em></h2>
        <div class="future-grid">
          ${cs.futureImprovements
            .map(
              (f, i) => `
            <div class="future-card">
              <span class="future-num">0${i + 1}</span>
              <p class="future-text">${f}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION M: PROJECT FOOTER NAVIGATION -->
      <footer class="case-study-footer">
        <button type="button" class="btn-pill btn-primary-accent" data-go="work" data-c="Back">
          <span aria-hidden="true">←</span> Return to Selected Scenes
        </button>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button type="button" class="btn-pill" data-go="work/${prevProj.id}" data-c="Previous">
            ← Previous Scene: ${prevProj.name}
          </button>
          ${
            cs.codeUrl
              ? `<a href="${cs.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn-pill" data-c="Code">Inspect on GitHub ↗</a>`
              : ''
          }
          <button type="button" class="btn-pill" data-go="work/${nextProj.id}" data-c="Next">
            Next Scene: ${nextProj.name} →
          </button>
        </div>
      </footer>
    </article>
  `;
}

function generateArchitectureDiagram(projectId) {
  switch (projectId) {
    case 'agriscan':
      return `
        <div class="arch-flow-diagram">
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 01 · INPUT</span>
            <h4 class="arch-node-title">Specimen Capture</h4>
            <p class="arch-node-desc">Raw foliage standardized to 224×224 RGB tensor with channel-wise ImageNet normalization.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 02 · BACKBONE</span>
            <h4 class="arch-node-title">MobileNetV2 CNN</h4>
            <p class="arch-node-desc">Inverted residual bottlenecks extract deep spatial pathology features with sub-20MB footprint.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 03 · EXPLAINABILITY</span>
            <h4 class="arch-node-title">Grad-CAM Engine</h4>
            <p class="arch-node-desc">Backpropagates class saliency gradients onto final activation maps to render thermal Jet overlays.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 04 · RESOLUTION</span>
            <h4 class="arch-node-title">Dual Remediation</h4>
            <p class="arch-node-desc">Relational mapping to organic bio-controls, active chemical interventions, and regional care centers.</p>
          </div>
        </div>
      `;
    case 'agentguard':
      return `
        <div class="arch-flow-diagram">
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 01 · INTERCEPTION</span>
            <h4 class="arch-node-title">Reverse Proxy Gateway</h4>
            <p class="arch-node-desc">Intercepts raw tool-call payloads emitted by autonomous LLM runtimes before API execution.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 02 · EVALUATION</span>
            <h4 class="arch-node-title">Deterministic Engine</h4>
            <p class="arch-node-desc">Redis-cached declarative policy resolution with sub-5ms latency and AST schema verification.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 03 · DEFENSE</span>
            <h4 class="arch-node-title">Boundary Guard</h4>
            <p class="arch-node-desc">Regex filtering neutralizes shell metacharacters (&&, |, ;), traversal (../), and SQL truncation.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 04 · LEDGER & TELEMETRY</span>
            <h4 class="arch-node-title">Cryptographic Audit</h4>
            <p class="arch-node-desc">Immutable SHA-256 block hash chaining and real-time WebSocket anomaly broadcasting with kill-switch.</p>
          </div>
        </div>
      `;
    case 'sarkarisetu':
      return `
        <div class="arch-flow-diagram">
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 01 · INTERACTION</span>
            <h4 class="arch-node-title">Citizen React Client</h4>
            <p class="arch-node-desc">Accessible, multilingual questionnaire wizard with high-contrast UI and touch target calibration.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 02 · GATEWAY</span>
            <h4 class="arch-node-title">Express REST API</h4>
            <p class="arch-node-desc">Handles sanitized demographic payloads, ministerial query routing, and state aggregation pipelines.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 03 · DECISION ENGINE</span>
            <h4 class="arch-node-title">Multi-Factor Evaluator</h4>
            <p class="arch-node-desc">Evaluates age, gender, occupation, income tier, and state jurisdiction against nested criteria trees.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 04 · PERSISTENCE & GUIDANCE</span>
            <h4 class="arch-node-title">Atlas Store & Roadmaps</h4>
            <p class="arch-node-desc">MongoDB document database delivering tailored checklists and direct application pathways.</p>
          </div>
        </div>
      `;
    case 'supply-chain-analytics':
      return `
        <div class="arch-flow-diagram">
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 01 · INGESTION</span>
            <h4 class="arch-node-title">Data Wrangling Pipeline</h4>
            <p class="arch-node-desc">Pandas & NumPy engine handling missing timestamps, corrupt shipping manifests, and coordinate normalization.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 02 · TRANSFORMATION</span>
            <h4 class="arch-node-title">Feature Engineering</h4>
            <p class="arch-node-desc">Calculates scheduled transit margins, categorical origin-destination corridor encodings, and density ratios.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 03 · CLASSIFICATION</span>
            <h4 class="arch-node-title">Scikit-Learn Classifier</h4>
            <p class="arch-node-desc">Supervised decision pipelines predicting late delivery risk with Recall and ROC-AUC metric optimization.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node">
            <span class="arch-node-badge">STAGE 04 · INTELLIGENCE UI</span>
            <h4 class="arch-node-title">Streamlit Operations Hub</h4>
            <p class="arch-node-desc">Interactive reactive dashboard featuring corridor drilldowns, risk correlation matrices, and order simulation.</p>
          </div>
        </div>
      `;
    default:
      return '';
  }
}
