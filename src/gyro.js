/**
 * FILM LAB PORTFOLIO — 3D PERSISTENT GYROSCOPE
 * Section 7 of master specification.
 */

import { getActivePage } from './router.js';
import { isNoirMode } from './mode.js';

const PAGE_GYRO_TARGETS = {
  home: [0.72, 0.50],
  work: [0.88, 0.28],
  about: [0.14, 0.60],
  journey: [0.86, 0.58],
};

let canvas, ctx;
let animId = null;
let mouseX = 0;
let mouseY = 0;
let hasMouseMoved = false;

// Page glide coordinates (fractions of viewport)
let targetCx = 0.72;
let targetCy = 0.50;
let curCx = 0.72;
let curCy = 0.50;

// Geometry: 3 rings, 72 segments each (73 points to close)
const SEGMENTS = 72;
let ringBasePoints = [];

function rot(p, a, b) {
  const [x, y, z] = p;
  const y1 = y * Math.cos(a) - z * Math.sin(a);
  const z1 = y * Math.sin(a) + z * Math.cos(a);
  return [x * Math.cos(b) + z1 * Math.sin(b), y1, -x * Math.sin(b) + z1 * Math.cos(b)];
}

function precalculateRings() {
  ringBasePoints = [];
  for (let k = 0; k < 3; k++) {
    const ring = [];
    const angX = k * 1.0472;
    const angY = k * 0.6;
    for (let i = 0; i <= SEGMENTS; i++) {
      const u = (i * 2 * Math.PI) / SEGMENTS;
      const p = [Math.cos(u), Math.sin(u), 0];
      ring.push(rot(p, angX, angY));
    }
    ringBasePoints.push(ring);
  }
}

export function initGyro() {
  canvas = document.getElementById('gyro-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  if (!ctx) return;

  precalculateRings();

  function updateDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (!hasMouseMoved) {
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight / 2;
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

  // Set initial page target
  const initialPage = getActivePage() || 'home';
  setGyroPage(initialPage);
  curCx = targetCx;
  curCy = targetCy;

  // Listen to router page changes
  window.addEventListener('filmlab:pagechange', (e) => {
    if (e.detail?.page) {
      setGyroPage(e.detail.page);
    }
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    drawFrame(0);
  } else {
    startAnimationLoop();
  }
}

export function setGyroPage(pageId) {
  const target = PAGE_GYRO_TARGETS[pageId] || PAGE_GYRO_TARGETS.home;
  targetCx = target[0];
  targetCy = target[1];
}

function startAnimationLoop() {
  if (animId) cancelAnimationFrame(animId);

  function loop(now) {
    drawFrame(now);
    animId = requestAnimationFrame(loop);
  }

  animId = requestAnimationFrame(loop);
}

function drawFrame(t) {
  if (!canvas || !ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  if (!w || !h) return; // Zero-size guard

  // Interpolate centre position per page at 0.04/frame
  curCx += (targetCx - curCx) * 0.04;
  curCy += (targetCy - curCy) * 0.04;

  const cx = curCx * w;
  const cy = curCy * h;

  const R = Math.min(w, h) * (w < 800 ? 0.22 : 0.3);

  const scrollY = window.scrollY || 0;
  const normMouseX = mouseX / w - 0.5;
  const normMouseY = mouseY / h - 0.5;

  // Global rotation each frame
  const a = t * 0.00018 + scrollY * 0.0016 + normMouseY * 0.8;
  const b = t * 0.00027 + scrollY * 0.0011 + normMouseX * 0.8;

  ctx.clearRect(0, 0, w, h);

  const isNoir = isNoirMode();

  for (let k = 0; k < 3; k++) {
    const ringPoints = ringBasePoints[k];
    const projected = [];

    // Project 3D points
    for (let i = 0; i <= SEGMENTS; i++) {
      const pRot = rot(ringPoints[i], a, b);
      const [rx, ry, rz] = pRot;
      const s = 1 / (1.9 - rz * 0.5);
      const sx = cx + rx * R * s * 1.5;
      const sy = cy + ry * R * s * 1.5;
      projected.push({ sx, sy, rz });
    }

    // Colours
    let ringStroke, nodeBaseColor;
    if (!isNoir) {
      if (k === 0) {
        ringStroke = 'rgba(255, 178, 74, 0.38)';
        nodeBaseColor = '255, 178, 74';
      } else {
        ringStroke = 'rgba(47, 181, 176, 0.38)';
        nodeBaseColor = '47, 181, 176';
      }
    } else {
      if (k === 0) {
        ringStroke = 'rgba(235, 235, 235, 0.38)';
        nodeBaseColor = '235, 235, 235';
      } else {
        ringStroke = 'rgba(150, 150, 150, 0.38)';
        nodeBaseColor = '150, 150, 150';
      }
    }

    // Draw 1px polyline
    ctx.strokeStyle = ringStroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(projected[0].sx, projected[0].sy);
    for (let i = 1; i <= SEGMENTS; i++) {
      ctx.lineTo(projected[i].sx, projected[i].sy);
    }
    ctx.stroke();

    // Draw nodes every 9th point
    for (let i = 0; i < SEGMENTS; i += 9) {
      const pt = projected[i];
      const nodeRadius = Math.max(0.5, 2.4 + pt.rz * 1.2);
      const alpha = Math.min(1, Math.max(0.05, 0.5 + pt.rz * 0.4));
      ctx.fillStyle = `rgba(${nodeBaseColor}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(pt.sx, pt.sy, nodeRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
