
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

  const flashIn = flashOverlay.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { duration: 160, fill: 'forwards' }
  );

  flashIn.onfinish = () => {

    applyModeToggle(toggleBtn);

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

  window.dispatchEvent(new CustomEvent('filmlab:modechange', { detail: { isNoir } }));
}

export function isNoirMode() {
  return isNoir;
}
