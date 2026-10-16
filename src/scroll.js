/**
 * FILM LAB PORTFOLIO — SCROLL ENGINE
 * Sections 2, 9.2, 9.3, 12 of master specification.
 * Handles progress bar, frame counter, and scroll monitoring.
 */

export function initScroll() {
  const progressBar = document.getElementById('progress-bar');
  const frameCounter = document.getElementById('frame-counter');

  function updateScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;

    if (progressBar) {
      progressBar.style.transform = 'scaleX(' + progress + ')';
    }

    if (frameCounter) {
      const frameNum = Math.min(Math.max(Math.round(progress * 479) + 1, 1), 480);
      frameCounter.textContent = 'FRAME ' + String(frameNum).padStart(4, '0') + ' / 0480';
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
}
