import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

const routes = [
  { path: '/', redirect: '/algoritma' },
  {
    path: '/algoritma',
    component: () => import('./components/labs/algoritma/AlgoritmaLab.vue'),
    meta: { title: 'Algoritma Pengurutan', icon: '⚡', fase: 'E' }
  },
  {
    path: '/datastruktur',
    component: () => import('./components/labs/datastruktur/DataStrukturLab.vue'),
    meta: { title: 'Struktur Data', icon: '📦', fase: 'E' }
  },
  {
    path: '/jaringan',
    component: () => import('./components/labs/jaringan/JaringanLab.vue'),
    meta: { title: 'Jaringan Komputer', icon: '🌐', fase: 'F' }
  },
  {
    path: '/biner',
    component: () => import('./components/labs/biner/BinerLab.vue'),
    meta: { title: 'Sistem Biner & Logika', icon: '💡', fase: 'F' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
