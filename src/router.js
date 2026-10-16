/**
 * FILM LAB PORTFOLIO — ROUTER (SINGLE-PAGE APPLICATION)
 * Sections 0, 3, 4 of master specification.
 */

let activePage = 'home';
let isTransitioning = false;

export function initRouter() {
  // Bind all elements with data-go
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-go]');
    if (!trigger) return;

    e.preventDefault();
    const targetPage = trigger.getAttribute('data-go');
    if (targetPage) {
      navigateTo(targetPage);
    }
  });

  // Check URL hash on load
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  if (['home', 'work', 'about', 'journey'].includes(hash)) {
    navigateTo(hash, false);
  } else {
    navigateTo('home', false);
  }

  // Support browser forward/back
  window.addEventListener('popstate', () => {
    const currentHash = window.location.hash.replace('#/', '').replace('#', '') || 'home';
    navigateTo(currentHash, false);
  });
}

export function navigateTo(pageId, updateHistory = true) {
  if (pageId === activePage && document.getElementById('page-' + pageId)?.classList.contains('on')) {
    return;
  }

  const pages = ['home', 'work', 'about', 'journey'];
  if (!pages.includes(pageId)) pageId = 'home';

  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) {
      if (p === pageId) {
        el.classList.add('on');
      } else {
        el.classList.remove('on');
      }
    }
  });

  // Update nav current state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('data-go') === pageId) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  activePage = pageId;

  if (updateHistory) {
    history.pushState(null, '', '#' + pageId);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Notify background/gyro canvases of page shift
  window.dispatchEvent(new CustomEvent('filmlab:pagechange', { detail: { page: pageId } }));
}

export function getActivePage() {
  return activePage;
}
