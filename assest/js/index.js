/* ============================================================
   360 Solution Provider — App Logic (js/index.js)
   ============================================================ */

'use strict';

// ── User database ──────────────────────────────────────────────
const USERS = {
  'vikas gola':      { password: '24111999', display: 'Vikas Gola',      avatar: 'assest/images/vikas.JPG'    },
  'tarun gupta':     { password: '10112000', display: 'Tarun Gupta',     avatar: 'assest/images/tarun.jpeg'   },
  'aman shakya':     { password: '18032001', display: 'Aman Shakya',     avatar: 'assest/images/aman.jpg'     },
  'taruwarsh kumar': { password: '07082000', display: 'Taruwarsh Kumar', avatar: 'assest/images/avtar.jpeg'   },
  'animesh dixit':   { password: '09062001', display: 'Animesh Dixit',   avatar: 'assest/images/animesh.jpeg' },
  'astha verma':     { password: '17112000', display: 'Astha Verma',     avatar: 'assest/images/astha.jpg'    },
};

// ── Bootstrap modal instances ──────────────────────────────────
let bsLoginModal, bsSignupModal;

// ── DOM ready ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  bsLoginModal  = new bootstrap.Modal('#loginModal');
  bsSignupModal = new bootstrap.Modal('#signupModal');

  // Restore session
  if (localStorage.getItem('loggedIn') === 'true') {
    const u = localStorage.getItem('username');
    if (u && USERS[u]) applyLoggedIn(u);
  }

  // Sidebar toggle button
  document.getElementById('menuToggle').addEventListener('click', () => {
    if (window.innerWidth >= 1024) {
      // On desktop toggle a collapsed class to hide sidebar
      document.body.classList.toggle('sidebar-collapsed');
      const main = document.querySelector('.main-content');
      if (document.body.classList.contains('sidebar-collapsed')) {
        main.style.marginLeft = '0';
      } else {
        main.style.marginLeft = 'var(--sidebar-w)';
      }
    } else {
      document.body.classList.toggle('sidebar-open');
    }
  });

  // Load default page
  navigate('pages/home.html');
});

// ── Navigation ─────────────────────────────────────────────────
function navigate(page) {
  const frame = document.getElementById('frame1');
  if (!frame) return;

  frame.classList.remove('loaded');
  frame.setAttribute('src', page);

  // Active state
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Close mobile sidebar
  if (window.innerWidth < 1024) closeSidebar();
}

function onFrameLoad(iframe) {
  iframe.classList.add('loaded');
}

// ── Sidebar ────────────────────────────────────────────────────
function closeSidebar() {
  document.body.classList.remove('sidebar-open');
}

// ── Auth: handle top-bar button ────────────────────────────────
function handleAuthBtn() {
  if (localStorage.getItem('loggedIn') === 'true') {
    logout();
  } else {
    bsLoginModal.show();
  }
}

// ── Login form submit ──────────────────────────────────────────
function submitLogin(e) {
  e.preventDefault();

  const uInput = document.getElementById('loginUsername');
  const pInput = document.getElementById('loginPassword');
  const uErr   = document.getElementById('usernameError');
  const pErr   = document.getElementById('passwordError');

  // Reset
  uInput.classList.remove('is-invalid');
  pInput.classList.remove('is-invalid');

  const username = uInput.value.trim().toLowerCase();
  const password = pInput.value;

  if (!username) {
    uInput.classList.add('is-invalid');
    uErr.textContent = 'Please enter your username';
    return;
  }
  if (!password) {
    pInput.classList.add('is-invalid');
    pErr.textContent = 'Please enter your password';
    return;
  }
  if (!USERS[username] || USERS[username].password !== password) {
    pInput.classList.add('is-invalid');
    pErr.textContent = 'Incorrect username or password';
    pInput.value = '';
    // Shake dialog
    const dlg = document.querySelector('#loginModal .modal-dialog');
    dlg.classList.remove('shake');
    void dlg.offsetWidth;          // reflow
    dlg.classList.add('shake');
    return;
  }

  bsLoginModal.hide();
  applyLoggedIn(username);
  showToast(`Welcome back, ${USERS[username].display}!`, 'success');
}

// ── Apply logged-in UI ─────────────────────────────────────────
function applyLoggedIn(username) {
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('username', username);

  const user = USERS[username];

  document.getElementById('authBtn').innerHTML =
    '<i class="bi bi-box-arrow-right"></i><span>Logout</span>';

  const userBox = document.getElementById('topbarUser');
  userBox.style.display = 'flex';
  document.getElementById('topbarName').textContent = user.display.split(' ')[0];
  document.getElementById('topbarAvatar').src       = user.avatar;

  document.getElementById('profileNavItem').style.display = 'block';
}

// ── Logout ─────────────────────────────────────────────────────
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('username');

  document.getElementById('authBtn').innerHTML =
    '<i class="bi bi-box-arrow-in-right"></i><span>Login</span>';
  document.getElementById('topbarUser').style.display  = 'none';
  document.getElementById('profileNavItem').style.display = 'none';

  navigate('pages/home.html');
  showToast('You have been logged out.', 'info');
}

// ── Switch between modals ──────────────────────────────────────
function switchToSignup() {
  bsLoginModal.hide();
  setTimeout(() => bsSignupModal.show(), 250);
}
function switchToLogin() {
  bsSignupModal.hide();
  setTimeout(() => bsLoginModal.show(), 250);
}

// ── Toast ──────────────────────────────────────────────────────
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
