
let progressBar = null;
let frameCounter = null;
let currentProgress = 0;

export function initScroll() {
  progressBar = document.getElementById('progress-bar');
  frameCounter = document.getElementById('frame-counter');

  function updateScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const maxScroll = scrollHeight - innerHeight;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
    currentProgress = progress;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    if (frameCounter) {

      const frameNum = Math.min(Math.max(Math.round(progress * 479) + 1, 1), 480);
      frameCounter.textContent = `FRAME ${String(frameNum).padStart(4, '0')} / 0480`;
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  window.addEventListener('filmlab:pagechange', () => {
    setTimeout(updateScroll, 50);
  });

  updateScroll();
}

export function getScrollProgress() {
  return currentProgress;
}
