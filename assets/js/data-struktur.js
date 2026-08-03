/**
 * data-struktur.js — Stack & Queue Interactive Visualizer
 * Lab Maya Informatika SMA
 */

const DSSim = (() => {
  let mode = 'stack'; // 'stack' | 'queue'
  let stackItems = [];
  let queueItems = [];
  let ops = 0;

  const COLORS = [
    { bg: 'rgba(99,102,241,0.3)', border: '#6366f1', text: '#a5b4fc' },
    { bg: 'rgba(34,211,238,0.2)', border: '#22d3ee', text: '#67e8f9' },
    { bg: 'rgba(16,185,129,0.2)', border: '#10b981', text: '#6ee7b7' },
    { bg: 'rgba(245,158,11,0.2)', border: '#f59e0b', text: '#fcd34d' },
    { bg: 'rgba(244,63,94,0.2)',  border: '#f43f5e', text: '#fda4af' },
    { bg: 'rgba(139,92,246,0.3)', border: '#8b5cf6', text: '#c4b5fd' },
  ];

  function getColor(index) {
    return COLORS[index % COLORS.length];
  }

  function render() {
    const container = document.getElementById('dsItems');
    const label = document.getElementById('dsLabel');
    const pointer = document.getElementById('dsPointerLabel');
    const sizeEl = document.getElementById('dsSize');
    const opsEl = document.getElementById('dsOps');
    const peekEl = document.getElementById('dsPeek');
    const infoEl = document.getElementById('dsInfo');

    if (!container) return;

    const items = mode === 'stack' ? stackItems : queueItems;
    sizeEl && (sizeEl.textContent = items.length);
    opsEl && (opsEl.textContent = ops);

    if (mode === 'stack') {
      label && (label.textContent = '📚 Stack (LIFO)');
      pointer && (pointer.textContent = items.length ? `← TOP: ${items[items.length - 1].val}` : '(kosong)');
      peekEl && (peekEl.textContent = items.length ? items[items.length - 1].val : '—');
      container.style.flexDirection = 'column-reverse';
      container.style.alignItems = 'stretch';

      if (infoEl) {
        infoEl.innerHTML = `Mode <strong>Stack</strong> aktif (LIFO). TOP saat ini: <strong style="color:var(--accent-cyan)">${
          items.length ? items[items.length - 1].val : 'kosong'
        }</strong>. Ukuran: ${items.length}`;
      }
    } else {
      label && (label.textContent = '🚶 Queue (FIFO)');
      pointer && (pointer.textContent = items.length
        ? `FRONT: ${items[0].val} ← ... → REAR: ${items[items.length - 1].val}`
        : '(kosong)');
      peekEl && (peekEl.textContent = items.length ? items[0].val : '—');
      container.style.flexDirection = 'row';
      container.style.alignItems = 'center';
      container.style.flexWrap = 'wrap';

      if (infoEl) {
        infoEl.innerHTML = `Mode <strong>Queue</strong> aktif (FIFO). FRONT: <strong style="color:var(--accent-emerald)">${
          items.length ? items[0].val : 'kosong'
        }</strong>. REAR: <strong style="color:var(--accent-cyan)">${
          items.length ? items[items.length - 1].val : 'kosong'
        }</strong>. Ukuran: ${items.length}`;
      }
    }

    // Clear
    container.innerHTML = '';

    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'color:var(--text-muted);font-size:0.8rem;padding:var(--space-lg);text-align:center;width:100%;';
      empty.textContent = mode === 'stack' ? '📭 Stack kosong' : '📭 Queue kosong';
      container.appendChild(empty);
      return;
    }

    items.forEach((item, i) => {
      const col = getColor(item.colorIdx);
      const div = document.createElement('div');
      div.className = 'stack-item';
      div.id = `ds-item-${item.id}`;
      div.style.cssText = `
        background: ${col.bg};
        border: 2px solid ${col.border};
        color: ${col.text};
        min-width: ${mode === 'queue' ? '60px' : '100%'};
        max-width: ${mode === 'queue' ? '80px' : '100%'};
        height: 44px;
        padding: 0 var(--space-sm);
        position: relative;
        box-shadow: 0 0 8px ${col.border}44;
      `;

      div.innerHTML = `<span style="font-family:var(--font-mono);font-weight:700;">${escHTML(item.val)}</span>`;

      // Highlight top/front
      if (mode === 'stack' && i === items.length - 1) {
        div.style.borderColor = '#f59e0b';
        div.style.background = 'rgba(245,158,11,0.2)';
        const tag = document.createElement('span');
        tag.style.cssText = 'position:absolute;right:-30px;top:50%;transform:translateY(-50%);font-size:0.6rem;color:var(--accent-amber);font-weight:700;';
        tag.textContent = 'TOP';
        div.appendChild(tag);
      }
      if (mode === 'queue' && i === 0) {
        div.style.borderColor = '#10b981';
        div.style.background = 'rgba(16,185,129,0.2)';
      }
      if (mode === 'queue' && i === items.length - 1 && items.length > 1) {
        div.style.borderColor = '#22d3ee';
        div.style.background = 'rgba(34,211,238,0.15)';
      }

      container.appendChild(div);
    });
  }

  function escHTML(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  let colorCounter = 0;
  let idCounter = 0;

  return {
    init() {
      this.selectMode('stack');
    },

    selectMode(m) {
      mode = m;
      AudioEngine.tab();

      const stackBtn = document.getElementById('dsStackBtn');
      const queueBtn = document.getElementById('dsQueueBtn');
      const pushBtn = document.getElementById('dsPushBtn');
      const modeLabel = document.getElementById('dsModeLabel');

      stackBtn && stackBtn.classList.toggle('btn-primary', m === 'stack');
      stackBtn && stackBtn.classList.toggle('btn-secondary', m !== 'stack');
      queueBtn && queueBtn.classList.toggle('btn-primary', m === 'queue');
      queueBtn && queueBtn.classList.toggle('btn-secondary', m !== 'queue');

      if (pushBtn) pushBtn.textContent = m === 'stack' ? '⬆ Push' : '⬆ Enqueue';
      if (modeLabel) modeLabel.textContent = m === 'stack' ? 'Stack' : 'Queue';

      const popBtn = document.getElementById('dsPopBtn');
      if (popBtn) popBtn.textContent = m === 'stack' ? '⬇ Pop' : '⬇ Dequeue';

      render();
    },

    push() {
      const input = document.getElementById('dsInput');
      const val = (input?.value || '').trim();
      if (!val) {
        AudioEngine.error();
        showToast('⚠️ Masukkan nilai terlebih dahulu', 'error');
        return;
      }

      const items = mode === 'stack' ? stackItems : queueItems;
      if (items.length >= 12) {
        AudioEngine.error();
        showToast('⚠️ Kapasitas maksimum (12) tercapai', 'error');
        return;
      }

      items.push({ val, colorIdx: colorCounter++ % 6, id: idCounter++ });
      ops++;
      if (input) input.value = '';
      AudioEngine.push();
      render();
      showToast(`✅ "${val}" ditambahkan ke ${mode === 'stack' ? 'Stack' : 'Queue'}`, 'success');
    },

    pop() {
      const items = mode === 'stack' ? stackItems : queueItems;
      if (items.length === 0) {
        AudioEngine.error();
        showToast(`⚠️ ${mode === 'stack' ? 'Stack' : 'Queue'} kosong!`, 'error');
        return;
      }

      let removed;
      if (mode === 'stack') {
        removed = items.pop();
      } else {
        removed = items.shift();
      }
      ops++;
      AudioEngine.pop();
      render();
      showToast(`📤 "${removed.val}" dikeluarkan dari ${mode === 'stack' ? 'Stack' : 'Queue'}`, 'info');
    },

    reset() {
      stackItems = [];
      queueItems = [];
      ops = 0;
      colorCounter = 0;
      AudioEngine.reset();
      render();
      showToast('🔄 Simulasi direset', 'info');
    }
  };

  function showToast(msg, type) {
    if (window.showToast) window.showToast(msg, type);
  }
})();

// Fix for closure
function showToast(msg, type) {
  if (window.showToast) window.showToast(msg, type);
}
