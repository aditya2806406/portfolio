/**
 * FILM LAB PORTFOLIO — ABOUT OBSERVATORY & CERTIFIED PRINTS
 * Sections 11, 18.0, 18.1, 18.2, 18.4 of master specification.
 */

import { siteData } from './data.js';

let isEditMode = false;
let portraitObjectUrl = null;
let uploadedCerts = [];
let certLightboxEl = null;

/**
 * Check if edit mode is active via URL query param (?edit) or hash
 */
export function checkEditMode() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has('edit') || window.location.hash.includes('edit');
}

/**
 * Initialize About Page logic and interactions
 */
export function initAbout() {
  isEditMode = checkEditMode();

  // Watch for popstate or hashchange to update edit mode if user toggles URL
  window.addEventListener('popstate', () => {
    const newEdit = checkEditMode();
    if (newEdit !== isEditMode) {
      isEditMode = newEdit;
      renderAbout();
    }
  });

  window.addEventListener('hashchange', () => {
    const newEdit = checkEditMode();
    if (newEdit !== isEditMode) {
      isEditMode = newEdit;
      renderAbout();
    }
  });

  // Listen for page navigation to run reveal animations
  window.addEventListener('filmlab:pagechange', (e) => {
    if (e.detail?.page === 'about') {
      triggerPortraitReveal();
      animateProficiencyBars();
    }
  });

  // Initial render
  renderAbout();

  // If already on about page at start, trigger animations
  const pageAbout = document.getElementById('page-about');
  if (pageAbout && pageAbout.classList.contains('on')) {
    triggerPortraitReveal();
    animateProficiencyBars();
  }

  // Setup Lightbox modal
  setupCertLightbox();
}

/**
 * Re-render all About Page subcomponents
 */
export function renderAbout() {
  renderEditNotice();
  renderPortrait();
  renderContactSheet();
  renderKit();
  renderProficiencyBars();
  renderCertificates();
  renderAwards();
}

/**
 * Render Edit Mode notice banner (§18.0)
 */
function renderEditNotice() {
  let noticeEl = document.getElementById('about-edit-notice');
  if (!noticeEl) {
    const aboutWrap = document.querySelector('#page-about .wrap');
    if (aboutWrap) {
      noticeEl = document.createElement('div');
      noticeEl.id = 'about-edit-notice';
      noticeEl.className = 'about-edit-notice';
      aboutWrap.insertBefore(noticeEl, aboutWrap.firstChild);
    }
  }

  if (noticeEl) {
    if (isEditMode) {
      noticeEl.innerHTML = `
        <div class="edit-notice-content">
          <span class="edit-notice-tag">EDIT MODE</span>
          <span class="edit-notice-text">Preview only. Add the file to <code>/assets</code> and <code>data.js</code> to publish.</span>
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
 * Render Portrait slot (§18.1)
 */
function renderPortrait() {
  const frame = document.getElementById('portrait-frame');
  if (!frame) return;

  // Clear existing content
  frame.innerHTML = '';
  frame.className = 'portrait-frame' + (isEditMode ? ' is-edit' : '');

  // Accessibility & lens cursor
  if (isEditMode) {
    frame.setAttribute('data-c', 'Upload');
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('role', 'button');
    frame.setAttribute('aria-label', 'Upload portrait photograph preview');
  } else {
    frame.removeAttribute('data-c');
    frame.removeAttribute('tabindex');
    frame.removeAttribute('role');
    frame.removeAttribute('aria-label');
  }

  // Slate tag (§18.1)
  const slateTag = document.createElement('div');
  slateTag.className = 'portrait-slate-tag';
  slateTag.textContent = 'TAKE 01 — SLATE';
  frame.appendChild(slateTag);

  // Hidden file input for edit mode
  if (isEditMode) {
    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'portrait-file-input';
    input.className = 'sr-only portrait-input';
    input.accept = 'image/*';
    input.addEventListener('change', handlePortraitUpload);
    frame.appendChild(input);

    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input.click();
      }
    });
  }

  const currentSrc = portraitObjectUrl || siteData.portrait?.src;

  // Placeholder container
  const placeholder = document.createElement('div');
  placeholder.className = 'portrait-placeholder';
  placeholder.innerHTML = `
    <span class="portrait-placeholder-title">Your portrait</span>
    <span class="portrait-placeholder-sub">${isEditMode ? 'Click to upload a photo / 3:4 · at least 1200px tall' : 'Aditya Prakash · VIT-AP University'}</span>
  `;
  frame.appendChild(placeholder);

  if (currentSrc) {
    const img = document.createElement('img');
    img.className = 'portrait-img';
    img.alt = siteData.portrait?.alt || 'Aditya Prakash — Portrait';
    img.loading = 'eager';
    img.width = 600;
    img.height = 800;
    img.style.display = 'none';

    img.onload = () => {
      img.style.display = 'block';
      placeholder.style.display = 'none';
    };

    img.onerror = () => {
      img.remove();
      placeholder.style.display = 'flex';
    };

    img.src = currentSrc;
    frame.appendChild(img);
  } else {
    placeholder.style.display = 'flex';
  }
}

/**
 * Handle portrait file upload preview in edit mode (§18.0, §18.1)
 */
function handlePortraitUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Invalid file format. Please select an image file (JPG, PNG, WebP).');
    e.target.value = '';
    return;
  }

  // Revoke previous object URL if any
  if (portraitObjectUrl) {
    URL.revokeObjectURL(portraitObjectUrl);
    portraitObjectUrl = null;
  }

  portraitObjectUrl = URL.createObjectURL(file);
  renderPortrait();
}

/**
 * Portrait reveal animation: top-to-bottom clip reveal (§18.1)
 * "every time the About page becomes visible, the frame reveals from top to bottom
 * with clip-path: inset(0 0 100% 0) -> full over 1.3s cubic-bezier(.16,1,.3,1)"
 */
export function triggerPortraitReveal() {
  const frame = document.getElementById('portrait-frame');
  if (!frame) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    frame.style.clipPath = 'inset(0 0 0% 0)';
    return;
  }

  frame.animate(
    [
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)' }
    ],
    {
      duration: 1300,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    }
  );
}

/**
 * Render Contact Sheet 2x2 grid (§11.1)
 * "a 2x2 grid inside a #020d0f panel (padding 16px, radius 6px, gap 10px),
 * caption text spanning both columns (11px, letter-spacing .1em, mute).
 * Each tile: aspect-ratio 3/4, radius 3px, image or gradient, filter:grayscale(.8) contrast(1.1).
 * Hover: colour returns and the tile scales to 1.04 and rises above the others (.6s cubic-bezier(.16,1,.3,1)).
 * Every second tile has margin-top:30px for a staggered look."
 */
function renderContactSheet() {
  const panel = document.querySelector('.contact-sheet-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="contact-sheet-caption">FIGURE 01 — ARCHITECTURAL FIELD STUDIES · 4-FRAME CONTACT SHEET</div>
    <div class="contact-sheet-grid">
      ${siteData.about.contactSheet.map((tile, i) => `
        <div class="contact-sheet-tile ${i % 2 === 1 ? 'staggered' : ''}" style="background: ${tile.gradient};" data-c="Frame">
          <div class="tile-number">${String(i + 1).padStart(2, '0')}</div>
          <div class="tile-title">${tile.title}</div>
          <div class="tile-sub">${tile.subtitle}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Render Technical Kit (Skills chips) (§11.2)
 * "grid auto-fit minmax(220px,1fr), gap 40px, margin-top 6vh. Three groups, each with an
 * italic Fraunces 24px amber heading and pill chips (1px line border, radius 99px, 13px text, padding 4px 12px).
 * Chip hover: background becomes --ink, text --bg, and the chip lifts translateY(-3px) (.3s)."
 */
function renderKit() {
  const kitContainer = document.getElementById('kit-grid');
  if (!kitContainer || !siteData.about.kit) return;

  kitContainer.innerHTML = siteData.about.kit.map(kg => `
    <div class="kit-group">
      <h3 class="kit-group-title">${kg.group}</h3>
      <div class="chip-container">
        ${kg.chips.map(chip => `<span class="skill-chip">${chip}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * Render Proficiency Bars (§11.3)
 * "stack (gap 22px, max-width 760px, margin-top 12vh). Row grid 140px 1fr 44px, gap 16px: label, bar, value.
 * The bar is a 2px --line track with a 4px amber fill (width = value%, box-shadow:0 0 14px amber)."
 */
function renderProficiencyBars() {
  const barsContainer = document.getElementById('proficiency-bars');
  if (!barsContainer || !siteData.about.bars) return;

  barsContainer.innerHTML = siteData.about.bars.map(b => `
    <div class="bar-row">
      <span class="bar-label">${b.label}</span>
      <div class="bar-track">
        <div class="bar-fill" data-value="${b.value}" style="width: 0%;"></div>
      </div>
      <span class="bar-val">${b.value}%</span>
    </div>
  `).join('');
}

/**
 * Animate Proficiency Bars (§11.3)
 * "The fill runs a 1.6s cubic-bezier(.16,1,.3,1) width 0 -> value animation each time the About page becomes visible."
 */
export function animateProficiencyBars() {
  const fills = document.querySelectorAll('#proficiency-bars .bar-fill');
  if (!fills.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  fills.forEach(fill => {
    const targetVal = fill.getAttribute('data-value') || '0';
    if (prefersReducedMotion) {
      fill.style.width = targetVal + '%';
      return;
    }

    fill.style.width = '0%';
    requestAnimationFrame(() => {
      fill.animate(
        [
          { width: '0%' },
          { width: `${targetVal}%` }
        ],
        {
          duration: 1600,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }
      );
    });
  });
}

/**
 * Render Certified Prints Gallery (§18.2)
 * Film-print cards, aspect-ratio 4/3, PDF badge, hover tilt, lightbox trigger, edit-mode upload tile.
 */
function renderCertificates() {
  const certContainer = document.getElementById('certificates-grid');
  if (!certContainer) return;

  certContainer.innerHTML = '';

  const allCerts = [...siteData.certificates, ...uploadedCerts];

  allCerts.forEach((cert, index) => {
    const card = document.createElement('div');
    card.className = 'certificate-card' + (cert.type === 'pdf' ? ' cert-pdf' : ' cert-image');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-c', 'View');
    card.setAttribute('aria-label', `View ${cert.title} certificate`);

    const gradientBg = cert.gradient || 'linear-gradient(145deg, #10212e, #1b2d2f)';
    card.style.background = gradientBg;

    // Inner card markup
    let badgeHtml = '';
    if (cert.type === 'pdf') {
      badgeHtml = `<span class="cert-badge-pdf">PDF</span>`;
    }

    let removeBtnHtml = '';
    if (isEditMode && cert.isObjectUrl) {
      removeBtnHtml = `
        <button type="button" class="cert-remove-btn" data-cert-id="${cert.id}" aria-label="Remove uploaded certificate preview" title="Remove preview">×</button>
      `;
    }

    card.innerHTML = `
      ${badgeHtml}
      ${removeBtnHtml}
      <div class="cert-card-content">
        <div class="cert-card-title">${cert.title}</div>
        <div class="cert-card-meta">${cert.issuer} · ${cert.year}</div>
      </div>
    `;

    // Click & Keyboard action
    card.addEventListener('click', (e) => {
      if (e.target.closest('.cert-remove-btn')) return;
      openCertificate(cert);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.cert-remove-btn')) return;
        e.preventDefault();
        openCertificate(cert);
      }
    });

    certContainer.appendChild(card);
  });

  // Edit Mode Upload Tile (§18.2)
  // "The last tile is always the upload tile ('+ Add certificates'): dashed 1px mute border, no fill,
  // centred '+' (Fraunces 200, 54px) and label; hover turns border and text amber.
  // In production it is shown only in edit mode."
  if (isEditMode) {
    const uploadTile = document.createElement('label');
    uploadTile.className = 'certificate-upload-tile';
    uploadTile.setAttribute('tabindex', '0');
    uploadTile.setAttribute('role', 'button');
    uploadTile.setAttribute('data-c', 'Upload');
    uploadTile.setAttribute('aria-label', 'Upload certificate files for preview');

    uploadTile.innerHTML = `
      <span class="upload-plus">+</span>
      <span class="upload-label">Add certificates</span>
      <span class="upload-sub">PDF or Image · Multiple files</span>
      <input type="file" class="sr-only cert-upload-input" accept="image/*,application/pdf" multiple />
    `;

    const fileInput = uploadTile.querySelector('.cert-upload-input');
    fileInput.addEventListener('change', handleCertificatesUpload);

    uploadTile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });

    certContainer.appendChild(uploadTile);
  }

  // Attach event delegation for remove buttons
  certContainer.querySelectorAll('.cert-remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-cert-id');
      removeUploadedCert(id);
    });
  });
}

/**
 * Open Certificate in Lightbox (for images/placeholders) or new tab (for PDFs) (§18.2)
 */
function openCertificate(cert) {
  if (cert.type === 'pdf') {
    window.open(cert.file, '_blank', 'noopener,noreferrer');
  } else {
    showCertLightbox(cert);
  }
}

/**
 * Handle certificate upload in edit mode (§18.0, §18.2)
 */
function handleCertificatesUpload(e) {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  files.forEach(file => {
    const isPdf = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) return;

    const objectUrl = URL.createObjectURL(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');

    uploadedCerts.push({
      id: 'cert-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      title: cleanName,
      issuer: 'Local Preview',
      year: new Date().getFullYear().toString(),
      type: isPdf ? 'pdf' : 'image',
      file: objectUrl,
      gradient: isPdf ? 'linear-gradient(145deg, #1c2b29, #254d42)' : 'linear-gradient(145deg, #2b1d1c, #4d2d25)',
      isObjectUrl: true,
    });
  });

  e.target.value = '';
  renderCertificates();
}

/**
 * Remove an uploaded certificate preview and revoke its object URL
 */
function removeUploadedCert(id) {
  const idx = uploadedCerts.findIndex(c => c.id === id);
  if (idx !== -1) {
    const cert = uploadedCerts[idx];
    if (cert.isObjectUrl && cert.file) {
      URL.revokeObjectURL(cert.file);
    }
    uploadedCerts.splice(idx, 1);
    renderCertificates();
  }
}

/**
 * Setup Lightbox modal DOM & controls (§18.2)
 * "Image: a full-screen lightbox (fixed, z-index 55, background rgba(2,13,15,.94), fades in .4s).
 * The image is shown contain inside a box min(88vw,1000px) × min(78vh,720px), scaling from .94 to 1 over .6s.
 * Clicking anywhere or pressing Escape closes it."
 */
function setupCertLightbox() {
  certLightboxEl = document.getElementById('cert-lightbox');
  if (!certLightboxEl) {
    certLightboxEl = document.createElement('div');
    certLightboxEl.id = 'cert-lightbox';
    certLightboxEl.className = 'cert-lightbox';
    certLightboxEl.setAttribute('role', 'dialog');
    certLightboxEl.setAttribute('aria-modal', 'true');
    certLightboxEl.setAttribute('aria-label', 'Certificate Lightbox');
    certLightboxEl.setAttribute('hidden', '');
    document.body.appendChild(certLightboxEl);
  }

  certLightboxEl.addEventListener('click', (e) => {
    // Clicking anywhere closes it
    closeCertLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !certLightboxEl.hasAttribute('hidden')) {
      closeCertLightbox();
    }
  });
}

function showCertLightbox(cert) {
  if (!certLightboxEl) setupCertLightbox();

  certLightboxEl.removeAttribute('hidden');
  certLightboxEl.classList.add('open');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  certLightboxEl.innerHTML = `
    <div class="cert-lightbox-inner" role="document">
      <button type="button" class="cert-lightbox-close" aria-label="Close certificate lightbox" data-c="Close">✕</button>
      <div class="cert-lightbox-frame" style="background: ${cert.gradient || 'linear-gradient(145deg, #10212e, #1b2d2f)'};">
        ${cert.type === 'image' && cert.file ? `
          <img src="${cert.file}" alt="${cert.title}" class="cert-lightbox-img" />
        ` : `
          <div class="cert-lightbox-placeholder">
            <span class="kicker" style="color: var(--teal);">VERIFIED CREDENTIAL</span>
            <h3 class="cert-lightbox-title">${cert.title}</h3>
            <p class="sub" style="margin-top: 1vh; font-size: 14px;">${cert.issuer} · ${cert.year}</p>
            <div class="cert-lightbox-seal">TAKE 01 — VERIFIED</div>
          </div>
        `}
      </div>
    </div>
  `;

  const inner = certLightboxEl.querySelector('.cert-lightbox-inner');
  if (!prefersReducedMotion && inner) {
    inner.animate(
      [
        { transform: 'scale(0.94)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ],
      {
        duration: 600,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      }
    );
  }
}

function closeCertLightbox() {
  if (!certLightboxEl || certLightboxEl.hasAttribute('hidden')) return;
  certLightboxEl.classList.remove('open');
  certLightboxEl.setAttribute('hidden', '');
  certLightboxEl.innerHTML = '';
}

/**
 * Render Hall of frames (Awards) (§11.4)
 * "h2 with margin 14vh top / 5vh bottom, then an unstyled list.
 * Each row: grid 70px 1fr auto, gap 16px, padding 20px 0, border-top:1px solid --line;
 * year in Fraunces italic 20px amber; title; right-aligned small mute detail.
 * Hover: background linear-gradient(90deg, rgba(255,178,74,.1), transparent) and padding-left 16px (.4s)."
 */
function renderAwards() {
  const awardsContainer = document.getElementById('awards-list');
  if (!awardsContainer || !siteData.about.awards) return;

  awardsContainer.innerHTML = siteData.about.awards.map(a => `
    <div class="award-row">
      <div class="award-year">${a.year}</div>
      <div class="award-body">
        <div class="award-title">${a.title}</div>
      </div>
      <div class="award-detail">${a.detail}</div>
    </div>
  `).join('');
}
