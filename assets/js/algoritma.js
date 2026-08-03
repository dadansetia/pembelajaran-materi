/**
 * algoritma.js — Sorting Algorithm Visualizer
 * Lab Maya Informatika SMA
 */

const AlgSim = (() => {
  let array = [];
  let size = 15;
  let speed = 5;
  let algorithm = 'bubble';
  let isRunning = false;
  let isPaused = false;
  let comparisons = 0;
  let swaps = 0;
  let stopFlag = false;
  let pauseResolve = null;

  const canvas = () => document.getElementById('sortCanvas');
  const ctx = () => canvas().getContext('2d');

  const COLORS = {
    default:  '#334155',
    compare:  '#6366f1',
    swap:     '#f43f5e',
    sorted:   '#10b981',
    min:      '#38bdf8',
    key:      '#f59e0b',
  };

  function delay(ms) {
    return new Promise(resolve => {
      if (stopFlag) { resolve(); return; }
      const tid = setTimeout(resolve, ms);
      window._sortTimer = tid;
    });
  }

  function checkPause() {
    if (isPaused && !stopFlag) {
      return new Promise(res => { pauseResolve = res; });
    }
    return Promise.resolve();
  }

  function getDelay() {
    // speed 1 = slowest (500ms), 10 = fastest (10ms)
    return Math.max(10, 510 - speed * 50);
  }

  function initCanvas() {
    const c = canvas();
    const parent = c.parentElement;
    c.width = parent.offsetWidth || 700;
    c.height = 260;
  }

  function draw(highlights = {}) {
    const c = canvas();
    const ct = ctx();
    if (!c || !ct) return;
    ct.clearRect(0, 0, c.width, c.height);

    const n = array.length;
    if (n === 0) return;

    const padding = 8;
    const barWidth = (c.width - padding * 2) / n;
    const maxVal = Math.max(...array);

    array.forEach((val, i) => {
      const x = padding + i * barWidth;
      const barH = ((val / maxVal) * (c.height - 40));
      const y = c.height - barH;

      let color = highlights[i] || COLORS.default;

      // Gradient per bar
      const grad = ct.createLinearGradient(0, y, 0, c.height);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '66');

      ct.fillStyle = grad;
      ct.beginPath();
      ct.roundRect(x + 1, y, barWidth - 2, barH, [3, 3, 0, 0]);
      ct.fill();

      // Value label (only if bars are wide enough)
      if (barWidth > 20) {
        ct.fillStyle = '#94a3b8';
        ct.font = `bold ${Math.min(11, barWidth * 0.4)}px Inter,sans-serif`;
        ct.textAlign = 'center';
        ct.fillText(val, x + barWidth / 2, y - 4);
      }
    });

    // Stats overlay
    ct.fillStyle = 'rgba(99,102,241,0.15)';
    ct.fillRect(0, 0, 200, 30);
    ct.fillStyle = '#a5b4fc';
    ct.font = '11px JetBrains Mono, monospace';
    ct.textAlign = 'left';
    ct.fillText(`CMP: ${comparisons}  SWAP: ${swaps}`, 10, 18);
  }

  function randomize() {
    stopFlag = true;
    isRunning = false;
    isPaused = false;
    stopFlag = false;
    comparisons = 0;
    swaps = 0;
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    updateStats('Siap');
    draw();
    AudioEngine.reset();
  }

  function updateStats(status) {
    const el = id => document.getElementById(id);
    if (el('algCmp')) el('algCmp').textContent = comparisons;
    if (el('algSwap')) el('algSwap').textContent = swaps;
    if (el('algStatus')) el('algStatus').textContent = status;
    if (el('opCount')) el('opCount').textContent = swaps;
    if (el('cmpCount')) el('cmpCount').textContent = comparisons;
  }

  // ─── Bubble Sort ──────────────────────────────────────────
  async function bubbleSort() {
    const n = array.length;
    const sorted = new Set();
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopFlag) return;
        await checkPause();

        comparisons++;
        AudioEngine.compare();
        const h = {};
        sorted.forEach(k => (h[k] = COLORS.sorted));
        h[j] = COLORS.compare;
        h[j + 1] = COLORS.compare;
        draw(h);
        updateStats('Membandingkan…');
        await delay(getDelay());

        if (array[j] > array[j + 1]) {
          swaps++;
          AudioEngine.swap();
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          const h2 = {};
          sorted.forEach(k => (h2[k] = COLORS.sorted));
          h2[j] = COLORS.swap;
          h2[j + 1] = COLORS.swap;
          draw(h2);
          updateStats('Menukar…');
          await delay(getDelay());
        }
      }
      sorted.add(n - 1 - i);
    }
    sorted.add(0);
    const hFinal = {};
    sorted.forEach(k => (hFinal[k] = COLORS.sorted));
    draw(hFinal);
  }

  // ─── Selection Sort ──────────────────────────────────────
  async function selectionSort() {
    const n = array.length;
    const sorted = new Set();
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      if (stopFlag) return;

      for (let j = i + 1; j < n; j++) {
        if (stopFlag) return;
        await checkPause();

        comparisons++;
        AudioEngine.compare();
        const h = {};
        sorted.forEach(k => (h[k] = COLORS.sorted));
        h[i] = COLORS.compare;
        h[minIdx] = COLORS.min;
        h[j] = COLORS.compare;
        draw(h);
        updateStats('Mencari minimum…');
        await delay(getDelay());

        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        swaps++;
        AudioEngine.swap();
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        const h2 = {};
        sorted.forEach(k => (h2[k] = COLORS.sorted));
        h2[i] = COLORS.swap;
        h2[minIdx] = COLORS.swap;
        draw(h2);
        updateStats('Menukar…');
        await delay(getDelay());
      }
      sorted.add(i);
    }
    sorted.add(n - 1);
    const hF = {};
    sorted.forEach(k => (hF[k] = COLORS.sorted));
    draw(hF);
  }

  // ─── Insertion Sort ──────────────────────────────────────
  async function insertionSort() {
    const n = array.length;
    const sorted = new Set([0]);
    for (let i = 1; i < n; i++) {
      if (stopFlag) return;
      const key = array[i];
      let j = i - 1;

      AudioEngine.compare();
      const h0 = {};
      sorted.forEach(k => (h0[k] = COLORS.sorted));
      h0[i] = COLORS.key;
      draw(h0);
      updateStats('Memilih kunci…');
      await delay(getDelay());

      while (j >= 0 && array[j] > key) {
        if (stopFlag) return;
        await checkPause();
        comparisons++;
        AudioEngine.swap();
        array[j + 1] = array[j];
        j--;
        swaps++;
        const h = {};
        sorted.forEach(k => (h[k] = COLORS.sorted));
        h[j + 1] = COLORS.swap;
        h[j + 2] = COLORS.key;
        draw(h);
        updateStats('Menggeser…');
        await delay(getDelay());
      }
      array[j + 1] = key;
      sorted.add(i);
      const h2 = {};
      sorted.forEach(k => (h2[k] = COLORS.sorted));
      draw(h2);
    }
  }

  async function runSort() {
    document.getElementById('algStartBtn').disabled = true;
    document.getElementById('algPauseBtn').disabled = false;

    switch (algorithm) {
      case 'bubble': await bubbleSort(); break;
      case 'selection': await selectionSort(); break;
      case 'insertion': await insertionSort(); break;
    }

    if (!stopFlag) {
      // Final scan
      const h = {};
      for (let i = 0; i < array.length; i++) h[i] = COLORS.sorted;
      draw(h);
      AudioEngine.sortDone();
      updateStats('Selesai ✓');
      showToast('✅ Pengurutan selesai!', 'success');
    }

    isRunning = false;
    isPaused = false;
    document.getElementById('algStartBtn').disabled = false;
    document.getElementById('algPauseBtn').disabled = true;
  }

  function showToast(msg, type) {
    if (window.showToast) window.showToast(msg, type);
  }

  return {
    init() {
      initCanvas();
      this.randomize();
      window.addEventListener('resize', () => {
        initCanvas();
        draw();
      });
    },

    selectAlgorithm(val) {
      algorithm = val;
      const names = { bubble: 'Bubble Sort', selection: 'Selection Sort', insertion: 'Insertion Sort' };
      const el = document.getElementById('algStatName');
      if (el) el.textContent = names[val] || val;
      AudioEngine.click();
    },

    setSpeed(val) {
      speed = parseInt(val);
      const el = document.getElementById('speedLabel');
      if (el) el.textContent = val;
    },

    setSize(val) {
      size = parseInt(val);
      const el = document.getElementById('sizeLabel');
      if (el) el.textContent = val;
      this.randomize();
    },

    randomize() {
      randomize();
    },

    async start() {
      if (isRunning) return;
      if (array.length === 0) this.randomize();
      AudioEngine.click();
      isRunning = true;
      isPaused = false;
      stopFlag = false;
      comparisons = 0;
      swaps = 0;
      await runSort();
    },

    pause() {
      if (!isRunning) return;
      AudioEngine.click();
      if (isPaused) {
        isPaused = false;
        if (pauseResolve) { pauseResolve(); pauseResolve = null; }
        document.getElementById('algPauseBtn').textContent = '⏸ Jeda';
        updateStats('Berjalan…');
      } else {
        isPaused = true;
        document.getElementById('algPauseBtn').textContent = '▶ Lanjut';
        updateStats('Dijeda');
      }
    },

    reset() {
      stopFlag = true;
      isRunning = false;
      isPaused = false;
      if (pauseResolve) { pauseResolve(); pauseResolve = null; }
      comparisons = 0;
      swaps = 0;
      if (window._sortTimer) clearTimeout(window._sortTimer);
      setTimeout(() => {
        stopFlag = false;
        randomize();
      }, 100);
      document.getElementById('algStartBtn').disabled = false;
      document.getElementById('algPauseBtn').disabled = true;
      AudioEngine.reset();
    }
  };
})();
