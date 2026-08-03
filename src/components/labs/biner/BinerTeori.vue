<template>
  <div>
    <h2 class="section-title">Sistem Biner &amp; Gerbang Logika</h2>
    <p class="section-subtitle">Dasar komputasi digital · <span class="badge badge-fase-f">Fase F</span></p>

    <div class="theory-grid">
      <div class="theory-card" style="grid-column: span 2;">
        <div class="card-header"><div class="card-icon" style="background:rgba(245,158,11,0.15)">🔢</div><h3>Sistem Bilangan Biner</h3></div>
        <p>Sistem basis 2 yang hanya menggunakan angka <strong>0</strong> dan <strong>1</strong>. Komputer menggunakan biner karena secara fisik dibangun dari jutaan transistor yang bertindak sebagai saklar (On/Off).</p>
        <div class="compare-grid mt-md">
          <div>
            <h4 class="text-accent mb-sm">Konversi Biner ke Desimal</h4>
            <p style="font-size:0.8rem">Kalikan setiap bit dengan 2 pangkat posisinya (dari kanan ke kiri, mulai dari 0).</p>
            <pre class="code-block">Biner: 1011
= (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰)
= (1 × 8)  + (0 × 4)  + (1 × 2)  + (1 × 1)
= 8 + 0 + 2 + 1 = 11 (Desimal)</pre>
          </div>
          <div>
            <h4 class="text-accent mb-sm">Satuan Data</h4>
            <ul class="info-list">
              <li><strong>Bit:</strong> 1 digit biner (0 atau 1)</li>
              <li><strong>Nibble:</strong> 4 bit</li>
              <li><strong>Byte:</strong> 8 bit (mampu menyimpan 256 nilai: 0-255)</li>
              <li>Satu karakter teks ASCII biasanya disimpan dalam 1 Byte.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(99,102,241,0.15)">AND</div><h3>Gerbang AND</h3></div>
        <p>Output 1 <strong>HANYA JIKA</strong> semua input 1. Seperti saklar seri.</p>
        <table class="truth-table mt-sm">
          <thead><tr><th>A</th><th>B</th><th>OUT</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td class="val-0">0</td></tr>
            <tr><td>0</td><td>1</td><td class="val-0">0</td></tr>
            <tr><td>1</td><td>0</td><td class="val-0">0</td></tr>
            <tr class="active-row"><td>1</td><td>1</td><td class="val-1">1</td></tr>
          </tbody>
        </table>
      </div>

      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(34,211,238,0.15)">OR</div><h3>Gerbang OR</h3></div>
        <p>Output 1 jika <strong>MINIMAL SATU</strong> input 1. Seperti saklar paralel.</p>
        <table class="truth-table mt-sm">
          <thead><tr><th>A</th><th>B</th><th>OUT</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td class="val-0">0</td></tr>
            <tr class="active-row"><td>0</td><td>1</td><td class="val-1">1</td></tr>
            <tr class="active-row"><td>1</td><td>0</td><td class="val-1">1</td></tr>
            <tr class="active-row"><td>1</td><td>1</td><td class="val-1">1</td></tr>
          </tbody>
        </table>
      </div>

      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(16,185,129,0.15)">XOR</div><h3>Gerbang XOR</h3></div>
        <p>Output 1 jika input <strong>BERBEDA</strong>. Sering dipakai untuk penjumlahan biner.</p>
        <table class="truth-table mt-sm">
          <thead><tr><th>A</th><th>B</th><th>OUT</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td class="val-0">0</td></tr>
            <tr class="active-row"><td>0</td><td>1</td><td class="val-1">1</td></tr>
            <tr class="active-row"><td>1</td><td>0</td><td class="val-1">1</td></tr>
            <tr><td>1</td><td>1</td><td class="val-0">0</td></tr>
          </tbody>
        </table>
      </div>

      <div class="theory-card">
        <div class="card-header"><div class="card-icon" style="background:rgba(244,63,94,0.15)">NOT</div><h3>Gerbang NOT</h3></div>
        <p>Gerbang Inverter. Membalikkan logika (1 jadi 0, 0 jadi 1).</p>
        <table class="truth-table mt-sm">
          <thead><tr><th>IN</th><th>OUT</th></tr></thead>
          <tbody>
            <tr><td>0</td><td class="val-1" style="background:rgba(99,102,241,0.15)">1</td></tr>
            <tr class="active-row"><td>1</td><td class="val-0">0</td></tr>
          </tbody>
        </table>
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
.card-icon { width:42px; height:36px; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:0.9rem; font-weight:800; font-family:var(--font-mono); }
.card-header h3 { font-size:1rem; font-weight:700; }
.theory-card p { font-size:0.83rem; color:var(--text-secondary); line-height:1.65; margin-bottom:10px; }
.info-list { list-style:none; display:flex; flex-direction:column; gap:5px; }
.info-list li { font-size:0.8rem; color:var(--text-secondary); padding-left:14px; position:relative; }
.info-list li::before { content:'▸'; color:var(--accent-primary); position:absolute; left:0; }
.compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.mt-md { margin-top: 14px; }
.mt-sm { margin-top: 10px; }
.mb-sm { margin-bottom: 6px; }
</style>
