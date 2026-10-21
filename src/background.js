
import { getActivePage } from './router.js';
import { isNoirMode } from './mode.js';

const PAGE_HUES = {
  home: [30, 175],
  work: [200, 330],
  about: [10, 260],
  journey: [40, 165],
};

let canvas, ctx;
let orbs = [];
let animId = null;
let mouseX = 0;
let mouseY = 0;
let hasMouseMoved = false;

let targetH0 = 30;
let targetH1 = 175;
let currentH0 = 30;
let currentH1 = 175;

let targetS = 85;
let currentS = 85;

function createOrbs(count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      x: Math.random(),
      y: Math.random(),
      r: 40 + Math.random() * 130,
      alpha: 0.05 + Math.random() * 0.10,
      vx: (Math.random() - 0.5) * 0.00006,
      vy: (Math.random() - 0.5) * 0.00006,
      k: i % 2,
      z: 0.2 + Math.random() * 1.0,
    });
  }
  return list;
}

export function initBackground() {
  canvas = document.getElementById('bokeh-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  if (!ctx) return;

  function updateDimensions() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    if (!hasMouseMoved) {
      mouseX = w / 2;
      mouseY = h / 2;
    }

    const neededCount = w < 800 ? 9 : 22;
    if (orbs.length !== neededCount) {
      orbs = createOrbs(neededCount);
    }
  }

  window.addEventListener('resize', updateDimensions);
  updateDimensions();

  window.addEventListener(
    'pointermove',
    (e) => {
      hasMouseMoved = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    },
    { passive: true }
  );

  const initialPage = getActivePage() || 'home';
  setBokehPage(initialPage);

  window.addEventListener('filmlab:pagechange', (e) => {
    if (e.detail?.page) {
      setBokehPage(e.detail.page);
    }
  });

  window.addEventListener('filmlab:modechange', (e) => {
    const isNoir = e.detail?.isNoir ?? isNoirMode();
    targetS = isNoir ? 0 : 85;
  });

  targetS = isNoirMode() ? 0 : 85;
  currentS = targetS;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    drawFrame();
  } else {
    startAnimationLoop();
  }
}

export function setBokehPage(pageId) {
  const hues = PAGE_HUES[pageId] || PAGE_HUES.home;
  targetH0 = hues[0];
  targetH1 = hues[1];
}

function startAnimationLoop() {
  if (animId) cancelAnimationFrame(animId);

  function loop() {
    drawFrame();
    animId = requestAnimationFrame(loop);
  }

  animId = requestAnimationFrame(loop);
}

function drawFrame() {
  if (!canvas || !ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  if (!w || !h) return;

  currentH0 += (targetH0 - currentH0) * 0.03;
  currentH1 += (targetH1 - currentH1) * 0.03;

  currentS += (targetS - currentS) * 0.05;

  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';

  for (let i = 0; i < orbs.length; i++) {
    const orb = orbs[i];

    orb.x = (orb.x + orb.vx + 1) % 1;
    orb.y = (orb.y + orb.vy + 1) % 1;

    const px = orb.x * w + (mouseX / w - 0.5) * -90 * orb.z;
    const py = orb.y * h + (mouseY / h - 0.5) * -90 * orb.z;

    const hue = orb.k === 0 ? currentH0 : currentH1;

    const grad = ctx.createRadialGradient(px, py, 0, px, py, orb.r);
    grad.addColorStop(0, `hsla(${hue}, ${currentS}%, 55%, ${orb.alpha})`);
    grad.addColorStop(1, `hsla(${hue}, ${currentS}%, 55%, 0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, orb.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
