<template>
  <aside class="sidebar">
    <div class="sidebar-section" v-for="(items, tingkat) in classStructure" :key="tingkat">
      <h3 class="section-label">Materi Kelas {{ tingkat }}</h3>
      <nav class="lab-list">
        <RouterLink
          v-for="item in items"
          :key="item.path"
          :to="item.path"
          class="lab-item"
          :class="{ active: isActive(item.path) }"
          @click="audio.click()"
        >
          <div class="lab-item-icon" :style="{ background: item.iconBg || 'rgba(255,255,255,0.05)' }">
            {{ item.icon }}
          </div>
          <div class="lab-item-info">
            <h4>{{ item.label }}</h4>
            <span v-if="item.hasLab" class="lab-badge-inline">Ada Lab Praktik</span>
          </div>
        </RouterLink>
      </nav>
      <div class="divider" v-if="tingkat !== 'XII'"></div>
    </div>
  </aside>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'

const audio = inject('audio')
const route = useRoute()

const classStructure = {
  'X': [
    { path: '/kelas-x/data-informasi', icon: '📊', label: 'Data dan Informasi' },
    { path: '/kelas-x/algoritma-struktur-data', icon: '⚡', iconBg: 'rgba(99,102,241,0.15)', label: 'Algoritma & Struktur Data', hasLab: true },
    { path: '/kelas-x/teknologi-budaya-digital', icon: '💡', iconBg: 'rgba(245,158,11,0.15)', label: 'Teknologi & Budaya Digital', hasLab: true },
    { path: '/kelas-x/keamanan-informasi', icon: '🔒', label: 'Keamanan Informasi' }
  ],
  'XI': [
    { path: '/kelas-xi/informasi-digital', icon: '📖', label: 'Informasi Digital' },
    { path: '/kelas-xi/analisis-data', icon: '📊', label: 'Analisis Data' },
    { path: '/kelas-xi/strategi-algoritmik', icon: '🧠', label: 'Strategi Algoritmik & Desain Struktur Data' },
    { path: '/kelas-xi/berpikir-komputasional', icon: '⚙️', label: 'Berpikir Komputasional & Implementasi Algoritma' },
    { path: '/kelas-xi/jaringan-komputer', icon: '🌐', iconBg: 'rgba(16,185,129,0.15)', label: 'Merancang Jaringan Komputer', hasLab: true }
  ],
  'XII': [
    { path: '/kelas-xii/informatika-masa-depan', icon: '🚀', label: 'Informatika Masa Depan' },
    { path: '/kelas-xii/sistem-komputer', icon: '💻', label: 'Sistem Komputer' },
    { path: '/kelas-xii/berpikir-komputasional', icon: '⚙️', label: 'Berpikir Komputasional' },
    { path: '/kelas-xii/jaringan-internet', icon: '📡', label: 'Jaringan dan Internet' },
    { path: '/kelas-xii/dampak-sosial', icon: '🌍', label: 'Dampak Sosial' }
  ]
}

function isActive(path) { 
  return route.path === path.split('?')[0] 
}
</script>

<style scoped>
.sidebar {
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  overflow-y: auto; 
  padding: 20px 16px;
  display: flex; 
  flex-direction: column; 
  gap: 15px;
}
.section-label {
  font-size: 0.75rem; 
  font-weight: 700;
  text-transform: uppercase; 
  letter-spacing: 0.1em;
  color: var(--text-muted); 
  margin-bottom: 12px; 
  padding-left: 4px;
}
.lab-list {
  display: flex; 
  flex-direction: column; 
  gap: 4px;
}
.lab-item {
  display: flex; 
  align-items: center; 
  gap: 12px;
  padding: 10px 12px; 
  border-radius: var(--radius-md);
  text-decoration: none; 
  transition: all 0.2s;
  border: 1px solid transparent;
  position: relative;
}
.lab-item:hover {
  background: rgba(255,255,255,0.03); 
  border-color: var(--border-subtle);
}
.lab-item.active {
  background: rgba(99,102,241,0.1); 
  border-color: rgba(99,102,241,0.2);
}
.lab-item-icon {
  width: 34px; 
  height: 34px; 
  border-radius: var(--radius-md);
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-size: 1.1rem;
}
.lab-item-info {
  display: flex; 
  flex-direction: column; 
  gap: 3px; 
  flex: 1;
}
.lab-item-info h4 {
  margin: 0; 
  font-size: 0.85rem; 
  font-weight: 600; 
  color: var(--text-secondary);
}
.lab-item.active .lab-item-info h4 {
  color: var(--accent-primary);
}
.lab-badge-inline {
  font-size: 0.65rem;
  color: var(--accent-emerald);
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  align-self: flex-start;
  font-weight: 600;
}
.divider {
  height: 1px; 
  background: var(--border-subtle); 
  margin: 5px 0;
}
</style>
