
import { getActivePage } from './router.js';

let sharedObserver = null;
let isInitialized = false;

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px 0px -40px 0px',
  threshold: 0.08,
};

export function initScrollReveal() {
  if (isInitialized) return;
  isInitialized = true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealAllImmediately();
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealAllImmediately();
    return;
  }

  sharedObserver = new IntersectionObserver(handleIntersection, OBSERVER_OPTIONS);

  refreshScrollReveal();

  window.addEventListener('filmlab:pagechange', (e) => {
    
    setTimeout(() => {
      refreshScrollReveal();
    }, 60);
  });

  window.addEventListener('filmlab:contentupdate', () => {
    refreshScrollReveal();
  });

  document.addEventListener('focusin', (e) => {
    const revealTarget = e.target.closest('.reveal-init:not(.revealed)');
    if (revealTarget) {
      revealElement(revealTarget);
      if (sharedObserver) {
        sharedObserver.unobserve(revealTarget);
      }
    }
  });
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      revealElement(entry.target);
      observer.unobserve(entry.target);
    }
  });
}

function revealElement(el) {
  if (!el || el.classList.contains('revealed')) return;

  el.classList.add('revealed');

  const onDone = () => {
    el.classList.add('reveal-done');
    el.removeEventListener('transitionend', onDone);
  };

  el.addEventListener('transitionend', onDone, { once: true });

  setTimeout(() => {
    el.classList.add('reveal-done');
  }, 950);
}

export function refreshScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealAllImmediately();
    return;
  }

  if (!sharedObserver) {
    initScrollReveal();
    return;
  }

  const activePage = getActivePage();
  const activePageEl = document.getElementById('page-' + activePage);
  if (!activePageEl) return;

  const candidates = activePageEl.querySelectorAll('.reveal-init:not(.revealed)');
  candidates.forEach((el) => {
    sharedObserver.observe(el);
  });
}

export function observeNewContent(container) {
  if (!container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    container.querySelectorAll('.reveal-init').forEach((el) => {
      el.classList.add('revealed', 'reveal-done');
    });
    return;
  }

  if (!sharedObserver) {
    initScrollReveal();
    return;
  }

  const elements = container.querySelectorAll('.reveal-init:not(.revealed)');
  elements.forEach((el) => {
    sharedObserver.observe(el);
  });
}

function revealAllImmediately() {
  document.querySelectorAll('.reveal-init').forEach((el) => {
    el.classList.add('revealed', 'reveal-done');
  });
}
