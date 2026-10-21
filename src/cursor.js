
let lensEl = null;
let dotEl = null;
let labelEl = null;

let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;

let isFinePointer = false;
let isHoveringLabel = false;
let currentLabel = '';
let isVisible = false;
let animId = null;

export function initCursor() {
  isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  lensEl = document.getElementById('lens-cursor');
  dotEl = document.getElementById('cursor-dot');
  labelEl = document.getElementById('lens-label');

  if (!lensEl || !dotEl) return;

  window.addEventListener(
    'pointermove',
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        lensEl.classList.add('visible');
        dotEl.classList.add('visible');
      }

      dotEl.style.transform = `translate(${mouseX - 2.5}px, ${mouseY - 2.5}px)`;

      const targetWithLabel = e.target.closest('[data-c]');
      if (targetWithLabel) {
        const labelText = targetWithLabel.getAttribute('data-c');
        if (labelText) {
          setLabel(labelText);
        } else {
          clearLabel();
        }
      } else {
        clearLabel();
      }

      const emailEl = document.getElementById('footer-email');
      if (emailEl) {
        const rect = emailEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const dist = Math.hypot(dx, dy);
        if (dist < rect.width / 1.6) {
          emailEl.style.transform = `translate(${dx * 0.18}px, ${dy * 0.3}px)`;
        } else if (emailEl.style.transform) {
          emailEl.style.transform = '';
        }
      }
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', () => {
    isVisible = false;
    lensEl.classList.remove('visible');
    dotEl.classList.remove('visible');
    clearLabel();
    const emailEl = document.getElementById('footer-email');
    if (emailEl) emailEl.style.transform = '';
  });

  document.addEventListener('pointerenter', () => {
    isVisible = true;
    lensEl.classList.add('visible');
    dotEl.classList.add('visible');
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {

    window.addEventListener(
      'pointermove',
      () => {
        lensEl.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      },
      { passive: true }
    );
  } else {
    startCursorLoop();
  }
}

function setLabel(text) {
  if (currentLabel === text && isHoveringLabel) return;
  currentLabel = text;
  isHoveringLabel = true;
  if (labelEl) labelEl.textContent = text;
  if (lensEl) lensEl.classList.add('active');
}

function clearLabel() {
  if (!isHoveringLabel) return;
  isHoveringLabel = false;
  currentLabel = '';
  if (lensEl) lensEl.classList.remove('active');
  if (labelEl) labelEl.textContent = '';
}

function startCursorLoop() {
  if (animId) cancelAnimationFrame(animId);

  function loop() {
    if (isVisible) {

      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      lensEl.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    }
    animId = requestAnimationFrame(loop);
  }

  animId = requestAnimationFrame(loop);
}
