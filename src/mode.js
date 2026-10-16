/**
 * FILM LAB PORTFOLIO — MODE ENGINE (COLOUR / NOIR)
 * Section 14 of master specification.
 */

let isNoir = false;

export function initMode() {
  const toggleBtn = document.getElementById('mode-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    toggleMode();
  });
}

export function toggleMode() {
  const toggleBtn = document.getElementById('mode-toggle');
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
