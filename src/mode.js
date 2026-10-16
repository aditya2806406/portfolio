/**
 * FILM LAB PORTFOLIO — MODE ENGINE (COLOUR / NOIR WITH FLASH OVERLAY)
 * Section 14 of master specification.
 */

let isNoir = false;
let isFlashing = false;

export function initMode() {
  const toggleBtn = document.getElementById('mode-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMode();
  });
}

export function toggleMode() {
  if (isFlashing) return;

  const toggleBtn = document.getElementById('mode-toggle');
  const flashOverlay = document.getElementById('flash-overlay');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !flashOverlay || typeof flashOverlay.animate !== 'function') {
    applyModeToggle(toggleBtn);
    return;
  }

  isFlashing = true;

  // 1. Flash overlay animates opacity 0 -> 1 in 160ms (fill: forwards)
  const flashIn = flashOverlay.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { duration: 160, fill: 'forwards' }
  );

  flashIn.onfinish = () => {
    // 2. At full white: toggle body.noir, flip state, switch button label, dispatch event
    applyModeToggle(toggleBtn);

    // 3. Flash animates opacity 1 -> 0 over 800ms ease-out
    const flashOut = flashOverlay.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 800, easing: 'ease-out', fill: 'forwards' }
    );

    flashOut.onfinish = () => {
      flashIn.cancel();
      flashOut.cancel();
      flashOverlay.style.opacity = '0';
      isFlashing = false;
    };
  };
}

function applyModeToggle(toggleBtn) {
  isNoir = !isNoir;

  if (isNoir) {
    document.body.classList.add('noir');
    if (toggleBtn) toggleBtn.textContent = '◑ Noir';
  } else {
    document.body.classList.remove('noir');
    if (toggleBtn) toggleBtn.textContent = '◐ Color';
  }

  // Dispatch event for canvas hue & saturation adjustments
  window.dispatchEvent(new CustomEvent('filmlab:modechange', { detail: { isNoir } }));
}

export function isNoirMode() {
  return isNoir;
}
