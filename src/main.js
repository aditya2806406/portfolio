
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
import { initScrollReveal } from './reveal.js';
import { initCinematicEffects } from './cinematic-effects.js';

function renderContent() {

  const footerEmail = document.getElementById('footer-email');
  if (footerEmail && siteData.site.email) {
    footerEmail.href = 'mailto:' + siteData.site.email;
  }

  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright && siteData.site.copyright) {
    footerCopyright.textContent = siteData.site.copyright;
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
  initScrollReveal();
  initCinematicEffects();
  console.log('Film Lab Portfolio initialized successfully.');
});
