/**
 * FILM LAB PORTFOLIO — ROUTER (SINGLE-PAGE APPLICATION & IRIS APERTURE TRANSITIONS)
 * Sections 0, 3, 4 of master specification.
 */

let activePage = 'home';
let isTransitioning = false;

const SCENES = {
  home: { kicker: 'SCENE 01', title: 'The Reel' },
  work: { kicker: 'SCENE 02', title: 'Selected scenes' },
  about: { kicker: 'SCENE 03', title: 'Director’s notes' },
  journey: { kicker: 'SCENE 04', title: 'The long take' },
};

export function initRouter() {
  // Bind all elements with data-go
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-go]');
    if (!trigger) return;

    e.preventDefault();
    const targetPage = trigger.getAttribute('data-go');
    if (targetPage) {
      const originX = (e.clientX && e.clientX > 0) ? e.clientX : window.innerWidth / 2;
      const originY = (e.clientY && e.clientY > 0) ? e.clientY : window.innerHeight / 2;
      navigateTo(targetPage, true, originX, originY);
    }
  });

  // Check URL hash on initial load
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  if (['home', 'work', 'about', 'journey'].includes(hash)) {
    navigateTo(hash, false, window.innerWidth / 2, window.innerHeight / 2, true);
  } else {
    navigateTo('home', false, window.innerWidth / 2, window.innerHeight / 2, true);
  }

  // Support browser forward/back
  window.addEventListener('popstate', () => {
    const currentHash = window.location.hash.replace('#/', '').replace('#', '') || 'home';
    navigateTo(currentHash, false, window.innerWidth / 2, window.innerHeight / 2);
  });
}

export function navigateTo(targetPage, updateHistory = true, originX = null, originY = null, isInitial = false) {
  if (isTransitioning) return;
  if (targetPage === activePage && document.getElementById('page-' + targetPage)?.classList.contains('on')) {
    return;
  }

  const pages = ['home', 'work', 'about', 'journey'];
  if (!pages.includes(targetPage)) targetPage = 'home';

  const irisOverlay = document.getElementById('iris-overlay');
  const irisKicker = document.getElementById('iris-kicker');
  const irisTitle = document.getElementById('iris-title');

  // Initial load does not play the full iris wipe
  if (isInitial || !irisOverlay || typeof irisOverlay.animate !== 'function') {
    switchActivePage(targetPage);
    if (updateHistory) {
      history.pushState(null, '', '#' + targetPage);
    }
    window.dispatchEvent(new CustomEvent('filmlab:pagechange', { detail: { page: targetPage } }));
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const openDuration = prefersReducedMotion ? 1 : 750;
  const holdDuration = prefersReducedMotion ? 1 : 650;
  const closeDuration = prefersReducedMotion ? 1 : 800;

  // Origin point
  const x = (originX !== null && originX !== undefined) ? originX : window.innerWidth / 2;
  const y = (originY !== null && originY !== undefined) ? originY : window.innerHeight / 2;

  // Set scene kicker and title
  const sceneInfo = SCENES[targetPage] || SCENES.home;
  if (irisKicker) irisKicker.textContent = sceneInfo.kicker;
  if (irisTitle) irisTitle.textContent = sceneInfo.title;

  isTransitioning = true;
  irisOverlay.classList.add('busy');

  // Step 4: Open circular clip-path from circle(0px at X Y) to circle(150vmax at X Y)
  const openAnim = irisOverlay.animate(
    [
      { clipPath: `circle(0px at ${x}px ${y}px)` },
      { clipPath: `circle(150vmax at ${x}px ${y}px)` }
    ],
    {
      duration: openDuration,
      easing: 'cubic-bezier(0.7, 0, 0.2, 1)',
      fill: 'forwards'
    }
  );

  openAnim.onfinish = () => {
    // Step 5: While fully covered, swap page, scroll to top, update active nav & dispatch events
    switchActivePage(targetPage);
    if (updateHistory) {
      history.pushState(null, '', '#' + targetPage);
    }
    window.scrollTo(0, 0);

    // Dispatch filmlab:pagechange for bokeh hues and gyro coordinates
    window.dispatchEvent(new CustomEvent('filmlab:pagechange', { detail: { page: targetPage } }));

    // Step 6: Title reveal with class 't'
    irisOverlay.classList.add('t');

    setTimeout(() => {
      irisOverlay.classList.remove('t');

      // Step 7: Close transition: animate clip-path from circle(150vmax at 50% 50%) to circle(0px at 50% 50%)
      const closeAnim = irisOverlay.animate(
        [
          { clipPath: 'circle(150vmax at 50% 50%)' },
          { clipPath: 'circle(0px at 50% 50%)' }
        ],
        {
          duration: closeDuration,
          easing: 'cubic-bezier(0.7, 0, 0.2, 1)',
          fill: 'forwards'
        }
      );

      closeAnim.onfinish = () => {
        openAnim.cancel();
        closeAnim.cancel();
        irisOverlay.style.clipPath = 'circle(0px at 50% 50%)';
        irisOverlay.classList.remove('busy');
        isTransitioning = false;

        // If journey, trigger timeline check/update
        if (targetPage === 'journey') {
          window.dispatchEvent(new CustomEvent('filmlab:timelineupdate'));
        }
      };
    }, holdDuration);
  };
}

function switchActivePage(targetPage) {
  const pages = ['home', 'work', 'about', 'journey'];
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) {
      if (p === targetPage) {
        el.classList.add('on');
      } else {
        el.classList.remove('on');
      }
    }
  });

  // Update nav current state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('data-go') === targetPage) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  activePage = targetPage;
}

export function getActivePage() {
  return activePage;
}
