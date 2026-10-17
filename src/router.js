import { siteData } from './data.js';

let activePage = 'home';
let activeRoute = 'home';
let isTransitioning = false;

const SCENES = {
  home: { kicker: 'SCENE 01', title: 'The Reel' },
  work: { kicker: 'SCENE 02', title: 'Selected scenes' },
  about: { kicker: 'SCENE 03', title: 'Director’s notes' },
  journey: { kicker: 'SCENE 04', title: 'The long take' },
};

export function parseRoute(rawHash) {
  if (!rawHash) return { page: 'home', slug: null, route: 'home' };
  let cleaned = rawHash.replace(/^[#/]+/, '').split('?')[0].trim().toLowerCase();
  const parts = cleaned.split('/').filter(Boolean);
  const page = ['home', 'work', 'about', 'journey'].includes(parts[0]) ? parts[0] : 'home';
  const slug = (page === 'work' && parts.length > 1) ? parts[1] : null;
  const route = slug ? `${page}/${slug}` : page;
  return { page, slug, route };
}

export function getCleanPageFromHash(rawHash) {
  return parseRoute(rawHash).page;
}

export function initRouter() {
  // Bind all elements with data-go
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-go]');
    if (!trigger) return;

    e.preventDefault();
    const targetPage = trigger.getAttribute('data-go');
    if (targetPage) {
      let originX, originY;
      if (e.clientX && e.clientX > 0) {
        originX = e.clientX;
        originY = e.clientY;
      } else {
        // Keyboard activation: expand from center of the activated button
        const rect = trigger.getBoundingClientRect();
        originX = rect.left + rect.width / 2;
        originY = rect.top + rect.height / 2;
      }
      navigateTo(targetPage, true, originX, originY);
    }
  });

  // Check URL hash on initial load (handles /#about, /#work/agriscan, etc.)
  const { route } = parseRoute(window.location.hash);
  navigateTo(route, false, window.innerWidth / 2, window.innerHeight / 2, true);

  // Support browser forward/back
  window.addEventListener('popstate', () => {
    const { route } = parseRoute(window.location.hash);
    navigateTo(route, false, window.innerWidth / 2, window.innerHeight / 2);
  });
}

export function navigateTo(targetRoute, updateHistory = true, originX = null, originY = null, isInitial = false) {
  if (isTransitioning) return;

  const { page, slug, route } = parseRoute(targetRoute.startsWith('#') ? targetRoute : '#' + targetRoute);

  // Find project if slug is present
  let project = null;
  if (slug && siteData.projects) {
    project = siteData.projects.find((p) => p.id === slug || p.caseStudy?.slug === slug);
  }
  const effectiveSlug = project ? (project.caseStudy?.slug || project.id) : null;
  const effectiveRoute = effectiveSlug ? `${page}/${effectiveSlug}` : page;

  // If already on this exact route and page is active, do not re-navigate
  if (effectiveRoute === activeRoute && document.getElementById('page-' + page)?.classList.contains('on')) {
    return;
  }

  const irisOverlay = document.getElementById('iris-overlay');
  const irisKicker = document.getElementById('iris-kicker');
  const irisTitle = document.getElementById('iris-title');

  // Initial load does not play the full iris wipe
  if (isInitial || !irisOverlay || typeof irisOverlay.animate !== 'function') {
    switchActivePage(page, effectiveSlug);
    if (updateHistory) {
      const isEdit = window.location.search.includes('edit') || window.location.hash.includes('edit');
      let url = '#' + effectiveRoute;
      if (window.location.search.includes('edit')) {
        url = window.location.pathname + window.location.search + '#' + effectiveRoute;
      } else if (isEdit) {
        url = '#' + effectiveRoute + '?edit';
      }
      history.pushState(null, '', url);
    }
    window.dispatchEvent(
      new CustomEvent('filmlab:pagechange', { detail: { page, slug: effectiveSlug, route: effectiveRoute } })
    );
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const openDuration = prefersReducedMotion ? 1 : 750;
  const holdDuration = prefersReducedMotion ? 1 : 650;
  const closeDuration = prefersReducedMotion ? 1 : 800;

  // Origin point
  const x = originX !== null && originX !== undefined ? originX : window.innerWidth / 2;
  const y = originY !== null && originY !== undefined ? originY : window.innerHeight / 2;

  // Set scene kicker and title
  let sceneKicker = SCENES[page]?.kicker || 'SCENE 01';
  let sceneTitle = SCENES[page]?.title || 'The Reel';
  if (page === 'work' && project) {
    sceneKicker = 'CASE STUDY';
    sceneTitle = project.name;
  }

  if (irisKicker) irisKicker.textContent = sceneKicker;
  if (irisTitle) irisTitle.textContent = sceneTitle;

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
    switchActivePage(page, effectiveSlug);
    if (updateHistory) {
      const isEdit = window.location.search.includes('edit') || window.location.hash.includes('edit');
      let url = '#' + effectiveRoute;
      if (window.location.search.includes('edit')) {
        url = window.location.pathname + window.location.search + '#' + effectiveRoute;
      } else if (isEdit) {
        url = '#' + effectiveRoute + '?edit';
      }
      history.pushState(null, '', url);
    }
    window.scrollTo(0, 0);

    // Dispatch filmlab:pagechange for bokeh hues, gyro coordinates, reel, and case study
    window.dispatchEvent(
      new CustomEvent('filmlab:pagechange', { detail: { page, slug: effectiveSlug, route: effectiveRoute } })
    );

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
        if (page === 'journey') {
          window.dispatchEvent(new CustomEvent('filmlab:timelineupdate'));
        }
      };
    }, holdDuration);
  };
}

function switchActivePage(targetPage, targetSlug = null) {
  const pages = ['home', 'work', 'about', 'journey'];
  pages.forEach((p) => {
    const el = document.getElementById('page-' + p);
    if (el) {
      if (p === targetPage) {
        el.classList.add('on');
      } else {
        el.classList.remove('on');
      }
    }
  });

  // Toggle work-overview vs work-case-study
  const workOverview = document.getElementById('work-overview');
  const workCaseStudy = document.getElementById('work-case-study');
  if (targetPage === 'work') {
    if (targetSlug) {
      if (workOverview) workOverview.style.display = 'none';
      if (workCaseStudy) workCaseStudy.style.display = 'block';
    } else {
      if (workOverview) workOverview.style.display = 'block';
      if (workCaseStudy) workCaseStudy.style.display = 'none';
    }
  } else {
    // When leaving work, keep work-overview ready
    if (workOverview) workOverview.style.display = 'block';
    if (workCaseStudy) workCaseStudy.style.display = 'none';
  }

  // Update nav current state
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    if (btn.getAttribute('data-go') === targetPage) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  activePage = targetPage;
  activeRoute = targetSlug ? `${targetPage}/${targetSlug}` : targetPage;
}

export function getActivePage() {
  return activePage;
}

export function getActiveRoute() {
  return activeRoute;
}
