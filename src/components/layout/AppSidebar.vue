<template>
  <aside class="sidebar">
    <div class="sidebar-section">
      <h3 class="section-label">Capaian Pembelajaran</h3>
      <div class="ki-grid">
        <div v-for="cp in cps" :key="cp" class="ki-item done">
          <div class="ki-dot"></div>{{ cp }}
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="sidebar-section">
      <h3 class="section-label">Daftar Lab</h3>
      <nav class="lab-list">
        <RouterLink
          v-for="lab in labs"
          :key="lab.path"
          :to="lab.path"
          class="lab-item"
          :class="{ active: isActive(lab.path) }"
          @click="audio.click()"
        >
          <div class="lab-item-icon" :style="{ background: lab.iconBg }">{{ lab.icon }}</div>
          <div class="lab-item-info">
            <h4>{{ lab.title }}</h4>
            <span>{{ lab.subtitle }}</span>
          </div>
          <span class="lab-badge" :class="'fase-' + lab.fase.toLowerCase()">Fase {{ lab.fase }}</span>
        </RouterLink>
      </nav>
    </div>

    <div class="divider"></div>

    <div class="sidebar-section">
      <h3 class="section-label">Status Lab</h3>
      <div class="status-mini">
        <div class="status-row">
          <div class="status-dot"></div>
          <span class="lbl">Lab aktif:</span>
          <span class="val">{{ currentLabTitle }}</span>
        </div>
        <div class="status-row">
          <span class="lbl">Suara:</span>
          <span class="val" :style="{ color: audio.enabled.value ? 'var(--accent-emerald)' : 'var(--accent-rose)' }">
            {{ audio.enabled.value ? 'Aktif' : 'Mati' }}
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'

const audio = inject('audio')
const route = useRoute()

const cps = ['Algoritma', 'Pemrograman', 'Struktur Data', 'Jaringan', 'Sistem Biner', 'Logika']

const labs = [
  { path: '/algoritma',    icon: '⚡', iconBg: 'rgba(99,102,241,0.15)',  title: 'Algoritma Pengurutan', subtitle: 'Bubble · Selection · Insertion', fase: 'E' },
  { path: '/datastruktur', icon: '📦', iconBg: 'rgba(34,211,238,0.15)',  title: 'Struktur Data',        subtitle: 'Stack · Queue · Linked List',   fase: 'E' },
  { path: '/jaringan',     icon: '🌐', iconBg: 'rgba(16,185,129,0.15)',  title: 'Jaringan Komputer',    subtitle: 'Topologi · Protokol · Paket',    fase: 'F' },
  { path: '/biner',        icon: '💡', iconBg: 'rgba(245,158,11,0.15)', title: 'Sistem Biner & Logika', subtitle: 'Biner · Gerbang Logika',         fase: 'F' },
]

function isActive(path) { return route.path === path }

const currentLabTitle = computed(() => {
  const found = labs.find(l => l.path === route.path)
  return found ? found.title : '—'
})
</script>

<style scoped>
.sidebar {
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  overflow-y: auto; padding: 20px 16px;
  display: flex; flex-direction: column; gap: 0;
}
.section-label {
  font-size: 0.63rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--text-muted); margin-bottom: 10px; padding-left: 4px;
}
.ki-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 4px; }
.ki-item {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 8px; border-radius: var(--radius-sm);
  font-size: 0.72rem; color: var(--text-muted);
  background: var(--bg-elevated);
  border: 1px solid transparent;
}
.ki-item.done { border-color: rgba(16,185,129,0.2); color: var(--accent-emerald); }
.ki-dot { width: 5px; height: 5px; border-radius: var(--radius-full); background: var(--accent-emerald); flex-shrink: 0; }

.lab-list { display: flex; flex-direction: column; gap: 3px; }
.lab-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: var(--radius-md);
  cursor: pointer; text-decoration: none;
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}
.lab-item:hover { background: var(--bg-card); border-color: var(--border-subtle); }
.lab-item.active { background: rgba(99,102,241,0.1); border-color: var(--border-active); }
.lab-item-icon {
  width: 30px; height: 30px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.95rem; flex-shrink: 0;
}
.lab-item-info { flex: 1; min-width: 0; }
.lab-item-info h4 { font-size: 0.78rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lab-item-info span { font-size: 0.68rem; color: var(--text-muted); }
.lab-badge {
  font-size: 0.58rem; font-weight: 700; padding: 2px 6px;
  border-radius: var(--radius-full); text-transform: uppercase; white-space: nowrap;
}
.fase-e { background: rgba(99,102,241,0.2); color: var(--text-accent); }
.fase-f { background: rgba(139,92,246,0.2); color: #c4b5fd; }

.status-mini { display: flex; flex-direction: column; gap: 7px; font-size: 0.75rem; font-family: var(--font-mono); }
.status-row { display: flex; align-items: center; gap: 6px; }
.status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-emerald); animation: blink 1.5s ease-in-out infinite; }
.lbl { color: var(--text-muted); }
.val { color: var(--accent-cyan); font-weight: 600; }
</style>
