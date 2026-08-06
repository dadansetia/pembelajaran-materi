<template>
  <div class="lab-container">
    <div class="lab-header">
      <h2>Jaringan Komputer dan Internet</h2>
      <p>Fokus pada pendalaman konsep jaringan, komunikasi data, dan mekanisme pertukaran data (seperti packet switching dan transmisi data).</p>
    </div>

    <div class="lab-nav-tabs">
      <button :class="{ active: activeTab === 'teori' }" @click="setTab('teori')">📚 Materi Teori</button>
      <button :class="{ active: activeTab === 'jaringan' }" @click="setTab('jaringan')">🌐 Praktik Topologi Jaringan</button>
    </div>

    <div class="lab-workspace" :class="{ 'no-padding': activeTab !== 'teori' }">
      <div v-if="activeTab === 'teori'" class="placeholder-content">
        <h3>Materi Sedang Disusun</h3>
        <p>Halaman ini disiapkan untuk menampung modul materi Jaringan Komputer dan Internet.</p>
      </div>

      <div v-else-if="activeTab === 'jaringan'" class="embedded-lab">
        <JaringanLab />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import JaringanLab from '../jaringan/JaringanLab.vue'

const activeTab = ref('teori')

function setTab(tab) {
  activeTab.value = tab
}
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
