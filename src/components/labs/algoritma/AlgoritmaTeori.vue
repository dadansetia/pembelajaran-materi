<template>
  <div>
    <h2 class="section-title">Algoritma Pengurutan</h2>
    <p class="section-subtitle">Memahami cara kerja algoritma sorting · <span class="badge badge-fase-e">Fase E</span></p>

    <div class="theory-grid">
      <!-- Bubble Sort -->
      <div class="theory-card">
        <div class="card-header">
          <div class="card-icon" style="background:rgba(99,102,241,0.15)">⚡</div>
          <h3>Bubble Sort</h3>
        </div>
        <p>Membandingkan dua elemen berurutan, menukar jika salah urutan. Diulang sampai semua terurut.</p>
        <ul class="info-list">
          <li>Kompleksitas: <strong class="text-amber">O(n²)</strong> · Ruang: <strong class="text-emerald">O(1)</strong></li>
          <li>Stabil: Ya · Cocok untuk data kecil</li>
        </ul>
        <pre class="code-block"><span class="text-accent">def</span> bubble_sort(arr):
  n = len(arr)
  <span class="text-amber">for</span> i <span class="text-amber">in</span> range(n):
    <span class="text-amber">for</span> j <span class="text-amber">in</span> range(0, n-i-1):
      <span class="text-sky">if</span> arr[j] > arr[j+1]:
        arr[j], arr[j+1] = arr[j+1], arr[j]</pre>
      </div>

      <!-- Selection Sort -->
      <div class="theory-card">
        <div class="card-header">
          <div class="card-icon" style="background:rgba(34,211,238,0.15)">🔍</div>
          <h3>Selection Sort</h3>
        </div>
        <p>Cari elemen minimum, tempatkan ke posisi benar. Lebih sedikit swap dari Bubble Sort.</p>
        <ul class="info-list">
          <li>Kompleksitas: <strong class="text-amber">O(n²)</strong> · Ruang: <strong class="text-emerald">O(1)</strong></li>
          <li>Stabil: Tidak · Jumlah swap minimal</li>
        </ul>
        <pre class="code-block"><span class="text-accent">def</span> selection_sort(arr):
  n = len(arr)
  <span class="text-amber">for</span> i <span class="text-amber">in</span> range(n):
    min_idx = i
    <span class="text-amber">for</span> j <span class="text-amber">in</span> range(i+1, n):
      <span class="text-sky">if</span> arr[j] < arr[min_idx]:
        min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]</pre>
      </div>

      <!-- Insertion Sort -->
      <div class="theory-card">
        <div class="card-header">
          <div class="card-icon" style="background:rgba(16,185,129,0.15)">🃏</div>
          <h3>Insertion Sort</h3>
        </div>
        <p>Menyisipkan elemen ke posisi tepat dalam bagian yang sudah terurut. Seperti menyusun kartu remi.</p>
        <ul class="info-list">
          <li>Best: <strong class="text-emerald">O(n)</strong> · Worst: <strong class="text-amber">O(n²)</strong></li>
          <li>Stabil: Ya · Efisien untuk data hampir terurut</li>
        </ul>
        <pre class="code-block"><span class="text-accent">def</span> insertion_sort(arr):
  <span class="text-amber">for</span> i <span class="text-amber">in</span> range(1, len(arr)):
    key = arr[i]; j = i - 1
    <span class="text-sky">while</span> j >= 0 <span class="text-sky">and</span> arr[j] > key:
      arr[j + 1] = arr[j]; j -= 1
    arr[j + 1] = key</pre>
      </div>

      <!-- Complexity Table -->
      <div class="theory-card">
        <div class="card-header">
          <div class="card-icon" style="background:rgba(245,158,11,0.15)">📊</div>
          <h3>Perbandingan Kompleksitas</h3>
        </div>
        <table class="cmp-table">
          <thead>
            <tr><th>Algoritma</th><th class="text-emerald">Best</th><th class="text-amber">Average</th><th class="text-rose">Worst</th></tr>
          </thead>
          <tbody>
            <tr v-for="row in complexity" :key="row.name">
              <td>{{ row.name }}</td>
              <td class="text-emerald center">{{ row.best }}</td>
              <td class="text-amber center">{{ row.avg }}</td>
              <td class="text-rose center">{{ row.worst }}</td>
            </tr>
          </tbody>
        </table>
        <p class="mt-sm text-secondary" style="font-size:0.8rem;">
          Notasi <strong class="text-accent">Big-O</strong> menggambarkan batas atas kompleksitas terhadap ukuran input <em>n</em>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const complexity = [
  { name: 'Bubble',    best: 'O(n)',  avg: 'O(n²)', worst: 'O(n²)' },
  { name: 'Selection', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)' },
  { name: 'Insertion', best: 'O(n)',  avg: 'O(n²)', worst: 'O(n²)' },
]
</script>

<style scoped>
.section-title { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 6px; }
.section-subtitle { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px; }
.theory-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.theory-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 18px;
  transition: all var(--transition-base);
  position: relative; overflow: hidden;
}
.theory-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-cyan));
  transform: scaleX(0); transform-origin: left; transition: transform var(--transition-slow);
}
.theory-card:hover::before { transform: scaleX(1); }
.theory-card:hover { border-color: var(--border-active); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.card-icon { width: 36px; height: 36px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
.card-header h3 { font-size: 1rem; font-weight: 700; }
.theory-card p { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 10px; }
.info-list { list-style: none; display: flex; flex-direction: column; gap: 5px; }
.info-list li { font-size: 0.8rem; color: var(--text-secondary); padding-left: 14px; position: relative; }
.info-list li::before { content: '▸'; color: var(--accent-primary); position: absolute; left: 0; }
.cmp-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.78rem; margin-bottom: 10px; }
.cmp-table th { background: var(--bg-elevated); color: var(--text-secondary); padding: 7px 12px; border: 1px solid var(--border-subtle); font-weight: 700; text-align: left; }
.cmp-table td { padding: 6px 12px; border: 1px solid var(--border-subtle); color: var(--text-secondary); }
.center { text-align: center; }
.mt-sm { margin-top: 10px; }
</style>
