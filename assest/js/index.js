/* ============================================================
   360 Solution Provider — App Logic (js/index.js)
   ============================================================ */

'use strict';

// ── DOM ready ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Sidebar toggle button
  document.getElementById('menuToggle').addEventListener('click', () => {
    if (window.innerWidth >= 1024) {
      document.body.classList.toggle('sidebar-collapsed');
    } else {
      document.body.classList.toggle('sidebar-open');
    }
  });

  // Clean up stale sidebar state on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      document.body.classList.remove('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  });

  // Load default page
  navigate('pages/home.html');
});

// ── Navigation ─────────────────────────────────────────────
function navigate(page) {
  const frame = document.getElementById('frame1');
  if (!frame) return;

  frame.classList.remove('loaded');
  frame.setAttribute('src', page);

  document.querySelectorAll('.sidebar-nav .nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  if (window.innerWidth < 1024) closeSidebar();
}

function onFrameLoad(iframe) {
  iframe.classList.add('loaded');
}

// ── Sidebar ────────────────────────────────────────────────
function closeSidebar() {
  document.body.classList.remove('sidebar-open');
}

// ── Toast ──────────────────────────────────────────────────
function showToast(message, type = 'success', duration = 3200) {
  const container = document.getElementById('toast-container');
  const iconMap = {
    success: 'bi-check-circle-fill',
    error:   'bi-x-circle-fill',
    info:    'bi-info-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
  };

  const t = document.createElement('div');
  t.className = `app-toast ${type}`;
  t.innerHTML =
    `<i class="bi ${iconMap[type] || iconMap.success} toast-icon"></i>` +
    `<span>${message}</span>`;

  container.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));

  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 420);
  }, duration);
}
