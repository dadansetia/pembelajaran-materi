<template>
  <div>
    <h2 class="section-title">Prosedur Percobaan</h2>
    <p class="section-subtitle">Simulasi topologi dan pengiriman paket data</p>
    <div class="proc-grid">
      <div class="steps-panel">
        <div v-for="(s,i) in steps" :key="i" class="step-item">
          <div class="step-num">{{ i+1 }}</div>
          <div class="step-body"><h4>{{ s.title }}</h4><p>{{ s.desc }}</p></div>
        </div>
      </div>
      <div>
        <div class="theory-card">
          <div class="card-header"><div class="card-icon" style="background:rgba(34,211,238,0.15)">📦</div><h3>Komponen Jaringan</h3></div>
          <ul class="info-list">
            <li><strong>💻 Komputer/Host</strong> — Pengirim/penerima data</li>
            <li><strong>🔀 Switch</strong> — Menghubungkan dalam LAN</li>
            <li><strong>📡 Router</strong> — Menghubungkan jaringan berbeda</li>
            <li><strong>📶 Access Point</strong> — Titik akses WiFi</li>
            <li><strong>🔌 Kabel</strong> — Media transmisi (Cat5e/Cat6)</li>
          </ul>
        </div>
        <div class="info-panel" style="margin-top:14px;">
          <strong>💡 Tips:</strong> Di topologi Star, semua paket melewati switch pusat. Coba putuskan switch dan amati apa yang terjadi!
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const steps = [
  { title: 'Pilih Topologi', desc: 'Pilih jenis topologi: Star, Ring, atau Bus. Perhatikan bagaimana node terhubung.' },
  { title: 'Pilih Pengirim & Penerima', desc: 'Klik dua node di diagram SVG sebagai sumber dan tujuan paket data.' },
  { title: 'Kirim Paket', desc: 'Klik "Kirim Paket" dan amati animasi paket yang bergerak melalui jalur jaringan.' },
  { title: 'Coba Broadcast', desc: 'Pilih satu node lalu klik "Broadcast" untuk mengirim paket ke semua node sekaligus.' },
  { title: 'Reset & Eksperimen', desc: 'Reset jaringan dan coba topologi berbeda. Bandingkan jalur yang ditempuh paket.' },
]
</script>
<style scoped>
.section-title { font-size:1.25rem; font-weight:800; margin-bottom:6px; }
.section-subtitle { font-size:0.85rem; color:var(--text-secondary); margin-bottom:20px; }
.proc-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
.steps-panel { display:flex; flex-direction:column; }
.step-item { display:flex; gap:14px; padding-bottom:20px; position:relative; }
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
