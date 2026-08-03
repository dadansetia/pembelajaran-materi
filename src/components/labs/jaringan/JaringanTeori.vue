<template>
  <div>
    <h2 class="section-title">Jaringan Komputer</h2>
    <p class="section-subtitle">Topologi, protokol, dan transmisi data · <span class="badge badge-fase-f">Fase F</span></p>
    <div class="theory-grid">
      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(16,185,129,0.15)">⭐</div><h3>Topologi Star</h3></div>
        <p>Semua perangkat terhubung ke satu titik pusat (switch/hub). Paling umum di jaringan modern.</p>
        <ul class="info-list">
          <li>✅ Mudah menambah perangkat baru</li>
          <li>✅ Satu node rusak tidak pengaruhi lain</li>
          <li>❌ Bergantung pada central node</li>
          <li>❌ Butuh lebih banyak kabel</li>
        </ul>
      </div>
      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(245,158,11,0.15)">🔁</div><h3>Topologi Ring</h3></div>
        <p>Setiap perangkat terhubung ke dua tetangganya membentuk cincin. Data mengalir searah.</p>
        <ul class="info-list">
          <li>✅ Kinerja konsisten</li>
          <li>✅ Tidak ada tabrakan data</li>
          <li>❌ Satu kerusakan node merusak seluruh ring</li>
          <li>❌ Sulit menambahkan node</li>
        </ul>
      </div>
      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(99,102,241,0.15)">🚌</div><h3>Topologi Bus</h3></div>
        <p>Semua perangkat berbagi satu kabel utama (backbone). Jaringan Ethernet generasi pertama.</p>
        <ul class="info-list">
          <li>✅ Hemat kabel, instalasi mudah</li>
          <li>❌ Backbone rusak → seluruh jaringan mati</li>
          <li>❌ Performa menurun saat banyak traffic</li>
          <li>Digunakan pada LAN lama (10Base-2)</li>
        </ul>
      </div>
      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(34,211,238,0.15)">🔀</div><h3>Model TCP/IP</h3></div>
        <p>Standar protokol internet modern, terdiri dari 4 lapisan yang berperan dalam transmisi data.</p>
        <ul class="info-list">
          <li><strong>Application</strong> — HTTP, FTP, DNS, SMTP</li>
          <li><strong>Transport</strong> — TCP (andal), UDP (cepat)</li>
          <li><strong>Internet</strong> — IP addressing, routing</li>
          <li><strong>Network Access</strong> — Ethernet, WiFi</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.section-title { font-size:1.25rem; font-weight:800; margin-bottom:6px; }
.section-subtitle { font-size:0.85rem; color:var(--text-secondary); margin-bottom:20px; }
.theory-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.theory-card { background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:18px; }
.card-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.card-icon { width:36px; height:36px; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:1.1rem; }
.card-header h3 { font-size:1rem; font-weight:700; }
.theory-card p { font-size:0.83rem; color:var(--text-secondary); line-height:1.65; margin-bottom:10px; }
.info-list { list-style:none; display:flex; flex-direction:column; gap:5px; }
.info-list li { font-size:0.8rem; color:var(--text-secondary); padding-left:14px; position:relative; }
.info-list li::before { content:'▸'; color:var(--accent-primary); position:absolute; left:0; }
</style>
