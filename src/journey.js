/**
 * FILM LAB PORTFOLIO — JOURNEY (THE LONG TAKE & RÉSUMÉ SUITE)
 * Sections 12, 18.0, 18.3, 18.4 of master specification.
 */

import { siteData } from './data.js';
import { navigateTo } from './router.js';

let isEditMode = false;
let resumeObjectUrl = null;
let currentResumeFile = siteData.resume?.file || '/assets/resume/resume.pdf';
let currentResumeLabel = siteData.resume?.label || 'Aditya_Prakash_Resume.pdf';
let isTicking = false;

/**
 * Check if edit mode is active via URL query param (?edit) or hash
 */
export function checkEditMode() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has('edit') || window.location.hash.includes('edit');
}

/**
 * Initialize Journey module
 */
export function initJourney() {
  isEditMode = checkEditMode();

  // Watch for popstate or hashchange to update edit mode if user toggles URL
  window.addEventListener('popstate', () => {
    const newEdit = checkEditMode();
    if (newEdit !== isEditMode) {
      isEditMode = newEdit;
      renderJourney();
    }
  });

  window.addEventListener('hashchange', () => {
    const newEdit = checkEditMode();
    if (newEdit !== isEditMode) {
      isEditMode = newEdit;
      renderJourney();
    }
  });

  // Scroll listener for progress rail fill and lit nodes
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Listen for timeline updates from router or page change
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

  // Render content
  renderJourney();

  // Wire footer résumé link
  setupFooterResumeLink();

  // Initial timeline update
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

/**
 * Update vertical timeline rail progress fill and entry lit states (Section 12)
 * Rail fill height = clamp(0, timelineHeight, innerHeight * 0.7 - timelineTop)
 * Lit state: entry is lit when its top is above innerHeight * 0.7
 */
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

  // height = clamp(0, timelineHeight, innerHeight * 0.7 - timelineTop)
  const currentFill = Math.min(Math.max(threshold - timelineTop, 0), timelineHeight);
  progressEl.style.height = `${currentFill}px`;

  // Update lit state for each entry
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

/**
 * Re-render Journey components
 */
export function renderJourney() {
  renderEditNotice();
  renderTimelineEntries();
  renderResumeBlock();
}

/**
 * Render Edit Mode notice banner (§18.0)
 */
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

/**
 * Render timeline entries (§12)
 */
function renderTimelineEntries() {
  const container = document.getElementById('timeline-entries');
  if (!container || !siteData.journey) return;

  container.innerHTML = siteData.journey.map((item, index) => `
    <div class="timeline-entry" data-index="${index}">
      <div class="timeline-node" aria-hidden="true"></div>
      <div class="timeline-date">${item.dateLabel}</div>
      <h3 class="timeline-title">${item.title}</h3>
      <p class="sub">${item.text}</p>
    </div>
  `).join('');
}

/**
 * Render Résumé Block (§18.3)
 */
function renderResumeBlock() {
  const block = document.getElementById('resume-block');
  if (!block) return;

  const hasFile = Boolean(currentResumeFile);

  block.innerHTML = `
    <div class="resume-info">
      <span class="kicker">RÉSUMÉ — THE FULL CUT</span>
      <h3 class="resume-title">Aditya Prakash Curriculum Vitae</h3>
      <p class="sub resume-sub" id="resume-status-text">
        ${hasFile ? `${currentResumeLabel} · Verified & Updated 2026` : 'No file yet. Upload your PDF to enable View and Download.'}
      </p>
    </div>
    <div class="resume-actions">
      <a href="${hasFile ? currentResumeFile : '#'}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="btn-pill ${hasFile ? 'btn-primary-accent' : 'disabled'}" 
         id="btn-resume-view" 
         data-c="Open" 
         ${hasFile ? '' : 'aria-disabled="true"'}>
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-right: 6px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
         View PDF ↗
      </a>
      <a href="${hasFile ? currentResumeFile : '#'}" 
         download="${currentResumeLabel || 'Aditya_Prakash_Resume.pdf'}" 
         class="btn-pill ${hasFile ? '' : 'disabled'}" 
         id="btn-resume-download" 
         data-c="Save" 
         ${hasFile ? '' : 'aria-disabled="true"'}>
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
         Download PDF ↓
      </a>
      ${isEditMode ? `
        <label class="btn-pill btn-ghost resume-upload-btn" data-c="Upload" tabindex="0" role="button" aria-label="Upload new resume file">
          <span>Upload (Edit Mode)</span>
          <input type="file" id="resume-file-input" class="sr-only" accept=".pdf,.doc,.docx" />
        </label>
      ` : ''}
    </div>
  `;

  // Attach upload event listener if in edit mode
  if (isEditMode) {
    const fileInput = document.getElementById('resume-file-input');
    const uploadLabel = block.querySelector('.resume-upload-btn');
    if (fileInput) {
      fileInput.addEventListener('change', handleResumeUpload);
    }
    if (uploadLabel) {
      uploadLabel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInput?.click();
        }
      });
    }
  }
}

/**
 * Handle Résumé upload preview in edit mode (§18.0, §18.3)
 */
function handleResumeUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (!validTypes.includes(file.type) && !['pdf', 'doc', 'docx'].includes(ext)) {
    alert('Please upload a valid PDF, DOC, or DOCX document.');
    e.target.value = '';
    return;
  }

  // Revoke previous object URL if any
  if (resumeObjectUrl) {
    URL.revokeObjectURL(resumeObjectUrl);
    resumeObjectUrl = null;
  }

  resumeObjectUrl = URL.createObjectURL(file);
  currentResumeFile = resumeObjectUrl;
  currentResumeLabel = file.name;

  renderResumeBlock();
  setupFooterResumeLink();
}

/**
 * Setup footer "Résumé" link behavior (Section 18.3)
 * "Footer 'Résumé' link (third social link): if a résumé exists, it opens it in a new tab.
 * If not, it runs the normal iris transition to Journey and then smooth-scrolls the résumé block to the centre of the viewport."
 */
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

  const hasFile = Boolean(currentResumeFile);

  if (hasFile) {
    resumeLink.href = currentResumeFile;
    resumeLink.target = '_blank';
    resumeLink.rel = 'noopener noreferrer';
    resumeLink.onclick = null;
    resumeLink.removeAttribute('data-go');
  } else {
    resumeLink.href = '#journey';
    resumeLink.onclick = (e) => {
      e.preventDefault();
      navigateTo('journey');
      setTimeout(() => {
        const resumeBlock = document.getElementById('resume-block');
        if (resumeBlock) {
          resumeBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 850);
    };
  }
}
