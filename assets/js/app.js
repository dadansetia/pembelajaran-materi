/**
 * app.js — Main Application Controller
 * Lab Maya Informatika SMA
 */

// ─── Global State ──────────────────────────────────────────
let currentLab = 'algoritma';
const LAB_NAMES = {
  algoritma:    'Algoritma Sorting',
  datastruktur: 'Struktur Data',
  jaringan:     'Jaringan Komputer',
  biner:        'Sistem Biner',
};

const TAB_PREFIXES = {
  algoritma:    'alg',
  datastruktur: 'ds',
  jaringan:     'net',
  biner:        'bin',
};

// ─── Lab Switching ─────────────────────────────────────────
function switchLab(lab) {
  if (lab === currentLab) return;

  AudioEngine.tab();
  currentLab = lab;

  // Hide all lab content wrappers
  document.querySelectorAll('.lab-content-wrapper').forEach(el => {
    el.style.display = 'none';
  });

  // Show selected
  const target = document.getElementById(`lab-${lab}`);
  if (target) target.style.display = 'flex';
  if (target) target.style.flexDirection = 'column';

  // Update nav buttons
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  const navBtn = document.getElementById(`nav-${lab}`);
  if (navBtn) navBtn.classList.add('active');

  // Update sidebar items
  document.querySelectorAll('.lab-item').forEach(btn => btn.classList.remove('active'));
  const sideBtn = document.getElementById(`side-${lab}`);
  if (sideBtn) sideBtn.classList.add('active');

  // Update active lab name in status
  const nameEl = document.getElementById('activeLabName');
  if (nameEl) nameEl.textContent = LAB_NAMES[lab] || lab;

  // Reset counts
  document.getElementById('opCount') && (document.getElementById('opCount').textContent = '0');
  document.getElementById('cmpCount') && (document.getElementById('cmpCount').textContent = '0');

  // Re-initialize the newly shown lab if needed
  if (lab === 'algoritma') AlgSim.init();
  if (lab === 'jaringan') NetSim.init();
  if (lab === 'biner') BinSim.init();
}

// ─── Tab Switching ─────────────────────────────────────────
function switchTab(labPrefix, tab) {
  AudioEngine.tab();

  // Deactivate all tabs for this lab
  document.querySelectorAll(`[id^="tab-${labPrefix}-"]`).forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  // Deactivate all panes for this lab
  document.querySelectorAll(`[id^="pane-${labPrefix}-"]`).forEach(pane => {
    pane.classList.remove('active');
  });

  // Activate chosen
  const tabBtn = document.getElementById(`tab-${labPrefix}-${tab}`);
  const pane = document.getElementById(`pane-${labPrefix}-${tab}`);

  if (tabBtn) {
    tabBtn.classList.add('active');
    tabBtn.setAttribute('aria-selected', 'true');
  }
  if (pane) pane.classList.add('active');
}

// ─── Audio Toggle ──────────────────────────────────────────
function toggleAudio() {
  const on = AudioEngine.toggle();
  const btn = document.getElementById('audioToggleBtn');
  if (btn) {
    btn.textContent = on ? '🔊' : '🔇';
    btn.classList.toggle('active', !on);
    btn.title = on ? 'Suara Aktif' : 'Suara Dimatikan';
  }
  showToast(on ? '🔊 Suara diaktifkan' : '🔇 Suara dimatikan', 'info');
}

// ─── Reset Current Lab ────────────────────────────────────
function resetCurrentLab() {
  AudioEngine.reset();
  switch (currentLab) {
    case 'algoritma':    AlgSim.reset(); break;
    case 'datastruktur': DSSim.reset(); break;
    case 'jaringan':     NetSim.reset(); break;
    case 'biner':        BinSim.clearBits(); BinSim.selectGate('AND'); break;
  }
  showToast('🔄 Lab direset', 'info');
}

// ─── Fullscreen ────────────────────────────────────────────
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
  AudioEngine.click();
}

document.addEventListener('fullscreenchange', () => {
  const btn = document.querySelector('[onclick="toggleFullscreen()"]');
  if (btn) btn.textContent = document.fullscreenElement ? '⛶' : '⛶';
});

// ─── Toast Notifications ──────────────────────────────────
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease-in forwards';
    setTimeout(() => {
      if (container.contains(toast)) container.removeChild(toast);
    }, 300);
  }, 3000);
};

// ─── Keyboard Shortcuts ───────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  switch (e.key) {
    case '1': switchLab('algoritma'); break;
    case '2': switchLab('datastruktur'); break;
    case '3': switchLab('jaringan'); break;
    case '4': switchLab('biner'); break;
    case 'r': case 'R': resetCurrentLab(); break;
    case 'm': case 'M': toggleAudio(); break;
    case 'f': case 'F': toggleFullscreen(); break;
    case ' ':
      if (currentLab === 'algoritma') { e.preventDefault(); AlgSim.start(); }
      break;
  }
});

// ─── Splash / Init ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Show first lab
  document.querySelectorAll('.lab-content-wrapper').forEach((el, i) => {
    el.style.display = i === 0 ? 'flex' : 'none';
    if (i === 0) el.style.flexDirection = 'column';
  });

  // Initialize all labs
  AlgSim.init();
  DSSim.init();
  NetSim.init();
  BinSim.init();

  // Keyboard shortcut hint
  setTimeout(() => {
    showToast('💡 Tekan 1-4 untuk ganti lab, M untuk suara, F untuk fullscreen', 'info');
  }, 1200);

  console.log('%c🧠 Lab Maya Informatika SMA', 'color:#6366f1;font-size:18px;font-weight:bold;');
  console.log('%cFase E & F · Kurikulum Merdeka', 'color:#94a3b8;font-size:12px;');
  console.log('%cShortcuts: 1-4 = Lab | Space = Start Sort | R = Reset | M = Mute | F = Fullscreen', 'color:#475569;font-size:11px;');
});
