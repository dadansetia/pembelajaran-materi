<template>
  <header class="lab-header">
    <div class="lab-brand" style="cursor: pointer;" @click="goHome">
      <div class="brand-icon">🧠</div>
      <div class="brand-text">
        <h1>Lab Maya Informatika</h1>
        <span>SMA · Fase E &amp; F · Kurikulum Merdeka</span>
      </div>
    </div>

    <nav class="main-nav" role="navigation" aria-label="Lab Navigation">
      <!-- Jika tidak ada kelas yang aktif, tampilkan menu utama (Pilih Kelas) -->
      <template v-if="!activeClass">
        <button class="nav-item" @click="openClassMenu('X')">
          <span class="nav-icon">📘</span> Kelas X
        </button>
        <button class="nav-item" @click="openClassMenu('XI')">
          <span class="nav-icon">📗</span> Kelas XI
        </button>
        <button class="nav-item" @click="openClassMenu('XII')">
          <span class="nav-icon">📕</span> Kelas XII
        </button>
      </template>

      <!-- Jika ada kelas yang aktif, tampilkan Sub-Menu dari kelas tersebut -->
      <template v-else>
        <!-- Tombol Back untuk kembali ke pilihan kelas -->
        <button class="nav-item back-btn" @click="closeClassMenu">
          <span class="nav-icon">⬅</span> Kelas {{ activeClass }}
        </button>
        
        <!-- Render sub-menu / labs -->
        <RouterLink
          v-for="lab in classStructure[activeClass]"
          :key="lab.path"
          :to="lab.path"
          class="nav-item"
          :class="{ active: route.path === lab.path }"
          @click="onLabClick"
        >
          <span class="nav-icon">{{ lab.icon }}</span>
          {{ lab.label }}
        </RouterLink>

        <!-- Placeholder jika kelas belum ada materinya -->
        <div v-if="classStructure[activeClass].length === 0" class="nav-item disabled">
          <span class="nav-icon">🚧</span> Segera Datang
        </div>
      </template>
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
import { inject, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({ audioEnabled: Boolean })
defineEmits(['toggle-audio', 'reset-lab', 'toggle-fullscreen'])

const audio = inject('audio')
const route = useRoute()
const router = useRouter()

// Struktur Kelas & Lab
const classStructure = {
  'X': [
    { path: '/kelas-x/informatika-masa-depan', icon: '🚀', label: 'Informatika Masa Depan' },
    { path: '/kelas-x/sistem-komputer', icon: '💻', label: 'Sistem Komputer' },
    { path: '/kelas-x/berpikir-komputasional', icon: '⚙️', label: 'Berpikir Komputasional' },
    { path: '/kelas-x/jaringan-internet', icon: '📡', label: 'Jaringan dan Internet' },
    { path: '/kelas-x/dampak-sosial', icon: '🌍', label: 'Dampak Sosial' }
  ],
  'XI': [
    { path: '/kelas-xi/tentang-informatika', icon: '📖', label: 'Tentang Informatika' },
    { path: '/kelas-xi/strategi-algoritmik', icon: '🧠', label: 'Strategi Algoritmik' },
    { path: '/kelas-xi/berpikir-kritis', icon: '🤔', label: 'Berpikir Kritis' },
    { path: '/kelas-xi/jaringan-komputer', icon: '🌐', label: 'Jaringan Komputer' },
    { path: '/kelas-xi/pengembangan-aplikasi', icon: '📱', label: 'Pengembangan Aplikasi' }
  ],
  'XII': [
    { path: '/kelas-xii/informatika-masa-depan', icon: '🚀', label: 'Informatika Masa Depan' },
    { path: '/kelas-xii/sistem-komputer', icon: '💻', label: 'Sistem Komputer' },
    { path: '/kelas-xii/berpikir-komputasional', icon: '⚙️', label: 'Berpikir Komputasional' },
    { path: '/kelas-xii/jaringan-internet', icon: '📡', label: 'Jaringan dan Internet' },
    { path: '/kelas-xii/dampak-sosial', icon: '🌍', label: 'Dampak Sosial' }
  ]
}

// State untuk menyimpan manual pilihan dropdown
const manualClass = ref(null)

// Computed untuk menentukan kelas mana yang sedang terbuka di header
const activeClass = computed(() => {
  if (manualClass.value) return manualClass.value
  
  // Deteksi dari route saat ini
  if (route.path.startsWith('/kelas-x/')) return 'X'
  if (route.path.startsWith('/kelas-xi/')) return 'XI'
  if (route.path.startsWith('/kelas-xii/')) return 'XII'
  
  return null
})

function openClassMenu(className) {
  manualClass.value = className
  audio?.click()
}

function closeClassMenu() {
  manualClass.value = null
  audio?.click()
  if (route.path !== '/') {
    router.push('/')
  }
}

function goHome() {
  manualClass.value = null
  router.push('/')
  audio?.click()
}

function onLabClick() {
  manualClass.value = null // reset override
  audio?.tab()
}

// Jika rute berubah karena dari sidebar atau tempat lain, hapus manual override
watch(() => route.path, () => {
  manualClass.value = null
})
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
.lab-brand { display: flex; align-items: center; gap: 14px; transition: transform 0.2s; }
.lab-brand:hover { transform: scale(1.02); }
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
  transition: all 0.3s ease;
}
.nav-item {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-full);
  cursor: pointer;
  background: transparent;
  border: none;
  font-family: inherit;
  transition: all var(--transition-base);
  font-size: 0.85rem; font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
}
.nav-item:hover:not(.disabled) { color: var(--text-primary); background: var(--bg-elevated); }
.nav-item.active {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  box-shadow: var(--glow-primary);
}
.nav-item.back-btn {
  color: var(--accent-amber);
  background: rgba(245, 158, 11, 0.1);
  margin-right: 8px;
}
.nav-item.back-btn:hover {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}
.nav-item.disabled {
  opacity: 0.5; cursor: not-allowed;
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
