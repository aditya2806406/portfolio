/**
 * FILM LAB PORTFOLIO — MAIN ENTRY POINT
 * Orchestrates module initialization and renders data-driven content.
 */

import { siteData } from './data.js';
import { initMode } from './mode.js';
import { initRouter } from './router.js';
import { initLoader } from './loader.js';
import { initCursor } from './cursor.js';
import { initBackground } from './background.js';
import { initGyro } from './gyro.js';
import { initReel } from './reel.js';
import { initScroll } from './scroll.js';
import { initHome } from './home.js';

function renderContent() {
  // Home page components (Hero, Marquee, Stats, Filmstrip) are initialized in initHome()

  // Work page components (3D Drum Reel & Accordion) are built and initialized in initReel()

  // 6. About Kit (Skills)
  const kitContainer = document.getElementById('kit-grid');
  if (kitContainer && siteData.about.kit) {
    kitContainer.innerHTML = siteData.about.kit.map(kg => `
      <div class="kit-group">
        <h3>${kg.group}</h3>
        <div class="chip-container">
          ${kg.chips.map(c => '<span class="skill-chip">' + c + '</span>').join('')}
        </div>
      </div>
    `).join('');
  }

  // 7. About Proficiency Bars
  const barsContainer = document.getElementById('proficiency-bars');
  if (barsContainer && siteData.about.bars) {
    barsContainer.innerHTML = siteData.about.bars.map(b => `
      <div class="bar-row">
        <span class="sub" style="font-size: 13px;">${b.label}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${b.value}%;"></div>
        </div>
        <span class="sub" style="font-size: 13px; text-align: right;">${b.value}%</span>
      </div>
    `).join('');
  }

  // 8. About Hall of Frames (Awards)
  const awardsContainer = document.getElementById('awards-list');
  if (awardsContainer && siteData.about.awards) {
    awardsContainer.innerHTML = siteData.about.awards.map(a => `
      <div class="award-row">
        <div class="award-year">${a.year}</div>
        <div>
          <div style="font-weight: 600; color: var(--ink);">${a.title}</div>
          <div class="sub" style="font-size: 13px; margin-top: 4px;">${a.detail}</div>
        </div>
      </div>
    `).join('');
  }

  // 9. About Certified Prints
  const certContainer = document.getElementById('certificates-grid');
  if (certContainer && siteData.certificates) {
    certContainer.innerHTML = siteData.certificates.map(c => `
      <div class="certificate-card" style="background: linear-gradient(145deg, #10212e, #1b2d2f);" data-c="View">
        <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.2em; color: var(--teal); margin-bottom: 6px;">${c.type.toUpperCase()} CERTIFICATE</div>
        <div style="font-family: var(--serif); font-size: 18px; font-weight: 600;">${c.title}</div>
        <div style="font-size: 12px; color: var(--mute); margin-top: 4px;">${c.issuer} · ${c.year}</div>
      </div>
    `).join('');
  }

  // 10. Journey Timeline
  const timelineContainer = document.getElementById('timeline-entries');
  if (timelineContainer && siteData.journey) {
    timelineContainer.innerHTML = siteData.journey.map(j => `
      <div class="timeline-entry lit">
        <div class="timeline-node"></div>
        <div class="timeline-date">${j.dateLabel}</div>
        <h3 class="timeline-title">${j.title}</h3>
        <p class="sub">${j.text}</p>
      </div>
    `).join('');
  }

  // 11. Footer Elements
  const footerEmail = document.getElementById('footer-email');
  if (footerEmail && siteData.site.email) {
    footerEmail.href = 'mailto:' + siteData.site.email;
    footerEmail.textContent = siteData.site.email;
  }

  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright && siteData.site.copyright) {
    footerCopyright.textContent = siteData.site.copyright;
  }

  const footerSocials = document.getElementById('footer-socials');
  if (footerSocials && siteData.site.socials) {
    footerSocials.innerHTML = siteData.site.socials.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="footer-social-link">${s.label}</a>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderContent();
  initMode();
  initRouter();
  initLoader();
  initCursor();
  initBackground();
  initGyro();
  initReel();
  initScroll();
  initHome();
  console.log('Film Lab Portfolio initialized successfully.');
});
