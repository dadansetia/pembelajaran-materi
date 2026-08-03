<template>
  <div class="tab-bar" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-btn"
      :class="{ active: modelValue === tab.id }"
      role="tab"
      :aria-selected="modelValue === tab.id"
      @click="$emit('update:modelValue', tab.id); audio.tab()"
    >
      <span>{{ tab.icon }}</span> {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  tabs: { type: Array, required: true },   // [{ id, icon, label }]
  modelValue: { type: String, required: true }
})
defineEmits(['update:modelValue'])

const audio = inject('audio')
</script>

<style scoped>
.tab-bar {
  display: flex;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0 24px;
  flex-shrink: 0;
}
.tab-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 20px;
  cursor: pointer;
  transition: all var(--transition-base);
  border: none; background: none;
  color: var(--text-muted);
  font-size: 0.85rem; font-weight: 600;
  border-bottom: 2px solid transparent;
  font-family: var(--font-sans);
  letter-spacing: 0.01em;
}
.tab-btn:hover { color: var(--text-primary); }
.tab-btn.active { color: var(--accent-primary); border-bottom-color: var(--accent-primary); }
</style>
