
import { siteData, PROJECT_CATEGORIES } from './data.js';
import { getActivePage, parseRoute } from './router.js';
import { observeNewContent, refreshScrollReveal } from './reveal.js';

let reelContainer = null;
let reelDrum = null;
let reelCaption = null;
let floatingPreview = null;
let floatingPreviewTitle = null;

let paneElements = [];
let accordionRows = [];

let activeProjectCategory = 'all';
let currentCaseStudySlug = null;

const N = (siteData.projects && siteData.projects.length) || 4;
const STEP = 360 / N;
let A = 0;
let V = 0;
let snapT = null;
let isDragging = false;
let startX = 0;
let lastX = 0;
let totalMove = 0;
let animId = null;

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

  const initialParsed = parseRoute(window.location.hash);
  if (initialParsed.page === 'work' && initialParsed.slug) {
    renderCaseStudy(initialParsed.slug);
  }

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

function buildDrumPanes() {
  if (!reelDrum || !siteData.projects) return;

  reelDrum.innerHTML = siteData.projects
    .map((p, i) => {
      const frameStr = String(i + 1).padStart(2, '0');

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

function initReelInteractions() {
  if (!reelContainer) return;

  reelContainer.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
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

  reelContainer.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    totalMove += Math.abs(dx);
    lastX = e.clientX;

    A += dx * 0.35;
    V = dx * 0.35;
  });

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

  paneElements.forEach((pane) => {
    pane.addEventListener('click', (e) => {
      if (totalMove >= 6) return;
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

        openProjectAccordion(idx, true);
      } else {

        snapT = -idx * STEP + 360 * Math.round((A + idx * STEP) / 360);
      }
    });
  });

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

      if (!isDragging) {
        if (prefersReducedMotion) {
          if (snapT !== null) {
            A = snapT;
            snapT = null;
          }
          V = 0;
        } else {

          A += V;
          V *= 0.93;

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

      if (reelDrum) {
        reelDrum.style.transform = `translateZ(calc(var(--w) * -0.82)) rotateY(${A}deg)`;
      }

      updatePanes();
      updateCaption();

      if (isHoveringRow && floatingPreview) {
        if (prefersReducedMotion) {
          floatingPreview.style.transform = `translate(${mouseX + 30}px, ${mouseY - 150}px) scale(1)`;
        } else {
          previewX += (mouseX - previewX) * 0.12;
          previewY += (mouseY - previewY) * 0.12;
          previewVx = (mouseX - previewX) * 0.05;
          const rot = Math.max(-12, Math.min(12, previewVx));

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

function buildAccordion() {
  const container = document.getElementById('project-accordion');
  if (!container || !siteData.projects) return;

  container.className = 'project-accordion projects-cards-grid';
  container.innerHTML = siteData.projects
    .map(
      (p, idx) => `
    <article class="project-card reveal-init reveal-delay-${(idx % 4) + 1}" id="project-card-${idx}" data-idx="${idx}" data-cat="${p.filterCategory}" data-c="Read">
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

  observeNewContent(container);
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

export function renderProjectFilters() {
  const nav = document.getElementById('project-filters-nav');
  if (!nav || !PROJECT_CATEGORIES) return;

  nav.innerHTML = PROJECT_CATEGORIES.map((cat, i) => {
    const isSelected = cat.id === activeProjectCategory;
    return `
      <button type="button"
              class="project-filter-btn reveal-init reveal-delay-${(i % 5) + 1} ${isSelected ? 'active' : ''}"
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

  observeNewContent(nav);
}

export function setProjectCategory(catId) {
  activeProjectCategory = catId;

  const nav = document.getElementById('project-filters-nav');
  if (nav) {
    nav.querySelectorAll('.project-filter-btn').forEach((b) => {
      const active = b.getAttribute('data-cat') === activeProjectCategory;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  hideFloatingPreview();

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

  refreshScrollReveal();

  if (activeProjectCategory === 'all') {
    paneElements.forEach((pane) => {
      pane.style.visibility = 'visible';
      pane.classList.remove('reel-pane-hidden');
    });
    updatePanes();
    updateCaption();
  } else {

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

      snapT = -matchIdx * STEP + 360 * Math.round((A + matchIdx * STEP) / 360);
      const proj = siteData.projects[matchIdx];
      if (reelCaption && proj) {
        reelCaption.textContent = `FILTERED SYSTEM — ${proj.name} · ${proj.category}. CLICK THE FRONT FRAME TO INSPECT`;
      }
    }
  }
}

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
      <div class="case-study-nav-bar reveal-init">
        <button type="button" class="btn-pill btn-back-scenes" data-go="work" data-c="Back">
          <span aria-hidden="true">←</span> BACK TO SELECTED SCENES
        </button>
        <span class="kicker">SCENE 0${projIdx + 1} · ARCHITECTURAL DOSSIER</span>
      </div>

      <header class="case-study-hero reveal-init">
        <div class="case-study-meta-top reveal-init reveal-delay-1">
          <span class="project-card-kicker">SCENE 0${projIdx + 1}</span>
          <span class="case-study-year">${cs.year || project.year}</span>
        </div>
        <h1 class="case-study-title reveal-init reveal-delay-2" id="cs-title">${cs.title}</h1>
        <p class="case-study-tagline reveal-init reveal-delay-3">${cs.tagline}</p>

        <div class="case-study-badge-row reveal-init reveal-delay-4">
          <span class="tag-pill tag-discipline">${cs.category}</span>
          ${(cs.tags || project.tags).map((t) => `<span class="tag-pill">${t}</span>`).join('')}
        </div>

        <div class="case-study-actions-top reveal-init reveal-delay-5">
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
      <section class="cs-section reveal-init" aria-labelledby="sec-overview">
        <span class="kicker">SYSTEM SYNOPSIS</span>
        <h2 id="sec-overview">Project <em>overview</em></h2>
        <p class="cs-body-text reveal-init reveal-delay-1">${cs.overview}</p>
      </section>

      <!-- SECTION C: PROBLEM STATEMENT -->
      <section class="cs-section reveal-init" aria-labelledby="sec-problem">
        <span class="kicker">OPERATIONAL CONTEXT</span>
        <h2 id="sec-problem">The <em>problem</em></h2>
        <p class="cs-body-text reveal-init reveal-delay-1">${cs.problemStatement}</p>
      </section>

      <!-- SECTION D: GOALS & REQUIREMENTS -->
      <section class="cs-section reveal-init" aria-labelledby="sec-goals">
        <span class="kicker">DESIGN TARGETS</span>
        <h2 id="sec-goals">Goals & <em>requirements</em></h2>
        <div class="goals-grid">
          ${cs.goals
            .map(
              (g, i) => `
            <div class="goal-card reveal-init reveal-delay-${(i % 4) + 1}">
              <span class="goal-num">0${i + 1}</span>
              <p class="goal-desc">${g}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION E: SYSTEM ARCHITECTURE -->
      <section class="cs-section reveal-init" aria-labelledby="sec-architecture">
        <span class="kicker">TOPOLOGY & BLUEPRINT</span>
        <h2 id="sec-architecture">System <em>architecture</em></h2>
        <p class="cs-body-text reveal-init reveal-delay-1">${cs.architecture.summary}</p>

        <!-- VISUAL DIAGRAM -->
        <div class="architecture-diagram-container reveal-init reveal-delay-2" role="figure" aria-label="Component architecture diagram for ${cs.title}">
          ${diagramHtml}
        </div>

        <!-- COMPONENT BREAKDOWN -->
        <div class="arch-components-grid">
          ${cs.architecture.components
            .map(
              (comp, i) => `
            <div class="arch-component-card reveal-init reveal-delay-${(i % 3) + 1}">
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
      <section class="cs-section reveal-init" aria-labelledby="sec-techstack">
        <span class="kicker">STACK SPECIFICATION</span>
        <h2 id="sec-techstack">Technology <em>stack</em></h2>
        <div class="tech-stack-grid">
          ${cs.techStack
            .map(
              (ts, i) => `
            <div class="tech-card reveal-init reveal-delay-${(i % 3) + 1}">
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
      <section class="cs-section reveal-init" aria-labelledby="sec-features">
        <span class="kicker">IMPLEMENTED CAPABILITIES</span>
        <h2 id="sec-features">Key <em>features</em></h2>
        <div class="features-grid">
          ${cs.keyFeatures
            .map(
              (kf, i) => `
            <div class="feature-card reveal-init reveal-delay-${(i % 3) + 1}">
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
      <section class="cs-section reveal-init" aria-labelledby="sec-impl">
        <span class="kicker">ENGINEERING DEEP DIVE</span>
        <h2 id="sec-impl">Implementation <em>details</em></h2>
        <div class="implementation-grid">
          ${cs.implementationDetails
            .map(
              (imp, i) => `
            <div class="impl-card reveal-init reveal-delay-${(i % 2) + 1}">
              <h3 class="impl-title">${imp.title}</h3>
              <p class="impl-desc">${imp.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION I: DATA FLOW -->
      <section class="cs-section reveal-init" aria-labelledby="sec-dataflow">
        <span class="kicker">PIPELINE EXECUTION</span>
        <h2 id="sec-dataflow">Data <em>flow</em></h2>
        <div class="dataflow-track">
          ${cs.dataFlow
            .map(
              (df, i) => `
            <div class="dataflow-step reveal-init reveal-delay-${(i % 4) + 1}">
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
      <section class="cs-section reveal-init" aria-labelledby="sec-challenges">
        <span class="kicker">TRIALS & RESOLUTIONS</span>
        <h2 id="sec-challenges">Challenges & <em>decisions</em></h2>
        <div class="challenges-grid">
          ${cs.challenges
            .map(
              (ch, i) => `
            <div class="challenge-card reveal-init reveal-delay-${(i % 2) + 1}">
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
      <section class="cs-section reveal-init" aria-labelledby="sec-results">
        <span class="kicker">VERIFICATION & CONSTRAINTS</span>
        <h2 id="sec-results">Results & <em>limitations</em></h2>
        <div class="results-limitations-grid">
          <div class="results-card reveal-init reveal-delay-1">
            <h3 class="rl-title rl-results-title">Verified Achievements</h3>
            <ul class="rl-list">
              ${cs.resultsAndLimitations.results.map((r) => `<li>${r}</li>`).join('')}
            </ul>
          </div>
          <div class="limitations-card reveal-init reveal-delay-2">
            <h3 class="rl-title rl-limitations-title">Known Constraints & Scope</h3>
            <ul class="rl-list">
              ${cs.resultsAndLimitations.limitations.map((l) => `<li>${l}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <!-- SECTION L: FUTURE IMPROVEMENTS -->
      <section class="cs-section reveal-init" aria-labelledby="sec-future">
        <span class="kicker">ROADMAP HORIZON</span>
        <h2 id="sec-future">Future <em>improvements</em></h2>
        <div class="future-grid">
          ${cs.futureImprovements
            .map(
              (f, i) => `
            <div class="future-card reveal-init reveal-delay-${(i % 3) + 1}">
              <span class="future-num">0${i + 1}</span>
              <p class="future-text">${f}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- SECTION M: PROJECT FOOTER NAVIGATION -->
      <footer class="case-study-footer reveal-init">
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

  observeNewContent(container);
}

function generateArchitectureDiagram(projectId) {
  switch (projectId) {
    case 'agriscan':
      return `
        <div class="arch-flow-diagram">
          <div class="arch-node reveal-init reveal-delay-1">
            <span class="arch-node-badge">STAGE 01 · INPUT</span>
            <h4 class="arch-node-title">Specimen Capture</h4>
            <p class="arch-node-desc">Raw foliage standardized to 224×224 RGB tensor with channel-wise ImageNet normalization.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-2">
            <span class="arch-node-badge">STAGE 02 · BACKBONE</span>
            <h4 class="arch-node-title">MobileNetV2 CNN</h4>
            <p class="arch-node-desc">Lightweight convolutional backbone utilizing inverted residual bottlenecks for efficient spatial feature extraction.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-3">
            <span class="arch-node-badge">STAGE 03 · EXPLAINABILITY</span>
            <h4 class="arch-node-title">Grad-CAM Engine</h4>
            <p class="arch-node-desc">Backpropagates class saliency gradients onto final activation maps to render thermal Jet overlays.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-4">
            <span class="arch-node-badge">STAGE 04 · GUIDANCE</span>
            <h4 class="arch-node-title">Diagnostic Delivery</h4>
            <p class="arch-node-desc">Maps predicted classes to informational treatment recommendations and nearby supply store queries.</p>
          </div>
        </div>
      `;
    case 'agentguard':
      return `
        <div class="arch-flow-diagram">
          <div class="arch-node reveal-init reveal-delay-1">
            <span class="arch-node-badge">STAGE 01 · INTERCEPTION</span>
            <h4 class="arch-node-title">Gateway Interception</h4>
            <p class="arch-node-desc">Intercepts structured agent tool-call requests (demonstrated on Gmail integration) prior to external API dispatch.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-2">
            <span class="arch-node-badge">STAGE 02 · EVALUATION</span>
            <h4 class="arch-node-title">Policy Evaluation</h4>
            <p class="arch-node-desc">Evaluates action parameters against declarative permission rules, recipient boundaries, and input schemas.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-3">
            <span class="arch-node-badge">STAGE 03 · VALIDATION</span>
            <h4 class="arch-node-title">Parameter Validation</h4>
            <p class="arch-node-desc">Enforces type contracts, boundary constraints, and regex filters on incoming tool arguments.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-4">
            <span class="arch-node-badge">STAGE 04 · EXECUTION & AUDIT</span>
            <h4 class="arch-node-title">Execution & Audit</h4>
            <p class="arch-node-desc">Dispatches approved requests to external APIs with idempotency keys and records structured audit logs.</p>
          </div>
        </div>
      `;
    case 'sarkarisetu':
      return `
        <div class="arch-flow-diagram">
          <div class="arch-node reveal-init reveal-delay-1">
            <span class="arch-node-badge">STAGE 01 · INTERACTION</span>
            <h4 class="arch-node-title">Citizen React Client</h4>
            <p class="arch-node-desc">Responsive questionnaire wizard with high-contrast UI and step-by-step mobile navigation.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-2">
            <span class="arch-node-badge">STAGE 02 · GATEWAY</span>
            <h4 class="arch-node-title">Express REST API</h4>
            <p class="arch-node-desc">Handles demographic payloads, category query routing, and MongoDB scheme filtering.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-3">
            <span class="arch-node-badge">STAGE 03 · ESTIMATION</span>
            <h4 class="arch-node-title">Eligibility Estimator</h4>
            <p class="arch-node-desc">Evaluates demographic parameters (age, gender, income, category, state) against rule thresholds to estimate matches.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-4">
            <span class="arch-node-badge">STAGE 04 · CATALOG & GUIDES</span>
            <h4 class="arch-node-title">Curated Catalog</h4>
            <p class="arch-node-desc">MongoDB document store delivering scheme details, informational checklists, and links to official portals.</p>
          </div>
        </div>
      `;
    case 'supply-chain-analytics':
      return `
        <div class="arch-flow-diagram">
          <div class="arch-node reveal-init reveal-delay-1">
            <span class="arch-node-badge">STAGE 01 · INGESTION</span>
            <h4 class="arch-node-title">Data Cleaning Pipeline</h4>
            <p class="arch-node-desc">Pandas & NumPy workflow parsing timestamps, handling null values, and validating shipment records.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-2">
            <span class="arch-node-badge">STAGE 02 · TRANSFORMATION</span>
            <h4 class="arch-node-title">Feature Engineering</h4>
            <p class="arch-node-desc">Derives scheduled transit days, customer segment indicators, and categorical corridor encodings.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-3">
            <span class="arch-node-badge">STAGE 03 · CLASSIFICATION</span>
            <h4 class="arch-node-title">Scikit-Learn Modeling</h4>
            <p class="arch-node-desc">Supervised classification pipelines evaluating shipment delay propensity using pre-dispatch attributes.</p>
          </div>
          <div class="arch-connector" aria-hidden="true">→</div>
          <div class="arch-node reveal-init reveal-delay-4">
            <span class="arch-node-badge">STAGE 04 · DASHBOARD</span>
            <h4 class="arch-node-title">Streamlit Dashboard</h4>
            <p class="arch-node-desc">Interactive web dashboard providing corridor exploration, distribution charts, and scenario simulation on historical data.</p>
          </div>
        </div>
      `;
    default:
      return '';
  }
}
