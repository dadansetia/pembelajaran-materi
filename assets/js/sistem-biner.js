/**
 * sistem-biner.js — Binary System & Logic Gate Simulator
 * Lab Maya Informatika SMA
 */

const BinSim = (() => {
  let bits = new Array(8).fill(0);
  let inputA = 0;
  let inputB = 0;
  let selectedGate = 'AND';

  const GATES = {
    AND:  { desc: 'AND: Output bernilai 1 hanya jika SEMUA input bernilai 1.', op: (a, b) => a & b, inputs: 2 },
    OR:   { desc: 'OR: Output bernilai 1 jika SALAH SATU input bernilai 1.', op: (a, b) => a | b, inputs: 2 },
    NOT:  { desc: 'NOT: Membalik nilai input. Jika input 0 → output 1, dan sebaliknya.', op: (a) => a ^ 1, inputs: 1 },
    NAND: { desc: 'NAND: Kebalikan dari AND. Output 0 hanya jika semua input 1.', op: (a, b) => (a & b) ^ 1, inputs: 2 },
    NOR:  { desc: 'NOR: Kebalikan dari OR. Output 1 hanya jika semua input 0.', op: (a, b) => (a | b) ^ 1, inputs: 2 },
    XOR:  { desc: 'XOR (Exclusive OR): Output 1 jika input BERBEDA satu sama lain.', op: (a, b) => a ^ b, inputs: 2 },
  };

  const GATE_COLORS = {
    AND:  { bg: 'rgba(99,102,241,0.2)', border: '#6366f1', text: '#a5b4fc' },
    OR:   { bg: 'rgba(16,185,129,0.2)', border: '#10b981', text: '#6ee7b7' },
    NOT:  { bg: 'rgba(244,63,94,0.2)',  border: '#f43f5e', text: '#fda4af' },
    NAND: { bg: 'rgba(245,158,11,0.2)', border: '#f59e0b', text: '#fcd34d' },
    NOR:  { bg: 'rgba(139,92,246,0.2)', border: '#8b5cf6', text: '#c4b5fd' },
    XOR:  { bg: 'rgba(34,211,238,0.2)', border: '#22d3ee', text: '#67e8f9' },
  };

  // ─── Binary Converter ─────────────────────────────────────
  function getDecimal() {
    return bits.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0);
  }

  function renderBits() {
    const container = document.getElementById('binaryBits');
    if (!container) return;
    container.innerHTML = '';

    bits.forEach((bit, i) => {
      const div = document.createElement('button');
      div.className = `binary-bit ${bit ? 'on' : 'off'}`;
      div.textContent = bit;
      div.setAttribute('aria-label', `Bit ${7 - i} = ${bit}`);
      div.setAttribute('title', `2^${7 - i} = ${Math.pow(2, 7 - i)}`);
      div.addEventListener('click', () => {
        bits[i] = bits[i] ^ 1;
        AudioEngine.bitFlip(bits[i] === 1);
        updateDisplay();
      });
      container.appendChild(div);
    });

    const dec = getDecimal();
    const decEl = document.getElementById('binToDec');
    const octEl = document.getElementById('binToOct');
    const hexEl = document.getElementById('binToHex');

    if (decEl) decEl.textContent = dec;
    if (octEl) octEl.textContent = dec.toString(8);
    if (hexEl) hexEl.textContent = '0x' + dec.toString(16).toUpperCase().padStart(2, '0');

    const inputEl = document.getElementById('decInput');
    if (inputEl && inputEl !== document.activeElement) {
      inputEl.value = dec;
    }
  }

  function updateDisplay() {
    renderBits();
  }

  // ─── Logic Gate ───────────────────────────────────────────
  function computeOutput() {
    const gate = GATES[selectedGate];
    if (!gate) return 0;
    return gate.inputs === 1 ? gate.op(inputA) : gate.op(inputA, inputB);
  }

  function renderGate() {
    const output = computeOutput();
    const col = GATE_COLORS[selectedGate];
    const gate = GATES[selectedGate];

    // Gate symbol box
    const box = document.getElementById('gateSymbolBox');
    if (box) {
      box.style.background = col.bg;
      box.style.borderColor = col.border;
      box.style.color = col.text;
      box.textContent = selectedGate;
    }

    // Input A
    const btnA = document.getElementById('gateInputA');
    const lblA = document.getElementById('labelA');
    if (btnA) {
      btnA.className = `toggle-btn ${inputA ? 'on' : ''}`;
      if (lblA) {
        lblA.textContent = inputA;
        lblA.style.color = inputA ? '#10b981' : '#475569';
      }
    }

    // Input B (hide for NOT)
    const rowB = document.getElementById('inputBRow');
    const btnB = document.getElementById('gateInputB');
    const lblB = document.getElementById('labelB');
    if (rowB) rowB.style.display = gate.inputs === 1 ? 'none' : 'flex';
    if (btnB) {
      btnB.className = `toggle-btn ${inputB ? 'on' : ''}`;
      if (lblB) {
        lblB.textContent = inputB;
        lblB.style.color = inputB ? '#10b981' : '#475569';
      }
    }

    // Output lamp
    const lamp = document.getElementById('outputLamp');
    const outVal = document.getElementById('outputVal');
    if (lamp) {
      lamp.className = `output-lamp ${output ? 'on' : 'off'}`;
    }
    if (outVal) {
      outVal.textContent = output;
      outVal.style.color = output ? '#f59e0b' : '#475569';
    }

    // Truth table
    renderTruthTable(output);

    // Gate info
    const infoEl = document.getElementById('gateInfo');
    if (infoEl) infoEl.textContent = gate.desc;
  }

  function renderTruthTable(currentOutput) {
    const gate = GATES[selectedGate];
    const thead = document.getElementById('ttHead');
    const tbody = document.getElementById('ttBody');
    if (!thead || !tbody) return;

    // Header
    if (gate.inputs === 2) {
      thead.innerHTML = '<tr><th>A</th><th>B</th><th>Output</th></tr>';
    } else {
      thead.innerHTML = '<tr><th>A</th><th>Output</th></tr>';
    }

    tbody.innerHTML = '';

    if (gate.inputs === 2) {
      [[0,0],[0,1],[1,0],[1,1]].forEach(([a, b]) => {
        const out = gate.op(a, b);
        const isActive = (a === inputA && b === inputB);
        const tr = document.createElement('tr');
        if (isActive) tr.className = 'active-row';
        tr.innerHTML = `
          <td class="${a ? 'val-1' : 'val-0'}">${a}</td>
          <td class="${b ? 'val-1' : 'val-0'}">${b}</td>
          <td class="${out ? 'val-1' : 'val-0'}">${out}</td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      [[0],[1]].forEach(([a]) => {
        const out = gate.op(a);
        const isActive = (a === inputA);
        const tr = document.createElement('tr');
        if (isActive) tr.className = 'active-row';
        tr.innerHTML = `
          <td class="${a ? 'val-1' : 'val-0'}">${a}</td>
          <td class="${out ? 'val-1' : 'val-0'}">${out}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  return {
    init() {
      renderBits();
      this.selectGate('AND');
    },

    fromDecimal(val) {
      let n = parseInt(val) || 0;
      n = Math.max(0, Math.min(255, n));
      bits = [];
      for (let i = 7; i >= 0; i--) {
        bits.unshift((n >> i) & 1);
      }
      renderBits();
    },

    randomBit() {
      const val = Math.floor(Math.random() * 256);
      this.fromDecimal(val);
      AudioEngine.click();
      const dec = document.getElementById('decInput');
      if (dec) dec.value = val;
    },

    clearBits() {
      bits = new Array(8).fill(0);
      AudioEngine.reset();
      const dec = document.getElementById('decInput');
      if (dec) dec.value = 0;
      updateDisplay();
    },

    selectGate(gate) {
      selectedGate = gate;
      inputA = 0;
      inputB = 0;
      AudioEngine.tab();
      renderGate();
    },

    toggleInput(input) {
      if (input === 'A') {
        inputA = inputA ^ 1;
        AudioEngine.gateToggle(inputA === 1);
      } else {
        inputB = inputB ^ 1;
        AudioEngine.gateToggle(inputB === 1);
      }
      renderGate();
    }
  };

  function updateDisplay() {
    renderBits();
  }
})();
