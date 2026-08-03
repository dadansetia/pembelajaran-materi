<template>
  <div class="lab-wrapper">
    <TabBar v-model="activeTab" :tabs="tabs" />
    <div class="tab-content">
      <Transition name="slide" mode="out-in">
        <BinerTeori    v-if="activeTab === 'teori'"    key="teori" />
        <BinerProsedur v-else-if="activeTab === 'prosedur'" key="prosedur" />
        <BinerSimulasi v-else key="simulasi" ref="simRef" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabBar from '../../ui/TabBar.vue'
import BinerTeori from './BinerTeori.vue'
import BinerProsedur from './BinerProsedur.vue'
import BinerSimulasi from './BinerSimulasi.vue'

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
