<template>
  <div class="lab-wrapper">
    <TabBar v-model="activeTab" :tabs="tabs" />
    <div class="tab-content">
      <Transition name="slide" mode="out-in">
        <JaringanTeori    v-if="activeTab === 'teori'"    key="teori" />
        <JaringanProsedur v-else-if="activeTab === 'prosedur'" key="prosedur" />
        <JaringanSimulasi v-else key="simulasi" ref="simRef" />
      </Transition>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TabBar from '../../ui/TabBar.vue'
import JaringanTeori from './JaringanTeori.vue'
import JaringanProsedur from './JaringanProsedur.vue'
import JaringanSimulasi from './JaringanSimulasi.vue'
const activeTab = ref('teori')
const simRef = ref(null)
const tabs = [
  { id: 'teori', icon: '📖', label: 'Teori' },
  { id: 'prosedur', icon: '📋', label: 'Prosedur' },
  { id: 'simulasi', icon: '▶️', label: 'Simulasi' },
]
const emit = defineEmits(['reset-ref'])
emit('reset-ref', () => simRef.value?.reset())
</script>
<style scoped>
.lab-wrapper { display:flex; flex-direction:column; height:100%; overflow:hidden; }
.tab-content { flex:1; overflow-y:auto; padding:24px; }
</style>
