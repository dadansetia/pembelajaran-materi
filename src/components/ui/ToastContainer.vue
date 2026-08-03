<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts.toasts.value"
          :key="t.id"
          class="toast"
          :class="t.type"
        >
          <span class="toast-icon">{{ icons[t.type] || 'ℹ️' }}</span>
          <span>{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { inject } from 'vue'
const toasts = inject('toast')
const icons = { success: '✅', error: '❌', info: 'ℹ️' }
</script>

<style scoped>
.toast-container {
  position: fixed; bottom: 24px; right: 24px; z-index: 9999;
  display: flex; flex-direction: column; gap: 8px;
}
.toast {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 0.82rem; color: var(--text-primary);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  backdrop-filter: blur(10px);
  max-width: 300px;
  pointer-events: none;
}
.toast.success { border-color: rgba(16,185,129,0.4); }
.toast.error   { border-color: rgba(244,63,94,0.4); }
.toast.info    { border-color: rgba(99,102,241,0.4); }
.toast-icon { font-size: 1rem; flex-shrink: 0; }

/* TransitionGroup */
.toast-enter-active { animation: toastIn 0.3s ease-out; }
.toast-leave-active { animation: toastOut 0.3s ease-in forwards; }
.toast-move { transition: transform 0.3s ease; }
</style>
