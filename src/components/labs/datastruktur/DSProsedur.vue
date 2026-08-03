<template>
  <div>
    <h2 class="section-title">Prosedur Percobaan</h2>
    <p class="section-subtitle">Cara menggunakan simulasi Stack dan Queue interaktif</p>
    <div class="proc-grid">
      <div class="steps-panel">
        <div v-for="(s,i) in steps" :key="i" class="step-item">
          <div class="step-num">{{ i+1 }}</div>
          <div class="step-body"><h4>{{ s.title }}</h4><p>{{ s.desc }}</p></div>
        </div>
      </div>
      <div>
        <div class="theory-card">
          <div class="card-header"><div class="card-icon" style="background:rgba(16,185,129,0.15)">🌍</div><h3>Aplikasi Nyata</h3></div>
          <ul class="info-list">
            <li><strong>Browser History</strong> — Stack (tombol Back)</li>
            <li><strong>Printer Queue</strong> — Queue (antrian cetak)</li>
            <li><strong>Undo/Redo</strong> — Dua Stack</li>
            <li><strong>CPU Scheduling</strong> — Queue</li>
            <li><strong>Algoritma DFS</strong> — Stack</li>
            <li><strong>Algoritma BFS</strong> — Queue</li>
          </ul>
        </div>
        <div class="info-panel" style="margin-top:14px;">
          <strong>🧪 Eksperimen:</strong> Masukkan A, B, C, D ke Stack dan Queue. Keluarkan semua. Bandingkan urutannya!
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const steps = [
  { title: 'Pilih Mode', desc: 'Klik tombol "📚 Stack" atau "🚶 Queue" untuk memilih struktur data.' },
  { title: 'Masukkan Nilai', desc: 'Ketik nilai di input box, lalu klik Push (Stack) atau Enqueue (Queue), atau tekan Enter.' },
  { title: 'Amati Visualisasi', desc: 'Perhatikan animasi elemen yang masuk. Stack tumbuh ke atas, Queue bergerak horizontal.' },
  { title: 'Operasi Pop/Dequeue', desc: 'Klik Pop atau Dequeue, amati elemen mana yang keluar.' },
  { title: 'Bandingkan', desc: 'Masukkan data yang sama ke kedua mode, keluarkan semua, catat perbedaannya.' },
]
</script>
<style scoped>
.section-title { font-size: 1.25rem; font-weight: 800; margin-bottom: 6px; }
.section-subtitle { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px; }
.proc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.steps-panel { display: flex; flex-direction: column; }
.step-item { display: flex; gap: 14px; padding-bottom: 20px; position: relative; }
.step-item:not(:last-child)::after { content:''; position:absolute; left:14px; top:34px; bottom:0; width:2px; background:linear-gradient(180deg, var(--accent-primary), transparent); }
.step-num { width:30px; height:30px; border-radius:50%; flex-shrink:0; background:linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800; }
.step-body h4 { font-size:0.88rem; font-weight:700; margin-bottom:4px; }
.step-body p { font-size:0.8rem; color:var(--text-secondary); line-height:1.6; }
.theory-card { background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:16px; }
.card-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.card-icon { width:34px; height:34px; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:1rem; }
.card-header h3 { font-size:0.95rem; font-weight:700; }
.info-list { list-style:none; display:flex; flex-direction:column; gap:5px; }
.info-list li { font-size:0.8rem; color:var(--text-secondary); padding-left:14px; position:relative; }
.info-list li::before { content:'▸'; color:var(--accent-primary); position:absolute; left:0; }
</style>
