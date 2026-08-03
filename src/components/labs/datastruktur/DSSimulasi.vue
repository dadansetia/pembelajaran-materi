<template>
  <div>
    <h2 class="section-title">Simulasi Stack &amp; Queue</h2>
    <p class="section-subtitle">Interaktif — masukkan dan keluarkan elemen secara langsung</p>

    <div class="sim-controls mb-md">
      <button class="btn" :class="mode==='stack' ? 'btn-primary':'btn-secondary'" @click="selectMode('stack')">📚 Stack</button>
      <button class="btn" :class="mode==='queue' ? 'btn-primary':'btn-secondary'" @click="selectMode('queue')">🚶 Queue</button>
      <input v-model="inputVal" type="text" maxlength="6" placeholder="Masukkan nilai…"
        style="width:150px;" @keydown.enter="push" aria-label="Input nilai" />
      <button class="btn btn-success" @click="push">⬆ {{ mode==='stack' ? 'Push' : 'Enqueue' }}</button>
      <button class="btn btn-warning" @click="pop">⬇ {{ mode==='stack' ? 'Pop' : 'Dequeue' }}</button>
      <button class="btn btn-danger" @click="reset">🔄 Reset</button>
    </div>

    <!-- Visualization -->
    <div class="ds-visual-box">
      <div v-if="mode === 'stack'" class="stack-area">
        <div class="ds-label">📚 Stack (LIFO) — TOP di atas</div>
        <div class="stack-column">
          <TransitionGroup name="stack-item">
            <div v-for="(item, idx) in [...items].reverse()" :key="item.id"
              class="ds-item"
              :class="{ 'is-top': idx === 0 }"
              :style="{ background: item.bg, borderColor: item.border, color: item.text }">
              <span>{{ item.val }}</span>
              <span v-if="idx === 0" class="item-tag">TOP</span>
            </div>
          </TransitionGroup>
          <div v-if="!items.length" class="empty-msg">📭 Stack kosong</div>
        </div>
      </div>

      <div v-else class="queue-area">
        <div class="ds-label">🚶 Queue (FIFO) — FRONT di kiri</div>
        <div class="queue-row">
          <div class="queue-label-left">FRONT</div>
          <TransitionGroup name="queue-item">
            <div v-for="(item, idx) in items" :key="item.id"
              class="ds-item queue-cell"
              :class="{ 'is-front': idx === 0, 'is-rear': idx === items.length - 1 }"
              :style="{ background: item.bg, borderColor: item.border, color: item.text }">
              {{ item.val }}
            </div>
          </TransitionGroup>
          <div v-if="!items.length" class="empty-msg">📭 Queue kosong</div>
          <div class="queue-label-right">REAR</div>
        </div>
      </div>
    </div>

    <div class="status-bar mt-md">
      <div class="status-item"><span class="label">Mode:</span><span class="value">{{ mode === 'stack' ? 'Stack' : 'Queue' }}</span></div>
      <div class="status-item"><span class="label">Ukuran:</span><span class="value">{{ items.length }}</span></div>
      <div class="status-item"><span class="label">Operasi:</span><span class="value">{{ ops }}</span></div>
      <div class="status-item"><span class="label">{{ mode === 'stack' ? 'Top' : 'Front' }}:</span>
        <span class="value">{{ mode === 'stack' ? (items.at(-1)?.val || '—') : (items[0]?.val || '—') }}</span>
      </div>
    </div>

    <div class="info-panel mt-md">{{ infoText }}</div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const audio = inject('audio')
const toast = inject('toast')

const mode = ref('stack')
const inputVal = ref('')
const items = ref([])
const ops = ref(0)
const infoText = ref('Mode Stack aktif. Gunakan Push untuk menambah, Pop untuk mengambil elemen teratas (LIFO).')

const COLORS = [
  { bg:'rgba(99,102,241,0.25)',  border:'#6366f1', text:'#a5b4fc' },
  { bg:'rgba(34,211,238,0.18)',  border:'#22d3ee', text:'#67e8f9' },
  { bg:'rgba(16,185,129,0.18)',  border:'#10b981', text:'#6ee7b7' },
  { bg:'rgba(245,158,11,0.18)',  border:'#f59e0b', text:'#fcd34d' },
  { bg:'rgba(244,63,94,0.18)',   border:'#f43f5e', text:'#fda4af' },
  { bg:'rgba(139,92,246,0.25)',  border:'#8b5cf6', text:'#c4b5fd' },
]
let colorIdx = 0, idCtr = 0

function selectMode(m) {
  mode.value = m; audio.tab()
  infoText.value = m === 'stack'
    ? 'Mode Stack aktif (LIFO). Push menambah ke atas, Pop mengambil dari atas.'
    : 'Mode Queue aktif (FIFO). Enqueue menambah ke belakang, Dequeue mengambil dari depan.'
}

function push() {
  const val = inputVal.value.trim()
  if (!val) { audio.error(); toast.error('⚠️ Masukkan nilai terlebih dahulu'); return }
  if (items.value.length >= 12) { audio.error(); toast.error('⚠️ Kapasitas maksimum (12)'); return }
  const col = COLORS[colorIdx++ % COLORS.length]
  items.value.push({ val, id: ++idCtr, ...col })
  ops.value++; inputVal.value = ''; audio.push()
  toast.success(`✅ "${val}" ditambahkan ke ${mode.value === 'stack' ? 'Stack' : 'Queue'}`)
}

function pop() {
  if (!items.value.length) { audio.error(); toast.error(`⚠️ ${mode.value === 'stack' ? 'Stack' : 'Queue'} kosong!`); return }
  const removed = mode.value === 'stack' ? items.value.pop() : items.value.shift()
  ops.value++; audio.pop()
  toast.info(`📤 "${removed.val}" dikeluarkan`)
}

function reset() {
  items.value = []; ops.value = 0; audio.reset()
  toast.info('🔄 Direset')
}

defineExpose({ reset })
</script>

<style scoped>
.section-title { font-size:1.25rem; font-weight:800; margin-bottom:6px; }
.section-subtitle { font-size:0.85rem; color:var(--text-secondary); margin-bottom:16px; }
.mb-md { margin-bottom:12px; }
.mt-md { margin-top:12px; }
.ds-visual-box {
  background: var(--bg-base); border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg); padding: 24px; min-height: 280px;
}
.ds-label { font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted); margin-bottom:16px; }
.stack-area { display:flex; flex-direction:column; align-items:center; }
.stack-column { display:flex; flex-direction:column; gap:5px; width:180px; min-height:200px; justify-content:flex-end; }
.queue-area { display:flex; flex-direction:column; }
.queue-row { display:flex; align-items:center; gap:5px; flex-wrap:wrap; min-height:56px; }
.queue-label-left, .queue-label-right { font-size:0.65rem; font-weight:700; color:var(--text-muted); flex-shrink:0; }
.ds-item {
  display:flex; align-items:center; justify-content:center;
  height:44px; border-radius:var(--radius-sm); border:2px solid;
  font-family:var(--font-mono); font-weight:700; font-size:0.85rem;
  position:relative; transition:all var(--transition-base);
}
.ds-item.queue-cell { min-width:60px; padding:0 10px; }
.ds-item:not(.queue-cell) { width:100%; }
.is-top { border-color: var(--accent-amber) !important; background: rgba(245,158,11,0.2) !important; }
.is-front { border-color: var(--accent-emerald) !important; }
.is-rear { border-color: var(--accent-cyan) !important; }
.item-tag { position:absolute; right:-32px; font-size:0.55rem; color:var(--accent-amber); font-weight:800; }
.empty-msg { color:var(--text-muted); font-size:0.8rem; text-align:center; padding:20px; }

/* Transitions */
.stack-item-enter-active { animation: slideIn 0.25s ease-out; }
.stack-item-leave-active { animation: slideIn 0.2s ease-in reverse; }
.stack-item-move { transition: transform 0.25s ease; }
.queue-item-enter-active { animation: slideIn 0.25s ease-out; }
.queue-item-leave-active { transition: all 0.2s ease; opacity: 0; transform: translateX(-20px); }
.queue-item-move { transition: transform 0.25s ease; }
</style>
