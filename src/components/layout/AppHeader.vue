<template>
  <header class="lab-header">
    <div class="lab-brand">
      <div class="brand-icon">🧠</div>
      <div class="brand-text">
        <h1>Lab Maya Informatika</h1>
        <span>SMA · Fase E &amp; F · Kurikulum Merdeka</span>
      </div>
    </div>

    <nav class="main-nav" role="navigation" aria-label="Lab Navigation">
      <RouterLink
        v-for="lab in labs"
        :key="lab.path"
        :to="lab.path"
        class="nav-item"
        :class="{ active: isActive(lab.path) }"
        @click="audio.tab()"
      >
        <span class="nav-icon">{{ lab.icon }}</span>
        {{ lab.label }}
      </RouterLink>
    </nav>

    <div class="header-controls">
      <button
        class="icon-btn"
        :class="{ active: !audioEnabled }"
        @click="$emit('toggle-audio')"
        :title="audioEnabled ? 'Matikan Suara' : 'Aktifkan Suara'"
      >
        {{ audioEnabled ? '🔊' : '🔇' }}
      </button>
      <button class="icon-btn" @click="$emit('reset-lab')" title="Reset Lab (R)">🔄</button>
      <button class="icon-btn" @click="$emit('toggle-fullscreen')" title="Fullscreen (F)">⛶</button>
    </div>
  </header>
</template>

<script setup>
import { inject } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ audioEnabled: Boolean })
defineEmits(['toggle-audio', 'reset-lab', 'toggle-fullscreen'])

const audio = inject('audio')
const route = useRoute()

const labs = [
  { path: '/algoritma',    icon: '⚡', label: 'Algoritma' },
  { path: '/datastruktur', icon: '📦', label: 'Struktur Data' },
  { path: '/jaringan',     icon: '🌐', label: 'Jaringan' },
  { path: '/biner',        icon: '💡', label: 'Sistem Biner' },
]

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
.lab-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 24px;
  background: rgba(17,24,39,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
  flex-shrink: 0; z-index: 100;
}
.lab-brand { display: flex; align-items: center; gap: 14px; }
.brand-icon {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  animation: pulse-glow 3s ease-in-out infinite;
}
.brand-text h1 {
  font-size: 1.05rem; font-weight: 800;
  background: linear-gradient(135deg, var(--text-primary), var(--text-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  letter-spacing: -0.02em;
}
.brand-text span { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; }

.main-nav {
  display: flex; gap: 4px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 4px;
}
.nav-item {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-base);
  font-size: 0.8rem; font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
}
.nav-item:hover { color: var(--text-primary); background: var(--bg-elevated); }
.nav-item.active {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  box-shadow: var(--glow-primary);
}
.nav-icon { font-size: 1rem; }

.header-controls { display: flex; align-items: center; gap: 8px; }
.icon-btn {
  width: 36px; height: 36px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  transition: all var(--transition-fast);
}
.icon-btn:hover { border-color: var(--border-active); color: var(--text-primary); background: var(--bg-elevated); }
.icon-btn.active { background: var(--bg-elevated); border-color: var(--border-active); color: var(--accent-rose); }
</style>
