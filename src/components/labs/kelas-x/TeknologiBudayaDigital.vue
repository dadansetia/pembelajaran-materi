<template>
  <div class="lab-container">
    <div class="lab-header">
      <h2>Teknologi dan Budaya Digital</h2>
      <p>Sistem Komputer, Perangkat Lunak Perkantoran, dan Budaya Baru di Era Informatika</p>
    </div>

    <div class="lab-nav-tabs">
      <button :class="{ active: activeTab === 'teori' }" @click="setTab('teori')">📚 Materi Teori</button>
      <button :class="{ active: activeTab === 'biner' }" @click="setTab('biner')">💡 Lab Sistem Biner & Logika</button>
    </div>

    <div class="lab-workspace" :class="{ 'no-padding': activeTab !== 'teori' }">
      <div v-if="activeTab === 'teori'" class="placeholder-content">
        <h3>Materi Sedang Disusun</h3>
        <p>Halaman ini disiapkan untuk menampung modul materi Teknologi dan Budaya Digital.</p>
      </div>

      <div v-else-if="activeTab === 'biner'" class="embedded-lab">
        <BinerLab />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BinerLab from './biner/BinerLab.vue'

const route = useRoute()
const activeTab = ref('teori')

function setTab(tab) {
  activeTab.value = tab
}

onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
})

watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab
  }
})
</script>

<style scoped>
.lab-container {
  display: flex; flex-direction: column; height: 100%;
}
.lab-header { margin-bottom: 0; padding-bottom: 20px; }
.lab-nav-tabs {
  display: flex; gap: 10px; padding: 0 24px 15px; border-bottom: 1px solid var(--border-subtle); background: transparent;
}
.lab-nav-tabs button {
  background: transparent; border: 1px solid var(--border-subtle); padding: 8px 16px; border-radius: var(--radius-full);
  color: var(--text-secondary); cursor: pointer; transition: all 0.2s; font-weight: 600; font-size: 0.9rem;
}
.lab-nav-tabs button:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
.lab-nav-tabs button.active { background: var(--accent-primary); color: white; border-color: var(--accent-primary); }

.lab-workspace {
  flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column;
}
.lab-workspace.no-padding { padding: 0; }

.placeholder-content {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  flex: 1; text-align: center; color: var(--text-muted);
}
.placeholder-content h3 { font-size: 1.5rem; margin-bottom: 10px; color: var(--text-secondary); }

.embedded-lab {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;
}
.embedded-lab :deep(.lab-container) {
  height: 100%; border: none; padding: 0; background: transparent;
}
.embedded-lab :deep(.lab-header) { display: none; }
</style>
