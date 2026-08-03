/**
 * jaringan.js — Network Topology Visualizer
 * Lab Maya Informatika SMA
 */

const NetSim = (() => {
  let topology = 'star';
  let nodes = [];
  let connections = [];
  let selectedNodes = [];
  let packetCount = 0;
  let animating = false;

  const SVG_NS = 'http://www.w3.org/2000/svg';

  // ─── Node definitions per topology ───────────────────────
  function buildTopology(type) {
    nodes = [];
    connections = [];
    const cx = 350, cy = 160;

    if (type === 'star') {
      // Central switch
      nodes.push({ id: 0, x: cx, y: cy, label: 'Switch', type: 'switch', color: '#f59e0b', failed: false });
      const count = 6;
      const r = 130;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        nodes.push({
          id: i + 1,
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
          label: `PC ${i + 1}`,
          type: 'pc',
          color: '#6366f1',
          failed: false
        });
        connections.push({ from: 0, to: i + 1 });
      }
    }

    else if (type === 'ring') {
      const count = 6;
      const r = 120;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        nodes.push({
          id: i,
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
          label: `PC ${i + 1}`,
          type: 'pc',
          color: '#10b981',
          failed: false
        });
      }
      for (let i = 0; i < count; i++) {
        connections.push({ from: i, to: (i + 1) % count });
      }
    }

    else if (type === 'bus') {
      const count = 5;
      const spacing = 120;
      const startX = cx - (count - 1) * spacing / 2;
      const busY = cy;

      nodes.push({ id: 0, x: startX - 60, y: busY, label: 'Server', type: 'server', color: '#f43f5e', failed: false });
      for (let i = 0; i < count; i++) {
        nodes.push({
          id: i + 1,
          x: startX + i * spacing,
          y: busY,
          label: `PC ${i + 1}`,
          type: 'pc',
          color: '#22d3ee',
          failed: false
        });
      }
      // Backbone connections
      for (let i = 0; i < nodes.length - 1; i++) {
        connections.push({ from: i, to: i + 1 });
      }
    }
  }

  // ─── SVG Rendering ────────────────────────────────────────
  function render() {
    const svg = document.getElementById('networkSvg');
    if (!svg) return;
    svg.innerHTML = '';

    // Defs
    const defs = makeSVG('defs');

    // Glow filter
    const filter = makeSVG('filter');
    filter.setAttribute('id', 'glow');
    const feBlur = makeSVG('feGaussianBlur');
    feBlur.setAttribute('stdDeviation', '3');
    feBlur.setAttribute('result', 'coloredBlur');
    const feMerge = makeSVG('feMerge');
    ['coloredBlur', 'SourceGraphic'].forEach(v => {
      const n = makeSVG('feMergeNode');
      if (v === 'coloredBlur') n.setAttribute('in', 'coloredBlur');
      feMerge.appendChild(n);
    });
    filter.appendChild(feBlur);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Draw connections
    connections.forEach(conn => {
      const from = nodes[conn.from];
      const to = nodes[conn.to];
      if (!from || !to) return;

      const line = makeSVG('line');
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
      line.setAttribute('stroke', (from.failed || to.failed) ? '#475569' : 'rgba(99,102,241,0.35)');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-dasharray', '0');
      line.id = `conn-${conn.from}-${conn.to}`;
      svg.appendChild(line);
    });

    // Draw nodes
    nodes.forEach(node => {
      const g = makeSVG('g');
      g.setAttribute('transform', `translate(${node.x},${node.y})`);
      g.style.cursor = 'pointer';
      g.id = `node-${node.id}`;

      // Outer glow ring (selected)
      if (selectedNodes.includes(node.id)) {
        const ring = makeSVG('circle');
        ring.setAttribute('r', '26');
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', selectedNodes[0] === node.id ? '#f59e0b' : '#22d3ee');
        ring.setAttribute('stroke-width', '2.5');
        ring.setAttribute('opacity', '0.8');
        ring.setAttribute('filter', 'url(#glow)');
        g.appendChild(ring);
      }

      // Node circle
      const circle = makeSVG('circle');
      circle.setAttribute('r', '20');
      circle.setAttribute('fill', node.failed ? '#1e293b' : node.color + '33');
      circle.setAttribute('stroke', node.failed ? '#475569' : node.color);
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('filter', 'url(#glow)');
      g.appendChild(circle);

      // Icon
      const icon = makeSVG('text');
      icon.setAttribute('text-anchor', 'middle');
      icon.setAttribute('dominant-baseline', 'central');
      icon.setAttribute('font-size', '14');
      icon.textContent = node.failed ? '✕' : (
        node.type === 'switch' ? '🔀' :
        node.type === 'server' ? '🖥' : '💻'
      );
      g.appendChild(icon);

      // Label
      const lbl = makeSVG('text');
      lbl.setAttribute('text-anchor', 'middle');
      lbl.setAttribute('y', '34');
      lbl.setAttribute('font-size', '10');
      lbl.setAttribute('fill', node.failed ? '#475569' : '#94a3b8');
      lbl.setAttribute('font-family', 'Inter, sans-serif');
      lbl.setAttribute('font-weight', '600');
      lbl.textContent = node.failed ? `${node.label} [✕]` : node.label;
      g.appendChild(lbl);

      g.addEventListener('click', () => onNodeClick(node.id));
      svg.appendChild(g);
    });

    updateStatus();
  }

  function makeSVG(tag) {
    return document.createElementNS(SVG_NS, tag);
  }

  function onNodeClick(id) {
    AudioEngine.click();
    if (selectedNodes.includes(id)) {
      selectedNodes = selectedNodes.filter(n => n !== id);
    } else if (selectedNodes.length < 2) {
      selectedNodes.push(id);
    } else {
      selectedNodes = [id];
    }
    render();

    const routeEl = document.getElementById('netRoute');
    if (routeEl) {
      if (selectedNodes.length === 2) {
        const a = nodes.find(n => n.id === selectedNodes[0]);
        const b = nodes.find(n => n.id === selectedNodes[1]);
        routeEl.textContent = `${a?.label} → ${b?.label}`;
      } else if (selectedNodes.length === 1) {
        const a = nodes.find(n => n.id === selectedNodes[0]);
        routeEl.textContent = `${a?.label} (pilih penerima)`;
      } else {
        routeEl.textContent = '—';
      }
    }
  }

  function updateStatus() {
    const el = id => document.getElementById(id);
    const names = { star: 'Star', ring: 'Ring', bus: 'Bus' };
    el('netTopoName') && (el('netTopoName').textContent = names[topology] || topology);
    el('netNodeCount') && (el('netNodeCount').textContent = nodes.length);
    el('netPacketCount') && (el('netPacketCount').textContent = packetCount);
  }

  // ─── Packet Animation ─────────────────────────────────────
  async function animatePacket(path, color) {
    if (animating) return;
    animating = true;

    const svg = document.getElementById('networkSvg');
    if (!svg) { animating = false; return; }

    for (let i = 0; i < path.length - 1; i++) {
      const fromNode = nodes.find(n => n.id === path[i]);
      const toNode = nodes.find(n => n.id === path[i + 1]);
      if (!fromNode || !toNode) continue;

      // Highlight the connection
      const conn = document.getElementById(`conn-${path[i]}-${path[i + 1]}`) ||
                   document.getElementById(`conn-${path[i + 1]}-${path[i]}`);
      if (conn) {
        conn.setAttribute('stroke', color);
        conn.setAttribute('stroke-width', '3');
      }

      // Create packet dot
      const packet = makeSVG('circle');
      packet.setAttribute('r', '8');
      packet.setAttribute('fill', color);
      packet.setAttribute('cx', fromNode.x);
      packet.setAttribute('cy', fromNode.y);
      packet.setAttribute('opacity', '0.9');
      packet.setAttribute('filter', 'url(#glow)');

      // Packet label
      const pLabel = makeSVG('text');
      pLabel.setAttribute('text-anchor', 'middle');
      pLabel.setAttribute('dominant-baseline', 'central');
      pLabel.setAttribute('font-size', '8');
      pLabel.setAttribute('fill', 'white');
      pLabel.setAttribute('font-weight', '700');
      pLabel.textContent = '📦';

      svg.appendChild(packet);
      svg.appendChild(pLabel);
      AudioEngine.packetSend();

      // Animate
      await animateCircle(packet, pLabel, fromNode.x, fromNode.y, toNode.x, toNode.y, 500);

      svg.removeChild(packet);
      svg.removeChild(pLabel);
      AudioEngine.packetReceive();

      // Reset connection color
      if (conn) {
        conn.setAttribute('stroke', 'rgba(99,102,241,0.35)');
        conn.setAttribute('stroke-width', '2');
      }

      await sleep(100);
    }

    // Flash destination
    const destG = document.getElementById(`node-${path[path.length - 1]}`);
    if (destG) {
      destG.style.filter = 'brightness(2)';
      setTimeout(() => { destG.style.filter = ''; }, 400);
    }

    animating = false;
  }

  function animateCircle(circle, label, x1, y1, x2, y2, duration) {
    return new Promise(resolve => {
      const start = performance.now();
      function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const x = x1 + (x2 - x1) * ease(t);
        const y = y1 + (y2 - y1) * ease(t);
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  }

  function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ─── Routing Logic ────────────────────────────────────────
  function getPath(from, to) {
    if (topology === 'star') {
      const switch0 = nodes.find(n => n.type === 'switch');
      if (!switch0) return [from, to];
      return from === switch0.id ? [from, to] :
             to === switch0.id ? [from, switch0.id] :
             [from, switch0.id, to];
    }
    if (topology === 'ring') {
      // Shortest path around ring
      const n = nodes.length;
      const cw = [];
      let cur = from;
      while (cur !== to) {
        cw.push(cur);
        cur = (cur + 1) % n;
      }
      cw.push(to);
      return cw;
    }
    if (topology === 'bus') {
      // Direct backbone
      if (from < to) {
        const path = [];
        for (let i = from; i <= to; i++) path.push(i);
        return path;
      } else {
        const path = [];
        for (let i = from; i >= to; i--) path.push(i);
        return path;
      }
    }
    return [from, to];
  }

  return {
    init() {
      buildTopology('star');
      render();
    },

    selectTopology(type) {
      topology = type;
      selectedNodes = [];
      AudioEngine.tab();
      buildTopology(type);
      render();

      const infoEl = document.getElementById('netInfo');
      const desc = {
        star: 'Topologi <strong>Star</strong>: Semua perangkat terhubung ke Switch pusat. Klik dua node, lalu kirim paket.',
        ring: 'Topologi <strong>Ring</strong>: Data mengalir searah di sepanjang ring. Klik dua node, lalu kirim paket.',
        bus: 'Topologi <strong>Bus</strong>: Semua perangkat berbagi satu backbone. Klik dua node, lalu kirim paket.',
      };
      if (infoEl) infoEl.innerHTML = desc[type] || '';
    },

    async sendPacket() {
      if (animating) return;
      if (selectedNodes.length < 2) {
        AudioEngine.error();
        showToast('⚠️ Pilih 2 node terlebih dahulu (pengirim & penerima)', 'error');
        return;
      }

      const [from, to] = selectedNodes;
      const fromNode = nodes.find(n => n.id === from);
      const toNode = nodes.find(n => n.id === to);

      if (fromNode?.failed || toNode?.failed) {
        AudioEngine.error();
        showToast('❌ Node dalam kondisi gagal!', 'error');
        return;
      }

      packetCount++;
      updateStatus();
      const path = getPath(from, to);

      const infoEl = document.getElementById('netInfo');
      if (infoEl) infoEl.innerHTML = `📦 Mengirim paket dari <strong>${fromNode?.label}</strong> ke <strong>${toNode?.label}</strong>… jalur: ${path.map(id => nodes[id]?.label).join(' → ')}`;

      await animatePacket(path, '#22d3ee');
      AudioEngine.success();
      showToast(`✅ Paket terkirim: ${fromNode?.label} → ${toNode?.label}`, 'success');

      if (infoEl) infoEl.innerHTML = `✅ Paket berhasil dikirim dari <strong>${fromNode?.label}</strong> ke <strong>${toNode?.label}</strong>. Total paket: ${packetCount}`;
    },

    async broadcastPacket() {
      if (animating) return;
      if (selectedNodes.length < 1) {
        AudioEngine.error();
        showToast('⚠️ Pilih sumber broadcast (1 node)', 'error');
        return;
      }

      const from = selectedNodes[0];
      const fromNode = nodes.find(n => n.id === from);
      const infoEl = document.getElementById('netInfo');
      if (infoEl) infoEl.innerHTML = `📡 Broadcast dari <strong>${fromNode?.label}</strong> ke semua node…`;

      for (const node of nodes) {
        if (node.id === from || node.failed) continue;
        const path = getPath(from, node.id);
        packetCount++;
        await animatePacket(path, '#f59e0b');
        await sleep(150);
      }

      updateStatus();
      AudioEngine.success();
      showToast(`📡 Broadcast selesai dari ${fromNode?.label}`, 'success');
    },

    reset() {
      selectedNodes = [];
      packetCount = 0;
      animating = false;
      nodes.forEach(n => n.failed = false);
      AudioEngine.reset();
      buildTopology(topology);
      render();
      const infoEl = document.getElementById('netInfo');
      if (infoEl) infoEl.innerHTML = 'Jaringan direset. Klik node untuk memilih pengirim/penerima.';
      showToast('🔄 Jaringan direset', 'info');
    }
  };

  function showToast(msg, type) {
    if (window.showToast) window.showToast(msg, type);
  }
})();
