<template>
  <div class="bg-grid"></div>
  <div class="bg-glow bg-glow-1"></div>
  <div class="bg-glow bg-glow-2"></div>

  <ToastContainer />

  <div class="app-shell">
    <AppHeader
      :audio-enabled="audio.enabled.value"
      @toggle-audio="handleAudioToggle"
      @reset-lab="handleReset"
      @toggle-fullscreen="toggleFullscreen"
    />

    <div class="app-body" :class="{ 'no-sidebar': $route.meta.hideSidebar }">
      <AppSidebar v-if="!$route.meta.hideSidebar" />

      <main class="lab-panel">
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" :key="route.path" @reset-ref="setResetFn" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, provide, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import ToastContainer from './components/ui/ToastContainer.vue'
import { useAudio } from './composables/useAudio.js'
import { useToast } from './composables/useToast.js'

const audio = useAudio()
const toast = useToast()
const router = useRouter()
const route = useRoute()

// Provide toast globally so all children can inject it
provide('toast', toast)
provide('audio', audio)

// Reset function registry – child labs expose their reset fn
const currentReset = ref(null)
function setResetFn(fn) { currentReset.value = fn }

function handleAudioToggle() {
  audio.toggle()
  toast.info(audio.enabled.value ? '🔊 Suara diaktifkan' : '🔇 Suara dimatikan')
}

function handleReset() {
  audio.reset()
  if (currentReset.value) currentReset.value()
  toast.info('🔄 Lab direset')
}

function toggleFullscreen() {
  audio.click()
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {})
  } else {
    document.exitFullscreen().catch(() => {})
  }
}

// Keyboard shortcuts
const labRoutes = ['algoritma', 'datastruktur', 'jaringan', 'biner']
function onKeydown(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  if (route.meta.hideSidebar) return // Disable shortcuts in auth/master
  
  const key = e.key
  if (['1','2','3','4'].includes(key)) {
    router.push('/' + labRoutes[parseInt(key) - 1])
  } else if (key === 'r' || key === 'R') { handleReset() }
  else if (key === 'm' || key === 'M') { handleAudioToggle() }
  else if (key === 'f' || key === 'F') { toggleFullscreen() }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  setTimeout(() => {
    toast.info('💡 Tekan 1-4 ganti lab · R reset · M mute · F fullscreen')
  }, 1200)
})
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.bg-grid {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}
.bg-glow { position: fixed; z-index: 0; pointer-events: none; }
.bg-glow-1 {
  width: 600px; height: 600px; top: -200px; left: -200px;
  background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
}
.bg-glow-2 {
  width: 500px; height: 500px; bottom: -150px; right: -150px;
  background: radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%);
}
.app-shell {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; height: 100vh; overflow: hidden;
}
.app-body {
  flex: 1; display: grid; grid-template-columns: 252px 1fr;
  overflow: hidden;
}
.app-body.no-sidebar {
  display: block;
  overflow-y: auto;
}
.lab-panel { overflow: hidden; display: flex; flex-direction: column; height: 100%; }
.app-body.no-sidebar .lab-panel { height: auto; min-height: 100%; }
</style>
