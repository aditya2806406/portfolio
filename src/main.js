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
import { initAbout } from './about.js';

function renderContent() {
  // Home page components (Hero, Marquee, Stats, Filmstrip) are initialized in initHome()

  // Work page components (3D Drum Reel & Accordion) are built and initialized in initReel()

  // About page components (Portrait, Contact Sheet, Kit, Bars, Certified Prints, Awards) are initialized in initAbout()

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
  initAbout();
  console.log('Film Lab Portfolio initialized successfully.');
});
