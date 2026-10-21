
import { siteData, SKILL_CATEGORIES, SKILL_CATEGORY_MAP } from './data.js';
import { observeNewContent } from './reveal.js';

let isEditMode = false;
let portraitObjectUrl = null;
let uploadedCerts = [];
let certLightboxEl = null;
let activeSkillCategory = 'all';

export function checkEditMode() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has('edit') || window.location.hash.includes('edit');
}

export function initAbout() {
  isEditMode = checkEditMode();

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

  window.addEventListener('filmlab:pagechange', (e) => {
    if (e.detail?.page === 'about') {
      triggerPortraitReveal();
      animateProficiencyBars();
    }
  });

  renderAbout();

  const pageAbout = document.getElementById('page-about');
  if (pageAbout && pageAbout.classList.contains('on')) {
    triggerPortraitReveal();
    animateProficiencyBars();
  }

  setupCertLightbox();
}

export function renderAbout() {
  renderEditNotice();
  renderPortrait();
  renderSkillFilters();
  renderKit();
  renderProficiencyBars();
  renderCertificates();
  renderBeyondBuild();
}

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

function renderPortrait() {
  const frame = document.getElementById('portrait-frame');
  if (!frame) return;

  frame.innerHTML = '';
  frame.className = 'portrait-frame' + (isEditMode ? ' is-edit' : '');

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

  const slateTag = document.createElement('div');
  slateTag.className = 'portrait-slate-tag';
  slateTag.textContent = 'TAKE 01 — SLATE';
  frame.appendChild(slateTag);

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

function handlePortraitUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Invalid file format. Please select an image file (JPG, PNG, WebP).');
    e.target.value = '';
    return;
  }

  if (portraitObjectUrl) {
    URL.revokeObjectURL(portraitObjectUrl);
    portraitObjectUrl = null;
  }

  portraitObjectUrl = URL.createObjectURL(file);
  renderPortrait();
}

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

function renderSkillFilters() {
  const nav = document.getElementById('skill-filters-nav');
  if (!nav || !SKILL_CATEGORIES) return;

  nav.innerHTML = SKILL_CATEGORIES.map(cat => {
    const isSelected = cat.id === activeSkillCategory;
    return `
      <button type="button"
              class="skill-filter-btn ${isSelected ? 'active' : ''}"
              data-cat="${cat.id}"
              aria-pressed="${isSelected ? 'true' : 'false'}"
              data-c="Filter">
        ${cat.label}
      </button>
    `;
  }).join('');

  nav.querySelectorAll('.skill-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-cat');
      if (catId === activeSkillCategory) return;
      activeSkillCategory = catId;

      nav.querySelectorAll('.skill-filter-btn').forEach(b => {
        const active = b.getAttribute('data-cat') === activeSkillCategory;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      renderKit();
    });
  });
}

function renderKit() {
  const kitContainer = document.getElementById('kit-grid');
  if (!kitContainer || !siteData.about.kit) return;

  if (activeSkillCategory === 'all') {
    kitContainer.innerHTML = siteData.about.kit.map(kg => `
      <div class="kit-group kit-fade-in">
        <h3 class="kit-group-title">${kg.group}</h3>
        <div class="chip-container">
          ${kg.chips.map(chip => `<span class="skill-chip">${chip}</span>`).join('')}
        </div>
      </div>
    `).join('');
  } else {
    const activeCatObj = SKILL_CATEGORIES.find(c => c.id === activeSkillCategory);
    const categoryTitle = activeCatObj ? activeCatObj.label : 'FILTERED';

    const matchedChips = [];
    siteData.about.kit.forEach(kg => {
      kg.chips.forEach(chip => {
        const cats = SKILL_CATEGORY_MAP[chip] || [];
        if (cats.includes(activeSkillCategory) && !matchedChips.includes(chip)) {
          matchedChips.push(chip);
        }
      });
    });

    kitContainer.innerHTML = `
      <div class="kit-group filtered-kit-group kit-fade-in">
        <h3 class="kit-group-title">${categoryTitle} ARSENAL</h3>
        <div class="chip-container">
          ${matchedChips.map(chip => `<span class="skill-chip">${chip}</span>`).join('')}
        </div>
      </div>
    `;
  }
}

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

function renderCertificates() {
  const certContainer = document.getElementById('certificates-grid');
  if (!certContainer) return;

  certContainer.innerHTML = '';

  const allCerts = [...siteData.certificates, ...uploadedCerts];

  allCerts.forEach((cert, index) => {
    const card = document.createElement('div');
    const delayClass = `reveal-delay-${(index % 4) + 1}`;
    card.className = `certificate-card reveal-init ${delayClass}` + (cert.type === 'pdf' ? ' cert-pdf' : ' cert-image');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-c', 'View');
    card.setAttribute('aria-label', `View ${cert.title} certificate`);

    const bgImage = (cert.type === 'image' && cert.file) ? cert.file : (cert.thumbnail || null);
    if (bgImage) {
      card.style.background = `linear-gradient(rgba(2, 13, 15, 0.45), rgba(2, 13, 15, 0.85)), url('${bgImage}') center/cover no-repeat`;
    } else {
      card.style.background = cert.gradient || 'linear-gradient(145deg, #10212e, #1b2d2f)';
    }

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

  certContainer.querySelectorAll('.cert-remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-cert-id');
      removeUploadedCert(id);
    });
  });

  observeNewContent(certContainer);
}

function openCertificate(cert) {
  showCertLightbox(cert);
}

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

    if (e.target.closest('.cert-lightbox-actions') || e.target.closest('iframe')) return;
    closeCertLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!certLightboxEl || certLightboxEl.hasAttribute('hidden')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      closeCertLightbox();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(
        certLightboxEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (!focusables.length) return;
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable || !certLightboxEl.contains(document.activeElement)) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable || !certLightboxEl.contains(document.activeElement)) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

let lastFocusedCertEl = null;

function showCertLightbox(cert) {
  if (!certLightboxEl) setupCertLightbox();

  lastFocusedCertEl = document.activeElement;

  certLightboxEl.removeAttribute('hidden');
  certLightboxEl.classList.add('open');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let mediaHtml = '';
  if (cert.type === 'image' && cert.file) {
    mediaHtml = `<img src="${cert.file}" alt="${cert.title}" class="cert-lightbox-img" />`;
  } else if (cert.type === 'pdf' && cert.file) {
    if (cert.thumbnail) {
      mediaHtml = `
        <div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #0b181c;">
          <img src="${cert.thumbnail}" alt="${cert.title}" class="cert-lightbox-img" style="max-height: 100%; width: auto; object-fit: contain;" />
        </div>
      `;
    } else {
      mediaHtml = `
        <iframe src="${cert.file}#toolbar=0" title="${cert.title}" class="cert-lightbox-embed" style="width: 100%; height: 100%; border: none; border-radius: 4px; background: #ffffff;"></iframe>
      `;
    }
  } else {
    mediaHtml = `
      <div class="cert-lightbox-placeholder">
        <span class="kicker" style="color: var(--teal);">VERIFIED CREDENTIAL</span>
        <h3 class="cert-lightbox-title">${cert.title}</h3>
        <p class="sub" style="margin-top: 1vh; font-size: 14px;">${cert.issuer} · ${cert.year}</p>
        <div class="cert-lightbox-seal">TAKE 01 — VERIFIED</div>
      </div>
    `;
  }

  certLightboxEl.innerHTML = `
    <div class="cert-lightbox-inner" role="document">
      <button type="button" class="cert-lightbox-close" aria-label="Close certificate lightbox" data-c="Close">✕</button>
      <div class="cert-lightbox-frame" style="background: ${cert.gradient || 'linear-gradient(145deg, #10212e, #1b2d2f)'};">
        ${mediaHtml}
      </div>
      <div class="cert-lightbox-actions" style="margin-top: 14px; display: flex; gap: 12px; justify-content: center; z-index: 10;">
        <a href="${cert.file}" target="_blank" rel="noopener noreferrer" class="btn-pill" data-c="Open" style="background: var(--amber); color: #020d0f; font-weight: 700; border-color: var(--amber);">
          ${cert.type === 'pdf' ? 'Open PDF in New Window ↗' : 'View Full Image ↗'}
        </a>
      </div>
    </div>
  `;

  const closeBtn = certLightboxEl.querySelector('.cert-lightbox-close');
  if (closeBtn) {
    closeBtn.focus();
  }

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

  if (lastFocusedCertEl && typeof lastFocusedCertEl.focus === 'function') {
    try {
      lastFocusedCertEl.focus();
    } catch (_) {}
    lastFocusedCertEl = null;
  }
}

function renderBeyondBuild() {
  const container = document.getElementById('beyond-build-list') || document.getElementById('awards-list');
  const reflections = siteData.about?.reflections || [];
  if (!container || !reflections.length) return;

  const [r1, r2, r3] = reflections;

  container.innerHTML = `
    <!-- REFLECTION 01 — THE CURIOSITY -->
    ${r1 ? `
      <article class="reflection-chapter chapter-prominent reveal-init reveal-delay-1">
        <div class="chapter-header">
          <span class="chapter-num">${r1.num}</span>
          <span class="chapter-dot" aria-hidden="true">·</span>
          <span class="chapter-label">${r1.label}</span>
        </div>
        <h3 class="chapter-heading">${r1.heading}</h3>
        <p class="chapter-body">${r1.body}</p>
      </article>
    ` : ''}

    <!-- REFLECTION 02 — THE CONNECTIONS -->
    ${r2 ? `
      <article class="reflection-chapter chapter-split reveal-init reveal-delay-2">
        <div class="chapter-split-col chapter-split-left">
          <div class="chapter-header">
            <span class="chapter-num">${r2.num}</span>
            <span class="chapter-dot" aria-hidden="true">·</span>
            <span class="chapter-label">${r2.label}</span>
          </div>
          <h3 class="chapter-heading">${r2.heading}</h3>
        </div>
        <div class="chapter-split-col chapter-split-right">
          <p class="chapter-body chapter-body-accent">${r2.body}</p>
        </div>
      </article>
    ` : ''}

    <!-- REFLECTION 03 — THE UNFINISHED PART -->
    ${r3 ? `
      <article class="reflection-chapter chapter-frame reveal-init reveal-delay-3">
        <div class="chapter-frame-inner">
          <div class="chapter-header">
            <span class="chapter-num">${r3.num}</span>
            <span class="chapter-dot" aria-hidden="true">·</span>
            <span class="chapter-label">${r3.label}</span>
          </div>
          <h3 class="chapter-heading chapter-heading-italic">${r3.heading}</h3>
          <p class="chapter-body">${r3.body}</p>
        </div>
      </article>
    ` : ''}
  `;

  observeNewContent(container);
}

const renderAwards = renderBeyondBuild;
