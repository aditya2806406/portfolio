/**
 * FILM LAB PORTFOLIO — FIRST-VISIT LOADER ENGINE
 * Section 5 of master specification.
 */

export function initLoader() {
  const loaderEl = document.getElementById('loader-overlay');
  const loaderNumEl = document.getElementById('loader-num');
  
  if (!loaderEl || !loaderNumEl) {
    document.body.classList.add('in');
    window.filmlabLoaded = true;
    return;
  }

  // Ensure loader is visible on initialization
  loaderEl.style.display = 'flex';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = prefersReducedMotion ? 100 : 2400;
  const irisDuration = prefersReducedMotion ? 1 : 1100;

  // Signal that loader started so failsafe is informed
  window.filmlabLoadingStarted = true;

  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const p = Math.min(Math.max(elapsed / duration, 0), 1);
    
    // Ease-out cubic: 1 - (1 - p)^3
    const easeP = 1 - Math.pow(1 - p, 3);
    const count = Math.min(Math.round(easeP * 100), 100);

    loaderNumEl.textContent = String(count).padStart(3, '0');

    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      // Counter reached 100: wait 250ms then iris-close reveal
      setTimeout(() => {
        dismissLoader(loaderEl, irisDuration);
      }, prefersReducedMotion ? 10 : 250);
    }
  }

  requestAnimationFrame(step);
}

function dismissLoader(loaderEl, irisDuration) {
  if (typeof loaderEl.animate === 'function') {
    const anim = loaderEl.animate(
      [
        { clipPath: 'circle(150vmax at 50% 50%)' },
        { clipPath: 'circle(0px at 50% 50%)' },
      ],
      {
        duration: irisDuration,
        easing: 'cubic-bezier(0.7, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );

    anim.onfinish = () => {
      completeLoader(loaderEl);
    };
  } else {
    completeLoader(loaderEl);
  }
}

function completeLoader(loaderEl) {
  if (loaderEl && loaderEl.parentNode) {
    loaderEl.remove();
  }
  document.body.classList.add('in');
  window.filmlabLoaded = true;
  window.dispatchEvent(new CustomEvent('filmlab:loadercomplete'));
}
