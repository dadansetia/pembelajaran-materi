<template>
  <div>
    <h2 class="section-title">Prosedur Percobaan</h2>
    <p class="section-subtitle">Langkah-langkah menggunakan simulasi algoritma pengurutan</p>

    <div class="proc-grid">
      <div class="steps-panel">
        <div v-for="(step, i) in steps" :key="i" class="step-item">
          <div class="step-num">{{ i + 1 }}</div>
          <div class="step-body">
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="theory-card">
          <div class="card-header">
            <div class="card-icon" style="background:rgba(99,102,241,0.15)">🎨</div>
            <h3>Legenda Warna</h3>
          </div>
          <ul class="legend-list">
            <li v-for="l in legend" :key="l.label">
              <span class="color-dot" :style="{ background: l.color }"></span>
              <span>{{ l.label }}</span>
            </li>
          </ul>
        </div>

        <div class="theory-card" style="margin-top:14px;">
          <div class="card-header">
            <div class="card-icon" style="background:rgba(245,158,11,0.15)">💡</div>
            <h3>Tips Belajar</h3>
          </div>
          <ul class="info-list">
            <li>Mulai dengan 8–10 elemen dan kecepatan lambat</li>
            <li>Perhatikan pola pergerakan tiap algoritma</li>
            <li>Coba data yang sudah terurut — apa yang berubah?</li>
            <li>Bandingkan jumlah operasi untuk data yang sama</li>
          </ul>
        </div>

        <div class="info-panel" style="margin-top:14px;">
          <strong>📌 Diskusi:</strong> Mengapa Bubble Sort masih berguna meski paling lambat? Dalam kondisi apa Insertion Sort lebih unggul?
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  { title: 'Pilih Algoritma', desc: 'Pilih jenis algoritma dari dropdown: Bubble, Selection, atau Insertion Sort.' },
  { title: 'Atur Jumlah Elemen', desc: 'Geser slider untuk menentukan jumlah elemen array (5–30).' },
  { title: 'Atur Kecepatan', desc: 'Atur kecepatan animasi dari lambat (belajar detail) hingga cepat.' },
  { title: 'Generate Data Acak', desc: 'Klik "🎲 Acak" untuk membuat array baru secara acak.' },
  { title: 'Mulai Simulasi', desc: 'Klik "▶ Mulai". Perhatikan batang berwarna yang menunjukkan elemen yang dibandingkan.' },
  { title: 'Analisis Hasil', desc: 'Catat jumlah perbandingan dan penukaran. Bandingkan antar algoritma.' },
]
const legend = [
  { color: '#6366f1', label: 'Ungu — Elemen sedang dibandingkan' },
  { color: '#f43f5e', label: 'Merah — Elemen sedang ditukar' },
  { color: '#10b981', label: 'Hijau — Elemen sudah terurut' },
  { color: '#38bdf8', label: 'Biru — Elemen minimum (Selection)' },
  { color: '#f59e0b', label: 'Kuning — Kunci saat ini (Insertion)' },
  { color: '#334155', label: 'Abu — Elemen belum diproses' },
]
</script>

<style scoped>
.section-title { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 6px; }
.section-subtitle { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px; }
.proc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.steps-panel { display: flex; flex-direction: column; gap: 0; }
.step-item { display: flex; gap: 14px; padding-bottom: 20px; position: relative; }
.step-item:not(:last-child)::after {
  content: ''; position: absolute; left: 14px; top: 34px; bottom: 0; width: 2px;
  background: linear-gradient(180deg, var(--accent-primary), transparent);
}
.step-num {
  width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 800;
  box-shadow: var(--glow-primary);
}
.step-body h4 { font-size: 0.88rem; font-weight: 700; margin-bottom: 4px; }
.step-body p { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; }
.theory-card {
  background: var(--bg-card); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: 16px;
}
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.card-icon { width: 34px; height: 34px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
.card-header h3 { font-size: 0.95rem; font-weight: 700; }
.legend-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
.legend-list li { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; color: var(--text-secondary); }
.color-dot { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }
.info-list { list-style: none; display: flex; flex-direction: column; gap: 5px; }
.info-list li { font-size: 0.8rem; color: var(--text-secondary); padding-left: 14px; position: relative; }
.info-list li::before { content: '▸'; color: var(--accent-primary); position: absolute; left: 0; }
</style>
