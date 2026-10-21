
import { getActivePage } from './router.js';

let isInitialized = false;

let currentPointerX = -1000;
let currentPointerY = -1000;

export function initCinematicEffects() {
  if (isInitialized) return;
  isInitialized = true;

  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isCoarse) {
    window.addEventListener(
      'pointermove',
      (e) => {
        currentPointerX = e.clientX;
        currentPointerY = e.clientY;
      },
      { passive: true }
    );
  }

  initLightTrail(isCoarse, prefersReducedMotion);

  initRackFocusAndHeadingReveal(prefersReducedMotion);

  initRecAndLetterbox(isCoarse, prefersReducedMotion);

  initAutofocus(isCoarse);

  initShutterPulse(prefersReducedMotion);

  initFilmRails(prefersReducedMotion);

  initLightLeak(prefersReducedMotion);
}

function initLightTrail(isCoarse, prefersReducedMotion) {
  if (isCoarse || prefersReducedMotion) return;

  const canvas = document.getElementById('lp');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const MAX_POINTS = 42;
  const points = [];
  let lastX = -1000;
  let lastY = -1000;
  let isPointerMoving = false;
  let idleTimer = null;
  let animId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  window.addEventListener(
    'pointermove',
    (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.8) {
        lastX = e.clientX;
        lastY = e.clientY;
        points.push({ x: lastX, y: lastY });

        if (points.length > MAX_POINTS) {
          points.shift();
        }

        isPointerMoving = true;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          isPointerMoving = false;
        }, 35);
      }
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', () => {
    isPointerMoving = false;
  });

  function renderTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isPointerMoving && points.length > 0) {
      points.shift();
    }

    if (points.length > 1) {
      ctx.save();
      
      ctx.globalCompositeOperation = 'lighter';

      const isNoir = document.body.classList.contains('noir');

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const k = (i + 1) / points.length; 
        const alpha = k * 0.55;
        const width = 1 + k * 3.5;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = isNoir
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(255, 178, 74, ${alpha})`;
        ctx.stroke();
      }

      ctx.restore();
    }

    animId = requestAnimationFrame(renderTrail);
  }

  animId = requestAnimationFrame(renderTrail);
}

function initRackFocusAndHeadingReveal(prefersReducedMotion) {
  let isScrollScheduled = false;
  let activeBlurTargets = [];
  let activeHeadingTargets = [];

  function scanActivePageTargets() {
    activeBlurTargets = [];
    activeHeadingTargets = [];

    const activePage = getActivePage();
    const activePageEl = document.getElementById('page-' + activePage);
    if (!activePageEl) return;

    const headings = activePageEl.querySelectorAll('h2:not(.iris-title):not(.loader-title)');
    headings.forEach((h2) => {
      if (!prefersReducedMotion) {
        h2.classList.add('rv');
      } else {
        h2.classList.add('on');
      }
      activeHeadingTargets.push(h2);
    });

    if (prefersReducedMotion) return;

    const candidates = activePageEl.querySelectorAll(
      '.cs-section h2, .case-study-hero h1, .about-grid h2, .kit-section h2, .proficiency-section h2, .awards-section h2, .timeline-header h2, .now-showing-section h2, .project-card, .filmstrip-card, .timeline-entry, .cert-card, .award-row, .goal-card, .arch-component-card, .tech-card, .feature-card, .impl-card, .challenge-card, .results-card, .limitations-card, .future-card'
    );

    candidates.forEach((el) => {
      
      if (
        !el.closest('.reel-container') &&
        !el.closest('.site-header') &&
        !el.closest('#rec')
      ) {
        activeBlurTargets.push(el);
      }
    });
  }

  function clearBlurStyles() {
    activeBlurTargets.forEach((el) => {
      if (el._rfBlurApplied) {
        el.style.filter = '';
        el._rfBlurApplied = false;
      }
    });
  }

  function updateScrollEffects() {
    isScrollScheduled = false;
    const vh = window.innerHeight;
    const vCenterY = vh / 2;

    if (!prefersReducedMotion) {
      activeHeadingTargets.forEach((h2) => {
        const rect = h2.getBoundingClientRect();
        const isInView = rect.top < vh * 0.88 && rect.bottom > vh * 0.05;
        h2.classList.toggle('on', isInView);
      });
    }

    if (!prefersReducedMotion && vh > 0) {
      activeBlurTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        
        if (rect.bottom < -50 || rect.top > vh + 50) {
          if (el._rfBlurApplied) {
            el.style.filter = '';
            el._rfBlurApplied = false;
          }
          return;
        }

        const elCenterY = rect.top + rect.height / 2;
        const d = Math.abs(elCenterY - vCenterY) / (vh / 2);
        const blur = Math.min(7, Math.max(0, (d - 0.6) * 16));

        if (blur > 0.3) {
          el.style.filter = `blur(${blur.toFixed(2)}px)`;
          el._rfBlurApplied = true;
        } else if (el._rfBlurApplied) {
          el.style.filter = '';
          el._rfBlurApplied = false;
        }
      });
    }
  }

  function requestScrollUpdate() {
    if (!isScrollScheduled) {
      isScrollScheduled = true;
      requestAnimationFrame(updateScrollEffects);
    }
  }

  scanActivePageTargets();
  requestScrollUpdate();

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });

  window.addEventListener('filmlab:pagechange', () => {
    clearBlurStyles();
    setTimeout(() => {
      scanActivePageTargets();
      requestScrollUpdate();
    }, 70);
  });

  window.addEventListener('filmlab:transitioncomplete', () => {
    scanActivePageTargets();
    requestScrollUpdate();
  });
}

function initRecAndLetterbox(isCoarse, prefersReducedMotion) {
  const recEl = document.getElementById('rec');
  const recTimeEl = document.getElementById('rec-time');
  const btnLetterbox = document.getElementById('btn-letterbox');
  const flareEl = document.getElementById('flare');

  if (recTimeEl) {
    const startTime = performance.now();

    function updateTimecode() {
      const elapsedMs = performance.now() - startTime;
      const totalFrames = Math.floor(elapsedMs / (1000 / 24));
      const ff = totalFrames % 24;
      const totalSeconds = Math.floor(totalFrames / 24);
      const ss = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const mm = totalMinutes % 60;
      const hh = Math.floor(totalMinutes / 60);

      const pad = (n) => String(n).padStart(2, '0');
      recTimeEl.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
    }

    updateTimecode();
    setInterval(updateTimecode, 41);
  }

  function toggleCinemaMode() {
    const isCine = document.body.classList.toggle('cine');
    if (btnLetterbox) {
      btnLetterbox.setAttribute('aria-pressed', isCine ? 'true' : 'false');
      btnLetterbox.classList.toggle('active', isCine);
    }

    if (flareEl && !isCoarse) {
      if (isCine) {
        flareEl.style.left = `${currentPointerX}px`;
        flareEl.style.top = `${currentPointerY}px`;
      }
    }
  }

  if (btnLetterbox) {
    btnLetterbox.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCinemaMode();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'l' && e.key !== 'L') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const activeEl = document.activeElement;
    if (activeEl) {
      const tag = activeEl.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || activeEl.isContentEditable) {
        return;
      }
    }

    toggleCinemaMode();
  });

  if (flareEl && !isCoarse) {
    window.addEventListener(
      'pointermove',
      (e) => {
        if (document.body.classList.contains('cine')) {
          flareEl.style.left = `${e.clientX}px`;
          flareEl.style.top = `${e.clientY}px`;
        }
      },
      { passive: true }
    );
  }
}

function initAutofocus(isCoarse) {
  if (isCoarse) return;

  const vf = document.getElementById('vf');
  if (!vf) return;

  let activeTarget = null;
  let lockTimer = null;

  function hideViewfinder() {
    activeTarget = null;
    vf.classList.remove('active', 'vf-locked');
  }

  function positionOnTarget(target) {
    if (!target) return;
    const rect = target.getBoundingClientRect();

    if (
      rect.width > 620 ||
      rect.height > 420 ||
      rect.width < 14 ||
      rect.height < 14 ||
      rect.bottom < 0 ||
      rect.top > window.innerHeight
    ) {
      hideViewfinder();
      return;
    }

    const pad = 8;
    vf.style.transform = `translate(${rect.left - pad}px, ${rect.top - pad}px)`;
    vf.style.width = `${rect.width + pad * 2}px`;
    vf.style.height = `${rect.height + pad * 2}px`;
    vf.classList.add('active');
  }

  document.addEventListener(
    'pointerover',
    (e) => {
      const target = e.target.closest(
        'button, a, [data-c], .cert-card, .filmstrip-card, .btn-pill, .nav-btn, .logo-btn, .mode-toggle-btn'
      );

      if (target && !target.closest('.reel-container') && !target.closest('#rec')) {
        activeTarget = target;
        positionOnTarget(target);
      } else if (activeTarget && !e.target.closest('#vf')) {
        hideViewfinder();
      }
    },
    { passive: true }
  );

  document.addEventListener('pointerout', (e) => {
    if (activeTarget && !activeTarget.contains(e.relatedTarget)) {
      hideViewfinder();
    }
  });

  document.addEventListener('click', () => {
    if (vf.classList.contains('active')) {
      vf.classList.add('vf-locked');
      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => {
        vf.classList.remove('vf-locked');
      }, 180);
    }
  });

  window.addEventListener('scroll', hideViewfinder, { passive: true });
  window.addEventListener('filmlab:pagechange', hideViewfinder);
}

function initShutterPulse(prefersReducedMotion) {
  if (prefersReducedMotion) return;

  window.addEventListener(
    'pointerdown',
    (e) => {
      
      const ring = document.createElement('div');
      ring.className = 'shutter-ring';
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      document.body.appendChild(ring);

      const anim = ring.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.85 },
          { transform: 'translate(-50%, -50%) scale(11)', opacity: 0 }
        ],
        {
          duration: 700,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }
      );

      const cleanup = () => {
        if (ring.parentNode) {
          ring.remove();
        }
      };

      anim.onfinish = cleanup;
      setTimeout(cleanup, 750);
    },
    { passive: true }
  );
}

function initFilmRails(prefersReducedMotion) {
  if (prefersReducedMotion) return;

  function updateRails() {
    const ry = (-window.scrollY * 0.5) % 34;
    document.documentElement.style.setProperty('--ry', `${ry}px`);
  }

  updateRails();
  window.addEventListener('scroll', updateRails, { passive: true });
}

function initLightLeak(prefersReducedMotion) {
  if (prefersReducedMotion) return;

  const leakEl = document.getElementById('leak');
  if (!leakEl) return;

  let velocity = 0;
  let lastScrollY = window.scrollY;
  let isDecayRunning = false;

  function stepDecay() {
    velocity *= 0.9;
    const opacity = Math.min(0.38, Math.abs(velocity) * 0.006);
    leakEl.style.opacity = opacity.toFixed(3);
    leakEl.style.transform = velocity < 0 ? 'scaleX(-1)' : 'scaleX(1)';

    if (Math.abs(velocity) > 0.25) {
      requestAnimationFrame(stepDecay);
    } else {
      velocity = 0;
      leakEl.style.opacity = '0';
      isDecayRunning = false;
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      velocity += delta;
      velocity = Math.max(-80, Math.min(80, velocity));

      if (!isDecayRunning && Math.abs(velocity) > 1.5) {
        isDecayRunning = true;
        requestAnimationFrame(stepDecay);
      }
    },
    { passive: true }
  );
}
