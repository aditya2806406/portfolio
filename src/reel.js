/**
 * FILM LAB PORTFOLIO — 3D DRUM REEL
 * Section 10.1 of master specification.
 * Phase 1: Foundation container initialization.
 */

export function initReel() {
  // Accordion row expansion setup
  document.querySelectorAll('.project-row').forEach(row => {
    row.addEventListener('click', () => {
      const panel = row.querySelector('.project-panel');
      if (!panel) return;

      const isOpen = panel.classList.contains('open');
      document.querySelectorAll('.project-panel').forEach(p => p.classList.remove('open'));
      if (!isOpen) {
        panel.classList.add('open');
      }
    });
  });
}
