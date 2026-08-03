<template>
  <div>
    <h2 class="section-title">Simulasi Algoritma Pengurutan</h2>
    <p class="section-subtitle">Visualisasi real-time proses sorting</p>

    <!-- Controls Row 1 -->
    <div class="sim-controls mb-md">
      <select v-model="algorithm" @change="audio.click()" aria-label="Pilih Algoritma">
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
      </select>

      <div class="speed-control">
        <span>⏱</span>
        <input type="range" v-model.number="speed" min="1" max="10" aria-label="Kecepatan" />
        <span>{{ speed }}×</span>
      </div>

      <div class="speed-control">
        <span>📊</span>
        <input type="range" v-model.number="size" min="5" max="30"
          @change="randomize" aria-label="Jumlah Elemen" />
        <span>{{ size }}</span>
      </div>
    </div>

    <!-- Controls Row 2 -->
    <div class="sim-controls mb-md">
      <button class="btn btn-primary" :disabled="isRunning" @click="start">▶ Mulai</button>
      <button class="btn btn-secondary" :disabled="!isRunning" @click="togglePause">
        {{ isPaused ? '▶ Lanjut' : '⏸ Jeda' }}
      </button>
      <button class="btn btn-warning" :disabled="isRunning" @click="randomize">🎲 Acak</button>
      <button class="btn btn-danger" @click="reset">🔄 Reset</button>
    </div>

    <!-- Canvas -->
    <div class="viz-box">
      <canvas ref="canvasRef" aria-label="Visualisasi Sorting"></canvas>
    </div>

    <!-- Stats -->
    <div class="status-bar mt-md">
      <div class="status-item"><span class="label">Algoritma:</span><span class="value">{{ algName }}</span></div>
      <div class="status-item"><span class="label">Perbandingan:</span><span class="value">{{ comparisons }}</span></div>
      <div class="status-item"><span class="label">Penukaran:</span><span class="value">{{ swaps }}</span></div>
      <div class="status-item"><span class="label">Status:</span><span class="value">{{ status }}</span></div>
    </div>

    <div class="info-panel mt-md">{{ infoText }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject, watch } from 'vue'
import { useToast } from '../../../composables/useToast.js'

const audio = inject('audio')
const toast = inject('toast')

// State
const algorithm = ref('bubble')
const speed = ref(5)
const size = ref(15)
const canvasRef = ref(null)
const isRunning = ref(false)
const isPaused = ref(false)
const comparisons = ref(0)
const swaps = ref(0)
const status = ref('Siap')
const infoText = ref('Pilih algoritma lalu klik Mulai untuk memulai visualisasi.')

let arr = []
let stopFlag = false
let pauseResolve = null
let animTimer = null

const algName = computed(() => ({
  bubble: 'Bubble Sort', selection: 'Selection Sort', insertion: 'Insertion Sort'
}[algorithm.value]))

const C = { default:'#334155', compare:'#6366f1', swap:'#f43f5e', sorted:'#10b981', min:'#38bdf8', key:'#f59e0b' }

// Expose reset for parent
defineExpose({ reset })

// ─── Canvas drawing ─────────────────────────────────────────
function initCanvas() {
  const c = canvasRef.value
  if (!c) return
  const p = c.parentElement
  c.width = p.offsetWidth || 700
  c.height = 280
}

function draw(highlights = {}) {
  const c = canvasRef.value
  if (!c) return
  const ct = c.getContext('2d')
  ct.clearRect(0, 0, c.width, c.height)
  const n = arr.length; if (!n) return
  const pad = 8, bw = (c.width - pad*2) / n
  const mx = Math.max(...arr)

  arr.forEach((val, i) => {
    const x = pad + i * bw
    const bh = (val / mx) * (c.height - 40)
    const y = c.height - bh
    const col = highlights[i] || C.default
    const g = ct.createLinearGradient(0, y, 0, c.height)
    g.addColorStop(0, col); g.addColorStop(1, col + '55')
    ct.fillStyle = g
    ct.beginPath(); ct.roundRect(x+1, y, bw-2, bh, [3,3,0,0]); ct.fill()
    if (bw > 18) {
      ct.fillStyle = '#94a3b8'; ct.font = `bold ${Math.min(11,bw*0.38)}px Inter,sans-serif`
      ct.textAlign = 'center'; ct.fillText(val, x+bw/2, y-4)
    }
  })
  ct.fillStyle = 'rgba(99,102,241,0.12)'; ct.fillRect(0,0,220,28)
  ct.fillStyle='#a5b4fc'; ct.font='11px JetBrains Mono,monospace'; ct.textAlign='left'
  ct.fillText(`CMP:${comparisons.value}  SWAP:${swaps.value}`, 10, 18)
}

// ─── Sorting algorithms ─────────────────────────────────────
function delay(ms) {
  return new Promise(res => { animTimer = setTimeout(res, stopFlag ? 0 : ms) })
}
function waitPause() {
  if (isPaused.value && !stopFlag) return new Promise(r => { pauseResolve = r })
  return Promise.resolve()
}
function getDelay() { return Math.max(8, 510 - speed.value * 50) }

async function bubbleSort() {
  const n = arr.length; const sorted = new Set()
  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n-i-1; j++) {
      if (stopFlag) return
      await waitPause(); comparisons.value++; audio.compare()
      const h = {}; sorted.forEach(k => h[k] = C.sorted); h[j] = C.compare; h[j+1] = C.compare
      draw(h); status.value = 'Membandingkan…'; await delay(getDelay())
      if (arr[j] > arr[j+1]) {
        swaps.value++; audio.swap();
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        const h2 = {}; sorted.forEach(k => h2[k] = C.sorted); h2[j]=C.swap; h2[j+1]=C.swap
        draw(h2); status.value = 'Menukar…'; await delay(getDelay())
      }
    }
    sorted.add(n-1-i)
  }
  sorted.add(0)
  const hf={}; sorted.forEach(k => hf[k]=C.sorted); draw(hf)
}

async function selectionSort() {
  const n = arr.length; const sorted = new Set()
  for (let i = 0; i < n-1; i++) {
    let minIdx = i; if (stopFlag) return
    for (let j = i+1; j < n; j++) {
      if (stopFlag) return
      await waitPause(); comparisons.value++; audio.compare()
      const h={}; sorted.forEach(k=>h[k]=C.sorted); h[i]=C.compare; h[minIdx]=C.min; h[j]=C.compare
      draw(h); status.value='Mencari min…'; await delay(getDelay())
      if (arr[j] < arr[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      swaps.value++; audio.swap(); [arr[i],arr[minIdx]]=[arr[minIdx],arr[i]]
      const h2={}; sorted.forEach(k=>h2[k]=C.sorted); h2[i]=C.swap; h2[minIdx]=C.swap
      draw(h2); status.value='Menukar…'; await delay(getDelay())
    }
    sorted.add(i)
  }
  sorted.add(n-1); const hf={}; sorted.forEach(k=>hf[k]=C.sorted); draw(hf)
}

async function insertionSort() {
  const n = arr.length; const sorted = new Set([0])
  for (let i = 1; i < n; i++) {
    if (stopFlag) return
    const key = arr[i]; let j = i-1
    audio.compare(); const h0={}; sorted.forEach(k=>h0[k]=C.sorted); h0[i]=C.key
    draw(h0); status.value='Memilih kunci…'; await delay(getDelay())
    while (j >= 0 && arr[j] > key) {
      if (stopFlag) return; await waitPause()
      comparisons.value++; audio.swap(); arr[j+1]=arr[j]; j--; swaps.value++
      const h={}; sorted.forEach(k=>h[k]=C.sorted); h[j+1]=C.swap; h[j+2]=C.key
      draw(h); status.value='Menggeser…'; await delay(getDelay())
    }
    arr[j+1]=key; sorted.add(i); const h2={}; sorted.forEach(k=>h2[k]=C.sorted); draw(h2)
  }
}

// ─── Controls ────────────────────────────────────────────────
function randomize() {
  if (isRunning.value) return
  arr = Array.from({length:size.value}, () => Math.floor(Math.random()*90)+10)
  comparisons.value = 0; swaps.value = 0; status.value = 'Siap'
  infoText.value = `Array diacak (${size.value} elemen). Klik ▶ Mulai untuk memulai.`
  draw(); audio.reset()
}

async function start() {
  if (isRunning.value) return
  if (!arr.length) randomize()
  audio.click(); isRunning.value=true; isPaused.value=false; stopFlag=false
  comparisons.value=0; swaps.value=0; infoText.value=`Menjalankan ${algName.value}…`

  switch (algorithm.value) {
    case 'bubble':    await bubbleSort(); break
    case 'selection': await selectionSort(); break
    case 'insertion': await insertionSort(); break
  }

  if (!stopFlag) {
    const hf={}; arr.forEach((_,i)=>hf[i]=C.sorted); draw(hf)
    audio.sortDone(); status.value='Selesai ✓'
    infoText.value=`✅ Selesai! ${algName.value} → ${comparisons.value} perbandingan, ${swaps.value} penukaran.`
    toast.success('✅ Pengurutan selesai!')
  }
  isRunning.value=false; isPaused.value=false
}

function togglePause() {
  if (!isRunning.value) return; audio.click()
  if (isPaused.value) {
    isPaused.value=false; if (pauseResolve) { pauseResolve(); pauseResolve=null }
    status.value='Berjalan…'
  } else {
    isPaused.value=true; status.value='Dijeda'
  }
}

function reset() {
  stopFlag=true; isRunning.value=false; isPaused.value=false
  if (pauseResolve) { pauseResolve(); pauseResolve=null }
  if (animTimer) clearTimeout(animTimer)
  comparisons.value=0; swaps.value=0; status.value='Siap'
  infoText.value='Array direset. Klik 🎲 Acak lalu ▶ Mulai.'
  setTimeout(() => { stopFlag=false; randomize() }, 80)
  audio.reset()
}

onMounted(() => {
  initCanvas(); randomize()
  window.addEventListener('resize', () => { initCanvas(); draw() })
})
onUnmounted(() => { stopFlag=true; if (animTimer) clearTimeout(animTimer) })
</script>

<style scoped>
.section-title { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 6px; }
.section-subtitle { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px; }
.mb-md { margin-bottom: 12px; }
.mt-md { margin-top: 12px; }
.viz-box {
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 14px; overflow: hidden;
}
.viz-box canvas { display: block; width: 100%; border-radius: var(--radius-md); }
</style>
