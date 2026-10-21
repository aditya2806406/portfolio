
import { siteData } from './data.js';
import { navigateTo } from './router.js';
import { observeNewContent } from './reveal.js';

let isTicking = false;

export function initJourney() {

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  window.addEventListener('filmlab:timelineupdate', () => {
    requestAnimationFrame(updateTimeline);
  });

  window.addEventListener('filmlab:pagechange', (e) => {
    if (e.detail?.page === 'journey') {
      setTimeout(() => {
        updateTimeline();
      }, 50);
    }
  });

  renderJourney();

  setupFooterResumeLink();

  setTimeout(updateTimeline, 100);
}

function onScroll() {
  const pageJourney = document.getElementById('page-journey');
  if (!pageJourney || !pageJourney.classList.contains('on')) return;

  if (!isTicking) {
    requestAnimationFrame(() => {
      updateTimeline();
      isTicking = false;
    });
    isTicking = true;
  }
}

export function updateTimeline() {
  const pageJourney = document.getElementById('page-journey');
  if (!pageJourney || !pageJourney.classList.contains('on')) return;

  const section = document.querySelector('.timeline-section');
  const progressEl = document.getElementById('timeline-progress');
  if (!section || !progressEl) return;

  const rect = section.getBoundingClientRect();
  const timelineTop = rect.top;
  const timelineHeight = rect.height;
  const threshold = window.innerHeight * 0.7;

  const currentFill = Math.min(Math.max(threshold - timelineTop, 0), timelineHeight);
  progressEl.style.height = `${currentFill}px`;

  const entries = section.querySelectorAll('.timeline-entry');
  entries.forEach((entry) => {
    const entryRect = entry.getBoundingClientRect();
    if (entryRect.top <= threshold) {
      entry.classList.add('lit');
    } else {
      entry.classList.remove('lit');
    }
  });
}

export function renderJourney() {
  renderTimelineEntries();
}

function renderEditNotice() {
  let noticeEl = document.getElementById('journey-edit-notice');
  if (!noticeEl) {
    const journeyWrap = document.querySelector('#page-journey .wrap');
    if (journeyWrap) {
      noticeEl = document.createElement('div');
      noticeEl.id = 'journey-edit-notice';
      noticeEl.className = 'about-edit-notice';
      journeyWrap.insertBefore(noticeEl, journeyWrap.firstChild);
    }
  }

  if (noticeEl) {
    if (isEditMode) {
      noticeEl.innerHTML = `
        <div class="edit-notice-content">
          <span class="edit-notice-tag">EDIT MODE</span>
          <span class="edit-notice-text">Preview only. Add the file to <code>/assets/resume</code> and <code>data.js</code> to publish.</span>
        </div>
      `;
      noticeEl.style.display = 'block';
    } else {
      noticeEl.innerHTML = '';
      noticeEl.style.display = 'none';
    }
  }
}

function renderTimelineEntries() {
  const container = document.getElementById('timeline-entries');
  if (!container || !siteData.journey) return;

  container.innerHTML = siteData.journey.map((item, index) => {
    const rawParagraphs = item.paragraphs || (item.text ? item.text.split('\n\n') : []);
    const paragraphsHtml = rawParagraphs
      .map((p) => `<p class="sub timeline-body-para">${p}</p>`)
      .join('');

    return `
      <div class="timeline-entry reveal-init reveal-delay-${(index % 4) + 1}" data-index="${index}">
        <div class="timeline-node" aria-hidden="true"></div>
        <div class="timeline-date">${item.dateLabel}</div>
        <h3 class="timeline-title">${item.title}</h3>
        <div class="timeline-text-wrap">${paragraphsHtml}</div>
      </div>
    `;
  }).join('');

  observeNewContent(container);
}

export function setupFooterResumeLink() {
  const footerSocials = document.getElementById('footer-socials');
  if (!footerSocials) return;

  const links = footerSocials.querySelectorAll('a');
  let resumeLink = null;
  links.forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    if (text.includes('résumé') || text.includes('resume')) {
      resumeLink = link;
    }
  });

  if (!resumeLink) return;

  const resumeUrl = siteData.resume?.file || './assets/resume/resume.pdf';
  resumeLink.href = resumeUrl;
  resumeLink.target = '_blank';
  resumeLink.rel = 'noopener noreferrer';
  resumeLink.onclick = null;
  resumeLink.removeAttribute('data-go');
}
