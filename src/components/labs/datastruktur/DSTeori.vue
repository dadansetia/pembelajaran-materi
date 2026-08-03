<template>
  <div>
    <h2 class="section-title">Struktur Data Linear</h2>
    <p class="section-subtitle">Stack, Queue, dan cara kerja memori terstruktur · <span class="badge badge-fase-e">Fase E</span></p>
    <div class="theory-grid">
      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(34,211,238,0.15)">📚</div><h3>Stack (Tumpukan)</h3></div>
        <p>Struktur data <strong class="text-cyan">LIFO</strong> — Last In, First Out. Seperti tumpukan buku, yang terakhir diletakkan adalah yang pertama diambil.</p>
        <ul class="info-list">
          <li><strong>Push</strong> — memasukkan data ke atas tumpukan (O(1))</li>
          <li><strong>Pop</strong> — mengambil data paling atas (O(1))</li>
          <li><strong>Peek/Top</strong> — melihat data paling atas tanpa menghapus</li>
          <li>Aplikasi: undo/redo, function call stack, DFS</li>
        </ul>
        <pre class="code-block"><span class="text-accent">class</span> Stack:
  <span class="text-amber">def</span> __init__(self): self.items = []
  <span class="text-amber">def</span> push(self, item): self.items.append(item)
  <span class="text-amber">def</span> pop(self): return self.items.pop()
  <span class="text-amber">def</span> peek(self): return self.items[-1]</pre>
      </div>

      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(16,185,129,0.15)">🚶</div><h3>Queue (Antrian)</h3></div>
        <p>Struktur data <strong class="text-emerald">FIFO</strong> — First In, First Out. Seperti antrian kasir, yang pertama masuk adalah yang pertama dilayani.</p>
        <ul class="info-list">
          <li><strong>Enqueue</strong> — memasukkan data ke belakang antrian (O(1))</li>
          <li><strong>Dequeue</strong> — mengambil data dari depan antrian (O(1))</li>
          <li><strong>Front/Rear</strong> — ujung depan dan belakang antrian</li>
          <li>Aplikasi: print queue, BFS, task scheduling, CPU</li>
        </ul>
        <pre class="code-block"><span class="text-accent">from</span> collections <span class="text-accent">import</span> deque
<span class="text-accent">class</span> Queue:
  <span class="text-amber">def</span> __init__(self): self.q = deque()
  <span class="text-amber">def</span> enqueue(self, x): self.q.append(x)
  <span class="text-amber">def</span> dequeue(self): return self.q.popleft()</pre>
      </div>

      <div class="theory-card" style="grid-column: span 2;">
        <div class="card-header"><div class="card-icon" style="background:rgba(139,92,246,0.15)">⚖️</div><h3>Stack vs Queue — Perbandingan</h3></div>
        <div class="compare-grid">
          <div>
            <p class="compare-title text-cyan">📚 Stack (LIFO)</p>
            <ul class="info-list">
              <li>Elemen baru masuk dan keluar dari TOP</li>
              <li>Seperti tumpukan piring di kantin</li>
              <li>Ctrl+Z (undo) menggunakan Stack</li>
              <li>Pemanggilan fungsi rekursif pakai Stack</li>
            </ul>
          </div>
          <div>
            <p class="compare-title text-emerald">🚶 Queue (FIFO)</p>
            <ul class="info-list">
              <li>Masuk dari REAR, keluar dari FRONT</li>
              <li>Seperti antrian di bank atau kasir</li>
              <li>Printer spool menggunakan Queue</li>
              <li>BFS (Breadth-First Search) pakai Queue</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.section-title { font-size: 1.25rem; font-weight: 800; margin-bottom: 6px; }
.section-subtitle { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px; }
.theory-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.theory-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 18px; }
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.card-icon { width: 36px; height: 36px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
.card-header h3 { font-size: 1rem; font-weight: 700; }
.theory-card p { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 10px; }
.info-list { list-style: none; display: flex; flex-direction: column; gap: 5px; }
.info-list li { font-size: 0.8rem; color: var(--text-secondary); padding-left: 14px; position: relative; }
.info-list li::before { content: '▸'; color: var(--accent-primary); position: absolute; left: 0; }
.compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.compare-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 10px; }
</style>
