<template>
  <div>
    <h2 class="section-title">Prosedur Percobaan</h2>
    <p class="section-subtitle">Cara menggunakan konverter 8-bit dan simulator gerbang logika</p>

    <div class="proc-grid">
      <div class="steps-panel">
        <div v-for="(s,i) in steps" :key="i" class="step-item">
          <div class="step-num">{{ i+1 }}</div>
          <div class="step-body"><h4>{{ s.title }}</h4><p>{{ s.desc }}</p></div>
        </div>
      </div>
      <div>
        <div class="theory-card">
          <div class="card-header"><div class="card-icon" style="background:rgba(99,102,241,0.15)">🎯</div><h3>Tantangan Belajar</h3></div>
          <ul class="info-list">
            <li>Coba buat nilai <strong>255</strong> pada konverter biner. Berapa bit yang harus menyala?</li>
            <li>Buat nilai <strong>170</strong> (pola selang-seling).</li>
            <li>Pada simulator logika, buat kondisi dimana output XOR bernilai 0 (mati).</li>
            <li>Kombinasikan gerbang NAND. Tahukah kamu bahwa semua gerbang lain bisa dibuat hanya dengan NAND?</li>
          </ul>
        </div>
        <div class="info-panel" style="margin-top:14px;">
          <strong>💡 Ingat:</strong> Biner dibaca dari kanan ke kiri. Bit paling kanan bernilai 1 (2⁰), kirinya bernilai 2 (2¹), lalu 4 (2²), dst.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const steps = [
  { title: 'Konverter Biner 8-bit', desc: 'Klik kotak-kotak bit (0/1) untuk membalikkan nilainya. Amati perubahan angka desimal di bawahnya.' },
  { title: 'Pilih Gerbang Logika', desc: 'Pada bagian simulator logika, pilih jenis gerbang dari dropdown (AND, OR, NOT, dll).' },
  { title: 'Ubah Input Logika', desc: 'Klik tombol Input A dan Input B untuk mengubah nilai dari 0 ke 1 atau sebaliknya.' },
  { title: 'Amati Output', desc: 'Lampu LED akan menyala (hijau) jika Output bernilai 1, dan mati (merah) jika 0.' },
  { title: 'Bandingkan Tabel Kebenaran', desc: 'Coba semua kombinasi input (00, 01, 10, 11) dan cocokkan hasilnya dengan teori di tab sebelumnya.' },
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
