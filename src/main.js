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
import { initJourney } from './journey.js';

function renderContent() {
  // Home page components (Hero, Marquee, Stats, Filmstrip) are initialized in initHome()

  // Work page components (3D Drum Reel & Accordion) are built and initialized in initReel()

  // About page components (Portrait, Contact Sheet, Kit, Bars, Certified Prints, Awards) are initialized in initAbout()

  // Journey page components (Timeline, Rail, Lit nodes, Résumé block) are initialized in initJourney()

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
  initJourney();
  console.log('Film Lab Portfolio initialized successfully.');
});
